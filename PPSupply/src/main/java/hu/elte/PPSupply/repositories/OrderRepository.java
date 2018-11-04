package hu.elte.PPSupply.repositories;

import org.springframework.data.repository.CrudRepository;
import hu.elte.PPSupply.entities.Order;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
    
}
