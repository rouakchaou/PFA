package com.store.service;

import com.store.model.Product;
import com.store.repository.ProductRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(){
        return  productRepository.findAll();
    }

    public void deleteProduct(Long productId) {
        boolean exists=productRepository.existsById(productId);
        if(!exists){
            throw new IllegalStateException("Product with id "+ productId+" does not exists");
        }
        productRepository.deleteById(productId);
        System.out.println("produit supprimé");
    }

    public String generateImageName(MultipartFile image, String name) throws IOException {
        String originalFileName=image.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String imageName = name+extension;
        return imageName;
    }

    public void saveImages(MultipartFile[] images, String product_name, Long id, String[] image_name) throws IOException {
        String imagePathBase = "C:\\newPfa\\front\\Clothes_Store_Angular_Part\\src\\assets\\img\\product\\" +id +product_name;
        File directory = new File(imagePathBase);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        else {
            FileUtils.cleanDirectory(directory);
        }
        for (int i = 0; i < image_name.length; i++) {
            String imagePath = imagePathBase + "\\" +image_name[i];
            File file = new File(imagePath);
            images[i].transferTo(file);
        }
    }

    public Product addProduct(Product product, Map<String, Long> sizeQuantityMap) {
        product.setSizeQuantityMap(sizeQuantityMap);
        return productRepository.save(product);
    }

    public List<Product> getProductsByCategoryId(Long fcategoryId) {
        return productRepository.findByCategoryId(fcategoryId);
    }

    public List<Product> getProductsByCategoryIds(Long fcategoryId, Long scategoryId) {
        return productRepository.findByCategoryIds(fcategoryId, scategoryId);
    }

    public Product getProductById(Long productId){
        return productRepository.findProductById(productId);
    }


    public void updateProduct(Product updatedProduct) {
        productRepository.save(updatedProduct);
    }

    public List<Product> findByCategoryIdsAndExcludingProductId(Long fcategoryId, Long scategoryId, Long productId) {
        return productRepository.findByCategoryIdsAndExcludingProductId(fcategoryId, scategoryId, productId);
    }
}
