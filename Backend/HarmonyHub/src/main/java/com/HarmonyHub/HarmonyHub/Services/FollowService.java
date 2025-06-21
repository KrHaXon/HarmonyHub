package com.HarmonyHub.HarmonyHub.Services;

public interface FollowService {
    void followUser(Long followerId, Long followingId);
    void unfollowUser(Long followerId, Long followingId);
}
