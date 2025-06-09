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
    private Long Id;
    @ManyToOne
    private User User;

    @ManyToOne
    private Song Song;

    private LocalDateTime Timestamp;

    @Transient
    private Thread streamingThread;
}
