package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Client;
import java.util.List;
import java.util.Optional;


public interface ClientService{

    public List<Client> listarClient();
    public Optional<Client> listarClientId(Integer Id);
    public Client guardarClientId(Client c);
    public boolean borrarClientId(Integer id);
    
}