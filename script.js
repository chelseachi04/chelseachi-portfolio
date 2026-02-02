document.addEventListener("DOMContentLoaded", function () {
    // --- NAV MENU LOGIC ---
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const icon = menuToggle ? menuToggle.querySelector("i") : null;

    if (menuToggle && navLinks && icon) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            if (navLinks.classList.contains("active")) {
                icon.classList.replace("fa-bars", "fa-times");
            } else {
                icon.classList.replace("fa-times", "fa-bars");
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            });
        });
    }

    // --- TYPING EFFECT LOGIC ---
    const typedTextSpan = document.getElementById("typed-text");
    const roles = ["Front-End Developer", "Web Developer", "Designer"];
    const typingDelay = 100, erasingDelay = 50, newTextDelay = 2000;
    let roleIndex = 0, charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingDelay + 500);
        }
    }
    if (typedTextSpan) setTimeout(type, 1000);

    // --- MODAL LOGIC ---
    const projectItems = document.querySelectorAll(".project-item");
    const modal = document.getElementById("projectModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalDetails = document.querySelector(".modal-details");

    const projectData = {
        web1: {
            title: "Shoe E-commerce Website",
            category: "Web Development",
            description: "A dynamic e-commerce application built with React, featuring real-time cart updates and state-driven product filtering.",
            tools: ["React", "Vite", "SASS"],
            image: "Shoe.png",
            liveUrl: "https://sole-studio-r47a.vercel.app/",
            repoUrl: "#"
        },
        web2: {
            title: "Portfolio Website",
            category: "Web Development",
            description: "A comprehensive professional hub designed to showcase my journey as a developer.",
            tools: ["HTML5", "CSS3", "JavaScript"],
            image: "portfolio.png",
            liveUrl: "#",
            repoUrl: "#"
        }
    };

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project-id');
            const data = projectData[projectId];
            if (!data || !modalDetails) return;

            modalDetails.innerHTML = `
                <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius:10px; margin-bottom:15px;">
                <h3>${data.title}</h3>
                <p style="color:#00ff9d; font-weight:600;">${data.category}</p>
                <p>${data.description}</p>
                <h4 style="margin-top: 20px;">Technologies:</h4>
                <p>${data.tools.map(t => `<span style="background:#0F1B3D; padding:4px 8px; border-radius:4px; margin-right:5px; font-size:0.85rem;">${t}</span>`).join('')}</p>
                <div style="margin-top: 20px;">
                    <a href="${data.liveUrl}" target="_blank" class="project-btn">Live Link</a>
                </div>
            `;
            modal.style.display = "block";
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = "none"; });
});

// --- CONTACT FORM SUBMISSION LOGIC ---
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // This keeps the user on your site

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector(".submit-btn");

        // Show the user something is happening
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // 1. Show the success popup
                alert("Your message was sent successfully!");

                // 2. Clear the form fields
                contactForm.reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Error: Could not connect to the server.");
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Back to Top Logic
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================
const revealSections = document.querySelectorAll('[data-reveal]');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealSections.forEach(section => {
    section.classList.add('reveal');
    revealOnScroll.observe(section);
});

// ============================
// NAVBAR SCROLL BEHAVIOR
// ============================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    lastScroll = currentScroll;
});

// Parallax effect removed to keep image static with text

// ============================
// MAGNETIC BUTTON EFFECT
// ============================
const ctaButtons = document.querySelectorAll('.cta-btn, .primary-btn, .secondary-btn, .project-btn, .submit-btn');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function (e) {
        this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    });

    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.15;
        const moveY = y * 0.15;

        this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

// --- CERTIFICATIONS TOGGLE LOGIC ---
const viewAllBtn = document.getElementById("viewAllBtn");
const additionalCerts = document.querySelectorAll(".additional-cert");
const btnText = document.getElementById("btnText");
const btnIcon = document.getElementById("btnIcon");

if (viewAllBtn && additionalCerts.length > 0) {
    viewAllBtn.addEventListener("click", function () {
        const isHidden = additionalCerts[0].style.display === "none" || additionalCerts[0].style.display === "";

        additionalCerts.forEach((cert, index) => {
            if (isHidden) {
                cert.style.display = "block";
                // Slight delay for stagger effect
                setTimeout(() => {
                    cert.style.opacity = "1";
                    cert.style.transform = "translateY(0)";
                }, index * 100);
            } else {
                cert.style.opacity = "0";
                cert.style.transform = "translateY(20px)";
                setTimeout(() => {
                    cert.style.display = "none";
                }, 300);
            }
        });

        if (isHidden) {
            btnText.textContent = "View Less Certifications";
            btnIcon.style.transform = "rotate(180deg)";
        } else {
            btnText.textContent = "View All Certifications";
            btnIcon.style.transform = "rotate(0deg)";
        }
    });
}


// ==========================
// CUSTOM CURSOR LOGIC
// ==========================
const initCursor = () => {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    let isHovering = false;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .cta-btn, .view-live-btn, .cert-link, .logo, .menu-toggle, [role="button"]');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            document.body.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            document.body.classList.remove('cursor-active');
        });
    });

    // Animation Loop
    const render = () => {
        // Dot follows precisely
        dotX = mouseX;
        dotY = mouseY;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

        // Ring follows with smooth easing (lerp)
        const lerp = (start, end, amount) => (1 - amount) * start + amount * end;
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);

        // Scroll distortion effect
        const currentScrollY = window.scrollY;
        scrollSpeed = Math.abs(currentScrollY - lastScrollY) * 0.05;
        lastScrollY = currentScrollY;

        const scaleX = 1 + scrollSpeed;
        const scaleY = 1 - scrollSpeed * 0.5;

        // Apply scale down on hover (0.75x) instead of enlarging
        const hoverScale = 0.75;
        const finalScaleX = isHovering ? hoverScale : scaleX;
        const finalScaleY = isHovering ? hoverScale : scaleY;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${finalScaleX}, ${finalScaleY})`;

        requestAnimationFrame(render);
    };

    render();
};

// Initialize cursor if not a touch device
if (!('ontouchstart' in window) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initCursor();
} else {
    // Show default cursor for touch/reduced motion
    document.body.style.cursor = 'auto';
}
