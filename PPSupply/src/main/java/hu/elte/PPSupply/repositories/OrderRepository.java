package hu.elte.PPSupply.repositories;


import hu.elte.PPSupply.entities.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
    
}
