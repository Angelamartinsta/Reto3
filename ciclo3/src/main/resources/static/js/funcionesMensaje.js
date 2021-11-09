// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
function limpiar(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idMessagetext").value = "";

}


function insertar() {

    var codigo =$("#idCodigo").val();
    var mensaje= $("#idMessagetext").val();
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        messagetext:$("#idMessagetext").val(),
    }

    if(codigo.length == 0 || mensaje.length == 0){
        alert('Error, debe completar todos los campos');
        $("#idCodigo").focus();
        return;
    }
else{
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   elemento,
            url     : 'https://ge0efcf461dc328-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message' ,
            type    :   'POST',
            success      :  function(response){
                               
                               console.log(response);
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( jqXHR);

                            }


        }
    );

    }

}

function borrar(idElemento) {
    var elemento;
    elemento = { 
        id:idElemento
    };
    var dataToSend   = JSON.stringify(elemento);

    $.ajax (
        {
            datatype    : 'json',
            data        :  dataToSend,
            contentType  : 'application/json', 
            url         :'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
            type        : 'DELETE',
            success      :  function(response){
                                console.log(response);
                                obtenerItems();
                                limpiar();

                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                                console.log(jqXHR);

                            }
        }
    );
}

function actualizar() {
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        messagetext:$("#idMessagetext").val(),
        
    };
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   datatosend,
            contentType: 'application/json', 
            url     : 'https://ge0efcf461dc328-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type    :   'PUT',
            success      :  function(response){
                               
                               console.log(response);
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( jqXHR);

                            }


        }
    );

    }

function obtenerItems(){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge0efcf461dc328-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type         : 'GET',
            success      :  function(response){
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Mensaje</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Mensaje</th><th>Acción</th></tr>");
                var misItems=response.items;
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].messagetext + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button> </td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button> </td>');
                    $("#idDivConsulta").append("</tr>");
                }    
                console.log(response)
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                
            },
        }
    );
}

function obtenerItemEspecifico(idIdItem){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge0efcf461dc328-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idMessagetext").val(item.messagetext);

            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( jqXHR);
            },
        }
    );
}


function obtenerItemEspecifico2(){
     
    idIdItem = document.getElementById("idCodigo").value;

    
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge0efcf461dc328-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idMessagetext").val(item.messagetext);

                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Mensaje</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Mensaje</th><th>Acción</th></tr>");
                var misItems=response.items;
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].messagetext + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button> </td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button> </td>');
                }
                    $("#idDivConsulta").append("</tr>");
                
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( jqXHR);
            },
        }
    );
}
