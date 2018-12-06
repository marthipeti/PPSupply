package hu.elte.PPSupply.controllers;

import hu.elte.PPSupply.entities.Reservation;
import hu.elte.PPSupply.entities.User;
import hu.elte.PPSupply.repositories.ReservationRepository;
import hu.elte.PPSupply.repositories.UserRepository;
import hu.elte.PPSupply.services.AuthenticatedUser;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticatedUser authenticatedUser;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<User>> getAll() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/register")
    public ResponseEntity<User> post(@RequestBody User user) {
        Optional<User> oUser = userRepository.findByUserName(user.getUserName());
        if (oUser.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        user.setId(null);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.ROLE_USER);
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_USER" })
    public ResponseEntity<User> get(@PathVariable Integer id) {
        User requestUser = authenticatedUser.getUser();
        if(User.Role.ROLE_ADMIN.equals(requestUser.getRole())){
            Optional<User> oUser = userRepository.findById(id);
            if (!oUser.isPresent()) {
                return ResponseEntity.notFound().build();   
            }
            return ResponseEntity.ok(oUser.get());
        }else{
            if(Objects.equals(requestUser.getId(), id)){
                return ResponseEntity.ok(requestUser);
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        userRepository.delete(oUser.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_USER" })
    public ResponseEntity<User> put(@PathVariable Integer id, @RequestBody User user) {
        User requestUser = authenticatedUser.getUser();
        if(User.Role.ROLE_ADMIN.equals(requestUser.getRole())){
            Optional<User> oUser = userRepository.findById(id);
            if (!oUser.isPresent()) {
                return ResponseEntity.notFound().build();   
            }
            user.setId(id);
            return ResponseEntity.ok(userRepository.save(user));
        }else{
            if(Objects.equals(requestUser.getId(), id) && 
                    requestUser.getRole().equals(user.getRole())){
                user.setId(id);
                return ResponseEntity.ok(userRepository.save(user));
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}/reservations")
    @Secured({ "ROLE_ADMIN", "ROLE_USER" })
    public ResponseEntity<Iterable<Reservation>> getReservationsByUserId(@PathVariable Integer id){
        User requestUser = authenticatedUser.getUser();
        if(User.Role.ROLE_ADMIN.equals(requestUser.getRole())){
            Optional<User> oUser = userRepository.findById(id);
            if (!oUser.isPresent()) {
                return ResponseEntity.notFound().build();   
            }
            Iterable<Reservation> reservations = reservationRepository.findAllByUserId(id);
            return ResponseEntity.ok(reservations);
        }else{
            if(Objects.equals(requestUser.getId(), id)){
                Iterable<Reservation> reservations = reservationRepository.findAllByUserId(id);
                return ResponseEntity.ok(reservations);
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
}