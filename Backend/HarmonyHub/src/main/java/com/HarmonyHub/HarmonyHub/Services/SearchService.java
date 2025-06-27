package com.HarmonyHub.HarmonyHub.Services;

import com.HarmonyHub.HarmonyHub.Models.DTO.SearchResultDto;

public interface SearchService {
    SearchResultDto threadedSearch(String query);
}
