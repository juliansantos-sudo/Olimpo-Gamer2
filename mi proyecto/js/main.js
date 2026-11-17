document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema de Gaming inicializado correctamente.");

    const formVoto = document.getElementById("votoForm");
    const mensaje = document.getElementById("mensajeConfirmacion");
    const listaResultados = document.getElementById("listaResultados");
    const btnLimpiarVotos = document.getElementById("btnLimpiarVotos");

    let votos = JSON.parse(localStorage.getItem("votosGaming")) || {
        "PlayStation": 0,
        "Xbox": 0,
        "Nintendo": 0,
        "PC": 0
    };

    
    function actualizarContadores() {
        listaResultados.innerHTML = "";
        for (let plataforma in votos) {
            const li = document.createElement("li");
            li.style.padding = "6px 0";
            li.style.borderBottom = "1px solid #222";
            li.innerHTML = `<strong>${plataforma}:</strong> <span style="color: #00ff66; float: right;">${votos[plataforma]} votos</span>`;
            listaResultados.appendChild(li);
        }
    }

    
    actualizarContadores();

    
    if (formVoto) {
        formVoto.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita recargar la página

            const nombre = document.getElementById("nombre").value.trim();
            const plataformaSeleccionada = document.getElementById("plataforma").value;

            
            if (votos.hasOwnProperty(plataformaSeleccionada)) {
                votos[plataformaSeleccionada]++;
            }

            
            localStorage.setItem("votosGaming", JSON.stringify(votos));

            
            actualizarContadores();

            
            mensaje.textContent = `¡Gracias ${nombre}! Tu voto por ${plataformaSeleccionada} ha sido registrado correctamente. 🎮`;

            
            formVoto.reset();
        });
    }

    
    if (btnLimpiarVotos) {
        btnLimpiarVotos.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas reiniciar todos los votos?")) {
                votos = { "PlayStation": 0, "Xbox": 0, "Nintendo": 0, "PC": 0 };
                localStorage.removeItem("votosGaming");
                actualizarContadores();
                mensaje.textContent = "Los votos han sido reiniciados.";
            }
        });
    }
});
    

    
    const filasTabla = document.querySelectorAll("tbody tr");
    filasTabla.forEach(fila => {
        fila.addEventListener("mouseenter", () => {
            fila.style.cursor = "pointer";
            fila.style.opacity = "0.8";
        });
        fila.addEventListener("mouseleave", () => {
            fila.style.opacity = "1";
        });
    });
