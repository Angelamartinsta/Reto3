package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Score;
import minticg25.proyectospring.repository.ScoreCrudRepository;


@Service
public class ImplementScoreService implements ScoreService  {


    @Autowired
    ScoreCrudRepository scoreCrudRepository;

    
    @Override
    public List<Score> listarScore() {
     
        return (List<Score>) scoreCrudRepository.findAll();
    }

    @Override
    public Optional <Score> listarScoreId(Integer id) {
        
        return scoreCrudRepository.findById(id);
    }

    @Override
    public Score guardarScoreId(Score c) {
      
        if (c.getIdScore()==null){

            return scoreCrudRepository.save(c);
        }
        else{
            Optional<Score> cos=scoreCrudRepository.findById(c.getIdScore());
            if(cos.isEmpty()){
                return scoreCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarScoreId(Integer id) {
        boolean bandera = true;

        if (scoreCrudRepository.findById(id).isPresent()){
            scoreCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }

}
