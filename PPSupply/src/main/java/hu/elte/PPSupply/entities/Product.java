package hu.elte.PPSupply.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;
    
    @Column
    @NotNull
    private String name;
    
    @Column
    @NotNull
    private Integer quantity;
    
    @Column
    @NotNull
    private String description;
    
    @ManyToMany
    @JoinTable
    private List<Tag> tags;
    
    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    private List<Reservation> reservations;
    
    public void setQuantity(Integer quantity){
        this.quantity = quantity;
    }
    
    
}
