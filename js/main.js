document.addEventListener('DOMContentLoaded', () => {
// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
}

// --- Theme Management ---
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('jerai_theme');
if (currentTheme == 'light') {
document.body.setAttribute('data-theme', 'light');
} else if (currentTheme == 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
// Default is already dark in our CSS, but we keep this for robust switching
document.body.removeAttribute('data-theme');
}

if (themeToggle) {
themeToggle.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    if (theme !== 'light') {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('jerai_theme', 'light');
    } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('jerai_theme', 'dark');
    }
});
}

// --- Language Switching ---
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('jerai_lang') || 'en';

function applyTranslations(lang) {
// Update HTML lang attribute
document.documentElement.lang = lang;

// Find all elements with data-i18n attribute
document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // If we have translations.js loaded and the key exists
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
    el.textContent = translations[lang][key];
    }
});
}

if (langToggle) {
// Set initial button text (If current is EN, button shows BM as an option)
langToggle.textContent = currentLang === 'en' ? 'BM' : 'EN';
applyTranslations(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'bm' : 'en';
    localStorage.setItem('jerai_lang', currentLang);
    langToggle.textContent = currentLang === 'en' ? 'BM' : 'EN';
    applyTranslations(currentLang);
});
}
});