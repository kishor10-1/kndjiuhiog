
/* =====================================================
   NABEENEYYY — PREMIUM FLOWER GALLERY
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const loader = document.getElementById("loader");
    const navbar = document.querySelector(".navbar");

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const filters = document.querySelectorAll(".filter");
    const cards = Array.from(
        document.querySelectorAll(".flower-card")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxNumber =
        document.getElementById("lightboxNumber");

    const currentImage =
        document.getElementById("currentImage");

    const closeBtn =
        document.getElementById("lightboxClose");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");


    /* =================================================
       LOADING SCREEN
    ================================================= */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 1600);

    });


    /* Safety: loader never stays forever */

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 3500);


    /* =================================================
       NAVBAR SCROLL
    ================================================= */

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            menuBtn.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle(
                "no-scroll"
            );

        });

    }


    /* Close menu after clicking a link */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menuBtn?.classList.remove("active");

                mobileMenu?.classList.remove("active");

                document.body.classList.remove(
                    "no-scroll"
                );

            });

        });


    /* =================================================
       GALLERY FILTER
    ================================================= */

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(btn => {
                btn.classList.remove("active");
            });

            filter.classList.add("active");

            const category =
                filter.dataset.filter;

            cards.forEach((card, index) => {

                const cardCategory =
                    card.dataset.category;

                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.classList.remove("hidden");

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";

                    }, index * 35);

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =================================================
       LIGHTBOX
    ================================================= */

    let currentIndex = 0;


    function updateLightbox() {

        const card = cards[currentIndex];

        if (!card) return;

        const image =
            card.querySelector("img");

        if (!image) return;


        /* Image */

        lightboxImage.src = image.src;

        lightboxImage.alt =
            image.alt || "Flower";


        /* Title */

        lightboxTitle.textContent =
            card.dataset.title || "Flower";


        /* Number */

        const number =
            card.dataset.number ||
            String(currentIndex + 1)
                .padStart(2, "0");

        lightboxNumber.textContent =
            number;

        currentImage.textContent =
            number;

    }


    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    function nextImage() {

        currentIndex++;

        if (
            currentIndex >= cards.length
        ) {

            currentIndex = 0;

        }

        updateLightbox();

    }


    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                cards.length - 1;

        }

        updateLightbox();

    }


    /* =================================================
       OPEN IMAGE
    ================================================= */

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    /* =================================================
       LIGHTBOX BUTTONS
    ================================================= */

    closeBtn?.addEventListener(
        "click",
        closeLightbox
    );

    nextBtn?.addEventListener(
        "click",
        nextImage
    );

    prevBtn?.addEventListener(
        "click",
        previousImage
    );


    /* =================================================
       CLOSE BY BACKGROUND
    ================================================= */

    lightbox?.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =================================================
       KEYBOARD
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );


    /* =================================================
       TOUCH SWIPE
    ================================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    lightbox?.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    lightbox?.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            const distance =
                touchStartX - touchEndX;


            if (
                Math.abs(distance) < 50
            ) {
                return;
            }


            if (distance > 0) {
                nextImage();
            } else {
                previousImage();
            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".intro-main, .gallery-heading, .love-content"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =================================================
       IMAGE PRELOAD
    ================================================= */

    cards.forEach(card => {

        const img =
            card.querySelector("img");

        if (!img) return;

        const preload =
            new Image();

        preload.src = img.src;

    });


    /* =================================================
       LIGHTBOX PRELOAD
    ================================================= */

    function preloadImage(index) {

        if (!cards[index]) return;

        const img =
            cards[index].querySelector("img");

        if (!img) return;

        const preload =
            new Image();

        preload.src = img.src;

    }


    function preloadAround() {

        preloadImage(
            (currentIndex + 1) %
            cards.length
        );

        preloadImage(
            (currentIndex - 1 +
                cards.length) %
            cards.length
        );

    }


    /* preload whenever image changes */

    const originalUpdate =
        updateLightbox;


    /* =================================================
       IMAGE DRAG PREVENTION
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =================================================
       SMOOTH HERO PARALLAX
    ================================================= */

    const heroImage =
        document.querySelector(
            ".hero-photo img"
        );


    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!heroImage) return;

            if (ticking) return;

            window.requestAnimationFrame(() => {

                const scroll =
                    window.scrollY;

                if (
                    scroll <
                    window.innerHeight
                ) {

                    heroImage.style.transform =
                        `translateY(${scroll * 0.035}px)`;

                }

                ticking = false;

            });

            ticking = true;

        },
        {
            passive: true
        }
    );


    /* =================================================
       SMOOTH ANCHOR SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =================================================
       CONSOLE
    ================================================= */

    console.log(
        "🌸 NABEENEYYY — Premium Flower Gallery"
    );

    console.log(
        "♥ Made with love by Nabeeneyyy"
    );

});