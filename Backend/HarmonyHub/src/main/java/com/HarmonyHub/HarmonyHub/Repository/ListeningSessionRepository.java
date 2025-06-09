package com.HarmonyHub.HarmonyHub.Repository;

import com.HarmonyHub.HarmonyHub.Models.ListeningSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningSessionRepository extends JpaRepository<ListeningSession, Long> {
    List<ListeningSession> findByUserId(Long userId);
}
