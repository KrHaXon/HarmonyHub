package com.HarmonyHub.HarmonyHub.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@NoArgsConstructor
@Getter
@Setter
@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    private User FromUser;

    @ManyToOne
    private User ToUser;

    @Enumerated(EnumType.STRING)
    private Statuses Status = Statuses.PENDING;

    public enum Statuses {
        PENDING, ACCEPTED, REJECTED
    }


}
