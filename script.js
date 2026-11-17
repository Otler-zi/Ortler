
document.addEventListener("DOMContentLoaded", () => {

    // STABLE SMOOTH SCROLL ALL DEVICES
    const scrollDuration = 1800;
    const header = document.querySelector("header");
/** @param {HTMLElement} target */
function smoothScrollTo(target) {
        const startPosition = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        const distance = targetPosition - startPosition;
        const startTime = performance.now();

      /** @param {number} currentTime */
function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);

            // Smooth ease-in-out
            const easing = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(
                0,
                startPosition + distance * easing
            );

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                event.preventDefault();
                smoothScrollTo(target);
            }
        });
    });

    // SCROLL REVEAL ANIMATION
    const elements = document.querySelectorAll(
        "#about h2, #about > p, .about-features > div, #products h2, #products > p, .product-card, #contact > *"
    );

    elements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.transitionDelay =
            `${(index % 4) * 0.15}s`;
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    elements.forEach(element => {
        observer.observe(element);
    });

});
