const $form = document.querySelector("#form");
const $campo = document.querySelector("#campo");
const $buscar = document.querySelector("#buscar");
const $resultado = document.querySelector("#resultado");
const $cambiar = document.querySelector("#cambiar");
const $nav = document.getElementById("nav");

function limpiar() {
  $resultado.innerHTML = "";
  $campo.value = "";
}

function instructivo() {
  Swal.fire({
    title: "Bienvenido",
    text:
      "    Para buscar el personaje es muy fácil. Dirígete hacia el formulario dandole un clic a la flecha para abrir y cerrar," +
      " luego despliega la lista y busca a tu personaje favorito de The Rick and Morty. ¡¡Que lo disfrutes!!. ",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `,
  });
}

function buscarApi(nombre) {
  //me devolveria una promesa

  return fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
    .then((response) => response.json())
    .then((data) => {
      const personajes = data.results; //La propiedad "results" contiene un array de objetos

      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El dato solicitado, No se logró encontrar.     Por favor vuelve a eligir otra opción",
          timer: 4000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setTimeout(function () {
          location.reload();
        }, 4000);
        return;
      } else {
        return personajes;
      }
    });
}

function personajes(personajes) {
  personajes.forEach((personaje) => {
    // AquFí puedes hacer lo que necesites con cada personaje
    const articulo = document.createRange().createContextualFragment(`

            <article class="carta">
            <div class="face front">
              <img
                src="${personaje.image}"
                alt="targeta">
              <h3> ${personaje.name}</h3>
            </div>

            <div class="face back">
              <h3>Especie</h3>
              <p>${personaje.species}</p>



              <h3>Estado</h3>
              <p>${personaje.status}</p>

              <p> <b> Origen: </b>${personaje.origin.name}
               <br>
              <b> Localización: </b>${personaje.location.name} 
              </p>
            </div>
            </article>

`);

    $resultado.append(articulo);
    console.log(`Nombre: ${personaje.name}, Especie: ${personaje.species}`);
  });
  return $resultado; // Si necesitas hacer algo con los personajes después
}

//evento
$form.addEventListener("submit", async (event) => {
  event.preventDefault();

  $resultado.innerHTML = "";

  const { value } = $campo;
  if (!value) return;

  //me agrega el cargar elemento
  $buscar.setAttribute("disiable", "");
  $buscar.setAttribute("aria-busy", "true");

  const ipInfo = await buscarApi(value); //tiene que ir en la mitad
  const encuentra = personajes(ipInfo);

  if (encuentra) {
    encuentra; //este metodo me retorna el articulo
  }

  //removemos el cargar elemento cuandop se cargue los datos

  $buscar.removeAttribute("disiable", "");
  $buscar.removeAttribute("aria-busy", "true");
});
