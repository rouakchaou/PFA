package com.store.repository;

import com.store.model.SCategory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SousCategoryRepository extends JpaRepository<SCategory,Long> {
    List<SCategory> findByIdIn(List<Long> ids);
    SCategory findSCategoryById(Long id);

}
