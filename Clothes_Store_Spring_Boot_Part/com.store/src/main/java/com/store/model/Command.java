package com.store.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="command")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Command {
    @Id
    @SequenceGenerator(
            name="command_sequence",
            sequenceName = "command_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy =GenerationType.SEQUENCE,
            generator = "command_sequence"
    )
    private Long id;

    @Column(name = "user_id")
    private Long user_id;

    private String state;
    private Date date;
    private String adresse;
    private String town;
    private Long postal_code;
    private Long total_price;
    private Long phone_number;

    @Column(name = "delivery_person_id")
    private Long delivery_person_id;

//    @JsonIgnoreProperties("products")
//    @ManyToMany
//    @JoinTable(
//            name = "command_products",
//            joinColumns = @JoinColumn(name = "command_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id"))
//    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "command", cascade = CascadeType.ALL)
    private Set<CommandLine> command_lines = new HashSet<>();

    @Override
    public int hashCode() {
        return Objects.hash(id, user_id, date, adresse, postal_code, total_price);
    }

}
