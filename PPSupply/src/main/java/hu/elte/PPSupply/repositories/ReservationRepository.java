package hu.elte.PPSupply.repositories;

import hu.elte.PPSupply.entities.Reservation;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
    List<Reservation> findAllByUserId(Integer id);

}