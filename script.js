
// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const downloadResumeBtn = document.getElementById('downloadResume');
const toast = document.getElementById('toast');
const toastClose = document.querySelector('.toast-close');
const expertiseToggle = document.getElementById('expertiseToggle');

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Dark Mode Toggle
darkModeToggle.addEventListener('change', function() {
    if (!this.checked) {
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

// Expertise Level Toggle
let expertiseLevelVisible = false;

expertiseToggle.addEventListener('click', function() {
    expertiseLevelVisible = !expertiseLevelVisible;
    const skillLevelBars = document.querySelectorAll('.skill-level-bar');
    
    if (expertiseLevelVisible) {
        skillLevelBars.forEach(bar => {
            bar.classList.add('show');
        });
        this.innerHTML = '<i data-lucide="trending-down"></i> Hide Expertise Level';
    } else {
        skillLevelBars.forEach(bar => {
            bar.classList.remove('show');
        });
        this.innerHTML = '<i data-lucide="trending-up"></i> Show Expertise Level';
    }
    
    // Reinitialize icons after changing button content
    lucide.createIcons();
});

// Skill item click handlers for detailed view
document.querySelectorAll('.skill-icon-item').forEach(item => {
    item.addEventListener('click', function() {
        const skillName = this.dataset.skill;
        const skillLevel = this.dataset.level;
        
        showToast({
            title: `${skillName} Expertise`,
            description: `Proficiency Level: ${skillLevel}%`
        });
    });
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

// Enhanced Contact Form Handling with EmailJS
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
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    // Send email using EmailJS
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        contact_type: data.type,
        subject: data.subject,
        message: data.message,
        to_email: 'akhiljonnalagadda851@gmail.com' // Your email
    };
    
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS configuration
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Reset form
            contactForm.reset();
            clearErrors();
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            
            // Show success message
            showToast(getSuccessMessage(data.type));
            
        }, function(error) {
            console.error('Email send failed:', error);
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            
            // Show error message
            showToast({
                title: "Error",
                description: "Failed to send message. Please try emailing me directly at akhiljonnalagadda851@gmail.com"
            });
        });
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
    const animateElements = document.querySelectorAll('.skill-category-card, .project-card, .experience-card, .education-card');
    animateElements.forEach(el => observer.observe(el));
});

// Mobile menu handling
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add any additional initialization here
    console.log('Portfolio loaded successfully!');
    
    // Show initial toast with instructions for EmailJS setup
    setTimeout(() => {
        showToast({
            title: "Setup Required",
            description: "Please configure EmailJS service keys in script.js to enable contact form functionality."
        });
    }, 2000);
});
/* education */

/* the top letter aj  clickable */

  document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('scrollToTop');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });