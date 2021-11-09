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
import minticg25.proyectospring.service.ReservationService;

//OPERACIONES CRUD  - LISTAR
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})


public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping("/Reservation/all")
    public List<Reservation> obtenerReservation(){
        return reservationService.listarReservation();
    }

    @GetMapping("/Reservation/{id}")
    public Optional<Reservation> obtenerReservationId(@PathVariable("id") Integer id ){
        return reservationService.listarReservationId(id);
    }

    @PostMapping("/Reservation/save")  
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation crearReservation(@RequestBody Reservation reservation){
        reservation.setStatus("created");
        Date dateReservation= new Date();
        reservation.setDateCreate(dateReservation);
        return reservationService.guardarReservationId(reservation);
    }
    
    @DeleteMapping("Reservation/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean borrarReservation(@PathVariable("id") Integer id){
           return reservationService.borrarReservationId(id);
    }

    @PutMapping("/Reservation/update")  
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Reservation actualizarReservation(@RequestBody Reservation reservation){
        return reservationService.actualizarReservation(reservation);
    }
}  

