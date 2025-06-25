package com.HarmonyHub.HarmonyHub.Models.DTO;

import com.HarmonyHub.HarmonyHub.Models.Author;

public class AuthorDTO {
    private Long id;
    private String stageName;
    private String profileImageUrl;

    public AuthorDTO(Long id, String stageName, String profileImageUrl) {
        this.id = id;
        this.stageName = stageName;
        this.profileImageUrl = profileImageUrl;
    }
    public AuthorDTO(Author author) {
        this.id = author.getId();
        this.stageName = author.getStageName();
        this.profileImageUrl = author.getProfileImageUrl();
    }
    public Long getId() {
        return id;
    }

    public String getStageName() {
        return stageName;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}
