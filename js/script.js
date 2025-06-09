// Improved mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navMenu.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close menu when clicking on a menu item
document.querySelectorAll('.nav-menu a').forEach(item => {
    item.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nome = this.querySelector('[name="nome"]').value;
            const email = this.querySelector('[name="email"]').value;
            const mensagem = this.querySelector('[name="mensagem"]').value;
            
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Location tabs functionality - Implementação única e limpa
    const locationTabs = document.querySelectorAll('.location-tab');
    
    if (locationTabs.length > 0) {
        function activateTab(tab) {
            // Desativa todas as abas
            locationTabs.forEach(t => t.classList.remove('active'));
            
            // Ativa a aba clicada
            tab.classList.add('active');
            
            // Esconde todos os conteúdos
            const allContents = document.querySelectorAll('.location-content');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Mostra o conteúdo correspondente
            const locationId = tab.getAttribute('data-location');
            const targetContent = document.getElementById(locationId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        }
        
        // Adiciona event listeners para cada aba
        locationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                activateTab(this);
            });
        });
        
        // Ativa a primeira aba por padrão
        activateTab(locationTabs[0]);
    }
});

// Gallery lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                // Append elements
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
                
                // Close lightbox on click
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
            });
        });
    }
});

// Service Modals
document.addEventListener('DOMContentLoaded', function() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add click event to each service card
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when clicking on X
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-container');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal-container');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-container[style="display: block;"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        }
    });
    
    // Handle modal links for smooth scrolling
    document.querySelectorAll('.modal-btn[href^="#"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close the modal
            const modal = this.closest('.modal-container');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Scroll to the target
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // For gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            item.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
        });
    }
    
    // For service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
            // Trigger click after touch for better mobile experience
            setTimeout(() => {
                if (this.classList.contains('touch-active')) {
                    this.click();
                }
            }, 100);
        }, {passive: true});
    });
});


