package com.store.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="souscategory")

public class SCategory {
    @Id
    @SequenceGenerator(
            name="souscategory_sequence",
            sequenceName = "souscategory_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy =GenerationType.SEQUENCE,
            generator = "souscategory_sequence"
    )
    private Long id;
    private String name;

    @OneToMany(mappedBy = "scategory_id", cascade = CascadeType.ALL)
    private Set<Product> products = new HashSet<>();

    @JsonIgnoreProperties("scategories")
    @ManyToMany
    @JoinTable(
            name = "category_subcategory",
            joinColumns = @JoinColumn(name = "subcategory_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<FCategory> categories = new HashSet<>();

}
