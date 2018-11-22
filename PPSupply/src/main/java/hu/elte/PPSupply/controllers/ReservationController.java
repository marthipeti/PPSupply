package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.Reservation;
import hu.elte.PPSupply.repositories.ProductRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hu.elte.PPSupply.repositories.ReservationRepository;
import hu.elte.PPSupply.repositories.UserRepository;
import java.util.List;
import org.springframework.security.access.annotation.Secured;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Reservation>> getAll() {
        return ResponseEntity.ok(reservationRepository.findAll());
    } 
    
    @PostMapping("")
    public ResponseEntity<Reservation> post(@RequestBody Reservation reservation) {
        reservation.setId(null);
        if(!userRepository.existsById(reservation.getUser().getId())){
            return ResponseEntity.badRequest().build();
        }
        List<Product> prods = reservation.getProducts();
        for(Product p : prods){
            Optional<Product> oProd = productRepository.findById(p.getId());
            if(!oProd.isPresent()){
                return ResponseEntity.badRequest().build();
            }
            Product product = oProd.get();
            product.setQuantity(product.getQuantity()-1);
            if(product.getQuantity()<0){
                return ResponseEntity.badRequest().build();
            }
            productRepository.save(product);
        }
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> get(@PathVariable Integer id) {
        Optional<Reservation> oOrder = reservationRepository.findById(id);
        if (!oOrder.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        return ResponseEntity.ok(oOrder.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if (!oReservation.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        reservationRepository.delete(oReservation.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Reservation> put(@PathVariable Integer id,
                                           @RequestBody Reservation reservation) {
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if (!oReservation.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        reservation.setId(id);
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }
}