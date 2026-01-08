// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('active');
        
        if (targetId === '#about') {
            // If About section doesn't exist, scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth <= 768) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// Service Cards - Read More Toggle (Mobile Only)
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceCard = this.closest('.service-card');
        const isExpanded = serviceCard.classList.contains('expanded');
        
        // Toggle expanded class
        serviceCard.classList.toggle('expanded');
        
        // Update button text
        if (isExpanded) {
            this.textContent = 'Read More';
        } else {
            this.textContent = 'Show Less';
        }
    });
});

// Optional: Add scroll animation for service items
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe service items for animation
    document.querySelectorAll('.service-item, .solution-item, .contact-item').forEach(item => {
        observer.observe(item);
    });
});