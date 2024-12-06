let cart = [];

// Carrega o carrinho do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }

    // Se estivermos na página do carrinho, renderiza os itens
    if (window.location.pathname.includes('carrinho.html')) {
        renderCartItems();
    }
});

// Atualiza o contador de itens no carrinho
function updateCart() {
    const cartCount = cart.length;
    const cartLink = document.getElementById('cartLink');
    cartLink.textContent = `Carrinho (${cartCount})`;
}

// Adiciona itens ao carrinho na página principal
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productId = product.dataset.id;
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));

        // Adiciona o produto ao carrinho
        cart.push({ id: productId, name: productName, price: productPrice });

        // Salva o carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualiza o contador do carrinho no menu
        updateCart();
    });
});

// Renderiza os itens do carrinho na página carrinho.html
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (!cart || cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="2">Seu carrinho está vazio.</td></tr>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    cart.forEach(item => {
        total += item.price;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Atualiza o total
    cartTotalElement.textContent = total.toFixed(2);
}
// Função para exibir os itens do carrinho na página carrinho.html
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Carrega o carrinho do localStorage
    const savedCart = localStorage.getItem('cart');
    if (!savedCart || JSON.parse(savedCart).length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">Seu carrinho está vazio.</td></tr>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    const cart = JSON.parse(savedCart);
    let total = 0;
    cartItemsContainer.innerHTML = ''; // Limpa a tabela antes de renderizar

    cart.forEach((item, index) => {
        total += item.price;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">Remover</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Atualiza o total
    cartTotalElement.textContent = total.toFixed(2);

    // Adiciona eventos para os botões de remoção
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            removeCartItem(index);
        });
    });
}

// Função para remover um item do carrinho
function removeCartItem(index) {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (!savedCart) return;

    // Remove o item pelo índice
    savedCart.splice(index, 1);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(savedCart));

    // Re-renderiza os itens e atualiza o contador
    renderCartItems();
    updateCart();
}

// Verifica se está na página carrinho.html e carrega os itens
if (window.location.pathname.includes('carrinho.html')) {
    document.addEventListener('DOMContentLoaded', renderCartItems);
}
// Função para limpar todo o carrinho
function clearCart() {
    localStorage.removeItem('cart'); // Remove o carrinho do localStorage
    cart = []; // Zera o array local
    renderCartItems(); // Atualiza a interface
    updateCart(); // Atualiza o contador no menu
}

// Adiciona o evento ao botão de limpar carrinho
if (window.location.pathname.includes('carrinho.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const clearCartButton = document.getElementById('clearCart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                if (confirm("Tem certeza que deseja limpar o carrinho?")) {
                    clearCart();
                }
            });
        }
        renderCartItems(); // Renderiza os itens ao carregar a página
    });
}
