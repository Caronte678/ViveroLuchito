// ── CARRUSEL HERO AUTOMÁTICO ──
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 0) {
  setInterval(() => {
    heroSlides[currentHeroSlide].classList.remove('activa');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('activa');
  }, 4000); // Cambia cada 4 segundos
}

// ── CARRUSEL DE PLANTAS ──
const track = document.getElementById('carruselTrack');
const cardWidth = () => track.querySelector('.planta-card').offsetWidth + 20;

document.querySelector('.prev').addEventListener('click', () => {
  track.scrollLeft -= cardWidth();
});
document.querySelector('.next').addEventListener('click', () => {
  track.scrollLeft += cardWidth();
});

// ── OVERLAY AL HACER CLICK EN CARTA ──
const overlay = document.getElementById('plantaOverlay');

document.querySelectorAll('.planta-card').forEach(card => {
  card.addEventListener('click', () => {
    const nombrePlanta = card.dataset.nombre;

    document.getElementById('overlayNombre').textContent = nombrePlanta;
    document.getElementById('overlayEspecie').textContent = card.dataset.especie;
    document.getElementById('overlayCuidados').textContent = card.dataset.cuidados;
    document.getElementById('overlayExtra').textContent = card.dataset.extra;
    document.getElementById('overlayImg').src = card.querySelector('img').src;

    // Configurar el enlace de WhatsApp con el nombre de la planta
    const btnWhatsapp = document.getElementById('btnConsultarDisponibilidad');
    if (btnWhatsapp) {
      const telefono = '56936346334';
      const mensaje = `Buenas tardes vivero luchito, tienes disponibilidad de "${nombrePlanta}"?`;
      btnWhatsapp.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    }

    overlay.classList.add('visible');
    overlay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

function cerrarOverlay() { overlay.classList.remove('visible'); }
document.getElementById('overlayCerrar').addEventListener('click', cerrarOverlay);

// ── FILTROS ──
document.querySelectorAll('.filtro').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    const filtro = btn.dataset.filtro;
    document.querySelectorAll('.planta-card').forEach(card => {
      card.style.display =
        filtro === 'todas' || card.dataset.categoria === filtro
          ? 'block' : 'none';
    });

    cerrarOverlay();
  });
});
// ── PESTAÑA FLOTANTE ──
const panel = document.getElementById('contactoPanel');
const flotante = document.getElementById('contactoFlotante');

document.getElementById('contactoTab').addEventListener('click', () => {
  panel.classList.toggle('abierto');
});

// Cierra el panel si se hace click fuera
document.addEventListener('click', (e) => {
  if (flotante && !flotante.contains(e.target)) {
    panel.classList.remove('abierto');
  }
});