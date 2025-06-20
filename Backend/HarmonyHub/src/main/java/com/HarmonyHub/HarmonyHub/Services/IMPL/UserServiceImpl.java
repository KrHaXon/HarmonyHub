package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Models.User;
import com.HarmonyHub.HarmonyHub.Repository.UserRepository;
import com.HarmonyHub.HarmonyHub.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByuserName(username);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

   @Override
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUserName(updatedUser.getUserName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setProfileImageUrl(updatedUser.getProfileImageUrl());
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        existingUser.setPassword(updatedUser.getPassword());
                    }
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.HarmonyHub.HarmonyHub.Models.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER") // albo user.getRoles() jeśli masz role
                .build();
    }

}
