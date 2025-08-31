let produtos = [];
let total = 0;

function adicionarProduto() {
  const nome = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("quantidade").value);
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || qtd <= 0 || preco < 0) {
    alert("Preencha os dados corretamente!");
    return;
  }

  const subtotal = qtd * preco;
  produtos.push({ nome, qtd, preco, subtotal });
  total += subtotal;

  limparCampos();
  atualizarTabela();
}

function atualizarTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  produtos.forEach((p, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.qtd}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>R$ ${p.subtotal.toFixed(2)}</td>
        <td>
          <div class="btn-group">
            <button class="btn-editar" onclick="editarProduto(${index})"></button>
            <button class="btn-excluir" onclick="removerProduto(${index})"></button>
            </div>
        </td>
      </tr>
    `;
  });

  document.getElementById("total").textContent = total.toFixed(2);
}

function removerProduto(index) {
  total -= produtos[index].subtotal;
  produtos.splice(index, 1);
  atualizarTabela();
}

function editarProduto(index) {
  const produto = produtos[index];

  document.getElementById("produto").value = produto.nome;
  document.getElementById("quantidade").value = produto.qtd;
  document.getElementById("preco").value = produto.preco;

  total -= produto.subtotal;
  produtos.splice(index, 1);
  atualizarTabela();
}

function limparCampos() {
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = 1;
  document.getElementById("preco").value = 0;
}

function limparTudo() {
  produtos = [];
  total = 0;

  atualizarTabela();

  document.getElementById("nome").value = "";
  document.getElementById("contato").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("pagamento").value = "";

  limparCampos();

  document.getElementById("nota").textContent = "";
}