function gerarNota() {
  const nome = document.getElementById("nome").value;
  const contato = document.getElementById("contato").value;
  const cpf = document.getElementById("cpf").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!nome || !contato || !cpf || !pagamento || produtos.length === 0) {
    alert("Preencha todos os dados e adicione produtos!");
    return;
  }

  let nota = `\n\nCLIENTE: ${nome}\nCONTATO: ${contato}\nCPF: ${cpf}\n\nITENS:\n`;

  produtos.forEach(p => {
    nota += `${p.nome} x${p.qtd}  R$ ${p.subtotal.toFixed(2)}\n`;
  });

  nota += "----------------------------------\n";
  nota += `TOTAL: R$ ${total.toFixed(2)}\n`;
  nota += `PAGAMENTO: ${pagamento}\n`;
  nota += "----------------------------------\n";
  nota += "OBRIGADO POR COMPRAR NO PUBLIC!\n";

  document.getElementById("nota").textContent = nota;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 200] 
  });
  
  const pageWidth = 80;

  const logo = new Image();
  logo.src = "../public/public.png"; 
  logo.onload = function () {
    const logoW = 40,
      logoH = 15;
    const x = (pageWidth - logoW) / 2;
    doc.addImage(logo, "PNG", x, 5, logoW, logoH);

    doc.setFont("courier", "normal");
    doc.setFontSize(10);

    let y = 25;
    nota.split("\n").forEach(linha => {
      doc.text(linha, 5, y);
      y += 5;
    });

    const qrImg = new Image();
    qrImg.src = "../public/qrcode.png";

    qrImg.onload = function () {
      const qrSize = 30;
      const qrX = (pageWidth - qrSize) / 2;
      doc.addImage(qrImg, "PNG", qrX, y + 10, qrSize, qrSize);

      doc.save("nota-fiscal.pdf");
    };
  };
}

