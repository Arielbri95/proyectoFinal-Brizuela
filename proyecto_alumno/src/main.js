//!----------------------------------------------------------------------!
//!     Funciones principales!
//!----------------------------------------------------------------------!

function cambiarNombre() {
  let nombreMaestro = document.getElementById("nombre").value;
  let mensajeBienvenida = document.querySelector(".content h1");
  mensajeBienvenida.innerHTML = "Bienvenido, " + nombreMaestro + "!";

  sessionStorage.setItem("nombreMaestro", nombreMaestro);
}

class Alumno {
  constructor(nombre, nota1, nota2, promedio) {
    this.nombre = nombre;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.promedio = promedio;
  }
}

function crearAlumno() {
  let nombreAlumno = document.getElementById("nombreAlumno").value;
  let nota1 = parseFloat(document.getElementById("nota1").value);
  let nota2 = parseFloat(document.getElementById("nota2").value);
  let promedio = sacarPromedio(nota1, nota2);

  let alumno = new Alumno(nombreAlumno, nota1, nota2, promedio);
  return alumno;
}

//     Funcion guardar alumnos

const url = "data_base/datos.json";
async function enviarFormulario(alumno) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el objeto por POST");
    }

    const data = await response.json();
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "El formulario se envió correctamente",
    });
    return data;
    console.log(data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ocurrió un error al enviar el formulario",
      text: error,
    });
    console.error(error);
    return null;
  }
}

function sacarPromedio(num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  return (num2 + num1) / 2;
}

//!     Funcion listar alumnos!

function listarAlumnos() {
  async function fetchAlumnoData() {
    try {
      const response = await fetch("data_base/datos.json");
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  fetchAlumnoData().then((data) => {
    if (data && data.length > 0) {
      $("#tablaNotas tbody").empty();
      data.forEach((estudiante) => {
        let alumno = new Alumno(
          estudiante.nombre,
          estudiante.nota1,
          estudiante.nota2,
          estudiante.promedio
        );

        mostrarAlumnos(alumno);
      });

      $("#tablaNotas").show();
      $("#mensajeSinAlumnos").hide();
    } else {
      $("#tablaNotas").hide();
      $("#mensajeSinAlumnos").show();
    }
  });
}

function mostrarAlumnos(alumno) {
  let fila = `<tr>
					<td>${alumno.nombre}</td>
					<td>${alumno.nota1}</td>
					<td>${alumno.nota2}</td>
					<td>${alumno.promedio}</td>
				  </tr>`;
  $("#tablaNotas tbody").append(fila);
}
