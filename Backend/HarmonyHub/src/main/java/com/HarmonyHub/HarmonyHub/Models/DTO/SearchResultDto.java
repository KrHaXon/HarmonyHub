package com.HarmonyHub.HarmonyHub.Models.DTO;



import com.HarmonyHub.HarmonyHub.Models.Author;
import com.HarmonyHub.HarmonyHub.Models.Song;
import com.HarmonyHub.HarmonyHub.Models.User;

import java.util.List;

public class SearchResultDto {
    private List<UserDTO> users;
    private List<SongDTO> songs;
    private List<AuthorDTO> authors;

    public SearchResultDto(List<UserDTO> users, List<SongDTO> songs, List<AuthorDTO> authors) {
        this.users = users;
        this.songs = songs;
        this.authors = authors;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }

    public List<SongDTO> getSongs() {
        return songs;
    }

    public void setSongs(List<SongDTO> songs) {
        this.songs = songs;
    }

    public List<AuthorDTO> getAuthors() {
        return authors;
    }

    public void setAuthors(List<AuthorDTO> authors) {
        this.authors = authors;
    }
}

