package com.store.controller;

import com.store.model.Command;
import com.store.model.CommandLine;
import com.store.model.Product;
import com.store.model.User;
import com.store.service.CommandService;
import com.store.service.EmailService;
import com.store.service.ProductService;
import com.store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="commande")
public class CommandController {
    @Autowired
    EmailService emailService;
    private final CommandService commandService;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    CommandController(CommandService commandService, ProductService productService, UserService userService){
        this.commandService = commandService;
        this.productService = productService;
        this.userService = userService;
    }

    @PostMapping(path = "add")
    public ResponseEntity<?> createCommand(@RequestBody Command command) {
        Command savedCommand = commandService.saveCommande(command);
        List<String> errorMessages = new ArrayList<>(); // Liste pour stocker les messages d'erreur

        for (CommandLine commandLine : command.getCommand_lines()) {
            Product productInCommandLine = commandLine.getProduct();
            Long id = productInCommandLine.getId();
            Product product = productService.getProductById(id);

            String size = commandLine.getSize();
            Long quantityOrdered = commandLine.getQuantity();

            // Vérifier si la taille spécifiée existe pour le produit
            if (product.getSizeQuantityMap().containsKey(size)) {
                Long currentQuantity = product.getSizeQuantityMap().get(size);

                // Vérifier si la quantité commandée est disponible dans le stock
                if (currentQuantity >= quantityOrdered) {
                    product.getSizeQuantityMap().put(size, currentQuantity - quantityOrdered);
                    productService.updateProduct(product);
                } else {
                    // Ajouter un message d'erreur à la liste
                    errorMessages.add("Quantité non disponible pour le produit avec le nom : " + product.getName() +
                            " et la taille : " + size);
                }
            } else {
                // Ajouter un message d'erreur à la liste
                errorMessages.add("La taille spécifiée n'existe pas pour le produit avec le nom : " + product.getName());
            }

            commandLine.setCommand(savedCommand);
            commandService.addCommandLine(commandLine);
        }

        // Si des erreurs sont détectées, retourner une réponse avec les messages d'erreur
        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(errorMessages);
        }

        // Sinon, retourner une réponse avec la commande enregistrée
        return new ResponseEntity<>(savedCommand, HttpStatus.CREATED);
    }

    @GetMapping(path = "all")
    public ResponseEntity<List<Command>> getAllCommands() {
        List<Command> commands = commandService.getAllCommands();
        return new ResponseEntity<>(commands, HttpStatus.OK);
    }

    @PutMapping("/update/admin/{commandId}")
    public ResponseEntity<?> updateCommand(
            @PathVariable("commandId") Long commandId,
            @RequestParam("deliveryPersonId") Long deliveryPersonId
    ) {
        try {
            Command existingCommand = commandService.getCommandById(commandId);
            if (existingCommand == null) {
                return ResponseEntity.notFound().build();
            }
            existingCommand.setDelivery_person_id(deliveryPersonId);
            existingCommand.setState("in progress");

            commandService.updateCommand(existingCommand);
            Command command=commandService.getCommandById(commandId);
            User user=userService.getUserById(command.getUser_id());
            emailService.sendCommandEmail(user.getName(),user.getEmailId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product: " + e.getMessage());
        }
    }
    @PutMapping("/update/delivery/person/{commandId}")
    public ResponseEntity<?> updateDeliveryCommand(
            @PathVariable("commandId") Long commandId
    ) {
        try {
            Command existingCommand = commandService.getCommandById(commandId);
            if (existingCommand == null) {
                return ResponseEntity.notFound().build();
            }
            existingCommand.setState("delivered");
            commandService.updateCommand(existingCommand);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product: " + e.getMessage());
        }
    }

    @GetMapping(path = "delivery/person/{deliveryId}")
    public ResponseEntity<List<Command>> getCommandsByDpId(
            @PathVariable("deliveryId") Long deliveryId
    ) {
        List<Command> commands = commandService.getCommandsByDpId(deliveryId);
        return new ResponseEntity<>(commands, HttpStatus.OK);
    }

}
