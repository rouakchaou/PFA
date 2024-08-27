package com.store.service;

import com.store.model.FCategory;
import com.store.model.SCategory;
import com.store.repository.CategoryRepository;
import com.store.repository.SousCategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService {
    @PersistenceContext
    private EntityManager entityManager;
    private final CategoryRepository categoryRepository;
    private final SousCategoryRepository sousCategoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, SousCategoryRepository sousCategoryRepository) {
        this.categoryRepository =categoryRepository;
        this.sousCategoryRepository = sousCategoryRepository;
    }
    public FCategory addCategory(FCategory category) {
        return categoryRepository.save(category);
    }
    public List<FCategory> getCategory(){
        return categoryRepository.findAll();
    }

    public SCategory addSousCategory(SCategory category) {
        return sousCategoryRepository.save(category);
    }
    public List<SCategory> getSousCategory(){
        return sousCategoryRepository.findAll();
    }

    public void deleteSousCategory(Long souscategorytId) {
        boolean exists=sousCategoryRepository.existsById(souscategorytId);
        if(!exists){
            throw new IllegalStateException("Category with id "+ souscategorytId+" does not exists");
        }
        sousCategoryRepository.deleteById(souscategorytId);
    }

    public List<Long> findSousCategoryIdsByCategoryId(Long categoryId) {
        return categoryRepository.findSubCategoryIdsByCategoryId(categoryId);
    }

    public List<SCategory> findSCategoriesBySCategoryIds(List<Long> subCategoryIds) {
        return sousCategoryRepository.findByIdIn(subCategoryIds);
    }

    public List<FCategory> getCategoriesBySubCategoryId(Long subCategoryId) {
        return categoryRepository.findBySubCategoryId(subCategoryId);
    }

    public FCategory getCategoryById(Long categoryId){
        return categoryRepository.findFCategoriesById(categoryId);
    }

    public SCategory getScategoryById(Long sategoryId){
        return sousCategoryRepository.findSCategoryById(sategoryId);
    }

    @Transactional
    public void deleteFCategoryById(Long fCategoryId) {
        entityManager.createNativeQuery("DELETE FROM category_subcategory WHERE category_id = :fCategoryId")
                .setParameter("fCategoryId", fCategoryId)
                .executeUpdate();
        categoryRepository.deleteById(fCategoryId);
    }
    
}
