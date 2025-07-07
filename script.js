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
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

// Dark Mode Toggle
darkModeToggle.addEventListener('change', function () {
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
document.addEventListener('DOMContentLoaded', function () {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        darkModeToggle.checked = true;
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
});

// Expertise toggle
let expertiseLevelVisible = false;
expertiseToggle.addEventListener('click', function () {
    expertiseLevelVisible = !expertiseLevelVisible;
    const bars = document.querySelectorAll('.skill-level-bar');
    bars.forEach(bar => bar.classList.toggle('show'));
    this.innerHTML = expertiseLevelVisible
        ? '<i data-lucide="trending-down"></i> Hide Expertise Level'
        : '<i data-lucide="trending-up"></i> Show Expertise Level';
    lucide.createIcons();
});

// Skill details toast
document.querySelectorAll('.skill-icon-item').forEach(item => {
    item.addEventListener('click', function () {
        const skill = this.dataset.skill;
        const level = this.dataset.level;
        showToast({
            title: `${skill} Expertise`,
            description: `Proficiency Level: ${level}%`
        });
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Project filtering
projectFilters.forEach(btn => {
    btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        projectFilters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        projectCards.forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
        });
    });
});

// Contact form (Web3Forms)
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    }).then(response => {
        if (response.ok) {
            showToast({ title: "Message Sent", description: "Thanks! I'll be in touch soon." });
            contactForm.reset();
        } else {
            showToast({ title: "Error", description: "Something went wrong. Try again later." });
        }
    }).catch(() => {
        showToast({ title: "Error", description: "Check your connection and try again." });
    });
});

// Toast handler
function showToast({ title, description }) {
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-description').textContent = description;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
}
toastClose.addEventListener('click', () => toast.classList.remove('show'));

// Resume download button
downloadResumeBtn.addEventListener('click', () => {
    showToast({ title: "Resume", description: "Resume download coming soon!" });
});

// Scroll navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.backgroundColor = 'var(--nav-bg)';
    navbar.style.backdropFilter = 'blur(10px)';
});

// Intersection animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-category-card, .project-card, .experience-card, .education-card')
        .forEach(el => observer.observe(el));
});

// Scroll to top on logo click
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('scrollToTop');
    if (logo) {
        logo.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
