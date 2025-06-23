package com.HarmonyHub.HarmonyHub.Repository;

import com.HarmonyHub.HarmonyHub.Models.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    List<Song> findByTitleContainingIgnoreCaseOrAuthor_StageNameContainingIgnoreCase(String query, String query1);
}
