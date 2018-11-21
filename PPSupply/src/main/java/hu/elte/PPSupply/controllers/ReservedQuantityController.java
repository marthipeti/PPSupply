package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.Reservation;
import hu.elte.PPSupply.entities.ReservedQuantity;
import hu.elte.PPSupply.repositories.ProductRepository;
import hu.elte.PPSupply.repositories.ReservationRepository;
import hu.elte.PPSupply.repositories.ReservedQuantityRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/reservedquantity")
public class ReservedQuantityController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ReservedQuantityRepository reservedQuantityRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<ReservedQuantity>> getAll() {
        return ResponseEntity.ok(reservedQuantityRepository.findAll());
    }
    
    @PostMapping("")
    public ResponseEntity<ReservedQuantity> post(@RequestBody ReservedQuantity reservedQuantity ) {
        reservedQuantity.setId(null);
        Optional<Product> oProduct = productRepository.findById(reservedQuantity.getProductId());
        if (!oProduct.isPresent()) {
            return ResponseEntity.notFound().build();   
        }else{
            Product product = oProduct.get();
            product.setQuantity(reservedQuantity.getReservedQuantity());
            productRepository.save(product);
        }
        
        
        
        return ResponseEntity.ok(reservedQuantityRepository.save(reservedQuantity));
    }
    
    
    
    
}
