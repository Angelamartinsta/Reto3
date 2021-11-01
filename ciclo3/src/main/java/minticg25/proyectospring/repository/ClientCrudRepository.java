package minticg25.proyectospring.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import minticg25.proyectospring.model.Client;

@Repository
public interface ClientCrudRepository extends CrudRepository<Client,Integer> {

}
