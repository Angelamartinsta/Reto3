package minticg25.proyectospring.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import minticg25.proyectospring.model.Reservation;
import minticg25.proyectospring.model.reports.CountClient;
import minticg25.proyectospring.model.reports.ReservationStatus;
import minticg25.proyectospring.repository.ReservationCrudRepository;

@Service
public class ImplementReservationService implements ReservationService {

    @Autowired
    ReservationCrudRepository reservationCrudRepository;

    @Override
    public List<Reservation> listarReservation() {

        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    @Override
    public Optional<Reservation> listarReservationId(Integer id) {

        return reservationCrudRepository.findById(id);
    }

    @Override
    public Reservation guardarReservationId(Reservation c) {

        if (c.getIdReservation() == null) {

            return reservationCrudRepository.save(c);
        } else {
            Optional<Reservation> cos = reservationCrudRepository.findById(c.getIdReservation());
            if (!cos.isPresent()) {
                return reservationCrudRepository.save(c);
            } else {
                return c;
            }
        }

    }

    @Override
    public boolean borrarReservationId(Integer id) {
        boolean bandera = true;

        if (reservationCrudRepository.findById(id).isPresent()) {
            reservationCrudRepository.deleteById(id);
        } else {
            bandera = false;
        }
        return bandera;

    }

    @Override
    public Reservation actualizarReservation(Reservation c) {

        if (c.getIdReservation() == null) {

            return null;
        } else {
            Optional<Reservation> cos = reservationCrudRepository.findById(c.getIdReservation());
            if (cos.isPresent()) {
                return reservationCrudRepository.save(c);
            } else {
                return null;
            }
        }

    }

    @Override
    public ReservationStatus getReservationStatusReport() {
        List<Reservation> completed = reservationCrudRepository.getReservationByStatus("completed");
        List<Reservation> cancelled = reservationCrudRepository.getReservationByStatus("cancelled");
        return new ReservationStatus(completed.size(), cancelled.size());

    }

    @Override
    public List<Reservation> getReservationPeriodo(String dateOne, String dateTwo) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date startDate = dateFormat.parse(dateOne);
            Date endDate = dateFormat.parse(dateTwo);
            if (startDate.before(endDate)) {
                return reservationCrudRepository.getReservationPeriod(startDate, endDate);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @Override
    public List<CountClient> getTopClients() {
        return reservationCrudRepository.getTopClient();
    }
}
