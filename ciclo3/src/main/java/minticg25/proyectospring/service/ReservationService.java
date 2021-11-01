package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Reservation;
import java.util.List;
import java.util.Optional;


public interface ReservationService{

    public List<Reservation> listarReservation();
    public Optional<Reservation> listarReservationId(Integer Id);
    public Reservation guardarReservationId(Reservation c);
    public boolean borrarReservationId(Integer id);
    
}