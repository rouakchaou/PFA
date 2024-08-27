package com.store.controller;

import com.store.model.FCategory;
import com.store.model.SCategory;
import com.store.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path="category")
public class CategoryController {
    private final CategoryService categoryService;
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping(path="first")
    public List<FCategory> getProducts(){
        return categoryService.getCategory();
    }

    @DeleteMapping(path="first/{categoryId}")
    public void deleteFCategoryById(@PathVariable("categoryId") Long categoryId){
        categoryService.deleteFCategoryById(categoryId);

    }

    @PostMapping(path="first")
    public void registerNewFCategory(@RequestBody FCategory category){
        categoryService.addCategory(category);
    }
    @GetMapping(path="sous")
    public List<SCategory> getSousCategory(){
        return categoryService.getSousCategory();
    }
    @DeleteMapping(path="sous/{categoryId}")
    public void deleteSousCategory(@PathVariable("categoryId") Long categoryId){
        categoryService.deleteSousCategory(categoryId);
    }
    @PostMapping(path="sous")
    public void registerSousCategory(@RequestBody SCategory category){
        categoryService.addSousCategory(category);
    }

    @GetMapping("/{categoryId}/sousByFirst")
    public List<SCategory> getSCategoriesByCategoryId(@PathVariable Long categoryId) {
        List<Long> subCategoryIds = categoryService.findSousCategoryIdsByCategoryId(categoryId);
        return categoryService.findSCategoriesBySCategoryIds(subCategoryIds);
    }

    @GetMapping("/subcategory/{subCategoryId}")
    public ResponseEntity<List<FCategory>> getCategoriesBySubCategoryId(@PathVariable Long subCategoryId) {
        List<FCategory> categories = categoryService.getCategoriesBySubCategoryId(subCategoryId);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/Id/{x}")
    public FCategory getCategoryById(@PathVariable Long x){
        return categoryService.getCategoryById(x);
    }

    @GetMapping("/subcategory/Id/{x}")
    public SCategory getSCategoryById(@PathVariable Long x){
        return categoryService.getScategoryById(x);
    }



}
