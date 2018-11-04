package hu.elte.PPSupply.repositories;

import org.springframework.stereotype.Repository;
import hu.elte.PPSupply.entities.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;


@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
}
