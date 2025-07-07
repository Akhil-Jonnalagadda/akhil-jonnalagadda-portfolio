// ✅ script.js - Plain JS logic for dark mode, contact form, and mobile nav

// DOMContentLoaded wrapper
window.addEventListener('DOMContentLoaded', () => {
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
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Contact Form (Web3Forms)
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
            alert("✅ Message sent successfully!");
            contactForm.reset();
          } else {
            alert("❌ Message failed. Try again or email directly.");
          }
        })
        .catch(() => {
          alert("❌ Something went wrong. Check connection.");
        });
    });
  }

  // Hamburger Menu
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
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Update active class
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});