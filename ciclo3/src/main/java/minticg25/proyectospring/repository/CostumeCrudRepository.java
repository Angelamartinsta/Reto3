package minticg25.proyectospring.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import minticg25.proyectospring.model.Costume;

@Repository
public interface CostumeCrudRepository extends CrudRepository<Costume,Integer> {

}
