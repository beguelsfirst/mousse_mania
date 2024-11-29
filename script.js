let cart = [];

const cartLink = document.getElementById('cartLink');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productId = product.dataset.id;
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));

        // Adiciona o produto ao carrinho
        cart.push({ id: productId, name: productName, price: productPrice });

        // Atualiza o carrinho no menu
        updateCart();
    });
});

function updateCart() {
    const cartCount = cart.length;
    cartLink.textContent = `Carrinho (${cartCount})`;
}
