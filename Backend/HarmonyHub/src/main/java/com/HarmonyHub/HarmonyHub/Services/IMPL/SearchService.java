package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Models.Author;
import com.HarmonyHub.HarmonyHub.Models.DTO.SearchResultDto;
import com.HarmonyHub.HarmonyHub.Models.Song;
import com.HarmonyHub.HarmonyHub.Models.User;
import com.HarmonyHub.HarmonyHub.Services.AuthorService;
import com.HarmonyHub.HarmonyHub.Services.SongService;
import com.HarmonyHub.HarmonyHub.Services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.*;

@Service
public class SearchService {

    private final ExecutorService executor = Executors.newFixedThreadPool(3);

    private final UserService userService;
    private final SongService songService;
    private final AuthorService authorService;

    public SearchService(UserService userService, SongService songService, AuthorService authorService) {
        this.userService = userService;
        this.songService = songService;
        this.authorService = authorService;
    }

    public SearchResultDto threadedSearch(String query) throws InterruptedException, ExecutionException {
        Callable<List<User>> userTask = () -> userService.searchUsers(query);
        Callable<List<Song>> songTask = () -> songService.searchSongs(query);
        Callable<List<Author>> authorTask = () -> authorService.searchAuthors(query);

        Future<List<User>> userFuture = executor.submit(userTask);
        Future<List<Song>> songFuture = executor.submit(songTask);
        Future<List<Author>> authorFuture = executor.submit(authorTask);

        List<User> users = userFuture.get();     // blokuje, aż wynik będzie gotowy
        List<Song> songs = songFuture.get();
        List<Author> authors = authorFuture.get();

        return new SearchResultDto(users, songs, authors);
    }
}
