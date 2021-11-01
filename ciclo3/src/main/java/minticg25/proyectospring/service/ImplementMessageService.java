package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Message;
import minticg25.proyectospring.repository.MessageCrudRepository;


@Service
public class ImplementMessageService implements MessageService  {


    @Autowired
    MessageCrudRepository messageCrudRepository;

    @Override
    public List<Message> listarMessage() {
     
        return (List<Message>) messageCrudRepository.findAll();
    }

    @Override
    public Optional <Message> listarMessageId(Integer id) {
        
        return messageCrudRepository.findById(id);
    }

    @Override
    public Message guardarMessageId(Message c) {
      
        if (c.getIdMessage()==null){

            return messageCrudRepository.save(c);
        }
        else{
            Optional<Message> cos=messageCrudRepository.findById(c.getIdMessage());
            if(cos.isEmpty()){
                return messageCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarMessageId(Integer id) {
        boolean bandera = true;

        if (messageCrudRepository.findById(id).isPresent()){
            messageCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }
    
  

}
