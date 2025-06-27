package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Models.DTO.SearchResultDto;
import com.HarmonyHub.HarmonyHub.Services.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    private SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<SearchResultDto> search(@RequestParam String query) {
        System.out.println("Search query: " + query);
        SearchResultDto result = searchService.threadedSearch(query);
        return ResponseEntity.ok(result);
    }
}
