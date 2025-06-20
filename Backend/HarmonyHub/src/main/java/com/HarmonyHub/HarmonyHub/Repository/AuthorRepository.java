package com.HarmonyHub.HarmonyHub.Repository;

import com.HarmonyHub.HarmonyHub.Models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
}
