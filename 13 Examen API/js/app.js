const apiUrl = "https://dragonball-api.com/api/characters?limit=1000";

const contenedorImg = document.getElementById("imagenPersonaje");
const info = document.getElementById("infoPersonaje");
const btnBuscar = document.getElementById("btnBuscar");
const inputNombre = document.getElementById("nombrePersonaje");

btnBuscar.onclick = async () => {
  const nombre = inputNombre.value.trim().toLowerCase();
  if (!nombre) {
    info.innerHTML = "<p>⚠️ Ingresa un nombre Saiyajin primero.</p>";
    return;
  }

  contenedorImg.src = "https://i.gifer.com/ZC9Y.gif";
  info.innerHTML = "<p>🔎 Escaneando el Ki... espera...</p>";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const personajes = data.items || data; 

    const personaje = personajes.find(p => p.name.toLowerCase().includes(nombre));

    if (personaje) {
      contenedorImg.src = personaje.image;
      info.innerHTML = `
        <p><strong>Nombre:</strong> ${personaje.name}</p>
        <p><strong>Raza:</strong> ${personaje.race}</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
        <p><strong>Planeta:</strong> ${personaje.originPlanet}</p>
        <p><strong>Afiliación:</strong> ${personaje.affiliation}</p>
        <p><strong>Ki Base:</strong> ${personaje.ki}</p>
        <p><strong>Transformaciones:</strong> ${personaje.transformations?.join(", ") || "Ninguna"}</p>
        <p><strong>Descripción:</strong> ${personaje.description || "Sin descripción."}</p>
      `;
    } else {
      contenedorImg.src = "img/scouter-explode.gif";
      info.innerHTML = `<p>❌ No se encontró a "${nombre}".</p>`;
    }
  } catch (error) {
    info.innerHTML = `<p>⚠️ Error al conectar con el rastreador. Intenta más tarde.</p>`;
  }
};
