package com.store.repository;

import com.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p WHERE p.fcategory_id = :fcategoryId")
    List<Product> findByCategoryId(Long fcategoryId);

    @Query("SELECT p FROM Product p WHERE p.fcategory_id = :fcategoryId AND p.scategory_id = :scategoryId")
    List<Product> findByCategoryIds(Long fcategoryId, Long scategoryId);

    Product findProductById(Long id);

    @Query("SELECT p FROM Product p WHERE p.fcategory_id = :fcategoryId AND p.scategory_id = :scategoryId AND p.id <> :productId")
    List<Product> findByCategoryIdsAndExcludingProductId(Long fcategoryId, Long scategoryId, Long productId);

}

