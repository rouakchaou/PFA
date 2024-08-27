package com.store.service;

import com.store.model.User;
import com.store.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class UserService {
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    UserRepository userRepository;

    public User registerUser(User user){ return userRepository.save(user);}

    public User fetchByEmail(String email){
        User userOBJ = userRepository.findByEmailId(email);
        return userOBJ;
    }
    public User fetchByEmailandPassword(String email,String password){
        User userOBJ = userRepository.findByEmailIdAndPassword(email,password);
        return userOBJ;
    }
    public User getUserById(Long Id){
        return userRepository.findUserById(Id);
    }
    public User updateUserById(Long userId, User newUser) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setSurname(newUser.getSurname());
                    user.setEmailId(newUser.getEmailId());
                    user.setPassword(newUser.getPassword());
                    user.setPhoneNumber(newUser.getPhoneNumber());
                    user.setGender(newUser.getGender());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String generateDeliveryPersonPassword() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 12; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
