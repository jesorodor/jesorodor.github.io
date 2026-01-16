// ========================================
// ERMERS ONLINE - Interactive JavaScript
// ========================================

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference - using in-memory storage
let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    
    // Update Three.js scene if it exists
    if (window.networkSphereScene) {
        updateSphereTheme(currentTheme);
    }
});

// ========================================
// ENHANCED NAVBAR INTERACTIONS
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileOverlay = document.getElementById('mobileOverlay');
const dropdownTriggers = document.querySelectorAll('.nav-item .nav-link');
let lastScroll = 0;
let activeDropdown = null;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Desktop dropdown toggle (click-based for accessibility)
dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const navItem = trigger.closest('.nav-item');
        const isActive = navItem.classList.contains('active');
        
        // Close any open dropdown
        if (activeDropdown && activeDropdown !== navItem) {
            activeDropdown.classList.remove('active');
            const prevTrigger = activeDropdown.querySelector('.nav-link');
            if (prevTrigger) {
                prevTrigger.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Toggle current dropdown
        if (isActive) {
            navItem.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
            activeDropdown = null;
        } else {
            navItem.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
            activeDropdown = navItem;
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item') && activeDropdown) {
        activeDropdown.classList.remove('active');
        const trigger = activeDropdown.querySelector('.nav-link');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }
        activeDropdown = null;
    }
});

// Close dropdown on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeDropdown) {
        activeDropdown.classList.remove('active');
        const trigger = activeDropdown.querySelector('.nav-link');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus(); // Return focus to trigger
        }
        activeDropdown = null;
    }
});

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Update ARIA
        mobileMenuToggle.setAttribute('aria-expanded', !isActive);
        mobileOverlay.setAttribute('aria-hidden', isActive);
        
        // Toggle body scroll lock
        if (!isActive) {
            body.classList.add('mobile-menu-open');
        } else {
            body.classList.remove('mobile-menu-open');
            
            // Close any open dropdowns
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
                const trigger = item.querySelector('.nav-link');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Close mobile menu when clicking overlay
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        
        // Close any open dropdowns
        document.querySelectorAll('.nav-item.active').forEach(item => {
            item.classList.remove('active');
            const trigger = item.querySelector('.nav-link');
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Close mobile menu on window resize to desktop
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
            if (mobileOverlay) {
                mobileOverlay.setAttribute('aria-hidden', 'true');
            }
            
            // Close any open dropdowns
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
                const trigger = item.querySelector('.nav-link');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }, 250);
});

// ========================================
// Typewriter Effect
// ========================================
const typewriter = document.getElementById('typewriter');
const texts = [
    'Een persoonlijke hubsite die dient als centraal startpunt voor navigatie.',
    'Toegang tot al uw netwerkapparatuur en servers.',
    'Beheer uw volledige infrastructuur vanaf één plek.',
    'Veilig, snel en altijd beschikbaar.'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 25;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

setTimeout(type, 1000);

// ========================================
// Animated Counter
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.dataset.target);
                animateCounter(stat, target);
            });
        }
    });
}, observerOptions);

if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].parentElement.parentElement);
}

// ========================================
// Particle System
// ========================================
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// Scroll Animations
// ========================================
const scrollElements = document.querySelectorAll('.service-card, .feature-item, .quick-link');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animate', 'active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

scrollElements.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.1) + 's';
});

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

handleScrollAnimation();

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    body.classList.remove('mobile-menu-open');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// Card Hover Effects with Mouse Movement
// ========================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// Floating Animation for Feature Cards
// ========================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        card.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + index * 1000);
});

// ========================================
// Add Ripple Effect to Buttons
// ========================================
const buttons = document.querySelectorAll('.btn, .dropdown-item, .quick-link, .nav-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// Performance Optimization: Throttle Scroll
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 5s infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 10000);
    }
});

// ========================================
// THREE.JS NETWORK SPHERE
// ========================================

let scene, camera, renderer, nodes = [], connections = [];
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let networkGroup;

function initNetworkSphere() {
    const canvas = document.getElementById('networkSphere');
    if (!canvas || typeof THREE === 'undefined') return;
    
    // Scene setup
    scene = new THREE.Scene();
    window.networkSphereScene = scene;
    
    // Camera setup
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Network group
    networkGroup = new THREE.Group();
    scene.add(networkGroup);
    
    // Create network nodes
    createNetworkNodes();
    
    // Create connections
    createConnections();
    
    // Mouse interaction
    canvas.addEventListener('mousemove', onMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function createNetworkNodes() {
    const nodeCount = 30;
    const radius = 6;
    
    for (let i = 0; i < nodeCount; i++) {
        // Distribute nodes in sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        // Node geometry
        const geometry = new THREE.SphereGeometry(0.15, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xff6b9d,
            transparent: true,
            opacity: 0.9
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, z);
        
        // Store original position for animation
        node.userData = {
            originalPosition: new THREE.Vector3(x, y, z),
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.5
        };
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b9d,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        node.add(glow);
        
        networkGroup.add(node);
        nodes.push(node);
    }
}

function createConnections() {
    const connectionMaterial = new THREE.LineBasicMaterial({ 
        color: 0xff6b9d,
        transparent: true,
        opacity: 0.15
    });
    
    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        const connectionsPerNode = 3;
        let connectionCount = 0;
        
        for (let j = 0; j < nodes.length && connectionCount < connectionsPerNode; j++) {
            if (i === j) continue;
            
            const distance = nodes[i].position.distanceTo(nodes[j].position);
            
            if (distance < 5) {
                const points = [];
                points.push(nodes[i].position);
                points.push(nodes[j].position);
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, connectionMaterial);
                
                networkGroup.add(line);
                connections.push({ line, nodeA: nodes[i], nodeB: nodes[j] });
                connectionCount++;
            }
        }
    }
}

function onMouseMove(event) {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    targetRotationX = mouseY * 0.3;
    targetRotationY = mouseX * 0.3;
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate nodes
    nodes.forEach((node, i) => {
        const { originalPosition, phase, speed } = node.userData;
        
        const offset = Math.sin(time * speed + phase) * 0.3;
        node.position.x = originalPosition.x + Math.sin(time * 0.5 + i) * offset;
        node.position.y = originalPosition.y + Math.cos(time * 0.5 + i) * offset;
        node.position.z = originalPosition.z + Math.sin(time * 0.3 + i) * offset;
        
        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + phase) * 0.1;
        node.scale.set(scale, scale, scale);
    });
    
    // Update connections
    connections.forEach(({ line, nodeA, nodeB }) => {
        const points = [];
        points.push(nodeA.position);
        points.push(nodeB.position);
        line.geometry.setFromPoints(points);
    });
    
    // Smooth rotation based on mouse
    networkGroup.rotation.x += (targetRotationX - networkGroup.rotation.x) * 0.05;
    networkGroup.rotation.y += (targetRotationY - networkGroup.rotation.y) * 0.05;
    
    // Auto-rotate slowly
    networkGroup.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const canvas = document.getElementById('networkSphere');
    if (!canvas) return;
    
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function updateSphereTheme(theme) {
    const color = theme === 'light' ? 0xff6b9d : 0xff6b9d;
    const opacity = theme === 'light' ? 0.7 : 0.9;
    
    nodes.forEach(node => {
        node.material.color.setHex(color);
        node.material.opacity = opacity;
    });
    
    connections.forEach(({ line }) => {
        line.material.color.setHex(color);
        line.material.opacity = theme === 'light' ? 0.2 : 0.15;
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetworkSphere);
} else {
    initNetworkSphere();
}

// ========================================
// Log Welcome Message
// ========================================
console.log('%c🚀 ERMERS ONLINE', 'font-size: 24px; font-weight: bold; color: #ff6b9d;');
console.log('%cWelkom! Deze site is gebouwd met liefde en moderne webtechnologie.', 'font-size: 14px; color: #b8b8b8;');
console.log('%cProbeer de Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #6b8cff;');