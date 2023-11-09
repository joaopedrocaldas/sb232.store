$(function () {

    const API = 'http://localhost:8082';

    Listar()

    async function Listar() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: `${API}/client/`,
            success: function (result) {
                console.log(result);

                var html = "";
                let i = 0;
                result.forEach(element => {

                    if (i % 3 === 0) {
                        if (i !== 0) {
                            html += '</div>';
                        }
                        html +=
                            `
                   <div class = "row">
                   `
                    }
                    html +=
                        `<div class="col-md-4">
                            <div class="item">
                                <h1>${element.name}</h1>
                                <p>email: ${element.email}</p>
                                <p>cpf: ${element.cpf}</p>
                                <input  hidden class="hiddenId">
                                <button type="button" class="btn btn-danger client_delete" data-id="${element.id}">Excluir</button>
                                <button type="button" class="btn btn-warning client_update" data-id="${element.id}" >Atualizar</button>
                            </div>    
                        </div>
                        `
                    i++
                });

                html += "</div>"
                $("#listagem").html(html);

            },
            error(xhr, status, error) {
                console.log(xhr);
            }
        })
    }

    $('#client_create').click(function () {


        var nome = $('#cliente_nome').val();
        var cpf = $('#cpf').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        var data_nas = $('#data').val();

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: `${API}/client/`,
            dataType: 'json',
            data: JSON.stringify({
                'name': nome,
                'email': email,
                'data_nas': data_nas,
                'cpf': cpf,
                'senha': senha,

            }),
            success: function (response) {
                console.log(response)
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })

        Listar();
    })

    $(document).on('click', '.client_delete', function () {
        let id = $(this).attr("data-id");
        let resp = Number(prompt("para deletar digite 1"));
        if (resp == 1) {
            deletar(id);
        }
        return;
    })

    $(document).on('click', '.client_update', function () {
        let id = $(this).attr("data-id");
        let resp = Number(prompt("para atualizar digite 1"));
        if (resp == 1) {
            atualizar(id);
        }
        return;
    })

    function deletar(id) {


        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'DELETE',
            url: `${API}/client/${id}`,
            dataType: 'json',
            success: function (response) {
                alert("deletado");
                Listar()
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })
    }

    function atualizar(id) {

        var nome = $('#cliente_nome').val();
        var cpf = $('#cpf').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        var data_nas = $('#data').val();


        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'PUT',
            url: `${API}/client/${id}`,
            dataType: 'json',
            data: JSON.stringify({
                'name': nome,
                'email': email,
                'data_nas': data_nas,
                'cpf': cpf,
                'senha': senha,
            }),
            success: function (response) {
                alert("atualizado");
                Listar()
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })
    }


})
