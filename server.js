let Alunos = [];

document.getElementById('entrada-opcao').addEventListener('input', function () {
    const opcao = this.value;

    document.getElementById('formulario-cadastro').style.display = 'none';
    document.getElementById('relatorio-alunos').style.display = 'none';

    switch (opcao) {
        case '1':
            document.getElementById('formulario-cadastro').style.display = 'block';
            break;
        case '2':
            mostrarRelatorio(ordenarPorNome(Alunos));
            break;
        case '3':
            mostrarRelatorio(ordenarPorRA(Alunos));
            break;
        case '4':
            const aprovados = Alunos.filter(a => a.resultado === 'aprovado');
            mostrarRelatorio(ordenarPorNome(aprovados));
            break;
        case '5':
            const confirmar = confirm('Deseja realmente encerrar a aplicação?');
            if (confirmar) {
                document.body.innerHTML = "<h2>Aplicação encerrada. Obrigado por utilizar!</h2>";
            }
            break;
        default:
            console.warn('Opção inválida.');
    }
});

document.getElementById('cadastrar-aluno').addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const ra = document.getElementById('ra').value;
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const media = parseFloat(document.getElementById('media').value);
    const resultado = document.getElementById('resultado').value;

    if (!nome || !ra || isNaN(idade) || !sexo || isNaN(media) || !resultado) {
        alert('Preencha todos os campos.');
        return;
    }

    const aluno = { nome, ra, idade, sexo, media, resultado };
    Alunos.push(aluno);

    document.getElementById('cadastro-aluno-form').reset();
    alert('Aluno cadastrado com sucesso!');
});

function ordenarPorNome(lista) {
    const novaLista = [...lista];

    for (let i = 0; i < novaLista.length - 1; i++) {
        for (let j = 0; j < novaLista.length - i - 1; j++) {
            if (novaLista[j].nome.localeCompare(novaLista[j + 1].nome) > 0) {
                // trocar a ordem nos nomes
                const temp = novaLista[j];
                novaLista[j] = novaLista[j + 1];
                novaLista[j + 1] = temp;
            }
        }
    }

    return novaLista;
}


function ordenarPorRA(lista) {
    const novaLista = [...lista];

    for (let i = 0; i < novaLista.length - 1; i++) {
        for (let j = 0; j < novaLista.length - i - 1; j++) {
            if (novaLista[j].ra < novaLista[j + 1].ra) {
                const temp = novaLista[j];
                novaLista[j] = novaLista[j + 1];
                novaLista[j + 1] = temp;
            }
        }
    }

    return novaLista;
}

function mostrarRelatorio(lista) {
    const divRelatorio = document.getElementById('relatorio-alunos');
    const conteudoRelatorio = document.getElementById('conteudo-relatorio');

    if (lista.length === 0) {
        conteudoRelatorio.innerHTML = "<p>Nenhum aluno para exibir.</p>";
    } else {
        let html = '';
        lista.forEach(a => {
            html += `
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <strong>Nome:</strong> ${a.nome}<br>
          <strong>RA:</strong> ${a.ra}<br>
          <strong>Idade:</strong> ${a.idade}<br>
          <strong>Sexo:</strong> ${a.sexo}<br>
          <strong>Média:</strong> ${a.media}<br>
          <strong>Resultado:</strong> ${a.resultado}
        </div>
      `;
        });
        conteudoRelatorio.innerHTML = html;
    }

    divRelatorio.style.display = 'block';
}
