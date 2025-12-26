//<!-- FILE: app.js -->
// Lightweight interactivity: nav toggle, year, sample subscribe behavior
(function(){
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if(navToggle && mainNav){
navToggle.addEventListener('click', ()=>{
const open = navToggle.getAttribute('aria-expanded') === 'true';
navToggle.setAttribute('aria-expanded', String(!open));
mainNav.classList.toggle('open');
});
}


// Set copyright year
const el = document.getElementById('year');
if(el) el.textContent = new Date().getFullYear();


// Fake subscribe (client-only demo)
const form = document.getElementById('subscribeForm');
if(form){
form.addEventListener('submit', (e)=>{
e.preventDefault();
const email = form.email.value.trim();
if(!email) return alert('Βάλε email.');
// Demo behaviour: show thanks message
form.innerHTML = '<p>Ευχαριστούμε — θα σε ενημερώνουμε με νέα!</p>';
})
}
})();

// Screenshot Media Payer

document.addEventListener("DOMContentLoaded", () => {

    const gridImages = Array.from(document.querySelectorAll('.screenshot-grid img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const navLeft = document.querySelector('.lightbox .nav-left');
    const navRight = document.querySelector('.lightbox .nav-right');

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = gridImages[index].src;
        lightbox.classList.remove('hidden');
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % gridImages.length;
        lightboxImg.src = gridImages[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + gridImages.length) % gridImages.length;
        lightboxImg.src = gridImages[currentIndex].src;
    }

    gridImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    navLeft.addEventListener('click', showPrev);
    navRight.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

});

//



// Scroll Screenshot Main App Page

/* ===============================
   Screenshots Slider Logic
   - arrows
   - dots
   - fade gradients
================================ */

document.querySelectorAll('.screenshots').forEach(section => {

    // Βασικά στοιχεία
    const wrapper = section.querySelector('.screenshots-wrapper');
    const grid = section.querySelector('.screenshot-grid');
    const images = Array.from(grid.querySelectorAll('img'));
    const leftBtn = section.querySelector('.shot-nav.left');
    const rightBtn = section.querySelector('.shot-nav.right');
    const dotsContainer = section.querySelector('.screenshot-dots');

    // Flag για να ξέρουμε αν το scroll
    // γίνεται από κουμπί (βελάκι / dot)
    // ή από πραγματικό swipe του χρήστη
    let isProgrammaticScroll = false;

    let currentIndex = 0;

    /* -----------------------------
       Δημιουργία dots
    ------------------------------ */
    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Screenshot ${index + 1}`);
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            scrollToIndex(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    /* -----------------------------
    Scroll σε συγκεκριμένο index
    (μέσω βελακιών ή dots)
    ------------------------------ */
    function scrollToIndex(index) {

        // Κλειδώνουμε προσωρινά
        // το scroll-based index detection
        isProgrammaticScroll = true;

        images[index].scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });

        currentIndex = index;
        updateUI();

        /*
        Ξεκλειδώνουμε ΜΕΤΑ το animation.
        Το 400ms είναι ασφαλές για smooth scroll.
        */
        setTimeout(() => {
            isProgrammaticScroll = false;
        }, 400);
    }


    /* -----------------------------
       Ενημέρωση UI:
       - dots
       - arrows
       - fade gradients
    ------------------------------ */
    function updateUI() {

        // Ενεργή τελεία
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Auto-hide βελάκια
        leftBtn.style.display =
            currentIndex === 0 ? 'none' : 'block';

        rightBtn.style.display =
            currentIndex === images.length - 1 ? 'none' : 'block';

        // Fade gradients
        wrapper.classList.toggle('fade-left', currentIndex > 0);
        wrapper.classList.toggle(
            'fade-right',
            currentIndex < images.length - 1
        );
    }

    /* -----------------------------
       Click βελάκια
    ------------------------------ */
    rightBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    });

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    });

    /* -----------------------------
    Sync dots όταν γίνεται swipe
    (αγνοείται όταν scroll γίνεται
        από βελάκια / dots)
    ------------------------------ */
    grid.addEventListener('scroll', () => {

        // Αν το scroll είναι "προγραμματικό",
        // δεν κάνουμε τίποτα
        if (isProgrammaticScroll) return;

        const scrollLeft = grid.scrollLeft;
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

        let newIndex = currentIndex;

        /* 
        Αν είμαστε ΤΕΡΜΑ δεξιά,
        επιλέγουμε ΠΑΝΤΑ το τελευταίο screenshot
        */
        if (scrollLeft >= maxScrollLeft - 2) {
            newIndex = images.length - 1;
        }

        /* 
        Αν είμαστε ΤΕΡΜΑ αριστερά
        */
        else if (scrollLeft <= 2) {
            newIndex = 0;
        }

        /*
        Ενδιάμεση κατάσταση:
        βρίσκουμε το screenshot που
        είναι πιο κοντά στο scrollLeft
        */
        else {
            let minDiff = Infinity;

            images.forEach((img, i) => {
                const diff = Math.abs(img.offsetLeft - scrollLeft);
                if (diff < minDiff) {
                    minDiff = diff;
                    newIndex = i;
                }
            });
        }

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateUI();
        }
    });

    /* -----------------------------
    Περιμένουμε να φορτώσουν
    ΟΛΕΣ οι εικόνες screenshots
    ------------------------------ */
    function waitForImages(callback) {

        let loadedCount = 0;
        const totalImages = images.length;

        // Αν δεν υπάρχουν εικόνες, προχωράμε
        if (totalImages === 0) {
            callback();
            return;
        }

        images.forEach(img => {

            // Αν η εικόνα είναι ήδη cached
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        callback();
                    }
                });

                img.addEventListener('error', () => {
                    // Ακόμα και αν αποτύχει, προχωράμε
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        callback();
                    }
                });
            }
        });

        // Όλες φορτωμένες από cache
        if (loadedCount === totalImages) {
            callback();
        }
    }


    /* -----------------------------
       Αν χωράνε όλες οι εικόνες
       κρύβουμε arrows / dots / fade
    ------------------------------ */
    function checkOverflow() {
        const needsScroll = grid.scrollWidth > grid.clientWidth;

        leftBtn.style.display = needsScroll ? leftBtn.style.display : 'none';
        rightBtn.style.display = needsScroll ? rightBtn.style.display : 'none';
        dotsContainer.style.display = needsScroll ? 'flex' : 'none';

        wrapper.classList.toggle('fade-left', false);
        wrapper.classList.toggle('fade-right', needsScroll);
    }

    window.addEventListener('resize', checkOverflow);

/*     updateUI();
    checkOverflow(); */

    /* --------------------------------
    Αρχικοποίηση ΜΟΝΟ αφού
    φορτώσουν οι εικόνες
    --------------------------------- */
    waitForImages(() => {
        updateUI();
        checkOverflow();
    });

});


