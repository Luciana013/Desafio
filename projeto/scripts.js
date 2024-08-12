$(document).ready(() => {
    $('#cnpj').mask('00.000.000/0000-00');
    $('#codigo-postal').mask('00000-000');
    $('#num-telefone').mask('(00) 00000-0000');

    $('#email-contato').on('input', function () {
        const email = $(this).val();
        if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $(this).addClass('is-invalid');
            if (!$('.invalid-feedback').length) {
                $(this).after('<div class="invalid-feedback">E-mail inválido.</div>');
            }
        } else {
            $(this).removeClass('is-invalid');
            $('.invalid-feedback').remove();
        }
    });

    const limparErro = () => {
        $('#codigo-postal').removeClass('is-invalid');
        $('.invalid-feedback').remove();
    };

    const buscarEndereco = () => {
        const cep = $('#codigo-postal').val().replace(/\D/g, '');
        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, data => {
                if (!data.erro) {
                    $('#rua').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#municipio').val(data.localidade);
                    $('#estado').val(data.uf);
                    limparErro();
                } else {
                    mostrarErro();
                }
            });
        } else {
            mostrarErro();
        }
    };

    const mostrarErro = () => {
        $('#codigo-postal').addClass('is-invalid');
        if (!$('.invalid-feedback').length) {
            $('#codigo-postal').after('<div class="invalid-feedback">CEP não encontrado.</div>');
        }
    };

    // buscar CEP automaticamente
    $('#codigo-postal').on('blur', buscarEndereco);
    $('#codigo-postal').on('keypress', e => {
        if (e.which === 13) {
            e.preventDefault();
            buscarEndereco();
        }
    });

    $('#codigo-postal').on('input', limparErro);

    let contador = 0;

    window.produto = () => {
        contador++;
        const tab = $("#lista-itens tbody");
        const outra = $('<tr>').addClass('produto');

        const linha = `
            <td class="text-center" style="padding-top:50px;">
                <button onclick="excluirProd(this)" class="btn btn-danger input-borda-preta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 17 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zzm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                    </svg>
                </button>
            </td>
            <td>
                <div class="border rounded border-dark p-2">
                    <h5 class="font-weight-bold">Produto ${contador}</h5>
                    <div class="row mt-3 mb-3">
                        <div class="col-md-2 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#808080" viewBox="0 0 24 24" style="width: 120px; height: 120px;">
                                <path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"/>
                            </svg>
                        </div>
                        <div class="col-md-10">
                            <label for="produto-${contador}" class="font-weight-bold">Produto</label>
                            <input type="text" class="form-control input-borda-preta" id="produto-${contador}" name="produto[]" required>
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="unidade_medida-${contador}" class="font-weight-bold">UND. Medida</label>
                                    <select class="form-control input-borda-preta" id="unidade_medida-${contador}" name="unidade_medida[]" required>
                                        <option value="" selected></option>
                                        <option value="KG">KG</option>
                                        <option value="Unidade">Unidade</option>
                                        <option value="Caixa">Caixa</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="quantidade-${contador}" class="font-weight-bold">QTDE. em Estoque</label>
                                    <input type="number" class="form-control input-borda-preta" id="quantidade-${contador}" name="quantidade[]" min="0" required oninput="total()">
                                </div>
                                <div class="col-md-3">
                                    <label for="preco-${contador}" class="font-weight-bold">Preço Unitário</label>
                                    <input type="number" class="form-control input-borda-preta" id="preco-${contador}" name="preco[]" step="0.01" min="0" required oninput="total()">
                                </div>
                                <div class="col-md-3">
                                    <label for="valor_total-${contador}" class="font-weight-bold">Valor Total</label>
                                    <input type="number" class="form-control input-borda-preta" id="valor_total-${contador}" name="valor_total[]" readonly required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        `;

        outra.html(linha);
        tab.append(outra);
    };

    window.total = () => {
        $(".produto").each(function() {
            const id = $(this).find('input[name="quantidade[]"]').attr('id').split('-')[1];
            const quantidade = parseFloat($(`#quantidade-${id}`).val()) || 0;
            const preco = parseFloat($(`#preco-${id}`).val()) || 0;
            const valorTotal = quantidade * preco;
            $(`#valor_total-${id}`).val(valorTotal.toFixed(2));
        });
    };

    window.excluirProd = (button) => {
        $(button).closest('tr').remove();
        atualizarContadores();
    };

    window.atualizarContadores = () => {
        contador = 0;
        $(".produto").each(function(index) {
            contador++;
            const id = contador;
            $(this).find('h5').text(`Produto ${id}`);
            $(this).find('input[name="quantidade[]"]').attr('id', `quantidade-${id}`);
            $(this).find('input[name="preco[]"]').attr('id', `preco-${id}`);
            $(this).find('input[name="valor_total[]"]').attr('id', `valor_total-${id}`);
            $(this).find('input[name="produto[]"]').attr('id', `produto-${id}`);
            $(this).find('select[name="unidade_medida[]"]').attr('id', `unidade_medida-${id}`);
        });
    };

    window.addEventListener('beforeunload', () => {
        sessionStorage.removeItem('documentos');
    });

    window.anexo = () => {
        const arquivoInput = $('#inputDocumento')[0];
        const arquivo = arquivoInput.files[0];

        if (arquivo) {
            const documentos = JSON.parse(sessionStorage.getItem('documentos') || '[]');
            const documentoNumero = documentos.length + 1;
            const nomeDocumento = `Documento Anexo ${documentoNumero}`;
            const arquivoURL = URL.createObjectURL(arquivo);

            documentos.push({
                name: nomeDocumento,
                url: arquivoURL
            });
            sessionStorage.setItem('documentos', JSON.stringify(documentos));

            TabDoc();

            arquivoInput.value = '';
        } else {
            alert('Por favor, selecione um documento para adicionar.');
        }
    };

    window.excluirDoc = (button) => {
        const linha = $(button).closest('tr');
        let documentos = JSON.parse(sessionStorage.getItem('documentos') || '[]');
        const arquivoName = linha.find('label').text();

        documentos = documentos.filter(doc => doc.name !== arquivoName);
        sessionStorage.setItem('documentos', JSON.stringify(documentos));

        TabDoc();
    };

    // atualiza e renumera
    const TabDoc = () => {
        const documentos = JSON.parse(sessionStorage.getItem('documentos') || '[]');
        const tab = $("#lista-documentos tbody");
        tab.empty();

        documentos.forEach((doc, index) => {
            const documentoNumero = index + 1;
            const nomeDocumento = `Documento Anexo ${documentoNumero}`;
            doc.name = nomeDocumento;

            const outra = $('<tr>').addClass('documento');
            const linha = `
                <td>
                    <div class="row mt-1">
                        <div class="col-auto px-3">
                            <button onclick="excluirDoc(this)" class="btn btn-danger input-borda-preta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 17 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zzm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="col-auto px-1">
                            <button onclick="visualizarDoc(this)" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 17 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="col-md-10 d-flex align-items-center">
                            <label for="" class="text-sm">${nomeDocumento}</label>
                        </div>
                    </div>
                </td>
            `;

            outra.html(linha);
            tab.append(outra);
        });

        sessionStorage.setItem('documentos', JSON.stringify(documentos));
    };

    // visualizar (baixar) 
    window.visualizarDoc = (button) => {
        const documento = $(button).closest('tr').find('label').text();
        const documentos = JSON.parse(sessionStorage.getItem('documentos') || '[]');
        const doc = documentos.find(d => d.name === documento);

        if (doc) {
            const a = document.createElement('a');
            a.href = doc.url;
            a.download = doc.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Nenhum documento encontrado para visualização.');
        }
    };

    window.verificarDoc = () => {
        const documentos = JSON.parse(sessionStorage.getItem('documentos') || '[]');
        if (documentos.length === 0) {
            alert('É obrigatório anexar pelo menos um documento.');
        } else {
            alert('Documentos prontos para envio.');
        }
    };

    // validar
    const validarCampos = () => {
        let isValid = true;
        const mensagens = [];

        const razaoSocial = $('#razaoSocial').val();
        const nomeFantasia = $('#nome-ficticio').val();
        const cnpj = $('#cnpj').val().replace(/\D/g, '');
        const nomeContato = $('#responsavel').val();
        const telefoneContato = $('#num-telefone').val().replace(/\D/g, '');
        const emailContato = $('#email-contato').val();
        const produtos = $(".produto").length > 0;
        const anexos = JSON.parse(sessionStorage.getItem('documentos') || '[]').length > 0;

        if (!razaoSocial) {
            isValid = false;
            mensagens.push("Razão Social é obrigatório.");
        }
        if (!nomeFantasia) {
            isValid = false;
            mensagens.push("Nome Fantasia é obrigatório.");
        }
        if (!cnpj) {
            isValid = false;
            mensagens.push("CNPJ é obrigatório.");
        }
        if (!nomeContato) {
            isValid = false;
            mensagens.push("Nome da pessoa de contato é obrigatório.");
        }
        if (!telefoneContato) {
            isValid = false;
            mensagens.push("Telefone é obrigatório.");
        }
        if (!emailContato) {
            isValid = false;
            mensagens.push("E-mail é obrigatório.");
        }
        if (!produtos) {
            isValid = false;
            mensagens.push("É necessário preencher pelo menos um produto.");
        }
        if (!anexos) {
            isValid = false;
            mensagens.push("É necessário anexar pelo menos um documento.");
        }

        if (!isValid) {
            alert(mensagens.join("\n"));
        }

        return isValid;
    };

    const validarProd = () => {
        let isValid = true;
        const mensagens = [];

        $(".produto").each(function(index) {
            const descricaoProduto = $(this).find('input[name="produto[]"]').val();
            const unidadeMedida = $(this).find('select[name="unidade_medida[]"]').val();
            const qtdeEstoque = $(this).find('input[name="quantidade[]"]').val();
            const valorUnitario = $(this).find('input[name="preco[]"]').val();

            if (!descricaoProduto) {
                isValid = false;
                mensagens.push(`Produto ${index + 1}: Descrição é obrigatória.`);
            }
            if (!unidadeMedida) {
                isValid = false;
                mensagens.push(`Produto ${index + 1}: Unidade de Medida é obrigatória.`);
            }
            if (!qtdeEstoque) {
                isValid = false;
                mensagens.push(`Produto ${index + 1}: Quantidade em Estoque é obrigatória.`);
            }
            if (!valorUnitario) {
                isValid = false;
                mensagens.push(`Produto ${index + 1}: Preço Unitário é obrigatório.`);
            }
        });

        if (!isValid) {
            alert(mensagens.join("\n"));
        }

        return isValid;
    };

    // salvar
    window.salvar = () => {
        if (!validarCampos() || !validarProd()) {
            return;
        }

        $('#loadingModal').modal('show');

        const razaoSocial = $('#razaoSocial').val();
        const nomeFantasia = $('#nome-ficticio').val();
        const cnpj = $('#cnpj').val().replace(/\D/g, '');
        const nomeContato = $('#responsavel').val();
        const telefoneContato = $('#num-telefone').val().replace(/\D/g, '');
        const emailContato = $('#email-contato').val();

        const produtos = [];
        $(".produto").each(function(index) {
            const descricaoProduto = $(this).find('input[name="produto[]"]').val();
            const unidadeMedida = $(this).find('select[name="unidade_medida[]"]').val();
            const qtdeEstoque = $(this).find('input[name="quantidade[]"]').val();
            const valorUnitario = $(this).find('input[name="preco[]"]').val();
            const valorTotal = (parseFloat(qtdeEstoque) * parseFloat(valorUnitario)).toFixed(2); 

            produtos.push({
                indice: index + 1,
                descricaoProduto,
                unidadeMedida,
                qtdeEstoque,
                valorUnitario,
                valorTotal
            });
        });

        const anexos = JSON.parse(sessionStorage.getItem('documentos') || '[]').map((doc, index) => ({
            indice: index + 1,
            nomeArquivo: doc.name,
            blobArquivo: doc.url 
        }));

        const jsonData = {
            razaoSocial,
            nomeFantasia,
            cnpj,
            nomeContato,
            telefoneContato,
            emailContato,
            produtos: produtos.length ? produtos : [], 
            anexos: anexos.length ? anexos : [] 
        };

        const jsonString = JSON.stringify(jsonData, null, 4); 

        // baixar .json
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'fornecedor.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); 

        console.log(jsonString); 

        setTimeout(() => {
            $('#loadingModal').modal('hide');
            alert('Fornecedor salvo com sucesso e arquivo JSON baixado!');
        }, 2000);
    }
});
