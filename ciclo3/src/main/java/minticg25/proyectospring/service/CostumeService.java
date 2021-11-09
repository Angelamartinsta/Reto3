package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Costume;
import java.util.List;
import java.util.Optional;


public interface CostumeService{

    public List<Costume> listarCostume();
    public Optional<Costume> listarCostummeId(Integer Id);
    public Costume guardarCostummeId(Costume c);
    public boolean borrarCostumeId(Integer id);
    public Costume actualizarCostume(Costume c);
     
}