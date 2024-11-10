package org.example.kr.Models;

//import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

//@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Provider {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String detaiils;

//    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Long> productsIds;

}