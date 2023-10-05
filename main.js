$(function() {

    const API = 'http://localhost:8080';

    $('#product_create').click(function() {
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
            success: function(response) {
                console.log(response)
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })
    });

})