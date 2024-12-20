//package org.example.kr.Repositotries;
//
//import org.example.kr.Models.Product;
//import org.springframework.data.repository.PagingAndSortingRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
//    List<Product> findAll();
//
//    Optional<Product> findById(Long id);
//
//    Product save(Product product);
//
//    void deleteById(Long id);
//}
package org.example.kr.Repositotries;

import org.example.kr.Models.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ProductRepository extends ReactiveCrudRepository<Product, Long> {
    Flux<Product> findAll();
}