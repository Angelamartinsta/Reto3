package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Client;
import minticg25.proyectospring.repository.ClientCrudRepository;


@Service
public class ImplementClientService implements ClientService  {


    @Autowired
    ClientCrudRepository clientCrudRepository;

    
    @Override
    public List<Client> listarClient() {
     
        return (List<Client>) clientCrudRepository.findAll();
    }

    @Override
    public Optional <Client> listarClientId(Integer id) {
        
        return clientCrudRepository.findById(id);
    }

    @Override
    public Client guardarClientId(Client c) {
      
        if (c.getIdCient()==null){

            return clientCrudRepository.save(c);
        }
        else{
            Optional<Client> cos=clientCrudRepository.findById(c.getIdCient());
            if(cos.isEmpty()){
                return clientCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarClientId(Integer id) {
        boolean bandera = true;

        if (clientCrudRepository.findById(id).isPresent()){
            clientCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }

}
