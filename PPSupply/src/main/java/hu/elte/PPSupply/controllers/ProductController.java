package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.Reservation;
import hu.elte.PPSupply.entities.Tag;
import hu.elte.PPSupply.entities.User;
import hu.elte.PPSupply.repositories.ProductRepository;
import hu.elte.PPSupply.repositories.TagRepository;
import hu.elte.PPSupply.services.AuthenticatedUser;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TagRepository tagRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Product>> getAll() {
        Iterable<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Product> post(@RequestBody Product prod) {
        prod.setId(null);
        if (prod.getQuantity() < 0 || !tagExists(prod)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productRepository.save(prod));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Integer id) {
        Optional<Product> oProduct = productRepository.findById(id);
        if (!oProduct.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        return ResponseEntity.ok(oProduct.get());
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        productRepository.delete(oProd.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Product> put(@PathVariable Integer id,
                                              @RequestBody Product prod) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if (prod.getQuantity() < 0 || !tagExists(prod)){
            return ResponseEntity.badRequest().build();
        }
        
        prod.setId(id);
        return ResponseEntity.ok(productRepository.save(prod));
    }
    
    @GetMapping("/{id}/reservations")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Reservation>> getReservations(@PathVariable Integer id) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(oProd.get().getReservations());
    }
    
    public boolean tagExists(Product prod){
        if(prod.getTags() == null){
            return true;
        }else{
            for(Tag t : prod.getTags()){
                if(!tagRepository.existsById(t.getId())){
                    return false;
                }
            }
        }
        return true;
    }
}
