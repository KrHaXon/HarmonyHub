package com.HarmonyHub.HarmonyHub.Services;

import com.HarmonyHub.HarmonyHub.Models.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    Author createAuthor(Author author);
    Optional<Author> getAuthorById(Long id);
    List<Author> getAllAuthors();
    Author updateAuthor(Long id, Author updatedAuthor);
    void deleteAuthor(Long id);

    List<Author> searchAuthors(String query);
}
