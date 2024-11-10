package org.example.kr.Repositotries;

import org.example.kr.Models.Provider;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProviderRepository extends ReactiveCrudRepository<Provider,Long> {
    Flux<Provider> findAll();

    Mono<Provider> findById(Long id);

}
