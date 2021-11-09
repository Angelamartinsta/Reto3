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

import minticg25.proyectospring.model.Client;
import minticg25.proyectospring.service.ClientService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("/Client/all")
    public List<Client> obtenerClient(){
        return clientService.listarClient();
    }

    @GetMapping("/Client/{id}")
    public Optional<Client> obtenerClientId(@PathVariable("id") Integer id ){
        return clientService.listarClientId(id);
    }

    @PostMapping("/Client/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Client crearCategory(@RequestBody Client client){
        return clientService.guardarClientId(client);
    }
    
    @DeleteMapping("Client/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarClient(@PathVariable("id") Integer id){
           return clientService.borrarClientId(id);
    }
    @PutMapping("/Client/update")  
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Client actualizarClient(@RequestBody Client client){
        return clientService.actualizarClient(client);
    }
 
}
