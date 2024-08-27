package com.store.repository;

import com.store.model.DeliveryPerson;
import com.store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson,Long> {

    public DeliveryPerson findByEmailId(String email);
    public DeliveryPerson findByEmailIdAndPassword(String email, String password);
    DeliveryPerson findDeliveryPersonById(Long id);
    List<DeliveryPerson> findDeliveryPersonByTown(String town);

}
