package hu.elte.PPSupply.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
    
    @Column
    @NotNull
    private String image;
    
    @Column
    private Integer addToCart;
    
    @ManyToMany
    @JoinTable
    private List<Tag> tags;
    
    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    private List<Reservation> reservations;
    
//    @OneToMany(mappedBy = "reservedQuantity")
//    @JsonIgnore
//    private List<ReservedQuantity> reservedQuantities;
    
    
    public void setQuantity(Integer quantity){
        this.quantity = quantity;
    }
    
    public String getName(){
        return this.name;
    }
    
    
}
