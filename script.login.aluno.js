document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value.trim();
    const status = document.getElementById("loginStatus");

    // Simulação de login válido
    if (email === "xnatanx2016@outlook.com" && password === "asaasasas") {
        status.style.color = "lightgreen";
        status.textContent = "Login realizado com sucesso!";

        setTimeout(() => {
            window.location.href = "áreadoaluno.html";
        }, 1000);

    } else {
        alert("E-mail ou senha incorretos.");
        status.style.color = "red";
    }
});

// Mostrar/Esconder senha
document.getElementById("mostrarSenha").addEventListener("change", function () {
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmarSenha");

    const tipo = this.checked ? "text" : "password";
    senha.type = tipo;
    confirmar.type = tipo;
});
