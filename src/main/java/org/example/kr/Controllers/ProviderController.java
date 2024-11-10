package org.example.kr.Controllers;

import org.example.kr.Models.Provider;
import org.example.kr.Services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @GetMapping("/{id}")
    public Mono<Provider> getInfo(@PathVariable Long id){
        return providerService.getProviderById(id);
    }
}