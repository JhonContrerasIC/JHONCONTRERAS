// script.js

document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Variable para almacenar los productos en formato JSON
    let products = [];

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;

        if (name && price) {
            addProduct(name, price);
            productForm.reset();
        }
    });

    productList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const productId = e.target.getAttribute('data-id');
            deleteProduct(productId);
        }
    });

    function addProduct(name, price) {
        const newProduct = { name, price };
        products.push(newProduct);
        displayProducts();
    }

    function deleteProduct(productId) {
        products.splice(productId, 1);
        displayProducts();
    }

    function displayProducts() {
        productList.innerHTML = '';
    
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <p><strong>Nombre:</strong> ${product.name}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button class="edit" data-id="${index}">Editar</button>
                <button class="delete" data-id="${index}">Eliminar</button>
            `;
            productList.appendChild(productItem);
        });
        const editButtons = document.querySelectorAll('.edit');
        editButtons.forEach((editButton) => {
            editButton.addEventListener('click', function (e) {
                const productId = e.target.getAttribute('data-id');
                editProduct(productId);
            });
        });
    }
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', function (e) {
            const productId = e.target.getAttribute('data-id');
            editProduct(productId);
        });
    });
    function editProduct(productId) {
    const productToEdit = products[productId];

    document.getElementById('name').value = productToEdit.name;
    document.getElementById('price').value = productToEdit.price;

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Guardar Cambios';

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        const editedName = document.getElementById('name').value;
        const editedPrice = document.getElementById('price').value;
        
        if (editedName && editedPrice) {
            productToEdit.name = editedName;
            productToEdit.price = editedPrice;

            productForm.reset();
            submitButton.textContent = 'Agregar Producto';

            displayProducts();
        }
    });
}
});