package com.HarmonyHub.HarmonyHub.Models.DTO;

import com.HarmonyHub.HarmonyHub.Models.Playlist;
import com.HarmonyHub.HarmonyHub.Models.User;

import java.util.List;
import java.util.stream.Collectors;


public class UserDTO {
    private Long id;
    private String userName;
    private String email;
    private String profileImageUrl;
    private List<PlaylistDTO> playlists;
    private boolean isFollowed;

    // Konstruktor
    public UserDTO(Long id, String userName, String email, String profileImageUrl, List<PlaylistDTO> playlists) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.playlists = playlists;
    }
    public UserDTO(User user) {
        if (user == null) return;
        this.id = user.getId();
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.profileImageUrl = user.getProfileImageUrl();
        this.playlists = convertToPlaylistDTOs(user.getPlaylists());

    }
    public UserDTO() {
        // domyślny konstruktor
    }
    // Gettery
    public Long getId() { return id; }
    public String getUserName() { return userName; }
    public String getEmail() { return email; }
    public String getProfileImageUrl() { return profileImageUrl; }
    public List<PlaylistDTO> getPlaylists() { return playlists; }
    private int followersCount;
    private int followingCount;

    public User toUser() {
        User user = new User();
        user.setUserName(this.getUserName());
        user.setEmail(this.getEmail());
        user.setProfileImageUrl(this.getProfileImageUrl());
        return user;
    }
    public static List<PlaylistDTO> convertToPlaylistDTOs(List<Playlist> playlists) {
        if (playlists == null) {
            return List.of();
        }

        return playlists.stream()
                .map(playlist -> {
                    List<SongDTO> songDTOs = playlist.getSongs() != null
                            ? playlist.getSongs().stream().map(SongDTO::new).collect(Collectors.toList())
                            : List.of();

                    return new PlaylistDTO(
                            playlist.getId(),
                            playlist.getTitle(),
                            playlist.getDescription(),
                            playlist.getCoverImage(),
                            songDTOs
                    );
                })
                .collect(Collectors.toList());
    }
    public int getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(int followersCount) {
        this.followersCount = followersCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }
    public boolean getIsFollowed() {
        return isFollowed;
    }

    public void setIsFollowed(boolean isFollowed) {
        this.isFollowed = isFollowed;
    }
}
