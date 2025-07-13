// Gestion des images
function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Animation de transition
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = src;
        mainImage.style.opacity = '1';
    }, 300);

    // Mise à jour des miniatures actives
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
        }
    });
}

// Gestion de la quantité
function decreaseQuantity() {
    const input = document.getElementById('quantity');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
        updateCartButton();
    }
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    const currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    updateCartButton();
}

function updateCartButton() {
    const quantity = document.getElementById('quantity').value;
    const cartButton = document.querySelector('.add-to-cart');
    cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Ajouter ${quantity} au panier`;
}

// Gestion du panier
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const productName = document.querySelector('.product-info h1').textContent;
    const price = document.querySelector('.price').textContent;
    
    // Animation du bouton
    const cartButton = document.querySelector('.add-to-cart');
    cartButton.classList.add('added');
    
    // Mise à jour du compteur du panier
    const cartCount = document.querySelector('.cart-count');
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + parseInt(quantity);
    
    // Notification
    showNotification(`${quantity} ${productName} ajouté(s) au panier`);
    
    setTimeout(() => {
        cartButton.classList.remove('added');
    }, 1000);
}

// Gestion des notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Suppression après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Gestion de la vue rapide
function quickView(productId) {
    // Animation de chargement
    const overlay = document.createElement('div');
    overlay.className = 'quick-view-overlay';
    document.body.appendChild(overlay);
    
    // Simulation de chargement des données
    setTimeout(() => {
        overlay.remove();
        // Ici, vous pouvez ajouter la logique pour afficher les détails du produit
    }, 500);
}

// Gestion du scroll et des animations
function handleScroll() {
    const elements = document.querySelectorAll('.product-card, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Ajout des écouteurs d'événements
    document.querySelector('.add-to-cart').addEventListener('click', addToCart);
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', () => quickView(button.dataset.productId));
    });
    
    // Gestion du scroll
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification initiale
    
    // Animation de la page
    document.querySelector('.container').classList.add('loaded');
});

// Gestion du menu mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Fermeture du menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Animation des produits similaires au scroll
const productCards = document.querySelectorAll('.product-card');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

productCards.forEach(card => {
    observer.observe(card);
}); 