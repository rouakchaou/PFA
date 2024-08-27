package com.store.controller;

import com.store.model.FCategory;
import com.store.model.Product;
import com.store.model.SCategory;
import com.store.service.ProductService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping(path="product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(){
        return productService.getProducts();
    }
    @DeleteMapping(path="/{productId}")
    public void deleteProduct(@PathVariable("productId") Long productId){
        productService.deleteProduct(productId);
    }
    @PostMapping("/add")
    public ResponseEntity<?> registerNewProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("promotion") Integer promotion,
            @RequestParam("fcategory_id") Long fcategory_id,
            @RequestParam("scategory_id") Long scategory_id,
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("sizes") String[] sizes,
            @RequestParam("quantities") Long[] quantities) {
        try {
            System.out.println("Sizes received: " + Arrays.toString(sizes));
            System.out.println("Quantities received: " + Arrays.toString(quantities));
            int image_number = images.length;
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setPromotion(promotion);
            product.setFcategory_id(fcategory_id);
            product.setScategory_id(scategory_id);

            Map<String, Long> sizeQuantityMap = new HashMap<>();
            for (int i = 0; i < sizes.length; i++) {
                sizeQuantityMap.put(sizes[i], quantities[i]);
            }
            product.setSizeQuantityMap(sizeQuantityMap);

            String[] image_name = new String[image_number];
            for (int i = 0; i < image_number; i++) {
                image_name[i] = productService.generateImageName(images[i], name + i);
            }
            product.setImage_name(List.of(image_name));
            productService.addProduct(product, sizeQuantityMap);
            Long productId = product.getId();
            productService.saveImages(images, name, productId, image_name);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product: " + e.getMessage());
        }
    }

    @GetMapping("/category/{fcategoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable Long fcategoryId) {
        return productService.getProductsByCategoryId(fcategoryId);
    }

    @GetMapping("/bycategories")
    public List<Product> getProductsByCategoryIds(
            @RequestParam("fcategoryId") Long fcategoryId,
            @RequestParam("scategoryId") Long scategoryId) {
        return productService.getProductsByCategoryIds(fcategoryId, scategoryId);
    }

    @GetMapping("/{x}")
    public List<Product> getRandomProducts(@PathVariable int x) {
        List<Product> allProducts = productService.getProducts();
        Collections.shuffle(allProducts);
        return allProducts.subList(0, Math.min(x, allProducts.size()));
    }

    @GetMapping("/Id{x}")
    public Product getProductById(@PathVariable Long x){
        return productService.getProductById(x);
    }

    @GetMapping("/similarproducts/{x}")
    public List<Product> getSimilarProducts(
            @PathVariable int x,
            @RequestParam("productId") Long id,
            @RequestParam("fcategoryId") Long fcategoryId,
            @RequestParam("scategoryId") Long scategoryId) {
        List<Product> Products = productService.findByCategoryIdsAndExcludingProductId(fcategoryId, scategoryId, id);
        Collections.shuffle(Products);
        return Products.subList(0, Math.min(x, Products.size()));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(
            @PathVariable("productId") Long productId,
            @RequestParam("name") String name,
            @RequestParam("price") Integer price,
            @RequestParam("promotion") Integer promotion
    ) {
        try {
            Product existingProduct = productService.getProductById(productId);
            if (existingProduct == null) {
                return ResponseEntity.notFound().build();
            }
            String oldProductName = existingProduct.getName();

            existingProduct.setName(name);
            existingProduct.setPrice(price);
            existingProduct.setPromotion(promotion);
            productService.updateProduct(existingProduct);

            String oldImagePathBase = "D:\\Final PFA\\clothes store Angular\\Clothes_Store_Angular_Part\\src\\assets\\img\\product\\" + productId + oldProductName;
            String newProductName = existingProduct.getName();
            String newImagePathBase = "D:\\Final PFA\\clothes store Angular\\Clothes_Store_Angular_Part\\src\\assets\\img\\product\\" + productId + newProductName;
            File oldDirectory = new File(oldImagePathBase);
            File newDirectory = new File(newImagePathBase);
            if (!newDirectory.exists()) {
                newDirectory.mkdirs();
            }
            File[] imageFiles = oldDirectory.listFiles();
            if (imageFiles != null) {
                int index = 0;
                List<String> newImageNames = new ArrayList<>();
                for (File imageFile : imageFiles) {
                    String extension = imageFile.getName().substring(imageFile.getName().lastIndexOf("."));
                    String newImageName =name + index + extension;
                    File newImageFile = new File(newDirectory, newImageName);
                    Files.move(imageFile.toPath(), newImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    newImageNames.add(newImageName);
                    index++;
                }
                existingProduct.setImage_name(newImageNames);
                productService.updateProduct(existingProduct);
            }
            FileUtils.deleteDirectory(oldDirectory);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product: " + e.getMessage());
        }
    }

}
