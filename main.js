// Lista de palabras para adivinar
const nombrePokemon = ["pikachu", "charmander", "bulbasaur", "squirtle"];

// Función para seleccionar una palabra al azar
function seleccionarPalabra() {
  return nombrePokemon[Math.floor(Math.random() * nombrePokemon.length)];
}

// Función para inicializar la palabra oculta con guiones bajos
function escondePalabraOculta(palabra) {
  return "_ ".repeat(palabra.length);
}

// Función para mostrar la palabra oculta en la consola
function mostrarPalabra(pokemonOculto) {
  alert("Nombra a este Pokémon: " + pokemonOculto);
}

// Función para manejar la adivinanza de una letra
function adivinaPalabra(pokemonSecreto, pokemonOculto, intentosRestantes) {
  const letra = prompt("Dime una letra o adivina el nombre del Pokémon:").toLowerCase();

  if (letra === pokemonSecreto) {
    alert("¡Felicidades! Ya tienes tu medalla del Gimnasio Javascript el Pokémon era:" + pokemonSecreto);
    return { juegoTerminado: true, intentosRestantes };
  } else if (letra.length !== 1 || !/^[a-z]$/.test(letra)) {
    alert("Esa no es una letra válida.");
  } else {
    let acierto = false;
    let palabraVisible = "";

    for (let i = 0; i < pokemonSecreto.length; i++) {
      const index = i * 2;

      if (pokemonSecreto[i] === letra) {
        palabraVisible += letra + " ";
        acierto = true;
      } else {
        palabraVisible += pokemonOculto[index] + " ";
      }
    }

    if (!acierto) {
      intentosRestantes--;
      alert("Incorrecto. Intentos restantes: " + intentosRestantes);
    }

    pokemonOculto = palabraVisible.trim();

    if (intentosRestantes === 0) {
      alert("¡Oh no Perdiste! Visita a la enfermera Joy para reponer tus Pokémones. El Pokémon era: " + pokemonSecreto);
      return { juegoTerminado: true, intentosRestantes };
    } else if (pokemonOculto === pokemonSecreto) {
      alert("¡Felicidades! Ya tienes tu medalla del Gimnasio Javascript el Pokémon era: " + pokemonSecreto);
      return { juegoTerminado: true, intentosRestantes };
    }
  }

  // Muestra la palabra actualizada en la consola después de la lógica de adivinanza
  mostrarPalabra(pokemonOculto);

  // El juego no ha terminado
  return { juegoTerminado: false, intentosRestantes };
}

// Bucle principal del juego
let seguirJugando = true;

while (seguirJugando) {
  // Selecciona una palabra al azar
  let pokemonSecreto = seleccionarPalabra();

  // Palabra oculta con guiones bajos
  let pokemonOculto = escondePalabraOculta(pokemonSecreto);

  // Número de intentos restantes
  let intentosRestantes = 6;

  // Muestra la alerta inicial
alert("¿Quién es ese Pokémon? Juguemos al ahorcado");

  // Muestra la palabra oculta inicial
  mostrarPalabra(pokemonOculto);

  // Bucle del juego actual
  while (intentosRestantes > 0 && pokemonOculto !== pokemonSecreto) {
    
    // Maneja la adivinanza de una letra y verifica si el juego ha terminado
    const resultado = adivinaPalabra(pokemonSecreto, pokemonOculto, intentosRestantes);
    
    intentosRestantes = resultado.intentosRestantes;
  
    if (resultado.juegoTerminado) {
      break;  // El juego ha terminado, sal del bucle interno
    }
  }  

  // Pregunta al usuario si quiere seguir jugando
  seguirJugando = confirm("¿Quieres seguir jugando?");

  // Si el usuario quiere seguir jugando, comienza el bucle de nuevo
}

// Fin del juego
alert("Gracias por jugar. ¡Vuelve pronto para más aventuras Pokémon!");