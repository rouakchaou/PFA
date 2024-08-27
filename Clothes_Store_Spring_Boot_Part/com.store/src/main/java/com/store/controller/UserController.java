package com.store.controller;

import com.store.model.Admin;
import com.store.model.Command;
import com.store.model.DeliveryPerson;
import com.store.model.User;
import com.store.service.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    EmailService emailService;
    UserService userService;
    AdminService adminService;
    DeliveryPersonService deliveryPersonService;
    CommandService commandService ;
    @PostMapping(path="/register/user")
    public User registerUser(@RequestBody User user) throws Exception{
        String emailId=user.getEmailId();

        if(emailId!=null && !"".equals(emailId)){
            User userObj= userService.fetchByEmail(emailId);
            if(userObj!=null){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "This user with email: '" + emailId + "' already exists");
            }
        }
        User userObj=null;
        userObj= userService.registerUser(user);
        return userObj;
    }

    @PostMapping(path="/register/admin")
    public Admin registerAdmin(@RequestBody Admin admin) throws Exception{
        String emailId=admin.getEmailId();

        if(emailId!=null && !"".equals(emailId)){
            Admin adminObj= adminService.fetchByEmail(emailId);
            if(adminObj!=null){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "This admin with email: '" + emailId + "' already exists");
            }
        }
        Admin adminObj=null;
        adminObj= adminService.registerAdmin(admin);
        return adminObj;
    }

    @PostMapping(path="/register/deliveryperson")
    public DeliveryPerson registerPerson(@RequestBody DeliveryPerson person) throws Exception{
        String password = userService.generateDeliveryPersonPassword();
        person.setPassword(password);

        String emailId=person.getEmailId();

        if(emailId!=null && !"".equals(emailId)){
            DeliveryPerson personObj= deliveryPersonService.fetchByEmail(emailId);
            if(personObj!=null){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "This delivery person with email: '" + emailId + "' already exists");
            }
        }
        DeliveryPerson personObj=null;
        personObj= deliveryPersonService.register(person);
        emailService.sendEmail(person.getName(), person.getEmailId(), personObj.getPassword());
        return personObj;
    }

    @GetMapping(path="/get/deliveryperson")
    public ResponseEntity<List<DeliveryPerson>> getAllDeliveryPersons() {
        List<DeliveryPerson> deliveryPersons = deliveryPersonService.getAllDeliveryPersons();
        return new ResponseEntity<>(deliveryPersons, HttpStatus.OK);
    }
    
    @GetMapping(path="/get/deliveryperson/town")
    public ResponseEntity<List<DeliveryPerson>> getDeliveryPersonsByTown(@RequestParam("town") String town) {
        List<DeliveryPerson> deliveryPersons = deliveryPersonService.getDeliveryPersonsByTown(town);
        return new ResponseEntity<>(deliveryPersons, HttpStatus.OK);
    }

    @PostMapping(path="/login/user")
    public ResponseEntity<Map<String, String>>  login(@RequestBody User userreceived) throws Exception{
        log.info("Received user object: {}", userreceived);
        User user=userreceived;
        log.info("----user----: {}", user);
        String email= user.getEmailId();
        String pass=user.getPassword();
        log.info("email---- {}", email);
        log.info("password-------- {}", pass);
        User userObj=null;
        if (email!=null && pass!=null){
            userObj= userService.fetchByEmail(email);
            log.info("the user is {}",userObj);
            userObj= userService.fetchByEmailandPassword(email,pass);
        }
        if(userObj==null){
            throw new Exception("request not received");
        }
        String token = generateToken(userObj);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", token);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping(path="/login/admin")
    public ResponseEntity<Map<String, String>>  loginAdmin(@RequestBody Admin userreceived) throws Exception{
        log.info("Received user object: {}", userreceived);
        Admin admin=userreceived;
        String email= admin.getEmailId();
        String pass=admin.getPassword();
        Admin adminObj=null;
        if (email!=null && pass!=null){
            adminObj= adminService.fetchByEmailandPassword(email,pass);
        }
        if(adminObj==null){
            throw new Exception("request not received");
        }
        String token = generateToken(adminObj);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", token);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping(path="/login/deliveryperson")
    public ResponseEntity<Map<String, String>>  loginDeliveryPerson(@RequestBody DeliveryPerson userreceived) throws Exception{
        log.info("Received user object: {}", userreceived);
        DeliveryPerson person=userreceived;
        String email= person.getEmailId();
        String pass=person.getPassword();
        DeliveryPerson personObj=null;
        if (email!=null && pass!=null){
            personObj= deliveryPersonService.fetchByEmailandPassword(email,pass);
        }
        if(personObj==null){
            throw new Exception("request not received");
        }
        String token = generateToken(personObj);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", token);
        return ResponseEntity.ok(responseBody);
    }

    public static <T> String generateToken(T userObj) {
        Map<String, Object> claims = new HashMap<>();
        long userId = -1;
        String name = null;
        try {
            userId = (long) userObj.getClass().getMethod("getId").invoke(userObj);
            name = (String) userObj.getClass().getMethod("getName").invoke(userObj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        claims.put("userId", userId);
        claims.put("name", name);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(String.valueOf(userId))
                .setExpiration(new Date(System.currentTimeMillis() + 864000000))
                .compact();
    }

    @GetMapping("user/Id{x}")
    public User getUserById(@PathVariable Long x){
        return userService.getUserById(x);
    }

    @PutMapping("/update/{userId}")
    public User updateUserById(@PathVariable Long userId, @RequestBody User newUser) {
        return userService.updateUserById(userId, newUser);
    }
    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}