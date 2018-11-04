package hu.elte.PPSupply.repositories;

import org.springframework.stereotype.Repository;

import hu.elte.PPSupply.entities.Product;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{
    
}
