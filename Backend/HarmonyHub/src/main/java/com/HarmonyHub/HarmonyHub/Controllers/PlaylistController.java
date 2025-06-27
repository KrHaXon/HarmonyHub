package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Models.DTO.PlaylistDTO;
import com.HarmonyHub.HarmonyHub.Models.Playlist;
import com.HarmonyHub.HarmonyHub.Services.PlaylistService;
import com.HarmonyHub.HarmonyHub.Repository.UserRepository;
import com.HarmonyHub.HarmonyHub.Services.IMPL.JwtService;
import com.HarmonyHub.HarmonyHub.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.HarmonyHub.HarmonyHub.Repository.SongRepository;
import com.HarmonyHub.HarmonyHub.Models.Song;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    @Autowired
    private PlaylistService playlistService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private SongRepository songRepository;

    @GetMapping
    public List<PlaylistDTO> getAllPlaylists() {
        return playlistService.getAllPlaylists().stream()
                .map(PlaylistDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Playlist getPlaylistById(@PathVariable Long id) {
        return playlistService.getPlaylistById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));
    }

    @PostMapping
    public Playlist createPlaylist(@RequestBody Playlist playlist, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        Long userId = jwtService.extractUserId(token);
        User owner = userRepository.findById(userId).orElseThrow();
        playlist.setOwner(owner);
        return playlistService.createPlaylist(playlist);
    }

    @PostMapping("/{playlistId}/songs")
    public Playlist addSongToPlaylist(@PathVariable Long playlistId, @RequestBody SongIdRequest request) {
        Playlist playlist = playlistService.getPlaylistById(playlistId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));
        Song song = songRepository.findById(request.getSongId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));
        if (!playlist.getSongs().contains(song)) {
            playlist.getSongs().add(song);
            playlistService.createPlaylist(playlist); // save
        }
        return playlist;
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public Playlist removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        Playlist playlist = playlistService.getPlaylistById(playlistId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));
        Song song = songRepository.findById(songId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));
        playlist.getSongs().remove(song);
        playlistService.createPlaylist(playlist); // save
        return playlist;
    }

    @PutMapping("/{playlistId}/order")
    public Playlist reorderSongs(@PathVariable Long playlistId, @RequestBody SongOrderRequest request) {
        Playlist playlist = playlistService.getPlaylistById(playlistId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));
        List<Song> newOrder = new ArrayList<>();
        for (Long songId : request.getSongIds()) {
            Song song = songRepository.findById(songId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found: " + songId));
            newOrder.add(song);
        }
        playlist.setSongs(newOrder);
        playlistService.createPlaylist(playlist);
        return playlist;
    }
}

class SongIdRequest {
    private Long songId;
    public Long getSongId() { return songId; }
    public void setSongId(Long songId) { this.songId = songId; }
}

class SongOrderRequest {
    private List<Long> songIds;
    public List<Long> getSongIds() { return songIds; }
    public void setSongIds(List<Long> songIds) { this.songIds = songIds; }
} 