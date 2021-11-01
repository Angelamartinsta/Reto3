package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Costume;
import minticg25.proyectospring.repository.CostumeCrudRepository;



@Service
public class ImplementCostumeService implements CostumeService {


    @Autowired
    CostumeCrudRepository costumeCrudRepository;

    
    @Override
    public List<Costume> listarCostume() {
     
        return (List<Costume>) costumeCrudRepository.findAll();
    }

    @Override
    public Optional <Costume> listarCostummeId(Integer id) {
        
        return costumeCrudRepository.findById(id);
    }

    @Override
    public Costume guardarCostummeId(Costume c) {
      
        if (c.getId()==null){

            return costumeCrudRepository.save(c);
        }
        else{
            Optional<Costume> cos=costumeCrudRepository.findById(c.getId());
            if(!cos.isPresent()){
                return costumeCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarCostumeId(Integer id) {
        boolean bandera = true;

        if (costumeCrudRepository.findById(id).isPresent()){
            costumeCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }

}
