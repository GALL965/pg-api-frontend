const API_URL = 'https://artworks-pg-backend.onrender.com/api/artworks';

// Obtener obras
async function getArtworks() {
  const response = await fetch(API_URL);
  const artworks = await response.json();
  const list = document.getElementById("artworkList");
  list.innerHTML = "";

  artworks.forEach(art => {
    const li = document.createElement("li");
    li.className = "artwork-item";
    li.innerHTML = `
      <strong>Título:</strong> ${art.title}<br>
      <strong>Autor:</strong> ${art.author}<br>
      <strong>Año:</strong> ${art.year}<br>
      <strong>Descripción:</strong> ${art.description}<br>
      ${art.imageUrl ? `<img src="${art.imageUrl}" alt="Imagen de la obra" class="art-img">` : ''}
      <div class="actions">
        <button class="btn-delete" onclick="deleteArtwork(${art.id})">Eliminar</button>
        <button class="btn-edit" onclick="editArtwork(${art.id})">Editar</button>
      </div>
    `;
    list.appendChild(li);

    // Agregar el evento al hacer clic en la imagen
    const img = li.querySelector("img");
    if (img) {
      img.addEventListener("click", () => {
        li.classList.toggle("expanded");
      });
    }
  });
}

// Crear obra
async function createArtwork() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value);
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, author, year, description, imageUrl })
  });

  if (response.ok) {
    alert("✅ Obra agregada exitosamente!");
    getArtworks();
  } else {
    alert("⚠️ Error al agregar la obra.");
  }
}

// Eliminar obra
async function deleteArtwork(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("🗑️ Obra eliminada.");
    getArtworks();
  } else {
    alert("⚠️ Error al eliminar la obra.");
  }
}

// Editar obra
async function editArtwork(id) {
  const title = prompt("Nuevo título de la obra:");
  const author = prompt("Nuevo autor:");
  const year = parseInt(prompt("Nuevo año:"));
  const description = prompt("Nueva descripción:");
  const imageUrl = prompt("Nueva URL de imagen (opcional):");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, author, year, description, imageUrl })
  });

  if (response.ok) {
    alert("✅ Obra actualizada.");
    getArtworks();
  } else {
    alert("⚠️ Error al actualizar la obra.");
  }
}
