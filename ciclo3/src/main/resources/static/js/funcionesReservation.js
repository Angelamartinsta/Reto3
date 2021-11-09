// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
/*var servidor="http://localhost:8080"*/
var servidor="http://144.22.59.130:8080"

function autoInicioRelacionCliente(){
    
    $.ajax({
        url: servidor +"/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioCostume(){

    $.ajax({
        url: servidor +"/api/Costume/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-costume");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

function limpiar(){

    document.getElementById("idFechaInicio").value = "";
    document.getElementById("idFechaFin").value = "";
    document.getElementById("select-costume").value = "";
    document.getElementById("select-client").value = "";
}

function pintarRespuesta(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Reservación</caption>");
    $("#idDivConsulta").append("<tr><th>Fecha Inicio</th><th>Fecha Entrega</th><th>Cliente</th><th>Disfraz</th><th>Estado</th></tr>");
   
    for(i=0;i<respuesta.length;i++){

        $("#idDivConsulta").append("<tr>");
        $("#idDivConsulta").append("<td>" + respuesta[i].startDate + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].devolutionDate + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].client.name + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].costume.name + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].status + "</td>");        
        $("#idDivConsulta").append('<td><button onclick="borrar('+respuesta[i].idReservation+')">Borrar</button> </td>');
                
        $("#idDivConsulta").append("</tr>");
    }   
    console.log(respuesta)

}

function obtenerItems(){
    $.ajax({
        url: servidor +"/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function insertar() {

    var fechaIni= $("#idFechaInicio").val();
    var fechaFin= $("#idFechaFin").val();
    var disfraz =$("#select-costume").val();
    var cliente= $("#select-client").val();

  
    if(fechaIni.length==0 || fechaFin.length==0 ||disfraz.length==0 || cliente.length==0){
        alert('Error, debe completar todos los campos');
        $("#idFechaInicio").focus();
        return false;
    }
    else{
    let elemento;
    elemento = { 
       
        startDate:$("#idFechaInicio").val(),
        devolutionDate:$("#idFechaFin").val(),
        client: {idClient:cliente},
        costume:{id:disfraz}
    };
   
    $.ajax (
        {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(elemento),
            url: servidor +"/api/Reservation/save",

            success      :  function(response){
                               
                               console.log(response);
                               alert("La reserva se guardo correctamente");
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( xhr);
                            alert("No se guardo correctamente");
                               
                            }


        }
    );
    }


}

function borrar(idElemento) {
    let elemento;
    elemento = { 
        id:idElemento
    };
    let dataToSend   = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax (
        {
            url: servidor +'/api/Reservation/'+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success      :  function(response){
                                console.log(response);
                                alert("La reserva se ha borrado Correctamente!")
                                obtenerItems();
                                limpiar();

                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                                console.log(xhr);

                            }
        }
    );
}

function actualizar(idElemento) {
  
    var fechaIni= $("#idFechaInicio").val();
    var fechaFin= $("#idFechaFin").val();
    var disfraz =$("#select-costume").val();
    var cliente= $("#select-client").val();
    var status =$("#idStatus").val();
  
    if(fechaIni.length==0 || fechaFin.length==0 ||disfraz.length==0 || cliente.length==0){
        alert('Error, debe completar todos los campos');
        $("#idFechaInicio").focus();
        return false;
    }
    else{
    let elemento;
    elemento = { 
        idReservation:idElemento,
        startDate:$("#idFechaInicio").val(),
        devolutionDate:$("#idFechaFin").val(),
        client: {idClient:cliente},
        costume:{id:disfraz},
        status:status
    };
         
        $.ajax (
            {
                url:'/api/Reservation/update',
                type:"PUT",
                data:JSON.stringify(elemento),
                contentType:"application/JSON",
                datatype:"JSON",
                success      :  function(response){
                                
                                console.log(response);
                                alert("El registro de la reserva fue modificada satisfactoriamente");
                                obtenerItems();
                                limpiar();
                                },
                error       :   function(jqXHR,textStatus,errorThrown){
                                console.log( xhr);

                                }


            }
        );

    }
}
                                                 
