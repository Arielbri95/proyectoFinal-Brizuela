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

function sacarPromedio(num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  return (num2 + num1) / 2;
}

//!     Funcion listar alumnos!

async function listarAlumnos() {
  try {
    const response = await fetch("data_base/datos.json");
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();

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
    }
  } catch (error) {
    console.error(error);
  }
  let alumnosLocalSotrage = JSON.parse(localStorage.getItem("alumnos")) || [];

  if (alumnosLocalSotrage > 0) {
    alumnosLocalSotrage.forEach((alumno) => {
      mostrarAlumnos(alumno);
    });
  }
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

function agregarAlumno() {
  let alumno = crearAlumno();
  if (alumno) {
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos.push(alumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    mostrarAlumnos(alumno);
  }
}
