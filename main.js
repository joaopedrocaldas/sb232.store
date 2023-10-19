$(function () {

    const API = 'http://localhost:8080';

    Listar()

    function Listar() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: `${API}/product`,
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
                                <p>preço: ${element.preco}</p>
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


    $('#product_create').click(function () {


        var id = $('#product_id').val();
        var nome = $('#product_nome').val();
        var preco = $('#product_preco').val();

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: `${API}/product`,
            dataType: 'json',
            data: JSON.stringify({
                'nome': nome,
                'preco': preco
            }),
            success: function (response) {
                console.log(response)
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })
    });

})