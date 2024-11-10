package org.example.kr.Services;

import org.example.kr.Models.Provider;
import org.example.kr.Repositotries.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ProviderService {
    @Autowired
    private ProviderRepository providerRepository;

    public Flux<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public Mono<Provider> getProviderById(Long id) {
        return providerRepository.findById(id);
    }

    public Mono<Provider> saveProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    public void deleteProvider(Long id) {
        providerRepository.deleteById(id);
    }

    }


