package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Order;
import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.repositories.OrderRepository;
import hu.elte.PPSupply.repositories.ProductRepository;
import java.util.List;
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
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Product>> getAll() {
        Iterable<Product> machines = productRepository.findAll();
        return ResponseEntity.ok(machines);
    }
    
    @PostMapping("")
    public ResponseEntity<Product> post(@RequestBody Product prod) {
        prod.setId(null);
        return ResponseEntity.ok(productRepository.save(prod));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Integer id) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oProd.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        productRepository.delete(oProd.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> put(@PathVariable Integer id,
                                              @RequestBody Product prod) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        prod.setId(id);
        return ResponseEntity.ok(productRepository.save(prod));
    }
    
    @GetMapping("/{id}/orders")
    public ResponseEntity<Iterable<Order>> getOrders(@PathVariable Integer id) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(oProd.get().getOrders());
    }
    
    @PostMapping("/{id}/orders")
    public ResponseEntity<Order> postOrders(@PathVariable Integer id,
                                                        @RequestBody Order order) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        order.setId(null);
        order.setMachine(oProd.get());
        return ResponseEntity.ok(orderRepository.save(order));
    }
    
    @PutMapping("/{id}/orderss")
    public ResponseEntity<Iterable<Order>> putOrders(@PathVariable Integer id,
                                                                 @RequestBody List<Order> orders) {
        Optional<Product> oProd = productRepository.findById(id);
        if (!oProd.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        for (Order order: orders) {
            Optional<Order> oOrder  = orderRepository.findById(order.getId());
            if (!oOrder.isPresent()) {
                continue;
            }
            
            oOrder.get().setMachine(oProd.get());
            orderRepository.save(oOrder.get());
        }
        
        return ResponseEntity.ok(oProd.get().getOrders());
    }
}
