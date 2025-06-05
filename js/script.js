// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
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