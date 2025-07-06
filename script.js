
// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const downloadResumeBtn = document.getElementById('downloadResume');
const toast = document.getElementById('toast');
const toastClose = document.querySelector('.toast-close');

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Dark Mode Toggle
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        darkModeToggle.checked = true;
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project Filtering
projectFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        // Update active filter button
        projectFilters.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        type: formData.get('type'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        this.reset();
        clearErrors();
        
        // Reset button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // Show success message
        showToast(getSuccessMessage(data.type));
        
        console.log('Contact Form Submission:', data);
    }, 2000);
});

// Form Validation
function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
        showError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = message;
    field.style.borderColor = '#ef4444';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.textContent = '');
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => input.style.borderColor = '');
}

function getSuccessMessage(type) {
    const messages = {
        general: {
            title: "Message Sent!",
            description: "Thank you for your message. I'll get back to you soon!"
        },
        recruiter: {
            title: "Thank you for reaching out!",
            description: "I appreciate your interest. I'll review your message and respond within 24 hours."
        },
        collaboration: {
            title: "Collaboration Inquiry Received!",
            description: "Excited about potential collaboration! I'll get back to you shortly."
        }
    };
    
    return messages[type] || messages.general;
}

// Toast Notification
function showToast(message) {
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = message.title;
    toastDescription.textContent = message.description;
    
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    toast.classList.remove('show');
}

// Toast close button
toastClose.addEventListener('click', hideToast);

// Download Resume
downloadResumeBtn.addEventListener('click', function() {
    showToast({
        title: "Resume Download",
        description: "Resume download will be available soon!"
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--nav-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--nav-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .experience-card, .education-card');
    animateElements.forEach(el => observer.observe(el));
});

// Mobile menu handling (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add mobile menu styles if needed
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--nav-bg);
            padding: 1rem;
            border-top: 1px solid var(--border-color);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add any additional initialization here
    console.log('Portfolio loaded successfully!');
});
