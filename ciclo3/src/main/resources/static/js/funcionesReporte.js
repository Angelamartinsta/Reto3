// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON

function limpiar(){

    document.getElementById("idFechaInicio").value = "";
    document.getElementById("idFechaFin").value = "";
}

function pintarRespuesta(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Reporte Canceladas y Creadas</caption>");
    $("#idDivConsulta").append("<tr><th>Cant. Completadas</th><th>Cant. Canceladas</th></tr>");
    $("#idDivConsulta").append("<tr>");
    $("#idDivConsulta").append("<td>" + respuesta.completed + "</td>");
    $("#idDivConsulta").append("<td>" + respuesta.cancelled + "</td>"); 
    $("#idDivConsulta").append("</tr>");
}

function pintarRespuestaDate(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Reporte Respuesta</caption>");
    $("#idDivConsulta").append("<tr><th>Fecha Devolución</th><th>Fecha Inicio</th><th>Estado</th></tr>");
    for(i=0;i<respuesta.length;i++){
        $("#idDivConsulta").append("<tr>");
            $("#idDivConsulta").append("<td>" + respuesta[i].devolutionDate + "</td>");
            $("#idDivConsulta").append("<td>" + respuesta[i].startDate + "</td>"); 
            $("#idDivConsulta").append("<td>" + respuesta[i].status + "</td>");
        $("#idDivConsulta").append("</tr>");
    }
}


function pintarRespuestaClientes(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Reporte Clientes</caption>");
    $("#idDivConsulta").append("<tr><th>Total Reservas</th><th>Nombre</th><th>Email</th><th>Edad</th></tr>");
    for(i=0;i<respuesta.length;i++){
        $("#idDivConsulta").append("<tr>");
            $("#idDivConsulta").append("<td>" + respuesta[i].total + "</td>");
            $("#idDivConsulta").append("<td>" + respuesta[i].client.name + "</td>"); 
            $("#idDivConsulta").append("<td>" + respuesta[i].client.email + "</td>"); 
            $("#idDivConsulta").append("<td>" + respuesta[i].client.age + "</td>");
        $("#idDivConsulta").append("</tr>");
    }
}

function reporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://132.226.163.1:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function reporteFecha(){

    var fechaInicio = document.getElementById("idFechaInicio").value;
    var fechaCierre = document.getElementById("idFechaFin").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://132.226.163.1:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }

    function reporteCliente(){
        $.ajax({
            url:"http://132.226.163.1:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
