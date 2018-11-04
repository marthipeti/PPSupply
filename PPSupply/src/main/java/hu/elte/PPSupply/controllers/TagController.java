package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Tag;
import hu.elte.PPSupply.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagRepository tagRepository;
    
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
}
