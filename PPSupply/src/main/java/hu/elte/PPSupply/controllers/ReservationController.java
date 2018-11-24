package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.Reservation;
import hu.elte.PPSupply.entities.User;
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
import hu.elte.PPSupply.services.AuthenticatedUser;
import java.util.ArrayList;
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
    @Autowired
    private AuthenticatedUser authenticatedUser;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Reservation>> getAll() {
        return ResponseEntity.ok(reservationRepository.findAll());
    } 
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN", "ROLE_USER" })
    public ResponseEntity<Reservation> post(@RequestBody Reservation reservation) {
        reservation.setId(null);
        if(!userRepository.existsById(reservation.getUser().getId())){
            return ResponseEntity.badRequest().build();
        }
        for(Product prod : reservation.getProducts()){
            if(!productRepository.existsById(prod.getId())){
                return ResponseEntity.badRequest().build();
            }
        }
        ArrayList<Integer> orderedId = new ArrayList<>(reservation.getOrderedQuantity().keySet());
        for(Integer id : orderedId){
            Optional<Product> oProd = productRepository.findById(id);
            Integer orderedQuantity = reservation.getOrderedQuantity().get(id);
            List<Product> reservationProducts = reservation.getProducts();
            List<Integer> reservationId = new ArrayList<>();
            for(Product prod : reservationProducts){
                if(prod.getId() == null){
                    return ResponseEntity.badRequest().build();
                }
                reservationId.add(prod.getId());
            }
            if(!oProd.isPresent() || !reservationId.contains(id) || orderedQuantity<1 || orderedQuantity>oProd.get().getQuantity()){
                return ResponseEntity.badRequest().build();
            }
            Product product = oProd.get();
            product.setQuantity(product.getQuantity()-reservation.getOrderedQuantity().get(id));
            productRepository.save(product);
        }
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }
    
    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Reservation> get(@PathVariable Integer id) {
        Optional<Reservation> oOrder = reservationRepository.findById(id);
        if (!oOrder.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        return ResponseEntity.ok(oOrder.get());
    }
    
    @DeleteMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity delete(@PathVariable Integer id) {
        User requestUser = authenticatedUser.getUser();
        if(User.Role.ROLE_ADMIN.equals(requestUser.getRole())){
            Optional<Reservation> oReservation = reservationRepository.findById(id);
            if (!oReservation.isPresent()) {
                return ResponseEntity.notFound().build();   
            }
            reservationRepository.delete(oReservation.get());
            return ResponseEntity.ok().build();
        }else{
            List<Reservation> reservations = reservationRepository.findAllByUserId(requestUser.getId());
            for(Reservation res : reservations){
                if(res != null && res.getId().equals(id)){
                    reservationRepository.delete(res);
                    return ResponseEntity.ok().build();
                }
            }
            return ResponseEntity.badRequest().build();
        }
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