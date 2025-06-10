package com.HarmonyHub.HarmonyHub.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ListeningSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;

    @ManyToOne
    private Song song;

    private LocalDateTime timestamp;

    @Transient
    private Thread streamingThread;
}
