document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let sobrenome = document.getElementById("sobrenome").value;
    let usuario = document.getElementById("usuario").value;
    let cpf = document.getElementById("cpf").value;
    let data_nascimento = document.getElementById("data").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmar_senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5500/Genius-hub/Cadastro.html", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome, sobrenome, usuario, cpf, data_nascimento, email, senha
            })
        });

        if (response.ok) {
            const resultado = await response.json();
            alert(resultado.mensagem || resultado.erro);
        } else {
            throw new Error('Erro na requisição');
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        alert("Ocorreu um erro ao cadastrar.");
    }
});
