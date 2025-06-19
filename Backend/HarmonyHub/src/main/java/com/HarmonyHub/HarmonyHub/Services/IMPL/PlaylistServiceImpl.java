package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Models.Playlist;
import com.HarmonyHub.HarmonyHub.Repository.PlaylistRepository;
import com.HarmonyHub.HarmonyHub.Services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistServiceImpl implements PlaylistService {
    @Autowired
    private PlaylistRepository playlistRepository;

    @Override
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public Optional<Playlist> getPlaylistById(Long id) {
        return playlistRepository.findById(id);
    }

    @Override
    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    @Override
    public Playlist updatePlaylist(Long id, Playlist updatedPlaylist) {
        updatedPlaylist.setId(id);
        return playlistRepository.save(updatedPlaylist);
    }

    @Override
    public void deletePlaylist(Long id) {
        playlistRepository.deleteById(id);
    }
} 