package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Models.DTO.PlaylistDTO;
import com.HarmonyHub.HarmonyHub.Models.DTO.UserDTO;
import com.HarmonyHub.HarmonyHub.Models.User;
import com.HarmonyHub.HarmonyHub.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.HarmonyHub.HarmonyHub.Models.DTO.UserDTO.convertToPlaylistDTOs;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        // Pobierz zalogowanego użytkownika
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName(); // email, bo JWT zawiera email

        // Pobierz użytkownika z bazy danych
        User loggedInUser = userService.getUserByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono zalogowanego użytkownika"));

        if (!loggedInUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Nie możesz edytować innego użytkownika
        }

        User updatedUser = userService.updateUser(id, userDTO.toUser());
        List<PlaylistDTO> playlistDTOs = convertToPlaylistDTOs(updatedUser.getPlaylists());
        UserDTO updatedDTO = new UserDTO(updatedUser.getId(), updatedUser.getUserName(), updatedUser.getEmail(), updatedUser.getProfileImageUrl(),  playlistDTOs);
        return ResponseEntity.ok(updatedDTO);
    }
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = users.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUserName(),
                        user.getEmail(),
                        user.getProfileImageUrl(),
                        convertToPlaylistDTOs(user.getPlaylists())
                ))
                .toList();
        return ResponseEntity.ok(userDTOs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id, Authentication authentication) {
        User requestedUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        // Domyślnie niech będzie, że użytkownik NIE jest obserwowany
        boolean isFollowed = false;

        // Jeśli ktoś jest zalogowany – sprawdź czy go followuje
        if (authentication != null && authentication.isAuthenticated()) {
            String currentEmail = authentication.getName();
            User currentUser = userService.getUserByEmail(currentEmail)
                    .orElse(null);
            if (currentUser != null) {
                isFollowed = requestedUser.getFollowers().contains(currentUser);
            }
        }

        UserDTO userDTO = new UserDTO(
                requestedUser.getId(),
                requestedUser.getUserName(),
                requestedUser.getEmail(),
                requestedUser.getProfileImageUrl(),
                convertToPlaylistDTOs(requestedUser.getPlaylists())
        );

        userDTO.setFollowersCount(requestedUser.getFollowers().size());
        userDTO.setFollowingCount(requestedUser.getFollowing().size());
        userDTO.setIsFollowed(isFollowed);

        return ResponseEntity.ok(userDTO);
    }
    @GetMapping("/{id}/followers")
    public ResponseEntity<List<UserDTO>> getFollowers(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        List<UserDTO> followers = user.getFollowers().stream()
                .map(u -> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getProfileImageUrl(), null))
                .toList();

        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{id}/following")
    public ResponseEntity<List<UserDTO>> getFollowing(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        List<UserDTO> following = user.getFollowing().stream()
                .map(u -> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getProfileImageUrl(), null))
                .toList();

        return ResponseEntity.ok(following);
    }
}
