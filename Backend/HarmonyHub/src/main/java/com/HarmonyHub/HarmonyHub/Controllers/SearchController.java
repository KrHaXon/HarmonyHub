package com.HarmonyHub.HarmonyHub.Controllers;

import com.HarmonyHub.HarmonyHub.Models.DTO.SearchResultDto;
import com.HarmonyHub.HarmonyHub.Services.IMPL.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<SearchResultDto> search(@RequestParam String query) throws Exception {
        return ResponseEntity.ok(searchService.threadedSearch(query));
    }
}
