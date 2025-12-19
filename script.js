// === ZOOM FUNCTIONALITY ===
function openZoom(src) {
    const modal = document.getElementById("imageZoomModal");
    const img = document.getElementById("zoomedImage");
    img.src = src;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeZoom() {
    document.getElementById("imageZoomModal").style.display = "none";
    document.body.style.overflow = "auto";
}

// === CART & AUTH LOGIC ===
let currentUser = null;
let cart = []; // { name, price, quantity, image }

window.onload = function() {
    checkAuth();
};

function checkAuth() {
    const user = sessionStorage.getItem('chakupeUser');
    if (user) {
        currentUser = JSON.parse(user);
        showUserBar();
    }
}

function showAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function hideAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const dni = document.getElementById('regDni').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    
    if (!name || !email || !dni || !phone) {
        alert('Por favor completa todos los campos: nombre, correo, DNI y celular.');
        return;
    }
    
    if (!/^\d{8}$/.test(dni)) {
        alert('El DNI debe tener 8 dígitos numéricos.');
        return;
    }
    
    const user = { name, email, dni, phone };
    currentUser = user;
    sessionStorage.setItem('chakupeUser', JSON.stringify(user));
    hideAuthModal();
    showUserBar();
    alert('¡Registro exitoso! Ahora puedes agregar productos al carrito.');
}

function logout() {
    currentUser = null;
    cart = [];
    sessionStorage.removeItem('chakupeUser');
    document.getElementById('userBar').style.display = 'none';
    document.getElementById('cartFloat').style.display = 'none';
    updateCartBadge();
    showAuthModal();
}

function showUserBar() {
    document.getElementById('userBar').style.display = 'flex';
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('cartFloat').style.display = 'flex';
}

// === FUNCIONES PARA PRODUCTOS CON DOS FORMATOS ===
function addToCartPeliroja() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="peliroja-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const size = selected.value === 'unidad' ? 'Unidad (375ml)' : 'Fourpack (4 unidades)';
    const price = parseFloat(selected.dataset.price);
    const name = `La Pelirroja – ${size}`;
    const image = selected.value === 'unidad' ? 'peliroja negra black (1).jpg' : 'pelirroja fourpack (1).jpg';
    addToCartGeneric(name, price, 1, image);
}

function addToCartOroLiquido() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="oroliquido-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const size = selected.value === 'unidad' ? 'Unidad (330ml)' : 'Sixpack (6 unidades)';
    const price = parseFloat(selected.dataset.price);
    const name = `Oro Líquido – ${size}`;
    const image = selected.value === 'unidad' ? 'oro liquido botella.jpg' : 'oro liquido grupo (1).jpg';
    addToCartGeneric(name, price, 1, image);
}

function addToCartVinagre() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="vinagre-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const sizeMap = {
        '100ml': '100 ml',
        '500ml': '500 ml',
        '4l': '4 L'
    };
    const imageMap = {
        '100ml': 'IMAGEN_100ml.jpeg', 
        '500ml': 'VINAGRE DANDY (1).jpeg',
        '4l': 'DJ VINAGRE DANDY (1).jpeg'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Vinagre El Dandy – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}
    
function addToCartJoraNatural() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="jora-natural-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const sizeMap = {
        '500ml': '500 ml',
        '4l': '4 L'
    };
    const imageMap = {
        '500ml': 'jorach3.jpeg',
        '4l': 'DJ jora natural (1).jpg'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Jora Natural – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}



function addToCartJoraMembrillo() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="jora-membrillo-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const sizeMap = {
        '500ml': '500 ml',
        '4l': '4 L'
    };
    const imageMap = {
        '500ml': 'jorach1.jpeg',
        '4l': 'DJ jora membrillo (1).jpg'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Jora Membrillo – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}

function addToCartJoraMorada() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="jora-morada-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const sizeMap = {
        '500ml': '500 ml',
        '4l': '4 L'
    };
    const imageMap = {
        '500ml': 'jorach2.jpeg',
        '4l': 'DJ jora morado (1).jpg'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Jora Morada – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}

function addToCartOliva() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="aceite-oliva-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }
    const sizeMap = {
        '500ml': '500 ml',
        '4l': '4 L'
    };
    const imageMap = {
        '500ml': 'oliva500.png',
        '5l': 'oliva5lt.png'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Aceite de Oliva Extra Virgen – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}


function addToCartArrozConde() {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const selected = document.querySelector('input[name="arroz-conde-option"]:checked');
    if (!selected) { 
        alert('Elige una presentación.'); 
        return; 
    }

    const sizeMap = {
        '1kg': '1 kg',
        '5kg': '5 kg'
    };
    const imageMap = {
        '1kg': 'arrozdelconde1.png',
        '5kg': 'arrozdelconde5.png'
    };
    const size = sizeMap[selected.value];
    const price = parseFloat(selected.dataset.price);
    const name = `Arroz del Conde – ${size}`;
    const image = imageMap[selected.value];
    addToCartGeneric(name, price, 1, image);
}


// === PRODUCTOS CON CANTIDAD SIMPLE ===
function addToCart(productName, price, productId, image) {
    if (!currentUser) { 
        alert('Debes registrarte primero...'); 
        showAuthModal(); 
        return; 
    }
    const quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
    addToCartGeneric(productName, price, quantity, image);
}

function addToCartGeneric(productName, price, quantity, image) {
    const existingItem = cart.find(item => item.name === productName && item.price === price);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ 
            name: productName, 
            price: price, 
            quantity: quantity, 
            image: image 
        });
    }
    updateCartBadge();
    alert(`${quantity} x ${productName} agregado(s) al carrito.`);
}

// === CONTROLES DE CANTIDAD (solo para productos simples) ===
function increaseQty(productId) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyElement.textContent);
    qtyElement.textContent = currentQty + 1;
    
    // Animación sutil
    qtyElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        qtyElement.style.transform = 'scale(1)';
    }, 200);
}

function decreaseQty(productId) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyElement.textContent);
    if (currentQty > 1) {
        qtyElement.textContent = currentQty - 1;
        
        // Animación sutil
        qtyElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            qtyElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// === CARRITO ===
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
    
    // Animación del badge
    const badge = document.getElementById('cartBadge');
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 300);
}

function openCart() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60x60?text=Producto'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">S/. ${item.price.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="cart-qty-display">${item.quantity}</div>
                    <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="delete-btn" onclick="removeCartItem(${index})" title="Eliminar producto">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-total">S/. ${itemTotal.toFixed(2)}</div>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });
    
    document.getElementById('cartTotal').textContent = `Total: S/. ${total.toFixed(2)}`;
    document.getElementById('cartModal').classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function updateCartItemQty(index, change) {
    if (cart[index].quantity + change < 1) return;
    cart[index].quantity += change;
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    openCart();
    updateCartBadge();
}

function removeCartItem(index) {
    // Animación de eliminación
    const cartItems = document.getElementById('cartItems');
    const itemElements = cartItems.children;
    const itemToRemove = itemElements[index];
    
    itemToRemove.style.transition = 'all 0.3s ease';
    itemToRemove.style.transform = 'translateX(100%)';
    itemToRemove.style.opacity = '0';
    
    setTimeout(() => {
        cart.splice(index, 1);
        openCart();
        updateCartBadge();
    }, 300);
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    let message = `*Nuevo Pedido - Chakupe*\n\n`;
    message += `*Cliente:* ${currentUser.name}\n`;
    message += `*Email:* ${currentUser.email}\n`;
    message += `*DNI:* ${currentUser.dni}\n`;
    message += `*Celular:* ${currentUser.phone}\n\n`;
    message += `*Productos:*\n`;
    
    let total = 0;
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        message += `${item.quantity} x ${item.name} - S/. ${itemTotal.toFixed(2)}\n`;
        total += itemTotal;
    });
    
    message += `\n*Total: S/. ${total.toFixed(2)}*`;
    
    const whatsappNumber = '51927743956';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    updateCartBadge();
    closeCart();
    alert('Pedido enviado por WhatsApp. ¡Gracias por tu compra!');
}
 //===galeria de imagenes===
function openGallery() {
    document.getElementById("galleryModal").style.display = "flex";
}

function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
}
