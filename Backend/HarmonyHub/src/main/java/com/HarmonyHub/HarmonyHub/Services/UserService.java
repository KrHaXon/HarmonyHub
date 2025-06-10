package com.HarmonyHub.HarmonyHub.Services;

import com.HarmonyHub.HarmonyHub.Models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUsername(String username);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    User updateUser(Long id, User updatedUser);
    void deleteUser(Long id);
}
