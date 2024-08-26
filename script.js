document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cep-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const cep = document.getElementById('cep').value.replace('-', '').trim();
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado');
                    return;
                }
                const addressInfo = document.getElementById('address-info');
                const html = `
                    <h2>Informações do Endereço</h2>
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                addressInfo.innerHTML = html;
            })
            .catch(error => {
                console.error('Erro ao buscar dados do CEP:', error);
            });
    });
});
