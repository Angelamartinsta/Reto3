package minticg25.proyectospring.repository;
import org.springframework.stereotype.Repository;

import minticg25.proyectospring.model.Client;
import minticg25.proyectospring.model.Reservation;
import minticg25.proyectospring.model.reports.CountClient;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;


@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    
    public List<Reservation> findAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> findById(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation r){
        return reservationCrudRepository.save(r);
    }
    public void deleteById(Integer id){
        reservationCrudRepository.deleteById(id);
    }
    
    public List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }

    public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
    }

    public List<CountClient> getTopClient(){
        List<CountClient> clientList = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationByClient();

        for(int i=0;i<report.size();i++){
        	Long l = (Long) report.get(i)[1];
        	Client cli = (Client)report.get(i)[0];
        	CountClient conteo = new CountClient(l,cli);
            clientList.add(conteo);
        }
        return clientList;
    }
}
