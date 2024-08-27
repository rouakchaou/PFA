package com.store.service;

import com.store.model.Admin;
import com.store.model.DeliveryPerson;
import com.store.repository.AdminRepository;
import com.store.repository.DeliveryPersonRepository;
import org.springframework.stereotype.Service;
import com.store.model.Command;
import java.util.List;

@Service
public class DeliveryPersonService {
    public DeliveryPersonService(DeliveryPersonRepository deliveryPersonRepository){
    this.deliveryPersonRepository = deliveryPersonRepository;
}

    DeliveryPersonRepository deliveryPersonRepository;

    public DeliveryPerson register(DeliveryPerson person){ return deliveryPersonRepository.save(person);}

    public DeliveryPerson fetchByEmail(String email){
        DeliveryPerson person = deliveryPersonRepository.findByEmailId(email);
        return person;
    }
    public DeliveryPerson fetchByEmailandPassword(String email,String password){
        DeliveryPerson person = deliveryPersonRepository.findByEmailIdAndPassword(email,password);
        return person;
    }
//    public DeliveryPerson getById(Long Id){
//        return deliveryPersonRepository.findDeliveryPersonById(Id);
//    }
//    public DeliveryPerson updateAdminById(Long Id, DeliveryPerson newPerson) {
//        return deliveryPersonRepository.findById(Id)
//                .map(person -> {
//                    person.setName(newPerson.getName());
//                    person.setSurname(newPerson.getSurname());
//                    person.setEmailId(newPerson.getEmailId());
//                    person.setPassword(newPerson.getPassword());
//                    person.setPhoneNumber(newPerson.getPhoneNumber());
//                    person.setTown(newPerson.getTown());
//                    person.setDeliveries_per_day(newPerson.getDeliveries_per_day());
//                    return deliveryPersonRepository.save(person);
//                })
//                .orElseThrow(() -> new RuntimeException("Delivery Person not found with id " + Id));
//    }

    public List<DeliveryPerson> getAllDeliveryPersons() {
        return deliveryPersonRepository.findAll();
    }

    public List<DeliveryPerson> getDeliveryPersonsByTown(String town) {
        return deliveryPersonRepository.findDeliveryPersonByTown(town);
    }

}