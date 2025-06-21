package com.HarmonyHub.HarmonyHub.Models.DTO;

import com.HarmonyHub.HarmonyHub.Models.Song;

public class SongDTO {
    private Long id;
    private String title;
    private String artist;
    private int duration;
    private String cover;
    private String audioUrl;

    public SongDTO(Song song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.artist = song.getArtist();
        this.duration = song.getDuration();
        this.cover = song.getCover();
        this.audioUrl = song.getAudioUrl();
    }

    // Gettery
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public int getDuration() {
        return duration;
    }

    public String getCover() {
        return cover;
    }

    public String getAudioUrl() {
        return audioUrl;
    }
}
