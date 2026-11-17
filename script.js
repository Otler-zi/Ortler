
document.addEventListener("DOMContentLoaded", () => {

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ANIMATION ELEMENTS
    const elements = document.querySelectorAll(
        "#about h2, #about > p, .about-features > div, #products h2, #products > p, .product-card, #contact > *"
    );

    elements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.transitionDelay = `${(index % 4) * 0.12}s`;
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
