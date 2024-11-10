package org.example.kr.Repositotries;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.example.kr.Models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository  extends PagingAndSortingRepository<User,Long> {
    Optional<User> findById(Long id);

    List<User> findAll();

    User save(User user);

    void deleteById(Long id);

    User findByUsername(String username);
}
