document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.collapsible-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            // Basculer la classe 'active' sur l'en-tête (pour la flèche)
            this.classList.toggle('active');

            // Trouver le contenu collapsable associé
            const content = this.nextElementSibling; // Le div.collapsible-content est juste après le h3

            // Basculer la classe 'active' sur le contenu pour afficher/masquer
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
});
