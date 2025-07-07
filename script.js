// DOMContentLoaded wrapper
document.addEventListener('DOMContentLoaded', () => {
    console.log('📦 DOM fully loaded.');

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            if (this.checked) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('darkMode', 'disabled');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            }
        });

        // Load saved theme
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            darkModeToggle.checked = false;
            body.classList.add('dark-mode');
        } else {
            darkModeToggle.checked = true;
            body.classList.add('light-mode');
        }
    }

    // Expertise Toggle
    const expertiseToggle = document.getElementById('expertiseToggle');
    if (expertiseToggle) {
        let showExpertise = false;
        expertiseToggle.addEventListener('click', function () {
            showExpertise = !showExpertise;
            document.querySelectorAll('.skill-level-bar').forEach(bar => {
                bar.classList.toggle('show', showExpertise);
            });
            this.innerHTML = showExpertise
                ? '<i data-lucide="trending-down"></i> Hide Expertise Level'
                : '<i data-lucide="trending-up"></i> Show Expertise Level';
            lucide.createIcons();
        });
    }

    // Contact Form – Web3Forms
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
                .then(res => {
                    if (res.ok) {
                        showToast({
                            title: "Message Sent!",
                            description: "Thank you for your message. I'll get back to you soon!"
                        });
                        contactForm.reset();
                    } else {
                        showToast({
                            title: "Error",
                            description: "Message failed. Please try again or email me directly."
                        });
                    }
                })
                .catch(() => {
                    showToast({
                        title: "Error",
                        description: "Something went wrong. Check your internet or try later."
                    });
                });
        });
    }

    // Resume Download
    const downloadResumeBtn = document.getElementById('downloadResume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            showToast({
                title: "Resume Download",
                description: "Resume download will be available soon!"
            });
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('mobile-open');
        });
    }

    // Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
