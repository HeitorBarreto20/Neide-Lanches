(function(){
  /* ---------- Número de WhatsApp da Neide ---------- */
  var numeroWhatsApp = "5584988562274"; // +55 84 98856-2274

  /* Monta o link do whatsapp de cada card usando o nome do produto */
  document.querySelectorAll(".btn-whatsapp").forEach(function(btn){
    var card = btn.closest(".card");
    var nome = card.querySelector(".card__nome").textContent.trim();
    var mensagem = "Olá! Vi o site da Neide Lanches e tenho interesse no produto: " + nome;
    btn.setAttribute("href", "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });

  /* ---------- Carrossel automático ---------- */
  var track = document.getElementById("carrosselTrack");
  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = document.getElementById("carrosselDots");
  var total = slides.length;
  var atual = 0;
  var intervalo;
  var TEMPO = 4000; // troca de imagem a cada 4s

  slides.forEach(function(_, i){
    var dot = document.createElement("button");
    dot.className = "carrossel__dot" + (i === 0 ? " ativo" : "");
    dot.setAttribute("aria-label", "Ir para imagem " + (i + 1));
    dot.addEventListener("click", function(){ irPara(i); reiniciarAuto(); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function irPara(indice){
    atual = (indice + total) % total;
    track.style.transform = "translateX(-" + (atual * 100) + "%)";
    dots.forEach(function(d, i){ d.classList.toggle("ativo", i === atual); });
  }

  function proxima(){ irPara(atual + 1); }
  function anterior(){ irPara(atual - 1); }

  function iniciarAuto(){ intervalo = setInterval(proxima, TEMPO); }
  function reiniciarAuto(){ clearInterval(intervalo); iniciarAuto(); }

  document.getElementById("setaNext").addEventListener("click", function(){ proxima(); reiniciarAuto(); });
  document.getElementById("setaPrev").addEventListener("click", function(){ anterior(); reiniciarAuto(); });

  var carrossel = document.getElementById("carrossel");
  carrossel.addEventListener("mouseenter", function(){ clearInterval(intervalo); });
  carrossel.addEventListener("mouseleave", iniciarAuto);

  iniciarAuto();
})();
