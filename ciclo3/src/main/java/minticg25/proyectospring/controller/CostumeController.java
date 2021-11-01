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

import minticg25.proyectospring.model.Costume;
import minticg25.proyectospring.service.CostumeService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class CostumeController {

    @Autowired
    CostumeService costumeService;

    @GetMapping("/Costume/all")
    public List<Costume> obtenerCostume(){
        return costumeService.listarCostume();
    }

    @GetMapping("/Costume/{id}")
    public Optional<Costume> obtenerCostumeId(@PathVariable("id") Integer id ){
        return costumeService.listarCostummeId(id);
    }

    @PostMapping("/Costume/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Costume crearCostume(@RequestBody Costume costume){
        return costumeService.guardarCostummeId(costume);
    }
    
    @DeleteMapping("/Costume/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarCostume(@PathVariable("id") Integer id){
           return costumeService.borrarCostumeId(id);
    }
}
