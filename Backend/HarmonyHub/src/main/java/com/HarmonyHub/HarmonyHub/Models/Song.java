package com.HarmonyHub.HarmonyHub.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private int duration; // sekundy
    private String cover;
    private String audioUrl; // link do pliku audio

    @ManyToMany(mappedBy = "songs")
    @JsonIgnore
    private Set<Playlist> playlists;

    public void setId(Long id) {
        this.id = id;
    }
}
