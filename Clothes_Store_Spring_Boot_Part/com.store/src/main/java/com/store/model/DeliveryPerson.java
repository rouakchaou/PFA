package com.store.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="delivery_person")
public class DeliveryPerson {
    @Id
    @SequenceGenerator(
            name="delivery_person_sequence",
            sequenceName = "delivery_person_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "delivery_person_sequence"
    )
    private Long id;
    private String name;
    private String surname;
    private String emailId;
    private String password;
    private String phoneNumber;
    private String town;
//    private int deliveries_per_day;
}
