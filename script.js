document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation bar style change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Hero Slider Logic
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    if (slider && slides.length > 0) {
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            slider.style.transform = `translateX(-${(100 / totalSlides) * currentIndex}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        // Autoplay slider
        setInterval(() => {
            nextBtn.click();
        }, 5000); // Ganti gambar setiap 5 detik
    }

    // 3. Animate sections on scroll
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const animatedItems = entry.target.querySelectorAll('.card, .feature-row, .tutorial-step, .profil-container');
                animatedItems.forEach((item, index) => {
                    item.style.setProperty('--i', index);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 4. Gallery Modal (Lightbox)
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const galleryImages = document.querySelectorAll(".galeri-grid img");
    const closeModal = document.querySelector(".close");

    galleryImages.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});