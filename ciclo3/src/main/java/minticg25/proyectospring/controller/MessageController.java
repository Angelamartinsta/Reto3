package minticg25.proyectospring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import minticg25.proyectospring.model.Message;
import minticg25.proyectospring.service.MessageService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping("/Message/all")
    public List<Message> obtenerMessage(){
        return messageService.listarMessage();
    }

    @GetMapping("/Message/{id}")
    public Optional<Message> obtenerMessageId(@PathVariable("id") Integer id ){
        return messageService.listarMessageId(id);
    }

    @PostMapping("/Message/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Message crearMessage(@RequestBody Message message){
        return messageService.guardarMessageId(message);
    }
    
    @DeleteMapping("Message/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarMessage(@PathVariable("id") Integer id){
           return messageService.borrarMessageId(id);
    }

    @PutMapping("/Message/update")  
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Message actualizarMessage(@RequestBody Message message){
        return messageService.actualizarMessage(message);
    }
}    
