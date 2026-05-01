/* ========================================
   NAVBAR — scroll shrink
======================================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ========================================
   REVEAL LATERAL — IntersectionObserver
======================================== */
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ========================================
   HERO — entra desde los lados al cargar
======================================== */
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.hero-left')?.classList.add('visible');
        document.querySelector('.hero-right')?.classList.add('visible');
    }, 100);
});

/* ========================================
   SKILLS — stagger al entrar en viewport
======================================== */
const skills = document.querySelectorAll('.skill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const allSkills = Array.from(skills);
            const idx = allSkills.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), idx * 55);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
skills.forEach(s => skillObserver.observe(s));

/* ========================================
   EFECTO RIPPLE en botones .btn y .btn-small
======================================== */
// Inyectar keyframe una sola vez
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(3); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

function addRipple(e) {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
        position: absolute;
        width: ${diameter}px; height: ${diameter}px;
        left: ${e.clientX - rect.left - diameter / 2}px;
        top: ${e.clientY - rect.top - diameter / 2}px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple .55s linear;
        pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
}

document.querySelectorAll('.btn, .btn-small').forEach(btn => {
    btn.addEventListener('click', addRipple);
});

/* ========================================
   AÑO DINÁMICO
======================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
