package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Services.FollowService;
import com.HarmonyHub.HarmonyHub.Services.IMPL.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    private FollowService followService;
    private final JwtService jwtService;
    @Autowired
    public FollowController(FollowService followService, JwtService jwtService) {
        this.followService = followService;
        this.jwtService = jwtService;
    }

    @PostMapping("/{followingId}")
    public ResponseEntity<Void> follow(@RequestHeader("Authorization") String token, @PathVariable Long followingId) {
        Long followerId = jwtService.extractUserId(token); // JWT parsing
        followService.followUser(followerId, followingId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{followingId}")
    public ResponseEntity<Void> unfollow(@RequestHeader("Authorization") String token, @PathVariable Long followingId) {
        Long followerId = jwtService.extractUserId(token);
        followService.unfollowUser(followerId, followingId);
        return ResponseEntity.ok().build();
    }
}
