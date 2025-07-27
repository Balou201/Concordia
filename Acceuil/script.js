document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.navbar-nav a');

    // Fonction pour changer le style du header au scroll
    const handleScroll = () => {
        if (window.scrollY > 50) { // Si l'utilisateur a scrollé de plus de 50px
            header.style.backgroundColor = 'rgba(26, 32, 44, 0.95)'; // Rendre le fond un peu plus opaque
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)'; // Ombre plus prononcée
        } else {
            header.style.backgroundColor = 'rgba(26, 32, 44, 0.9)'; // Revenir au fond initial
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)'; // Ombre initiale
        }
    };

    // Ajoute l'écouteur d'événement pour le scroll
    window.addEventListener('scroll', handleScroll);

    // Initialise le style du header au chargement si déjà scrollé
    handleScroll();

    // Effet de défilement doux (smooth scroll) pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement de saut par défaut
            
            const targetId = this.getAttribute('href'); // Récupère l'ID de la section cible
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcule la position de défilement en tenant compte du header fixe
                const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Défilement doux
                });

                // Optionnel: Mettre à jour la classe 'active' pour le lien de navigation
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Optionnel: Observer les sections pour mettre à jour le lien actif dans la navigation
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px', // Active quand la moitié de la section est visible
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
