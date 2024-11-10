package org.example.kr.Controllers;

import org.example.kr.Models.Provider;
import org.example.kr.Services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @GetMapping
    public List<Provider> getAllProviders() {
        return providerService.getAllProviders();
    }
    @GetMapping("/search")
    public ResponseEntity<List<Provider>> getProvidersByName(@RequestParam String name) {
        List<Provider> providers = providerService.findByName(name);
        if (providers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        System.out.println(providers);
        return ResponseEntity.ok(providers);
    }

//    @GetMapping("/{id}")
//    public Provider getProviderById(@PathVariable Long id) {
//        return providerService.getProviderById(id);
//    }

    @PostMapping
    public Provider createProvider(@RequestBody Provider provider) {
        return providerService.saveProvider(provider);
    }

    @PutMapping("/{id}")
    public Provider updateProvider(@PathVariable Long id, @RequestBody Provider provider) {
        provider.setId(id);
        return providerService.saveProvider(provider);
    }

    @DeleteMapping("/{id}")
    public void deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
    }
}