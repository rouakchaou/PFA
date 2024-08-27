package com.store.repository;

import com.store.model.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandRepository extends JpaRepository<Command,Long> {

    Command findCommandById(Long id);

    @Query("SELECT c FROM Command c WHERE c.delivery_person_id = :deliveryPersonId AND c.state = 'in progress'")
    List<Command> findByDpId(Long deliveryPersonId);

}
