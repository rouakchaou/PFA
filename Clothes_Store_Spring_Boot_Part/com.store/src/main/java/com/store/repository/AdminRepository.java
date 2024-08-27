package com.store.repository;

import com.store.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    public Admin findByEmailId(String email);
    public Admin findByEmailIdAndPassword(String email, String password);
    Admin findAdminById(Long id);
}
