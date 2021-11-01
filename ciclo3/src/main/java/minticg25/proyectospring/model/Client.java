package minticg25.proyectospring.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import java.util.List;


@Entity
@Table (name="Client")
public class Client{
     
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer idClient;

@Column(length = 45)
private String email;

@Column(length = 45)
private String password;

@Column(length = 250)
private String name;

@Column(length = 3)
private Integer age;


@OneToMany(cascade = CascadeType.PERSIST, mappedBy = "client")
private List<Message> message;

@OneToMany(cascade = CascadeType.PERSIST, mappedBy = "client")
private List<Reservation> reservation;

//Getters y Setters

public Integer getIdClient() {
    return idClient;
}

public void setIdClient(Integer idClient) {
    this.idClient = idClient;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public Integer getAge() {
    return age;
}

public void setAge(Integer age) {
    this.age = age;
}

public List<Message> getMessage() {
    return message;
}

public void setMessage(List<Message> message) {
    this.message = message;
}

public List<Reservation> getReservation() {
    return reservation;
}

public void setReservation(List<Reservation> reservation) {
    this.reservation = reservation;
}

}