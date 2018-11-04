package hu.elte.PPSupply.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import hu.elte.PPSupply.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{
    
}
