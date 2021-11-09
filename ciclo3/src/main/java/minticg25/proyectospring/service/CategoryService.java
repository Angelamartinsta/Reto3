package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Category;
import java.util.List;
import java.util.Optional;


public interface CategoryService{

    public List<Category> listarCategory();
    public Optional<Category> listarCategoryId(Integer Id);
    public Category guardarCategoryId(Category c);
    public boolean borrarCategoryId(Integer id);
    public Category actualizarCategory(Category c);
    
}