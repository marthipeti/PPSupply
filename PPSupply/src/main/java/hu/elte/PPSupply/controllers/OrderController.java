package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Order;
import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.repositories.OrderRepository;
//import hu.elte.PPSupply.repositories.TagRepository;
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

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    //@Autowired
    //private TagRepository tagRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Order>> getAll() {
        return ResponseEntity.ok(orderRepository.findAll());
    } 
    
    @PostMapping("")
    public ResponseEntity<Order> post(@RequestBody Order order) {
        order.setId(null);
        return ResponseEntity.ok(orderRepository.save(order));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Integer id) {
        Optional<Order> oOrder = orderRepository.findById(id);
        if (!oOrder.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oOrder.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Order> oOrder = orderRepository.findById(id);
        if (!oOrder.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        orderRepository.delete(oOrder.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Order> put(@PathVariable Integer id,
                                           @RequestBody Order order) {
        Optional<Order> oReservation = orderRepository.findById(id);
        if (!oReservation.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        order.setId(id);
        return ResponseEntity.ok(orderRepository.save(order));
    }
    
    @GetMapping("/{id}/product")
    public ResponseEntity<Product> getProd(@PathVariable Integer id) {
        Optional<Order> oOrder = orderRepository.findById(id);
        if (!oOrder.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(oOrder.get().getProduct());
    }
    
    
}