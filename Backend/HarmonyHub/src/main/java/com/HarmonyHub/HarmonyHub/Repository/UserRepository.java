package com.HarmonyHub.HarmonyHub.Repository;

import com.HarmonyHub.HarmonyHub.Models.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);
    Optional<User> findByEmail(String email);
    @EntityGraph(attributePaths = {"playlists", "playlists.songs"})
    List<User> findByUserNameContainingIgnoreCase(String query);
}
