// A função é chamada a partir do HTML com "enviarResposta(this)"
function enviarResposta(buttonElement) {
    // 1. Encontra o Card pai (o desafio)
    const card = buttonElement.closest('.card');
    
    // 2. Coleta o nome do desafio (H3)
    const desafioTitulo = card.querySelector('h3').textContent;
    
    // 3. Coleta o campo de arquivo (Input File)
    const fileInput = card.querySelector('.upload');
    const file = fileInput.files[0];

    // Validação básica
    if (!file) {
        alert("Por favor, selecione um arquivo para enviar.");
        return;
    }

    // O FormData é essencial para enviar arquivos via fetch()
    const formData = new FormData();
    formData.append('desafio', desafioTitulo);
    formData.append('alunoId', 'aluno-teste-01');
    formData.append('respostaFile', file);
    
    // Exemplo de URL do seu servidor de Back-end (Node.js/Express, por exemplo)
    const urlAPI = 'http://localhost:3000/api/enviar-resposta'; 

    buttonElement.disabled = true; // Desabilita o botão para evitar cliques duplicados
    buttonElement.textContent = 'Enviando...';

    fetch(urlAPI, {
        method: 'POST',
        // O navegador define o Content-Type automaticamente para FormData
        body: formData 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha no envio da resposta. Código: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        alert("Resposta enviada com sucesso! Aguarde a correção.");
        
        // Atualiza o Status no Front-end
        const statusSpan = card.querySelector('.status.pendente');
        if(statusSpan) {
            statusSpan.textContent = 'Enviado';
            statusSpan.classList.remove('pendente');
            statusSpan.classList.add('enviado');
        }
    })
    .catch(error => {
        console.error('Erro de envio:', error);
        alert('Erro ao enviar a resposta: ' + error.message);
    })
    .finally(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Enviar Resposta';
    });
}

// Implementar a função verResposta para carregar a nota/feedback
function verResposta() {
    alert("Função 'Ver Resposta' a ser implementada com a chamada à API.");
    // Aqui você faria um fetch(URL_DA_API_PARA_RESPOSTA) para buscar o feedback
}

// Função para mudar a foto do perfil (opcional)
document.getElementById('fotoPerfil').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function(){
        const output = document.getElementById('avatarPreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

function verRespostas(desafio) {
    const idTarget = `respostas${desafio.replace(/ /g, '')}`;
    const divRespostas = document.getElementById(idTarget);

    if (!divRespostas) return;

    // Atualiza a URL da API para usar o novo Back-end
    const urlAPI = `http://localhost:3000/api/respostas/${encodeURIComponent(desafio)}`;
    
    divRespostas.innerHTML = '<p class="loading-msg">Carregando respostas...</p>'; 

    fetch(urlAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede ao buscar respostas: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            divRespostas.innerHTML = '';
            
            if (data.length === 0) {
                divRespostas.innerHTML = '<p class="no-answer">Nenhuma resposta ainda.</p>';
            } else {
                data.forEach(resposta => {
                    const respostaDiv = document.createElement('div');
                    respostaDiv.classList.add('resposta');
                    respostaDiv.innerHTML = `
                        <h4>Resposta de ${resposta.alunoId}</h4>
                        <p><strong>Arquivo:</strong> <a href="http://localhost:3000${resposta.caminho}" target="_blank">Download (${resposta.filename})</a></p>
                        <p><strong>Status:</strong> ${resposta.status}</p>
                        <p><small>Enviado em: ${new Date(resposta.timestamp).toLocaleString()}</small></p>
                    `;
                    divRespostas.appendChild(respostaDiv);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar respostas:', error);
            divRespostas.innerHTML = `<p class="error-msg">Erro: ${error.message}</p>`;
        });
}