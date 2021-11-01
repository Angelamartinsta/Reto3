package minticg25.proyectospring.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@Entity
@Table (name="Category")
public class Category{
     
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(length = 5)
private Integer id;

@Column(length = 45)
private String name;

@Column(length = 250)
private String description;


@OneToMany(cascade = CascadeType.PERSIST, mappedBy = "category")
@JsonIgnoreProperties({"category","reservation","message"})
private List<Costume> costumes;


//Getter y Setter
public List<Costume> getCostumes() {
    return costumes;
}

public void setCostumes(List<Costume> costumes) {
    this.costumes = costumes;
}


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

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}


}