// Atualizar foto de perfil
    document.getElementById('fotoPerfil').addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          document.getElementById('avatarPreview').src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Função para enviar resposta e atualizar status
   
  async function enviarResposta(button) {
    const card = button.closest('.card');
    const fileInput = card.querySelector('.upload');
    const statusSpan = card.querySelector('.status');
    const desafio = card.querySelector('h3').textContent;

    if (fileInput.files.length === 0) {
      alert("Selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", fileInput.files[0]);
    formData.append("desafio", desafio);

    try {
      const response = await fetch("http://localhost:4000/api/enviar", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Falha ao enviar");

      statusSpan.textContent = "Enviado";
      statusSpan.classList.remove("pendente");
      statusSpan.classList.add("enviado");
      button.textContent = "Ver Resposta";
      fileInput.style.display = "none";
    } catch (err) {
      alert("Erro ao enviar resposta.");
      console.error(err);
    }
  }


  