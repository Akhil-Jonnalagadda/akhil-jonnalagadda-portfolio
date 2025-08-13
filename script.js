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

  // Scroll to Top Logo
  const scrollLogo = document.getElementById("scrollToTop");
  if (scrollLogo) {
    scrollLogo.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
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

// AI Demo Functions
function openEmotionDemo() {
    const modal = document.getElementById('emotionDemoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeEmotionDemo() {
    const modal = document.getElementById('emotionDemoModal');
    const video = document.getElementById('demoVideo');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Stop camera if running
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    
    // Reset demo state
    resetDemoState();
}

let demoState = {
    isRecording: false,
    isAnalyzing: false,
    stream: null,
    analysisInterval: null,
    emotionHistory: []
};

function startDemoCamera() {
    const video = document.getElementById('demoVideo');
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            demoState.stream = stream;
            demoState.isRecording = true;
            updateDemoUI();
        })
        .catch(err => {
            console.error('Camera access denied:', err);
            alert('Camera access is required for the demo. Please allow camera permissions and try again.');
        });
}

function stopDemoCamera() {
    const video = document.getElementById('demoVideo');
    
    if (demoState.stream) {
        demoState.stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        demoState.stream = null;
    }
    
    demoState.isRecording = false;
    stopEmotionAnalysis();
    updateDemoUI();
}

function startEmotionAnalysis() {
    if (!demoState.isRecording) {
        alert('Please start the camera first!');
        return;
    }
    
    demoState.isAnalyzing = true;
    updateDemoUI();
    
    // Mock emotions for demo
    const emotions = [
        { name: 'Happy', confidence: 0.85, color: '#10b981' },
        { name: 'Neutral', confidence: 0.72, color: '#6b7280' },
        { name: 'Surprised', confidence: 0.68, color: '#f59e0b' },
        { name: 'Focused', confidence: 0.76, color: '#3b82f6' },
        { name: 'Confused', confidence: 0.45, color: '#8b5cf6' }
    ];
    
    // Simulate real-time emotion detection
    demoState.analysisInterval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence = (Math.random() * 0.4 + 0.6).toFixed(2); // 0.6-1.0
        
        displayCurrentEmotion(randomEmotion.name, confidence, randomEmotion.color);
        addToEmotionHistory(randomEmotion.name, confidence);
    }, 2500);
}

function stopEmotionAnalysis() {
    if (demoState.analysisInterval) {
        clearInterval(demoState.analysisInterval);
        demoState.analysisInterval = null;
    }
    demoState.isAnalyzing = false;
    updateDemoUI();
}

function displayCurrentEmotion(emotion, confidence, color) {
    const currentEmotion = document.querySelector('.current-emotion');
    if (currentEmotion) {
        currentEmotion.innerHTML = `
            <div class="emotion-name" style="color: ${color}">${emotion}</div>
            <div class="emotion-confidence">${(confidence * 100).toFixed(1)}% confidence</div>
        `;
        currentEmotion.style.borderColor = color;
    }
}

function addToEmotionHistory(emotion, confidence) {
    demoState.emotionHistory.unshift({ emotion, confidence });
    if (demoState.emotionHistory.length > 8) {
        demoState.emotionHistory.pop();
    }
    
    updateEmotionHistory();
}

function updateEmotionHistory() {
    const historyContainer = document.querySelector('.emotion-history');
    if (historyContainer) {
        historyContainer.innerHTML = demoState.emotionHistory.map(item => `
            <div class="emotion-item">
                <div style="font-weight: 600;">${item.emotion}</div>
                <div style="font-size: 0.8rem; color: #6b7280;">${(item.confidence * 100).toFixed(0)}%</div>
            </div>
        `).join('');
    }
}

function resetDemoState() {
    demoState = {
        isRecording: false,
        isAnalyzing: false,
        stream: null,
        analysisInterval: null,
        emotionHistory: []
    };
    
    // Clear displays
    const currentEmotion = document.querySelector('.current-emotion');
    if (currentEmotion) {
        currentEmotion.innerHTML = '<div class="emotion-name">No emotion detected</div>';
    }
    
    const historyContainer = document.querySelector('.emotion-history');
    if (historyContainer) {
        historyContainer.innerHTML = '';
    }
    
    updateDemoUI();
}

function updateDemoUI() {
    const startBtn = document.getElementById('startCameraBtn');
    const stopBtn = document.getElementById('stopCameraBtn');
    const analyzeBtn = document.getElementById('startAnalysisBtn');
    
    if (startBtn) startBtn.style.display = demoState.isRecording ? 'none' : 'flex';
    if (stopBtn) stopBtn.style.display = demoState.isRecording ? 'flex' : 'none';
    if (analyzeBtn) {
        analyzeBtn.textContent = demoState.isAnalyzing ? 'Stop Analysis' : 'Start Analysis';
        analyzeBtn.onclick = demoState.isAnalyzing ? stopEmotionAnalysis : startEmotionAnalysis;
    }
}