package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Models.User;
import com.HarmonyHub.HarmonyHub.Repository.UserRepository;
import com.HarmonyHub.HarmonyHub.Services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImpl implements FollowService {
    private final UserRepository userRepository;
    @Autowired
    public FollowServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void followUser(Long followerId, Long followingId) {
        if (followerId.equals(followingId)) {
            throw new IllegalArgumentException("Nie możesz obserwować samego siebie");
        }

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika: follower"));
        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika: following"));

        if (!following.getFollowers().contains(follower)) {
            following.getFollowers().add(follower);
            userRepository.save(following);
        }
    }

    @Override
    public void unfollowUser(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika: follower"));
        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika: following"));

        if (following.getFollowers().contains(follower)) {
            following.getFollowers().remove(follower);
            userRepository.save(following);
        }
    }
}
