package hu.elte.PPSupply.repositories;

import org.springframework.data.repository.CrudRepository;
import hu.elte.PPSupply.entities.Tag;

public interface TagRepository extends CrudRepository<Tag, Integer> {
    
}
