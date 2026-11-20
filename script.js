// Register GSAP plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
    const THEME_STORAGE_KEY = 'xepbio-theme';
    const rootHtml = document.documentElement;
    const isEnglishPage = rootHtml.lang === 'en';

    function updateThemeButtons(isLight) {
        const label = isLight
            ? (isEnglishPage ? '🌙 Dark' : '🌙 다크')
            : (isEnglishPage ? '☀️ Light' : '☀️ 밝은 테마');
        const ariaLabel = isLight
            ? (isEnglishPage ? 'Switch to dark theme' : '다크 테마로 전환')
            : (isEnglishPage ? 'Switch to light theme' : '밝은 테마로 전환');
        document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
            btn.textContent = label;
            btn.setAttribute('aria-label', ariaLabel);
            btn.setAttribute('aria-pressed', String(isLight));
        });
    }

    function applyTheme(theme) {
        const isLight = theme === 'light';
        rootHtml.classList.toggle('light-theme', isLight);
        document.body.classList.toggle('light-theme', isLight);
        updateThemeButtons(isLight);
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);

    document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const nextTheme = rootHtml.classList.contains('light-theme') ? 'dark' : 'light';
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            applyTheme(nextTheme);
        });
    });

    // 1. Navigation Background Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-navy-900/90', 'shadow-xl', 'py-3', 'border-cyan/10');
                navbar.classList.remove('py-4', 'border-white/5');
            } else {
                navbar.classList.remove('bg-navy-900/90', 'shadow-xl', 'py-3', 'border-cyan/10');
                navbar.classList.add('py-4', 'border-white/5');
            }
        });
    }

    // 2. Interactive Floating Animations
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(
            '.gsap-hero',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
        );

        gsap.utils.toArray('.gsap-fade').forEach((element) => {
            gsap.fromTo(
                element,
                { y: 40, opacity: 0, scale: 0.98 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: element, start: 'top 85%' },
                }
            );
        });

        gsap.to('#hero-orb', {
            y: -40,
            rotation: 5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        gsap.utils.toArray('.gsap-float').forEach((el) => {
            gsap.to(el, {
                y: -25,
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        });
    }

    // 3. Mobile Menu Toggler
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconPath = document.getElementById('menu-icon-path');
    let isMenuOpen = false;

    function toggleMenu() {
        if (!mobileMenu || !menuIconPath) return;
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            menuIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMenu);
        document.querySelectorAll('.mobile-link').forEach((link) => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }
});
