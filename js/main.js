document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded correctly.');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    iniciarPantallaCarga();
    iniciarBotonScroll();
    iniciarAparecerLetras();
    iniciarSliderHistories();
    iniciarSliderMenu();
});



// Define CSS variables for colors directly
const colorsBySection = {
    home: {
        headerTextColor: 'var(--color-text)',
        textColor: 'var(--color-text-secondary)',
        backgroundColor: '',
        navColor: '#57160b'
    },
    phrases: {
        headerTextColor: 'var(--color-text)',
        textColor: 'var(--color-text-secondary)',
        backgroundColor: '',
        navColor: '#57160b'
    },
    about: {
        headerTextColor: 'var(--color-text)',
        textColor: 'var(--color-background-secondary)',
        backgroundColor: 'var(--color-text-secondary)',
        navColor: '#57160b'
    },
    projects: {
        headerTextColor: 'var(--color-text)',
        textColor: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        navColor: '#57160b'
    },
    contact: {
        headerTextColor: 'var(--color-text)',
        textColor: 'var(--color-text-secondary)',
        backgroundColor: 'var(--color-background)',
        navColor: '#57160b'
    }
};

function iniciarPantallaCarga() {
    // Loading animation
    let loadingNumber = 0;
    const maxLoadingNumber = 10;
    const loadingInterval = 100; // 0.1 seconds 100 ms
    const currentNumberElement = document.querySelector('#current-number');
    const letterV = document.querySelector('.initials:first-child');
    const letterI = document.querySelector('.initials:last-child');
    const loadingNumberElement = document.querySelector('.loading-number');

    function updateLoading() {
        if (loadingNumber <= maxLoadingNumber) {
            let displayNumber = loadingNumber < 10 ? '0' + loadingNumber : loadingNumber;
            currentNumberElement.textContent = displayNumber;
            loadingNumber++;
            setTimeout(updateLoading, loadingInterval);
        } else {
            gsap.to(loadingNumberElement, {
                duration: 0.3,
                opacity: 0,
                onComplete: function () {
                    loadingNumberElement.style.display = 'none';

                    // Append and animate 'lada' to 'V'
                    const vText = 'lada'.split(''); // lada -> ['l','a','d','a']
                    vText.forEach(letter => {
                        const span = document.createElement('span');
                        span.textContent = letter;
                        span.classList.add('fade-letter');
                        letterV.appendChild(span);
                    });

                    // Append and animate 'vaniv' to 'I'
                    const iText = 'vaniv'.split('');
                    iText.forEach(letter => {
                        const span = document.createElement('span');
                        span.textContent = letter;
                        span.classList.add('fade-letter');
                        letterI.appendChild(span);
                    });

                    // Animate 'Designer' text
                    const designerText = 'Designer'.split('');
                    designerText.forEach(letter => {
                        const span = document.createElement('span');
                        span.textContent = letter;
                        span.classList.add('fade-letter-designer');
                        document.querySelector('.profession-text').appendChild(span);
                    });

                    gsap.fromTo(
                        '.fade-letter-designer',
                        { opacity: 0, y: -100 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: 'bounce.in',
                            stagger: 0.2,
                            onComplete: function () {
                                setTimeout(function () {
                                    gsap.to('#loading-screen', {
                                        duration: 0.5,
                                        opacity: 0,
                                        ease: "power2.out",
                                        onComplete: function () {
                                            document.getElementById('loading-screen').style.display = 'none';
                                            // Show the header and main content
                                            gsap.to('header', { duration: 1, opacity: 1, ease: "power2.out" });
                                            gsap.to('main', { duration: 1, opacity: 1, ease: "power2.out", delay: 0.5 });
                                            gsap.to('footer', { duration: 1, opacity: 1, ease: "power2.out", delay: 0.7 });
                                            // Re-enable scrolling
                                            document.body.style.overflowY = 'auto';
                                        }
                                    });
                                }, loadingInterval * 30);
                            }
                        }
                    );

                    gsap.fromTo(
                        '.fade-letter',
                        { opacity: 0, y: -100 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: 'bounce.in',
                            stagger: 0.2
                        }
                    );
                }
            });
        }
    }

    // Start the loading animation
    updateLoading();
}

function iniciarBotonScroll() {
    // Get the scroll button and its SVG icon
    const scrollBtn = document.getElementById('scroll-btn');
    const scrollBtnSvg = scrollBtn.querySelector('svg');
    // Get all sections
    const sections = Array.from(document.querySelectorAll('.parallax'));
    let currentSectionIndex = 0;
    // Function to update styles for each section
    sections.forEach((section, index) => {
        const sectionId = section.id;
        const colors = colorsBySection[sectionId] || {};

        // Change section text color
        if (colors.textColor) {
            section.style.color = colors.textColor;
            const pTag = section.querySelector('p');
            if (pTag) {
                pTag.style.color = colors.textColor;
            }
        }

        // Change header text color
        if (colors.headerTextColor) {
            const h1 = section.querySelector('h1');
            const h3 = section.querySelector('h3');
            if (h1) {
                h1.style.color = colors.headerTextColor;
            }
            if (h3) {
                h3.style.color = colors.headerTextColor;
            }
        }

        // Change background color
        const bg = section.querySelector('.bg');
        if (bg && colors.backgroundColor) {
            bg.style.backgroundColor = colors.backgroundColor;
        }
    });

    // Create a single IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8 // Considered visible when 80% of the section is visible
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = sections.indexOf(entry.target);
                if (index !== -1) {
                    currentSectionIndex = index;
                    // Update scroll button icon rotation
                    if (currentSectionIndex === sections.length - 1) {
                        scrollBtnSvg.style.transform = 'rotate(180deg)';
                    } else {
                        scrollBtnSvg.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Scroll button click event
    scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let nextSectionIndex = (currentSectionIndex + 1) % sections.length;
        let nextSection = sections[nextSectionIndex];
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentSectionIndex = nextSectionIndex;

        // Update scroll button icon rotation
        if (currentSectionIndex === sections.length - 1) {
            scrollBtnSvg.style.transform = 'rotate(180deg)';
        } else {
            scrollBtnSvg.style.transform = 'rotate(0deg)';
        }
    });
}

function iniciarAparecerLetras() {
    const wrapLetters = (element) => {
        const htmlContent = element.innerHTML;
        let wrappedText = '';
        let insideTag = false;

        for (let i = 0; i < htmlContent.length; i++) {
            const char = htmlContent[i];

            if (char === '<') {
                insideTag = true;
                wrappedText += char;
            } else if (char === '>') {
                insideTag = false;
                wrappedText += char;
            } else if (!insideTag && char.trim() !== "") {
                // Wrap only visible characters (no spaces)
                wrappedText += `<span>${char}</span>`;
            } else {
                // Leave spaces and HTML tags as they are
                wrappedText += char;
            }
        }

        element.innerHTML = wrappedText;
    };
    const textElement = document.getElementById('animatedText');
    wrapLetters(textElement);
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#phrases",
            scrub: true,
            pin: true,
            start: "top top",
            end: "+=200%"
        }
    });
    tl.from("#phrases span", { color: "#F72E00", backgroundColor: '#F72E00', stagger: 0.1 });
}

function iniciarAnimacionAbout() {
    const aboutSectionTrigger = {
        trigger: 'section#about',
        start: 'top top', 
        end: '+=200%',
        scrub: true
    };

    gsap.fromTo('section#about', {
        borderTopLeftRadius: '25% 100%',
        borderTopRightRadius: '25% 100%',
    }, {
        borderTopLeftRadius: '0% 0%',
        borderTopRightRadius: '0% 0%',
        ease: 'none',
        scrollTrigger: aboutSectionTrigger
    });
    gsap.fromTo(
        '#about h2',
        { x: '-100vw' },
        { x: 0, scrollTrigger: aboutSectionTrigger }
    );
}

function iniciarSliderHistories() {
    const swiper = new Swiper('.shortFormContentSwiper', {
        effect: 'fade',        
        loop: true,             
        autoplay: {
            delay: 1000,       
            disableOnInteraction: true 
        },
        fadeEffect: {
            crossFade: false  
        }
    });
}

function iniciarSliderMenu() {
    const swiper1 = new Swiper(".menuSwiper", {
        effect: 'cards'
    });
}
