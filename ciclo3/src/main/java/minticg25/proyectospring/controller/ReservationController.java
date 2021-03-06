package minticg25.proyectospring.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import minticg25.proyectospring.model.Reservation;
import minticg25.proyectospring.model.reports.CountClient;
import minticg25.proyectospring.model.reports.ReservationStatus;
import minticg25.proyectospring.service.ReservationService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })

public class  ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping("/Reservation/all")
    public List<Reservation> obtenerReservation() {
        return reservationService.listarReservation();
    }

    @GetMapping("/Reservation/{id}")
    public Optional<Reservation> obtenerReservationId(@PathVariable("id") Integer id) {
        return reservationService.listarReservationId(id);
    }

    @PostMapping("/Reservation/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation crearReservation(@RequestBody Reservation reservation) {
        if (reservation.getStatus()==null){
            reservation.setStatus("created");
        }
        Date dateReservation = new Date();
        reservation.setDateCreate(dateReservation);
        return reservationService.guardarReservationId(reservation);
    }

    @DeleteMapping("Reservation/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarReservation(@PathVariable("id") Integer id) {
        return reservationService.borrarReservationId(id);
    }

    @PutMapping("/Reservation/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation actualizarReservation(@RequestBody Reservation reservation) {
        return reservationService.actualizarReservation(reservation);
    }

    @GetMapping("/Reservation/report-status")
    public ReservationStatus getReservationsStatusReport() {
        return reservationService.getReservationStatusReport();
    }

    @GetMapping("/Reservation/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservtionReportDates(@PathVariable("dateOne") String dateOne,
            @PathVariable("dateTwo") String dateTwo) {
        return reservationService.getReservationPeriodo(dateOne, dateTwo);
    }

    @GetMapping("/Reservation/report-clients")
    public List<CountClient> getClients() {
        return reservationService.getTopClients();
    }
}
