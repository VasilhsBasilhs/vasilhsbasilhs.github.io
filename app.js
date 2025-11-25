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