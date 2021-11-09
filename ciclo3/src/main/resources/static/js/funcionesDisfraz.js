// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
/*var servidor="http://localhost:8080"*/
var servidor="http://144.22.59.130:8080"

function limpiar() {
    document.getElementById("idCodigo").value = "";
    document.getElementById("idBrand").value = "";
    document.getElementById("idYear").value = "";
    document.getElementById("idDescription").value = "";
    document.getElementById("idName").value = "";
    document.getElementById("idCategory").value = "";
}

function insertar() {

    // Valida que todos los campos tengan información, se podría validar solo para codigo y categoría
    var codigo = $("#idCodigo").val();
    var brand = $("#idBrand").val();
    var year = $("#idYear").val();
    var description = $("#idDescription").val();
    var name = $("#idName").val();
    var category = $("#idCategory").val();

    if (brand.length == 0 || year.length == 0 || description.length == 0 || name.length == 0 || category.length == 0) {
        alert('Error, debe completar todos los campos');
        $("#idBrand").focus();
        return;
    }

    var elemento;
    elemento = {
        brand: $("#idBrand").val(),
        year: $("#idYear").val(),
        description: $("#idDescription").val(),
        name: $("#idName").val(),
        category: { id: $("#idCategory").val() }

    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax(
        {
            datatype: 'json',
            contentType: "application/json",
            data: dataToSend,
            url: servidor + "/api/Costume/save",
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

function borrar(idElemento) {
    // Condicional para confirmar si desea borrar, si contesta no, returna sin borrar
    if (!confirm('Realmente desea eliminar?')) {
        $("#idCodigo").focus();
        return;
    }
    $.ajax(
        {
            datatype: 'json',
            url: servidor + '/api/Costume/' + idElemento,
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

function actualizar() {

    // Valida que todos los campos tengan información, se podría validar solo para codigo y categoría
    var id = $("#idCodigo").val();
    var brand = $("#idBrand").val();
    var year = $("#idYear").val();
    var description = $("#idDescription").val();
    var name = $("#idName").val();
    var category = $("#idCategory").val();
    if (id.length == 0 || brand.length == 0 || year.length == 0 || description.length == 0 || name.length == 0 || category.length == 0) {
        alert('Error, debe completar los campos');
        $("#idCodigo").focus();
        return;
    }

    var elemento;
    elemento = {
        id: $("#idCodigo").val(),
        brand: $("#idBrand").val(),
        year: $("#idYear").val(),
        description: $("#idDescription").val(),
        name: $("#idName").val(),
        category: { id:Number($("#idCategory").val()) }
    };


    var dataToSend = JSON.stringify(elemento);
    $.ajax(
        {
            datatype: 'json',
            data: dataToSend,
            contentType: 'application/json',
            url: servidor + '/api/Costume/update',
            type: 'PUT',
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
            url: servidor + '/api/Costume/all',
            type: 'GET',
            success: function (response) {
                var misItems = response;
                //Muestra un aviso si la tabla está vacía
                if (misItems.length == 0) {
                    alert('La tabla no tiene registros');
                    return;
                }
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Disfraz</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Brand</th><th>Year</th><th>Description</th><th>Name</th><th>Category</th><th>Acción</th></tr>");

                for (i = 0; i < misItems.length; i++) {
                    $("#idDivConsulta").append("<tr id='filaDisfraz" + misItems[i].id + "'>"
                        + "<td>" + misItems[i].id + "</td>"
                        + "<td>" + misItems[i].brand + "</td>"
                        + "<td>" + misItems[i].year + "</td>"
                        + "<td>" + misItems[i].description + "</td>"
                        + "<td>" + misItems[i].name + "</td>"
                        + "<td>" + misItems[i].category.name + "</td>"
                        + '<td><button onclick="borrar(' + misItems[i].id + ')">Borrar</button> </td>'
                        + '<td><button onclick="obtenerItemEspecifico(' + misItems[i].id + ')">Cargar</button> </td>'
                        + "</tr>");
                }
                console.log(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {

            },
        }
    );
}

function obtenerItemEspecifico(idItem) {
    //Valida que el usuario haya escrito un codigo de consulta        
    var idCodigo = idItem;
    var brand = $("#filaDisfraz" + idItem + " td:eq(1)").text();
    var year = $("#filaDisfraz" + idItem + " td:eq(2)").text();
    var description = $("#filaDisfraz" + idItem + " td:eq(3)").text();
    var name = $("#filaDisfraz" + idItem + " td:eq(4)").text();
    var category = $("#filaDisfraz" + idItem + " td:eq(5)").text()

    $("#idBrand").val(brand);
    $("#idYear").val(year);
    $("#idDescription").val(description);
    $("#idName").val(name);
    $("#idCodigo").val(idItem);
    $("#idCategory option").filter(function () {
        return $(this).text() == category;
    }).attr('selected', true);
}


function cargarCategorias() {
    $.ajax(
        {
            dataType: 'json',
            url: servidor + '/api/Category/all',
            type: 'GET',
            success: function (response) {
                var misItems = response;
                //Muestra un aviso si la tabla está vacía

                for (i = 0; i < misItems.length; i++) {
                    $("#idCategory").append("<option value='" + misItems[i].id + "'>"
                        + misItems[i].name + "</option>");
                }
                console.log(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        }
    );
}

cargarCategorias();
