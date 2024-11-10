package org.example.kr.Models;

//import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

//@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product{
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private String address;

//    @ManyToOne
//    @JoinColumn(name = "provider_id")
    private Long providerId;

}