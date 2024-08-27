package com.store.service;

import com.store.model.Admin;
import com.store.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    public AdminService(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }

    AdminRepository adminRepository;

    public Admin registerAdmin(Admin admin){ return adminRepository.save(admin);}

    public Admin fetchByEmail(String email){
        Admin admin = adminRepository.findByEmailId(email);
        return admin;
    }
    public Admin fetchByEmailandPassword(String email,String password){
        Admin admin = adminRepository.findByEmailIdAndPassword(email,password);
        return admin;
    }
    public Admin getAdminById(Long Id){
        return adminRepository.findAdminById(Id);
    }
    public Admin updateAdminById(Long userId, Admin newAdmin) {
        return adminRepository.findById(userId)
                .map(admin -> {
                    admin.setName(newAdmin.getName());
                    admin.setSurname(newAdmin.getSurname());
                    admin.setEmailId(newAdmin.getEmailId());
                    admin.setPassword(newAdmin.getPassword());
                    return adminRepository.save(admin);
                })
                .orElseThrow(() -> new RuntimeException("Admin not found with id " + userId));
    }
}
