let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let nextId = 0;
const titulo = document.querySelector(".titulo");
const descricao = document.querySelector(".descricao");
const adicionar = document.querySelector(".adicionar");
const mainDiv = document.querySelector(".main");

main();

function main() 
{
  // Adiciona evento de carregar tarefas quando a página é carregada
  window.addEventListener("load", carregarTarefas);
  // Adiciona evento de adicionar tarefa quando o botão Adicionar é clicado
  adicionar.addEventListener("click", botaoAdicionar);

  function botaoAdicionar(evento) 
  {
    if (titulo.value !== "") 
    {
        let tarefa = 
        {
          id: nextId++,
          titulo: titulo.value,
          descricao: descricao.value,
        }
        
        tarefas.push(tarefa);
        criarElementos(tarefa.id, tarefa.titulo, tarefa.descricao);
        titulo.value = "";
        descricao.value = "";
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }

  function criarElementos(id, titulo, descricao) 
  {
    var novaDiv = document.createElement("div");
    var novoTitulo = document.createElement("h6");
    var novoBotao = document.createElement("button");
    var novaDescricao = document.createElement("p");
    novoBotao.innerHTML = `<i class='bi bi-check2'></i>`;
    // Adiciona atributo data-id para o botão
    novoBotao.setAttribute("data-id", id);
    novaDiv.appendChild(novoTitulo);
    novaDiv.appendChild(novoBotao);
    novaDiv.appendChild(novaDescricao);
    mainDiv.appendChild(novaDiv);
    // Adicionar classes do Boostrap e CSS
    novoTitulo.setAttribute("class", "d-inline-block col-10 deco-title");
    novoBotao.setAttribute("class", "d-inline-block float-right button-check col-2 p-2");
    novaDescricao.setAttribute("class", "col-12 mt-0 pb-3 text-break deco-descricao");
    novaDiv.setAttribute("class", "glassLiquid mt-3");
    //
    novoTitulo.innerHTML = titulo;
    novaDescricao.innerHTML = descricao;
    // Adiciona evento de excluir tarefa quando o botão é clicado
    novoBotao.addEventListener("click", function () 
    {excluir(this); deletarTarefa(this);});
  }

  function excluir(tarefaDeletada) 
  {
    tarefaDeletada.parentNode.remove();
  }

  function deletarTarefa(tarefaDeletada) 
  {
    // Recupera o array de tarefas salvas no Local Storage
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    // Encontra o id da tarefaDeletada no array
    let id = tarefaDeletada.getAttribute("data-id");

    let indexSalvo = tarefasSalvas.findIndex(function (tarefa) 
    {return tarefa.id === id;});

    // Remove a tarefa do array
    tarefasSalvas.splice(indexSalvo, 1);
    // Atualiza o Local Storage com o novo array
    localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));
    tarefas = tarefasSalvas;
  }

  function carregarTarefas() 
  {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefasSalvas) 
    {
      tarefasSalvas.forEach(function (tarefa) 
      {criarElementos(tarefa.id, tarefa.titulo, tarefa.descricao);});
    }
  }
}
