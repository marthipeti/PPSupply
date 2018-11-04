package hu.elte.PPSupply.repositories;

import org.springframework.stereotype.Repository;
import hu.elte.PPSupply.entities.User;
import org.springframework.data.repository.CrudRepository;


@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    
}
