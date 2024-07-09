document.addEventListener('DOMContentLoaded', function() {
    const textoEntrada = document.getElementById('textoEntrada');
    const textoSalida = document.getElementById('textoSalida');
    const btnCifrar = document.getElementById('btnCifrar');
    const btnDescifrar = document.getElementById('btnDescifrar');
    const btnCopiar = document.getElementById('btnCopiar');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const outputSection = document.getElementById('outputSection');
    const imagen = document.querySelector('.imagen');
    const mensajeInicial = document.getElementById('mensajeInicial');

    function checkTextInput() {
        if (textoEntrada.value.trim() === '') {
            imagen.style.display = 'block';
            outputSection.classList.remove('active');
            mensajeInicial.style.display = 'block';
        } else {
            imagen.style.display = 'none';
            outputSection.classList.add('active');
            mensajeInicial.style.display = 'none';
        }
    }

    textoEntrada.addEventListener('input', checkTextInput);

    btnCifrar.addEventListener('click', () => {
        const texto = textoEntrada.value;

        if (!validarTexto(texto)) {
            mensajeValidacion.textContent = 'No se aceptan mayúsculas ni caracteres especiales.';
            return;
        }

        mensajeValidacion.textContent = '';
        const textoCifrado = cifrarTexto(texto);
        textoSalida.value = textoCifrado;
        btnCopiar.style.display = textoCifrado ? 'block' : 'none';
    });

    function cifrarTexto(texto) {
        let resultado = '';
        for (let i = 0; i < texto.length; i++) {
            switch (texto[i]) {
                case 'e':
                    resultado += 'enter';
                    break;
                case 'i':
                    resultado += 'imes';
                    break;
                case 'a':
                    resultado += 'ai';
                    break;
                case 'o':
                    resultado += 'ober';
                    break;
                case 'u':
                    resultado += 'ufat';
                    break;
                default:
                    resultado += texto[i];
            }
        }
        return resultado;
    }

    btnDescifrar.addEventListener('click', () => {
        const texto = textoEntrada.value;

        if (!validarTexto(texto)) {
            mensajeValidacion.textContent = 'No se aceptan mayúsculas ni caracteres especiales.';
            return;
        }

        mensajeValidacion.textContent = '';
        const textoDescifrado = descifrarTexto(texto);
        textoSalida.value = textoDescifrado;
        btnCopiar.style.display = textoDescifrado ? 'block' : 'none';
    });

    function descifrarTexto(texto) {
        let resultado = '';
        let i = 0;
        while (i < texto.length) {
            let substring = texto.substring(i, i + 4);
            switch (substring) {
                case 'enter':
                    resultado += 'e';
                    i += 4;
                    break;
                case 'imes':
                    resultado += 'i';
                    i += 4;
                    break;
                case 'ai':
                    resultado += 'a';
                    i += 2;
                    break;
                case 'ober':
                    resultado += 'o';
                    i += 4;
                    break;
                case 'ufat':
                    resultado += 'u';
                    i += 4;
                    break;
                default:
                    resultado += texto[i];
                    i++;
            }
        }
        return resultado;
    }

    function validarTexto(texto) {
        const regex = /^[a-z\s]*$/;
        return regex.test(texto);
    }

    btnCopiar.addEventListener('click', () => {
        textoSalida.select();
        document.execCommand('copy');
    });

    checkTextInput();
});
