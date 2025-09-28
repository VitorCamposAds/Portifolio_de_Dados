// animação barra-lateral
document.querySelectorAll("#Close-menu").forEach(function (element) {
  element.addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("show-menu");
  });
});

// orçamento — só roda se elementos existirem
const qtdeInput = document.querySelector("#qtde");
const jsCheck = document.querySelector("#js");
const layoutSim = document.querySelector("#layout-sim");
const layoutNao = document.querySelector("#layout-nao");
const prazoInput = document.querySelector("#prazo");

if (qtdeInput && jsCheck && layoutSim && layoutNao && prazoInput) {
  qtdeInput.addEventListener("change", atualizarPreco);
  jsCheck.addEventListener("change", atualizarPreco);
  layoutSim.addEventListener("change", atualizarPreco);
  layoutNao.addEventListener("change", atualizarPreco);

  prazoInput.addEventListener("change", function () {
    const prazo = prazoInput.value;
    const prazoLabel = document.querySelector("label[for=prazo]");
    if (prazoLabel) {
      prazoLabel.innerHTML = `Prazo: ${prazo} semanas`;
    }
    atualizarPreco();
  });

  // chama ao iniciar para mostrar preço correto
  atualizarPreco();
}

function atualizarPreco() {
  const qtde = document.querySelector("#qtde");
  const temJS = document.querySelector("#js");
  const incluiLayout = document.querySelector("#layout-sim");
  const prazo = document.querySelector("#prazo");
  const precoLabel = document.querySelector("#preco");

  if (!qtde || !temJS || !incluiLayout || !prazo || !precoLabel) return;

  const qtdeVal = Number(qtde.value) || 0;
  const temJSVal = temJS.checked;
  const incluiLayoutVal = incluiLayout.checked;
  const prazoVal = Number(prazo.value) || 1;

  let preco = qtdeVal * 100;
  if (temJSVal) preco *= 1.1;
  if (incluiLayoutVal) preco += 500;
  let taxaUrgencia = 1 - prazoVal * 0.1;
  preco *= 1 + taxaUrgencia;

  precoLabel.innerHTML = `R$ ${preco.toFixed(2)}`;
}

// função debounce
function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// animação rolagem
const target = document.querySelectorAll("[data-anime]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.scrollY + (window.innerHeight * 3) / 4;
  target.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });
}

if (target.length) {
  window.addEventListener(
    "scroll",
    debounce(function () {
      animeScroll();
    }, 10)
  );
}
