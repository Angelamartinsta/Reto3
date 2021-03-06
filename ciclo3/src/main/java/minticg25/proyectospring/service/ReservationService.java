package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Reservation;
import minticg25.proyectospring.model.reports.CountClient;
import minticg25.proyectospring.model.reports.ReservationStatus;

import java.util.List;
import java.util.Optional;


public interface ReservationService{

    public List<Reservation> listarReservation();
    public Optional<Reservation> listarReservationId(Integer Id);
    public Reservation guardarReservationId(Reservation c);
    public boolean borrarReservationId(Integer id);
    public Reservation actualizarReservation (Reservation c);
    public List<CountClient> getTopClients();
    public List<Reservation> getReservationPeriodo(String dateOne, String dateTwo);
    public ReservationStatus getReservationStatusReport();
    
}