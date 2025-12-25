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

// Scroll Screenshot Main App Page

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.screenshots-wrapper').forEach(wrapper => {

        const grid = wrapper.querySelector('.screenshot-grid');
        const leftBtn = wrapper.querySelector('.shot-nav.left');
        const rightBtn = wrapper.querySelector('.shot-nav.right');

        function updateNavVisibility() {
            const needsScroll = grid.scrollWidth > grid.clientWidth;
            leftBtn.style.display = needsScroll ? 'block' : 'none';
            rightBtn.style.display = needsScroll ? 'block' : 'none';
        }

        leftBtn.addEventListener('click', () => {
            grid.scrollBy({ left: -grid.clientWidth * 0.8, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            grid.scrollBy({ left: grid.clientWidth * 0.8, behavior: 'smooth' });
        });

        grid.addEventListener('scroll', updateNavVisibility);
        window.addEventListener('resize', updateNavVisibility);

        updateNavVisibility();
    });

});

