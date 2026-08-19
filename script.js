// Console Easter Egg
console.log('%cHey :)', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');
console.log('%cIf you\'re reading this, you\'re probably curious.', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');
console.log('%cThat\'s my favorite trait in people.', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');

// Font-changing name effect
const fonts = [
    'Georgia', 'Courier New', 'Impact', 'Comic Sans MS', 'Times New Roman',
    'Verdana', 'Trebuchet MS', 'Lucida Console', 'Monaco',
    'Monoton', 'Unbounded', 'Orbitron', 'Wire One',
    'Fredoka', 'Luckiest Guy', 'Caveat Brush', 'Press Start 2P', 'Bungee Outline',
    'Playfair Display', 'Inter'
];

// Explanation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Font-changing name effect
    const nameElement = document.querySelector('.name-hover');
    if (nameElement) {
        nameElement.addEventListener('mouseover', () => {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            nameElement.style.fontFamily = randomFont;
        });
    }
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const cardContents = document.querySelectorAll('.card-content');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.dataset.mode;
            
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle content visibility
            cardContents.forEach(content => {
                if (content.classList.contains(mode + '-mode')) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide tab content
            tabContents.forEach(content => {
                if (content.id === tabId + '-tab') {
                    content.style.display = 'block';
                    content.classList.add('active');
                } else {
                    content.style.display = 'none';
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.research-card, .project-card, .curiosity-item, .creative-card, .gallery-item, .quote-card, .poem-card, .value-item, .preview-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Easter egg: Click logo 5-7 times to reveal message
    const navLogo = document.querySelector('.nav-logo');
    
    console.log('Easter egg setup - navLogo found:', !!navLogo);
    
    if (navLogo) {
        let clickCount = 0;
        let lastClickTime = 0;
        const clickResetTime = 3000; // Reset counter after 3 seconds of no clicks
        const minClicks = 5;
        const maxClicks = 7;
        
        const messages = [
            "You're curious. I like that. Keep clicking!",
            "Most people don't click this far.",
            "If you found this, we'd probably get along.",
            "okay, enough clicking. Send me a message: (408) 712-1844"
        ];
        
        navLogo.addEventListener('click', function(e) {
            const currentTime = Date.now();
            
            // Reset counter if too much time has passed
            if (currentTime - lastClickTime > clickResetTime) {
                clickCount = 0;
            }
            
            clickCount++;
            lastClickTime = currentTime;
            
            // Always prevent default to stop navigation
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Logo clicked! Count:', clickCount);
            
            // Check if we've reached the threshold
            if (clickCount >= minClicks && clickCount <= maxClicks) {
                const easterEggModal = document.getElementById('easter-egg-modal');
                const easterEggMessage = document.getElementById('easter-egg-message');
                
                console.log('Easter egg triggered! Modal:', easterEggModal, 'Message:', easterEggMessage);
                
                if (easterEggModal && easterEggMessage) {
                    // Move modal to body if not already there (to avoid stacking context issues)
                    if (easterEggModal.parentElement !== document.body) {
                        document.body.appendChild(easterEggModal);
                    }
                    
                    // Random message
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    easterEggMessage.textContent = randomMessage;
                    easterEggModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Force display and check computed styles
                    easterEggModal.style.display = 'flex';
                    easterEggModal.style.opacity = '1';
                    easterEggModal.style.visibility = 'visible';
                    easterEggModal.style.zIndex = '999999';
                    easterEggModal.style.position = 'fixed';
                    easterEggModal.style.top = '0';
                    easterEggModal.style.left = '0';
                    easterEggModal.style.width = '100vw';
                    easterEggModal.style.height = '100vh';
                    
                    const computed = window.getComputedStyle(easterEggModal);
                    console.log('Modal should be visible now');
                    console.log('Computed styles:', {
                        display: computed.display,
                        opacity: computed.opacity,
                        visibility: computed.visibility,
                        zIndex: computed.zIndex,
                        position: computed.position
                    });
                } else {
                    console.error('Modal elements not found:', { easterEggModal, easterEggMessage });
                }
                
                // Reset counter
                clickCount = 0;
            } else if (clickCount > maxClicks) {
                // Reset if they keep clicking
                clickCount = 0;
            }
        });
        
        console.log('Easter egg click handler attached to logo');
        
        // Function to close modal
        function closeEasterEggModal() {
            const easterEggModal = document.getElementById('easter-egg-modal');
            if (easterEggModal) {
                easterEggModal.classList.remove('active');
                // Remove inline styles
                easterEggModal.style.display = '';
                easterEggModal.style.opacity = '';
                easterEggModal.style.visibility = '';
                easterEggModal.style.zIndex = '';
                document.body.style.overflow = '';
            }
        }
        
        // Close modal handlers (set up once)
        document.addEventListener('click', function(e) {
            const easterEggModal = document.getElementById('easter-egg-modal');
            const easterEggClose = document.getElementById('easter-egg-close');
            
            if (easterEggModal && easterEggModal.classList.contains('active')) {
                // Close on close button click
                if (easterEggClose && (e.target === easterEggClose || e.target.closest('.easter-egg-close'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeEasterEggModal();
                }
                // Close on background click
                else if (e.target === easterEggModal) {
                    closeEasterEggModal();
                }
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const easterEggModal = document.getElementById('easter-egg-modal');
                if (easterEggModal && easterEggModal.classList.contains('active')) {
                    closeEasterEggModal();
                }
            }
        });
    }
});

