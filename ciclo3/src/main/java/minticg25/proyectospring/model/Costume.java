package minticg25.proyectospring.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table (name="DISFRAZ")
public class Costume{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 5)
    private Integer id;

    @Column(length = 45)
    private String name;

    @Column(length = 45)
    private String brand;

    @Column(length = 4)
    private Integer year;

    @Column(length = 250)
    private String description;


    @ManyToOne
    @JoinColumn(name = "category",nullable = true, updatable = true)
    @JsonIgnoreProperties({"costumes"})
    private Category category;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "costume")
    @JsonIgnoreProperties({"costume","client"})
    private List<Message> messages;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "costume")
    @JsonIgnoreProperties({"costume","client"})
    private List<Reservation> reservations;


    
    //getter and setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

}