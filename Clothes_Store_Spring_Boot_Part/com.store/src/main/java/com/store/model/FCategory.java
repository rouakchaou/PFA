package com.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="category")
public class FCategory {
    @Id
    @SequenceGenerator(
            name="category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy =GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;
    private String name;

    @OneToMany(mappedBy = "fcategory_id", cascade = CascadeType.ALL)
    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "categories", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("categories")
    private Set<SCategory> subCategories = new HashSet<>();

}
