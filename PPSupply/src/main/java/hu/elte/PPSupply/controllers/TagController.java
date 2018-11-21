package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Product;
import hu.elte.PPSupply.entities.Tag;
import hu.elte.PPSupply.repositories.ProductRepository;
import hu.elte.PPSupply.repositories.TagRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ProductRepository productRepository;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Tag>> getAll() {
        return ResponseEntity.ok(tagRepository.findAll());
    }
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Tag> post(@RequestBody Tag tag) {
        tag.setId(null);
        return ResponseEntity.ok(tagRepository.save(tag));
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Tag> delete(@PathVariable Integer id){
        Optional<Tag> oTag = tagRepository.findById(id);
        if(!oTag.isPresent()){
            return ResponseEntity.notFound().build();
        }
        if(getProductsByTag(id).equals(ResponseEntity.notFound().build())){
            return ResponseEntity.badRequest().build();
        }
        tagRepository.delete(oTag.get());
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{id}/products")
    public ResponseEntity<Iterable<Product>> getProductsByTag(@PathVariable Integer id) {
        Optional<Tag> oTag = tagRepository.findById(id);
        if (!oTag.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oTag.get().getProducts());
    }
}
