// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
/*var servidor="http://localhost:8080"*/
var servidor="http://144.22.59.130"

function limpiar() {
    document.getElementById("idCodigo").value = "";
    document.getElementById("idMessagetext").value = "";

}


function insertar() {
    var message = $("#idMessage").val();
    var client = $("#idClient").val();
    var costume = $("#idDisfraz").val();
    var elemento;
    elemento = {
        messageText: $("#idMessage").val(),
        client: { idClient: $("#idClient").val() },
        costume: { id: $("#idDisfraz").val() }
    }

    if (client.length == 0 || costume.length == 0 || message.length == 0) {
        alert('Error, debe completar todos los campos');
        $("#idMessagetext").focus();
        return;
    }
    else {
        var datatosend = JSON.stringify(elemento);
        $.ajax(
            {
                datatype: 'json',
                contentType: "application/json",
                data: datatosend,
                url: servidor + "/api/Message/save",
                type: 'POST',
                success: function (response) {

                    console.log(response);
                    obtenerItems();
                    limpiar();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);

                }


            }
        );

    }

}

function borrar(idElemento) {
    var elemento;
    elemento = {
        id: idElemento
    };
    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            datatype: 'json',
            url: servidor + '/api/Message/' + idElemento,
            type: 'DELETE',
            success: function (response) {
                console.log(response);
                obtenerItems();
                limpiar();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);

            }
        }
    );
}

function obtenerItems() {
    $.ajax(
        {
            dataType: 'json',
            url: servidor + '/api/Message/all',
            type: 'GET',
            success: function (response) {
                var misItems = response;
                //Muestra un aviso si la tabla está vacía
                if (misItems.length == 0) {
                    alert('La tabla no tiene registros');
                    return;
                }
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Mensaje</caption>");
                $("#idDivConsulta").append("<tr><th>Mensaje</th><th>Cliente</th><th>Disfraz</th><th>Acción</th></tr>");

                for (i = 0; i < misItems.length; i++) {
                    $("#idDivConsulta").append("<tr id='filaMensaje" + misItems[i].idMessage + "'>"
                        + "<td>" + misItems[i].messageText + "</td>"
                        + "<td>" + misItems[i].client.name + "</td>"
                        + "<td>" + misItems[i].costume.name + "</td>"
                        + '<td><button onclick="borrar(' + misItems[i].idMessage + ')">Borrar</button> </td>'
                        + "</tr>");
                }
                console.log(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {

            },
        }
    );
}


function cargarClientes() {
    $.ajax(
        {
            dataType: 'json',
            url: servidor + '/api/Client/all',
            type: 'GET',
            success: function (response) {
                var misItems = response;
                //Muestra un aviso si la tabla está vacía

                for (i = 0; i < misItems.length; i++) {
                    $("#idClient").append("<option value='" + misItems[i].idClient + "'>"
                        + misItems[i].name + "</option>");
                }
                console.log(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        }
    );
}

cargarClientes();

function cargarDisfraces() {
    $.ajax(
        {
            dataType: 'json',
            url: servidor + '/api/Costume/all',
            type: 'GET',
            success: function (response) {
                var misItems = response;
                //Muestra un aviso si la tabla está vacía

                for (i = 0; i < misItems.length; i++) {
                    $("#idDisfraz").append("<option value='" + misItems[i].id + "'>"
                        + misItems[i].name + "</option>");
                }
                console.log(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        }
    );
}
cargarDisfraces();

