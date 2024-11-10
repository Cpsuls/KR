package org.example.kr.Repositotries;

import org.example.kr.Models.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ProviderRepository extends PagingAndSortingRepository<Provider,Long> {
    List<Provider> findAll();

    Optional<Provider> findById(Long id);

    Provider save(Provider provider);

    void deleteById(Long id);

    List<Provider> findByNameContainingIgnoreCase(String name);
}
