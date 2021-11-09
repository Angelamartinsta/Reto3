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

import minticg25.proyectospring.model.Score;
import minticg25.proyectospring.service.ScoreService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class ScoreController {

    @Autowired
    ScoreService scoreService;

    @GetMapping("/Score/all")
    public List<Score> obtenerScore(){
        return scoreService.listarScore();
    }

    @GetMapping("/Score/{id}")
    public Optional<Score> obtenerScoreId(@PathVariable("id") Integer id ){
        return scoreService.listarScoreId(id);
    }

    @PostMapping("/Score/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Score crearScore(@RequestBody Score score){
        return scoreService.guardarScoreId(score);
    }
    
    @DeleteMapping("Score/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarScore(@PathVariable("id") Integer id){
           return scoreService.borrarScoreId(id);
    }
    @PutMapping("/Score/update")  
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Score actualizarScore(@RequestBody Score score){
        return scoreService.actualizarScore(score);
    }
}  


