function togglePassword() {
            const senha = document.getElementById("senha");
            const confirmar = document.getElementById("confirmar");
            const tipo = senha.type === "password" ? "text" : "password";
            senha.type = tipo;
            confirmar.type = tipo;
        }

        function redirecionarHome(event) {
            event.preventDefault();
            window.location.href = "Áreadoaluno.html";
        }