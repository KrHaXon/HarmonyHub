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

    // Konstruktor
    public UserDTO(Long id, String userName, String email, String profileImageUrl, List<PlaylistDTO> playlists) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.playlists = playlists;
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
        return playlists.stream()
                .map(playlist -> {
                    // Konwersja listy Song -> List<SongDTO>
                    List<SongDTO> songDTOs = playlist.getSongs().stream()
                            .map(song -> new SongDTO(song))
                            .collect(Collectors.toList());

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
}
