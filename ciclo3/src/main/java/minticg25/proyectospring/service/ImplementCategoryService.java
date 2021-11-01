package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Category;
import minticg25.proyectospring.repository.CategoryCrudRepository;


@Service
public class ImplementCategoryService implements CategoryService  {


    @Autowired
    CategoryCrudRepository categoryCrudRepository;

    
    @Override
    public List<Category> listarCategory() {
     
        return (List<Category>) categoryCrudRepository.findAll();
    }

    @Override
    public Optional <Category> listarCategoryId(Integer id) {
        
        return categoryCrudRepository.findById(id);
    }

    @Override
    public Category guardarCategoryId(Category c) {
      
        if (c.getId()==null){

            return categoryCrudRepository.save(c);
        }
        else{
            Optional<Category> cos=categoryCrudRepository.findById(c.getId());
            if(cos.isEmpty()){
                return categoryCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarCategoryId(Integer id) {
        boolean bandera = true;

        if (categoryCrudRepository.findById(id).isPresent()){
            categoryCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }

}
