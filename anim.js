// Obtener elementos de la canción y las letras
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");
var flowers = document.querySelector(".flowers");
var titulo = document.querySelector(".titulo");

// Asegurar que el volumen esté al 100%
audio.volume = 1.0;

// Ocultar las flores al inicio
flowers.style.display = "none";
flowers.style.opacity = 0;

// Mostrar las flores 2 segundos antes de que inicie la letra
audio.addEventListener("timeupdate", function () {
  if (audio.currentTime >= 80) {
    flowers.style.display = "block";
    flowers.style.opacity = 1;
  }
});

// Mostrar el texto primero por 1 minuto y 20 segundos antes de iniciar la animación de las flores
audio.addEventListener("play", function () {
  setTimeout(() => {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(() => {
      titulo.style.display = "none";
      flowers.style.display = "block";
      flowers.style.opacity = 1;
    }, 3000);
  }, 80000); // 1 minuto y 20 segundos
});


// Función para actualizar manualmente la letra
function setLyrics(text) {
  lyrics.style.opacity = 0;
  setTimeout(() => {
    lyrics.innerHTML = text;
    lyrics.style.opacity = 1;
  }, 200);
}


// Array de objetos con la letra sincronizada con el tiempo de la canción (en segundos)
var lyricsData = [
  { text: "Time changed", time: 81 },
  { text: "We're different", time: 82.2 },
  { text: "But my mind still says redundant things", time: 83.5 },
  { text: "Can I not think?", time: 86.7 },
  { text: "Will you love this part of me?", time: 89 },
  { text: "My lover is a day I can't forget", time: 92.9 },
  { text: "Furthering my distance from you", time: 100.6 },
  { text: "Realistically, I can't leave now", time: 104.7 },
  { text: "But I'm okay as long as you", time: 109 },
  { text: "Keep me from going crazy", time: 112.5 },
  { text: "Keep me from going crazy", time: 117.2 },
  { text: "Straight up ahead", time: 123 },
  { text: "You'll find a sign that says you can't get by with a lie", time: 125.3 },
  { text: "But if I stayed away by a thread from the glory path", time: 133 },
  { text: "And made my life harder lying bout the stupid shit I say", time: 139 },
  { text: "Then you wouldn't know a single thing about how I feel about you", time: 143.8 },
  { text: "And all those really dumb things people feel", time: 152 },
  { text: "I'll take the bumpy road, it'll probably break my legs", time: 155 },
  { text: "Mi amor por usted es gigante, no lo supe demostrar, y el dolor me invade al saber que le demostré lo contrario", time: 160 },
  { text: "Mi injustificada irá, me quito la visión y me dejo de nuevo apartado de usted, mi ratoncito", time: 165.6 },
  { text: "Me aflige darme cuenta de que tengo que vivir este dolor tan intenso y profundo", time: 170.2 },
  { text: "Para valorar mucho más su grandísimo amor por mí, gimiendo por el arrepentimiento de todo el dolor que le causé", time: 175.7 },
  { text: "No pretendo dar lástima, y mucho menos suplicar su perdón, pero si es verdad que", time: 182 },
  { text: "Me and Mister Heart we say the cutest things about you", time: 187 },
  { text: "How you seem unreal and we'd probably die so quick without you", time: 192.5 },
  { text: "Suffocated from the radiated air around us full of happiness", time: 198 },
  { text: "We don't have brightness gone so dark without you girl", time: 204 },
  { text: "Perdón Aleja", time: 209 },
  { text: "Te amo demasiado", time: 210.5 },
  { text: "Eres una excelente mujer, y me duele que te hayas apartado por mi culpa", time: 211.7 },
  { text: "Ahora amo mucho más cada momento", time: 215 },
  { text: "Que vivimos juntos, como si fueran recientes", time: 217.3 },
  { text: "Por eso elegí esta canción, una de las cuales nos hizo despertar el sólido amor que ahora sentimos", time: 220.9 },
  { text: "No dudes del propósito de Dios, Él es muy fiel", time: 229.3 },
  { text: "Mi amor nunca se va a acabar por ti, eres mi futura esposa", time: 232.8 },
  { text: "Te amo demasiado, no me arrepiento de absolutamente nada contigo, gracias por todo", time: 237.5 },
  { text: "Mi amor por Dios, es mucho más grande", time: 240.7 },
  { text: "Por eso voy a demostrarte que cambiaré, para Dios, por Dios, para nosotros y por nosotros", time: 246.2 },
  { text: "Respeto tu decisión y me arrepiento de que la hayas tomado por mis acciones, nunca debiste sentir lo que te cause, pero acá estoy con la frente en alto asumiendo mi error y apartándome del pecado que me hizo alejarte", time: 253 },
  { text: "No soy nadie para juzgar tus acciones y tus decisiones, te pido que me perdones por todo lo malo que te hice y exprese, así mismo te perdono por las cosas que hiciste mal", time: 264 },
  { text: "Reconciliémonos con Dios, Él es el único que conoce nuestros corazones, y el único que sabe nuestro futuro", time: 274 },
  { text: "2 Corintios 5:17-20", time: 281 },
  { text: "Te amo mi Ratoncito, acá estaré esperándote con los brazos muy abiertos.", time: 286 },

];

// Ajuste de offset para corregir desincronización
var offset = 0.3; // Ajusta manualmente si hay delay

// Función para actualizar la letra
function updateLyrics() {
  var currentTime = audio.currentTime - offset;

  // Buscar la línea de la letra que coincide con el tiempo actual
  var currentLine = lyricsData.find((line, index) => {
    var nextLine = lyricsData[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  if (currentLine) {
    lyrics.innerHTML = currentLine.text;
    lyrics.style.opacity = 1;
  } else {
    lyrics.innerHTML = "";
    lyrics.style.opacity = 0;
  }
}

window.onload = function () {
  document.querySelector(".titulo-container").scrollTop = 0;
};


// Llamar a updateLyrics cada 500ms
setInterval(updateLyrics, 500);


// Evita el desplazamiento con los dedos sin bloquear otras interacciones
document.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Bloquea el desplazamiento
}, { passive: false });

document.addEventListener("DOMContentLoaded", function () {
  const h1Container = document.querySelector(".h1-container");

  // Evita que el desplazamiento se bloquee en móviles
  h1Container.addEventListener("touchmove", function (e) {
      e.preventDefault();
      h1Container.scrollTop += e.touches[0].clientY * 0.1; // Ajusta la velocidad del scroll
  }, { passive: false });
});

