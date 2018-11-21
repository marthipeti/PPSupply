package hu.elte.PPSupply.repositories;

import hu.elte.PPSupply.entities.Product;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{
        List<Product> findAllByName(String name);
}
