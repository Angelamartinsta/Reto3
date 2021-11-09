// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
/*var servidor="http://localhost:8080"*/
var servidor="http://144.22.59.130"

function limpiar(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idName").value = "";
    document.getElementById("idDescription").value = "";
}

function insertar() {

     // Valida que todos los campos tengan información, se podría validar solo para codigo y categoría
     var codigo =$("#idCodigo").val();
     var nombre= $("#idName").val();
     var Descripcion= $("#idDescription").val();
 
     if(nombre.length == 0 || Descripcion.length == 0){
         alert('Error, debe completar todos los campos');
         $("#idName").focus();
         return;
     }

    var elemento;
    elemento = { 
        name: $("#idName").val(),
        description: $("#idDescription").val()
          
    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            contentType: "application/json",
            data    :   dataToSend,
            url     : servidor+"/api/Category/save",
            type    :   'POST',
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

function borrar(idElemento) {
    // Condicional para confirmar si desea borrar, si contesta no, returna sin borrar
    if (!confirm('Realmente desea eliminar?')) {
        $("#idCodigo").focus();
        return;
      }
    $.ajax (
        {
            datatype    : 'json',
            url         : servidor+'/api/Category/'+idElemento,
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

     // Valida que todos los campos tengan información, se podría validar solo para codigo y categoría
     var codigo =$("#idCodigo").val();
     var name= $("#idName").val();
     var description= $("#idDescription").val();
     if(codigo.length == 0 || name.length == 0 || description.length == 0){
         alert('Error, debe completar los campos');
         $("#idCodigo").focus();
         return;
     }

    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        name:$("#idName").val(),
        description: $("#idDescription").val()};

    var dataToSend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   dataToSend,
            contentType: 'application/json', 
            url     : servidor+'/api/Category/update',
            type    :   'PUT',
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
                                                 

function obtenerItems(){
    $.ajax (
        {
            dataType     : 'json', 
            url          : servidor+'/api/Category/all',
            type         : 'GET',
            success      :  function(response){
                var misItems=response;
                //Muestra un aviso si la tabla está vacía
                if(misItems.length == 0){
                    alert('La tabla no tiene registros');
                    return;
                }
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Categoria</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Nombre</th><th>Descripcion</th><th>Acción</th></tr>");
                
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr id='filaCategoria"+misItems[i].id+"'>"
                    +"<td>" + misItems[i].id + "</td>"
                    +"<td>" + misItems[i].name + "</td>"
                    +"<td>" + misItems[i].description + "</td>"
                    +'<td><button onclick="borrar('+misItems[i].id+')">Borrar</button> </td>'
                    +'<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button> </td>'
                    +"</tr>");
                }    
                console.log(response)
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                
            },
        }
    );
}

function obtenerItemEspecifico(idItem){
            //Valida que el usuario haya escrito un codigo de consulta        
            var codigo = idItem;
            var name = $("#filaCategoria"+idItem+" td:eq(1)").text();
            var description = $("#filaCategoria"+idItem+" td:eq(2)").text();
            $("#idName").val(name);
            $("#idDescription").val(description);
            $("#idCodigo").val(idItem);
}
     

