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

import minticg25.proyectospring.model.Category;
import minticg25.proyectospring.service.CategoryService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/Category/all")
    public List<Category> obtenerCategory(){
        return categoryService.listarCategory();
    }

    @GetMapping("/Category/{id}")
    public Optional<Category> obtenerCategoryId(@PathVariable("id") Integer id ){
        return categoryService.listarCategoryId(id);
    }

    @PostMapping("/Category/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Category crearCategory(@RequestBody Category category){
        return categoryService.guardarCategoryId(category);
    }
    
    @DeleteMapping("Category/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarCategory(@PathVariable("id") Integer id){
           return categoryService.borrarCategoryId(id);
    }

    @PutMapping("Category/update")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Category actualizarCategory(@RequestBody Category category){
           return categoryService.actualizarCategory(category);
    }
}
