package com.HarmonyHub.HarmonyHub.Services;

import com.HarmonyHub.HarmonyHub.Models.Song;
import java.util.List;
import java.util.Optional;

public interface SongService {
    Song createSong(Song song);
    Optional<Song> getSongById(Long id);
    List<Song> getAllSongs();
    Song updateSong(Long id, Song updatedSong);
    void deleteSong(Long id);

    List<Song> searchSongs(String query);
} 