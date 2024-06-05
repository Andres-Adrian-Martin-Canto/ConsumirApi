document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí se ejecutará después de que la página haya cargado completamente
    const options = {
        method: 'GET',  // Corregir 'method' aquí
        headers: {
            Authorization: '$2y$10$I61agTSZGHgy5IK/PYZVDumbBuLVoQbe4VIm3n7Rk2N2svkU1D9We'  // Asegúrate de que este encabezado sea permitido por la política CORS
        }
    };

    fetch("http://localhost/ApiProject/usuarios", options)
        .then((response) => response.json())
        .then((result) => mostrarDatoTable(result.cuerpo))
        .catch((error) => console.error(error));

    function mostrarDatoTable(array) {
        const tabla = document.getElementById('tabla-usuarios').getElementsByTagName('tbody')[0];
        for (let i = 0; i < array.length; i++) {
            const fila = tabla.insertRow();
            for (const clave in array[i]) {
                const celda = fila.insertCell();
                celda.textContent = array[i][clave];
            }

            // Botón Editar
            const celdaBotonEditar = fila.insertCell();
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', () => {
                // Obtener los datos de la fila
                const id = fila.cells[0].textContent;
                const nombre = fila.cells[1].textContent;
                const email = fila.cells[2].textContent;
                const contrasenia = fila.cells[3].textContent;
                const token = fila.cells[4].textContent;
                // Crear un objeto con los datos de la fila
                const filaDatos = {
                    id: id,
                    nombre: nombre,
                    email: email,
                    contrasenia: contrasenia,
                    token: token
                };
                // enviarlo a una funcion donde lo ponga en un formulario.
                editarUsuario(filaDatos);
            });
            celdaBotonEditar.appendChild(botonEditar);

            // Botón Eliminar
            const celdaBotonEliminar = fila.insertCell();
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                // Obtener la columna "ID" de la fila
                const idFila = fila.cells[0].textContent; // Suponiendo que la columna "ID" es la primera columna (índice 0)
                // Mandar a eliminar ese, id con un fetch
                eliminarUsuario(idFila);
                // Agregar aquí la lógica para eliminar la fila o hacer cualquier otra acción
            });
            celdaBotonEliminar.appendChild(botonEliminar);
        }
    }

    /**
     * TODO: Editar usuario.
     * @param valores
     */
    function editarUsuario(valores) {
        // Obtener referencia al formulario y a sus campos
        const formulario = document.getElementById('editar');
        const idInput = formulario.querySelector('#id');
        const nombreInput = formulario.querySelector('#nombre2');
        const correoInput = formulario.querySelector('#correo_electronico2');
        const contraseniaInput = formulario.querySelector('#contrasenia2');
        idInput.value = valores.id;
        nombreInput.value = valores.nombre;
        correoInput.value = valores.email;
        contraseniaInput.value = valores.contrasenia;
    }

    function eliminarUsuario(id) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: '$2y$10$I61agTSZGHgy5IK/PYZVDumbBuLVoQbe4VIm3n7Rk2N2svkU1D9We'  // Asegúrate de que este encabezado sea permitido por la política CORS
            }
        };
        fetch("http://localhost/ApiProject/usuarios/" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                alert(result.cuerpo);
                window.location.reload();
            })
            .catch((error) => console.error(error));
    }


    document.getElementById('registroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const correoElectronico = document.getElementById('correo_electronico').value;
        const contrasenia = document.getElementById('contrasenia').value;

        // Crear un objeto JSON con los datos del formulario
        const data = {
            nombre: nombre,
            correo_electronico: correoElectronico,
            contrasenia: contrasenia
        };

        // Enviar la solicitud POST con los datos en formato JSON
        fetch('http://localhost/ApiProject/usuarios/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                let token = data.cuerpo.token;
                // console.log(data.cuerpo);
                alert("Su token es el siguiente: " + token);
                window.location.reload();
                // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito al usuario, etc.
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
                // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario, etc.
            });
    });

    document.getElementById('editar').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma estándar

        const formulario = document.getElementById('editar');
        const idInput = formulario.querySelector('#id');
        const nombreInput = formulario.querySelector('#nombre2');
        const correoInput = formulario.querySelector('#correo_electronico2');
        const contraseniaInput = formulario.querySelector('#contrasenia2');

        // Crear un objeto JSON con los datos del formulario
        const data = {
            id: idInput.value, // Usar .value para obtener el valor del campo
            nombre: nombreInput.value,
            correo_electronico: correoInput.value,
            contrasenia: contraseniaInput.value
        };

        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: '$2y$10$I61agTSZGHgy5IK/PYZVDumbBuLVoQbe4VIm3n7Rk2N2svkU1D9We',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("http://localhost/ApiProject/usuarios/" + idInput.value, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                alert(result.cuerpo);
                window.location.reload();
            })
            .catch((error) => console.error(error));
    });
});

