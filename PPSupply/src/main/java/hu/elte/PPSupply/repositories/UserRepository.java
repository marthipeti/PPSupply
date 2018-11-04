package hu.elte.PPSupply.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import hu.elte.PPSupply.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    
}
