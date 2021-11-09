package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Message;
import java.util.List;
import java.util.Optional;


public interface MessageService{

    public List<Message> listarMessage();
    public Optional<Message> listarMessageId(Integer Id);
    public Message guardarMessageId(Message c);
    public boolean borrarMessageId(Integer id);
    public Message actualizarMessage(Message c);
}