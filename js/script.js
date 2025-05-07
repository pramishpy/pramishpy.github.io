// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbarLinks = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Add active class to nav links when scrolling
window.addEventListener('scroll', () => {
    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.padding = '20px 0';
    }
    
    // Update active menu link on scroll
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navbarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Change active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // You would typically send this data to a server
        // For now, we'll just log it and show an alert
        console.log({name, email, subject, message});
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll (simple implementation)
document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-content');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease-in-out';
        fadeInObserver.observe(element);
    });
    
    document.addEventListener('scroll', () => {
        fadeInElements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Check if element is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
            }
        });
    });
});

// Create a placeholder folder structure
function createFolders() {
    console.log('Website structure should include:');
    console.log('- index.html');
    console.log('- css/style.css');
    console.log('- js/script.js');
    console.log('- images/ (create and add profile picture, project images, and background)');
    console.log('- resume.pdf (add your actual resume file)');
}

// Call function on page load
createFolders();
