package com.HarmonyHub.HarmonyHub.Models.DTO;



import com.HarmonyHub.HarmonyHub.Models.Author;
import com.HarmonyHub.HarmonyHub.Models.Song;
import com.HarmonyHub.HarmonyHub.Models.User;

import java.util.List;

public class SearchResultDto {
    private List<User> users;
    private List<Song> songs;
    private List<Author> authors;

    public SearchResultDto(List<User> users, List<Song> songs, List<Author> authors) {
        this.users = users;
        this.songs = songs;
        this.authors = authors;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public List<Author> getAuthors() {
        return authors;
    }
}

