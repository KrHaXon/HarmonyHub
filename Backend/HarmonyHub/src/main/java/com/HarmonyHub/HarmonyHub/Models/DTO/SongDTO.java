package com.HarmonyHub.HarmonyHub.Models.DTO;

import com.HarmonyHub.HarmonyHub.Models.Author;
import com.HarmonyHub.HarmonyHub.Models.Song;

public class SongDTO {
    private Long id;
    private String title;
    private Author author;
    private int duration;
    private String cover;
    private String audioUrl;

    public SongDTO(Song song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.author = song.getAuthor();
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

    public Author getAuthor() {
        return author;
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
