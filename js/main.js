/* ==========================================================================
   NISHANT PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   Interactivity, Typing Animations, Filters, Theme Switcher & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initTypingEffect();
    initStatCounters();
    initSkillProgressBars();
    initProjectFilters();
    initProjectModals();
    initContactForm();
    initCopyButtons();
});

/* --- 1. Dark/Light Theme Switcher --- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeBtn, savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeBtn, newTheme);
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

/* --- 2. Mobile Navigation Toggle --- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

/* --- 3. Typing Effect in Hero Section --- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        "Data Analyst & BI Specialist",
        "AI & Machine Learning Engineer",
        "Python & Full-Stack Developer",
        "Computer Science Engineer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

/* --- 4. Counter Animation for Statistics --- */
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 1500;
                const startTime = performance.now();
                const isDecimal = target % 1 !== 0;

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const currentValue = progress * target;
                    counter.textContent = isDecimal ? currentValue.toFixed(2) : Math.floor(currentValue);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = isDecimal ? target.toFixed(2) : target;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* --- 5. Skill Tab & Progress Bar Animation --- */
function initSkillProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar-fill');
                if (bar) {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => observer.observe(card));

    // Tab Filter functionality on Skills Page
    const tabBtns = document.querySelectorAll('.skill-tabs .tab-btn');
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                skillCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/* --- 6. Project Category Filtering --- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --- 7. Project Details Modal --- */

const projectDetailsData = {
    'assistive-system': {
        title: "AI-Based Smart Assistive System for Visually Impaired",
        subtitle: "B.Tech Major Project • Computer Vision & Audio Guidance",
        image: "images/assistive_system.jpg",
        tags: ["Python", "PyQt5", "YOLO11 ONNX", "ResNet3D-18", "Donut VQA", "PaddleOCR", "Twilio API"],
        description: `
            <p><strong>Overview:</strong> Developed an end-to-end voice-activated assistive application designed to help visually impaired individuals navigate their environment safely and independently.</p>
            <br>
            <p><strong>Key Architectural Features:</strong></p>
            <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>Real-time object detection via <strong>YOLO11 (ONNX runtime)</strong> with immediate audio directional guidance.</li>
                <li>Activity recognition utilizing <strong>ResNet3D-18</strong> for temporal motion context analysis.</li>
                <li>Medicine label parsing and document reading with <strong>Donut VQA</strong> and <strong>PaddleOCR/dlib</strong>.</li>
                <li>Facial recognition module for detecting known individuals.</li>
                <li>Automated SOS emergency alert dispatcher via <strong>Twilio REST API</strong> triggered on fall or voice distress detection.</li>
            </ul>
        `,
        demoUrl: null,
        githubUrl: "https://github.com/Nishant0179"
    },
    'disease-prediction': {
        title: "Multiple Disease Prediction System",
        subtitle: "Django Web Application • Machine Learning Diagnostics",
        image: "images/disease_prediction.jpg",
        tags: ["Django", "Python", "Scikit-Learn", "Pandas", "NumPy", "Joblib", "Render Cloud"],
        description: `
            <p><strong>Overview:</strong> Engineered a clinical diagnostic web portal capable of assessing risk levels across 6 critical health conditions using patient symptom parameters.</p>
            <br>
            <p><strong>Key Technical Highlights:</strong></p>
            <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>Preprocessed complex medical datasets with feature scaling and imputation using Pandas and NumPy.</li>
                <li>Trained multiple Scikit-Learn classifiers prioritizing <em>Recall</em> to minimize false negatives in medical diagnostics.</li>
                <li>Serialized optimized models using Joblib for low-latency inference in production.</li>
                <li>Deployed live production build on Render Cloud with interactive web forms.</li>
            </ul>
        `,
        demoUrl: "https://multiple-disease-prediction-t0kt.onrender.com",
        githubUrl: "https://github.com/Nishant0179"
    },
    'sales-analytics': {
        title: "Interactive Sales Analytics Dashboard",
        subtitle: "Power BI Solution • Business Intelligence & Star Schema",
        image: "images/sales_dashboard.jpg",
        tags: ["Microsoft Power BI", "DAX", "Excel", "Star Schema Modeling", "ETL", "EDA"],
        description: `
            <p><strong>Overview:</strong> Profiled raw multi-regional transaction datasets to construct executive-level Power BI dashboards driving strategic commercial decisions.</p>
            <br>
            <p><strong>Key Technical Highlights:</strong></p>
            <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>Performed raw transaction cleaning, handling anomalies and null values in Excel & Power Query.</li>
                <li>Modeled relational <strong>Star Schema</strong> with Fact and Dimension tables for optimal measure query speed.</li>
                <li>Authored complex DAX calculations for revenue growth YTD, customer LTV, regional profit margins, and sales KPI variance.</li>
                <li>Designed intuitive interactive visual slicers and drill-through pages for executive sprint reviews.</li>
            </ul>
        `,
        demoUrl: null,
        githubUrl: "https://github.com/Nishant0179"
    },
    'career-chatbot': {
        title: "AI-Powered Career Guidance Chatbot",
        subtitle: "Flask Web Application • OpenAI API & NLP",
        image: "images/career_chatbot.jpg",
        tags: ["Flask", "OpenAI API", "Python", "HTML5/CSS3", "Jinja2", "Render Cloud"],
        description: `
            <p><strong>Overview:</strong> Built an intelligent career advisory chatbot that analyzes student academic backgrounds and generates custom learning roadmaps.</p>
            <br>
            <p><strong>Key Technical Highlights:</strong></p>
            <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                <li>Integrated OpenAI GPT APIs with context-aware prompt engineering tailored for academic profiling.</li>
                <li>Built lightweight Flask backend with dynamic Jinja2 template rendering.</li>
                <li>Implemented real-time streaming response parsing and interactive course suggestion cards.</li>
                <li>Deployed on Render Cloud with high uptime and responsive UI across all viewports.</li>
            </ul>
        `,
        demoUrl: "https://career-chatbot-web.onrender.com",
        githubUrl: "https://github.com/Nishant0179"
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalBody = modal.querySelector('.modal-body-content');
    const closeBtn = modal.querySelector('.modal-close');

    document.querySelectorAll('.open-project-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectDetailsData[projectId];

            if (data && modalBody) {
                let tagsHtml = data.tags.map(t => `<span class="tech-badge">${t}</span>`).join(' ');
                let actionBtns = '';

                if (data.demoUrl) {
                    actionBtns += `<a href="${data.demoUrl}" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1.25rem;"><i class="fas fa-external-link-alt"></i> Live Demo</a> `;
                }
                if (data.githubUrl) {
                    actionBtns += `<a href="${data.githubUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.5rem 1.25rem;"><i class="fab fa-github"></i> GitHub Profile</a>`;
                }

                modalBody.innerHTML = `
                    <img src="${data.image}" alt="${data.title}" class="modal-banner-img">
                    <h2 class="section-title" style="font-size: 1.75rem; margin-bottom: 0.25rem;">${data.title}</h2>
                    <p style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 1.25rem;">${data.subtitle}</p>
                    <div class="badge-group" style="margin-bottom: 1.5rem;">${tagsHtml}</div>
                    <div class="modal-description" style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem;">
                        ${data.description}
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${actionBtns}
                    </div>
                `;

                modal.classList.add('active');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* --- 8. Contact Form Validation & Real Email Sending --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact Inquiry';
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Open user's email client directly with pre-filled email details
        const mailtoUrl = `mailto:nishantvk44@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        setTimeout(() => {
            window.location.href = mailtoUrl;

            // Display Success Feedback
            const formFeedback = document.getElementById('form-feedback');
            if (formFeedback) {
                formFeedback.style.display = 'block';
                formFeedback.innerHTML = `
                    <div style="padding: 1rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-green); border-radius: 8px; color: var(--accent-green); font-weight: 600;">
                        <i class="fas fa-check-circle"></i> Thank you ${name}! Opening your email client to send this message directly to nishantvk44@gmail.com.
                    </div>
                `;
                form.reset();
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 7000);
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 500);
    });
}

/* --- 9. Copy to Clipboard Buttons --- */
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = "Copied!";
                    btn.style.color = "var(--accent-green)";
                    btn.style.borderColor = "var(--accent-green)";
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.color = "";
                        btn.style.borderColor = "";
                    }, 2000);
                });
            }
        });
    });
}
