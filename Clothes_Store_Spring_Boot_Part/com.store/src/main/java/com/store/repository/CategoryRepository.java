package com.store.repository;

import com.store.model.FCategory;
import com.store.model.SCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<FCategory,Long> {
    @Query("SELECT s.id FROM SCategory s JOIN s.categories c WHERE c.id = :categoryId")
    List<Long> findSubCategoryIdsByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT f FROM FCategory f JOIN f.subCategories s WHERE s.id = :subCategoryId")
    List<FCategory> findBySubCategoryId(@Param("subCategoryId") Long subCategoryId);
    void deleteById(Long id);
    FCategory findFCategoriesById(Long id);

}
