package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Models.DTO.AuthorDTO;
import com.HarmonyHub.HarmonyHub.Models.DTO.SearchResultDto;
import com.HarmonyHub.HarmonyHub.Models.DTO.SongDTO;
import com.HarmonyHub.HarmonyHub.Models.DTO.UserDTO;
import com.HarmonyHub.HarmonyHub.Repository.AuthorRepository;
import com.HarmonyHub.HarmonyHub.Repository.SongRepository;
import com.HarmonyHub.HarmonyHub.Repository.UserRepository;
import com.HarmonyHub.HarmonyHub.Services.SearchService;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class SearchServiceImpl implements SearchService {
    private final UserRepository userRepository;
    private final SongRepository songRepository;
    private final AuthorRepository authorRepository;
    public SearchServiceImpl(UserRepository userRepository, SongRepository songRepository, AuthorRepository authorRepository) {
        this.userRepository = userRepository;
        this.songRepository = songRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public SearchResultDto threadedSearch(String query) {

        CompletableFuture<List<SongDTO>> songsFuture = CompletableFuture.supplyAsync(() ->
                songRepository.searchByTitleOrAuthor(query)
                        .stream()
                        .map(SongDTO::new)
                        .collect(Collectors.toList())
        );

        CompletableFuture<List<UserDTO>> usersFuture = CompletableFuture.supplyAsync(() ->
                userRepository.findByUserNameContainingIgnoreCase(query)
                        .stream()
                        .map(UserDTO::new)
                        .collect(Collectors.toList())
        );

        CompletableFuture<List<AuthorDTO>> authorsFuture = CompletableFuture.supplyAsync(() ->
                authorRepository.findByStageNameContainingIgnoreCase(query)
                        .stream()
                        .map(AuthorDTO::new)
                        .collect(Collectors.toList())
        );

        CompletableFuture.allOf(songsFuture, usersFuture, authorsFuture).join();

        try {
            return new SearchResultDto(
                    usersFuture.get(),
                    songsFuture.get(),
                    authorsFuture.get()
            );
        } catch (Exception e) {
            throw new RuntimeException("Error during search", e);
        }
    }
}

