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
        let top = window.scrollY;
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
    header.classList.toggle('sticky', window.scrollY > 50);

    // remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// scroll reveal animations
ScrollReveal({ 
    distance: '40px',
    duration: 1200,
    delay: 150
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .services-container, .portfolio-container, contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// typed js for rolling multiple roles
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'WordPress Specialist', 'Automation & AI Enthusiast'],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1200,
    loop: true
});

// form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('input[type="submit"]');
    const originalValue = submitBtn.value;
    
    submitBtn.value = "Enviando...";
    submitBtn.disabled = true;

    const data = {
        nombre: form.nombre.value,
        email: form.email.value,
        telefono: form.telefono.value,
        asunto: form.asunto.value,
        mensaje: form.mensaje.value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('¡Correo enviado correctamente! Me pondré en contacto pronto.');
            e.target.reset();
        } else {
            alert('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
        }
    } catch (err) {
        alert('Error de conexión con el servidor. Inténtalo más tarde.');
    } finally {
        submitBtn.value = originalValue;
        submitBtn.disabled = false;
    }
});