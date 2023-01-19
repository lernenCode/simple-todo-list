let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let nextId = 0;
const titulo = document.querySelector(".titulo");
const adicionar = document.querySelector(".adicionar");
const mainDiv = document.querySelector(".main");

main();

function main() {
  // Adiciona evento de carregar tarefas quando a página é carregada
  window.addEventListener("load", carregarTarefas);
  // Adiciona evento de adicionar tarefa quando o botão Adicionar é clicado
  adicionar.addEventListener("click", botaoAdicionar);

  function botaoAdicionar(evento) {
    if (titulo.value !== "") {
      let tarefa = {
        id: nextId++,
        titulo: convertToUpperLower(titulo.value),
      };
  
      tarefas.push(tarefa);
      criarElementos(tarefa.id, tarefa.titulo);
      titulo.value = "";
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }

  function convertToUpperLower(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }
  
  function criarElementos(id, titulo) {
    var novaDiv = document.createElement("div");
    var novoTitulo = document.createElement("h6");
    var novoBotao = document.createElement("button");
    novoBotao.innerHTML = `<i class='bi bi-check2'></i>`;
    // Adiciona atributo data-id para o botão
    novoBotao.setAttribute("data-id", id);
    novaDiv.appendChild(novoTitulo);
    novaDiv.appendChild(novoBotao);
    mainDiv.appendChild(novaDiv);
    // Adicionar classes do Boostrap e CSS
    novoTitulo.setAttribute("class", "d-inline-block col-10 deco-title pt-1");
    novoBotao.setAttribute("class","d-inline-block float-right button-check col-2 p-2 mx-auto" );
    novaDiv.setAttribute("class", "glassLiquid mt-3 d-flex");
    novoTitulo.innerHTML = titulo;
    // Adiciona evento de excluir tarefa quando o botão é clicado
    novoBotao.addEventListener("click", function (event) {
      deletarTarefa(this);
    });
  }

  function deletarTarefa(tarefaDeletada) {
    // Recupera o array de tarefas salvas no Local Storage
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    // Encontra o id da tarefaDeletada no array
    let id = tarefaDeletada.getAttribute("data-id");
    let tarefaTitulo = document.querySelector(`[data-id='${id}']`).previousSibling;
    tarefaTitulo.classList.add("riscado");
    tarefaDeletada.parentNode.classList.add("deleting");
    setTimeout(() => {
      tarefaDeletada.parentNode.remove();
    }, 500);

    let indexSalvo = tarefasSalvas.findIndex(function (tarefa) {
      return tarefa.id == id;
    });
    // Remove a tarefa do array
    tarefasSalvas.splice(indexSalvo, 1);
    // Atualiza o Local Storage com o novo array
    localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));
    tarefas = tarefasSalvas;
  }

  function carregarTarefas() {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefasSalvas) {
      for (let i = 0; i < tarefasSalvas.length; i++) {
        let tarefa = tarefasSalvas[i];
        criarElementos(tarefa.id, tarefa.titulo);
      }
    }
  }
}
