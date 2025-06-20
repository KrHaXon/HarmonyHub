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
}
