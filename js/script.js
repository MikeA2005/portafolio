// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections active link 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        var top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// scroll reveal
ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, contact form', {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});

// typed js
const typed = new Typed('.multiple-text', {
    strings: ['Web Designer','Frontend Developer', 'Backend Developer', 'DBA'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        nombre: form.nombre.value,
        email: form.email.value,
        telefono: form.telefono.value,
        asunto: form.asunto.value,
        mensaje: form.mensaje.value
    };

    try {
        const response = await fetch('api-contacto-production.up.railway.app/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Correo enviado correctamente');
            form.reset();
        } else {
            alert('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
        }
    } catch (err) {
        alert('Error de conexión. Por favor, inténtalo de nuevo más tarde.');
    }
});