package com.HarmonyHub.HarmonyHub.Models.DTO;

import com.HarmonyHub.HarmonyHub.Models.Playlist;

import java.util.List;
import java.util.stream.Collectors;

public class PlaylistDTO {
    private Long id;
    private String title;
    private String description;
    private String coverImage;
    private List<SongDTO> songs;

    public PlaylistDTO(Long id, String title, String description, String coverImage, List<SongDTO> songs) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.coverImage = coverImage;
        this.songs = songs;
    }
    public PlaylistDTO(Playlist playlist) {
        this.id = playlist.getId();
        this.title = playlist.getTitle();
        this.description = playlist.getDescription();
        this.coverImage = playlist.getCoverImage();
        this.songs = playlist.getSongs() != null
                ? playlist.getSongs().stream()
                .map(SongDTO::new)
                .collect(Collectors.toList())
                : null;
    }
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public List<SongDTO> getSongs() {
        return songs;
    }

    public void setSongs(List<SongDTO> songs) {
        this.songs = songs;
    }
}
