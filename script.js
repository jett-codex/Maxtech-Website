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

// Hero slideshow with autoplay and manual arrows + touch/long-press reveal
(function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    if (!slider || !slides.length || !prevBtn || !nextBtn) return;

    let index = 0;
    let timer = null;
    const INTERVAL = 4500;

    const goTo = (newIndex) => {
        slides[index].classList.remove('active');
        index = (newIndex + slides.length) % slides.length;
        slides[index].classList.add('active');
    };

    const restart = () => {
        clearInterval(timer);
        timer = setInterval(() => goTo(index + 1), INTERVAL);
    };

    prevBtn.addEventListener('click', () => { goTo(index - 1); restart(); });
    nextBtn.addEventListener('click', () => { goTo(index + 1); restart(); });

    // Touch + long-press handling for mobile
    let startX = 0;
    let longPressTimer = null;
    let hideTimer = null;
    const LONG_PRESS_MS = 350;
    const HIDE_DELAY_MS = 1500;
    const SWIPE_THRESHOLD = 40;
    const MOVE_CANCEL = 10;

    const showArrowsTemp = () => {
        slider.classList.add('show-arrows');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => slider.classList.remove('show-arrows'), HIDE_DELAY_MS);
    };

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        longPressTimer = setTimeout(() => {
            slider.classList.add('show-arrows');
        }, LONG_PRESS_MS);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        const moveX = e.touches[0].clientX;
        if (Math.abs(moveX - startX) > MOVE_CANCEL) {
            clearTimeout(longPressTimer);
        }
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        clearTimeout(longPressTimer);
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
        const delta = endX - startX;

        // Swipe navigation
        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            if (delta > 0) {
                goTo(index - 1);
            } else {
                goTo(index + 1);
            }
            restart();
            showArrowsTemp();
        } else {
            // If long-press had shown arrows, keep briefly then hide
            if (slider.classList.contains('show-arrows')) {
                showArrowsTemp();
            }
        }
    });

    slider.addEventListener('touchcancel', () => {
        clearTimeout(longPressTimer);
    });

    restart();
})();