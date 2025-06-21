package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Models.DTO.PlaylistDTO;
import com.HarmonyHub.HarmonyHub.Models.DTO.SongDTO;
import com.HarmonyHub.HarmonyHub.Models.DTO.UserDTO;
import com.HarmonyHub.HarmonyHub.Models.User;
import com.HarmonyHub.HarmonyHub.Repository.UserRepository;
import com.HarmonyHub.HarmonyHub.Services.IMPL.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already in use";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Registration successful";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        return userRepository.findByEmail(loginUser.getEmail())
                .filter(user -> passwordEncoder.matches(loginUser.getPassword(), user.getPassword()))
                .map(user -> {
                    String token = jwtService.generateToken(user.getId(), user.getEmail());
                    return ResponseEntity.ok().body(Map.of("token", token));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid credentials")));
    }
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email)
                .map(user -> {
                    List<PlaylistDTO> playlistDTOs = user.getPlaylists().stream()
                            .map(playlist -> new PlaylistDTO(
                                    playlist.getId(),
                                    playlist.getTitle(),
                                    playlist.getDescription(),
                                    playlist.getCoverImage(),
                                    playlist.getSongs().stream()
                                            .map(SongDTO::new)
                                            .toList()
                            ))
                            .toList();

                    UserDTO userDTO = new UserDTO(
                            user.getId(),
                            user.getUserName(),
                            user.getEmail(),
                            user.getProfileImageUrl(),
                            playlistDTOs
                    );
                    userDTO.setFollowersCount(user.getFollowers().size());
                    userDTO.setFollowingCount(user.getFollowing().size());
                    return ResponseEntity.ok(userDTO);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
    }
}
