package com.HarmonyHub.HarmonyHub.Services;

import com.HarmonyHub.HarmonyHub.Models.Playlist;
import java.util.List;
import java.util.Optional;

public interface PlaylistService {
    Playlist createPlaylist(Playlist playlist);
    Optional<Playlist> getPlaylistById(Long id);
    List<Playlist> getAllPlaylists();
    Playlist updatePlaylist(Long id, Playlist updatedPlaylist);
    void deletePlaylist(Long id);
} 