package minticg25.proyectospring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Reservation;
import minticg25.proyectospring.repository.ReservationCrudRepository;


@Service
public class ImplementReservationService implements ReservationService  {


    @Autowired
    ReservationCrudRepository reservationCrudRepository;

    
    @Override
    public List<Reservation> listarReservation() {
     
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    @Override
    public Optional <Reservation> listarReservationId(Integer id) {
        
        return reservationCrudRepository.findById(id);
    }

    @Override
    public Reservation guardarReservationId(Reservation c) {
      
        if (c.getIdReservation()==null){

            return reservationCrudRepository.save(c);
        }
        else{
            Optional<Reservation> cos=reservationCrudRepository.findById(c.getIdReservation());
            if(!cos.isPresent()){
                return reservationCrudRepository.save(c);
            }
            else{
                return c;
            }
        }
        
    }

    @Override
    public boolean borrarReservationId(Integer id) {
        boolean bandera = true;

        if (reservationCrudRepository.findById(id).isPresent()){
            reservationCrudRepository.deleteById(id);
        }
        else{
            bandera=false;
        }
        return bandera; 
           
    }

}
