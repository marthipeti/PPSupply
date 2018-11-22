package hu.elte.PPSupply.repositories;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.ReservedQuantity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservedQuantityRepository extends CrudRepository<ReservedQuantity, Integer> {

    public void save(Product p);

}
