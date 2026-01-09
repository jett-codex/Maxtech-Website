// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.getElementById('navLinks').classList.remove('active');
        if (targetId === '#about') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
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
        serviceCard.classList.toggle('expanded');
        this.textContent = isExpanded ? 'Read More' : 'Show Less';
    });
});

// Optional: scroll animation for service/solution/contact items
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animated'); });
    }, observerOptions);
    document.querySelectorAll('.service-item, .solution-item, .contact-item').forEach(item => observer.observe(item));
});

// Hero slideshow (auto-play)
(function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
    if (!slides.length) return;
    let index = 0;
    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 4500);
})();