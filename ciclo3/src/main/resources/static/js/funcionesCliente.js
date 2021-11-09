// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
/*var servidor="http://localhost:8080"*/
var servidor="http://144.22.59.130"

function limpiar(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idName").value = "";
    document.getElementById("idEmail").value = "";
    document.getElementById("idPassword").value = "";
    document.getElementById("idAge").value = "";
}

function insertar() {

     // Valida que todos los campos tengan información, se podría validar solo para codigo y categoría
     var codigo =$("#idCodigo").val();
     var nombre= $("#idName").val();
     var email= $("#idEmail").val();
     var password= $("#idPassword").val();
     var edad= $("#idAge").val();
 
     if(nombre.length == 0 || email.length == 0 || password.length == 0 || edad.length == 0){
         alert('Error, debe completar todos los campos');
         $("#idName").focus();
         return;
     }

    var elemento;
    elemento = { 
        name: $("#idName").val(),
        email: $("#idEmail").val(),
        password: $("#idPassword").val(),
        age: $("#idAge").val()
          
    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            contentType: "application/json",
            data    :   dataToSend,
            url     : servidor+"/api/Client/save",
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
            url         : servidor+'/api/Client/'+idElemento,
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
     var email= $("#idEmail").val();
     var password= $("#idPassword").val();
     var age= $("#idAge").val();

     if(codigo.length == 0 || name.length == 0 || email.length == 0|| password.length == 0 || age.length == 0){
         alert('Error, debe completar los campos');
         $("#idCodigo").focus();
         return;
     }

    var elemento;
    elemento = { 
        idClient: $("#idCodigo").val(), 
        name:$("#idName").val(),
        email:$("#idEmail").val(),
        password:$("#idPassword").val(),
        age:$("#idAge").val()};

    var dataToSend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   dataToSend,
            contentType: 'application/json', 
            url     : servidor+'/api/Client/update',
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
            url          : servidor+'/api/Client/all',
            type         : 'GET',
            success      :  function(response){
                var misItems=response;
                //Muestra un aviso si la tabla está vacía
                if(misItems.length == 0){
                    alert('La tabla no tiene registros');
                    return;
                }
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Client</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Nombre</th><th>Email</th><th>Password</th><th>Edad</th><th>Acción</th></tr>");
                
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr id='filaCliente"+misItems[i].idClient+"'>"
                    +"<td>" + misItems[i].idClient + "</td>"
                    +"<td>" + misItems[i].name + "</td>"
                    +"<td>" + misItems[i].email + "</td>"
                    +"<td>" + misItems[i].password + "</td>"
                    +"<td>" + misItems[i].age + "</td>"
                    +'<td><button onclick="borrar('+misItems[i].idClient+')">Borrar</button> </td>'
                    +'<td><button onclick="obtenerItemEspecifico('+misItems[i].idClient+')">Cargar</button> </td>'
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
            var idCodigo = idItem;
            var name = $("#filaCliente"+idItem+" td:eq(1)").text();
            var email = $("#filaCliente"+idItem+" td:eq(2)").text();
            var password = $("#filaCliente"+idItem+" td:eq(3)").text();
            var age = $("#filaCliente"+idItem+" td:eq(4)").text();
            $("#idCodigo").val(idItem);
            $("#idName").val(name);
            $("#idEmail").val(email);
            $("#idPassword").val(password);
            $("#idAge").val(age);
}
     

