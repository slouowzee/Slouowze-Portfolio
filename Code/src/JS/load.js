const button = document.getElementById("load-more");
const moreInfo = document.getElementById("more-info");

button.addEventListener("click", function() {
    if (moreInfo.style.display === "none" || moreInfo.style.display === "") {
        // Afficher plus d'info instantanément
        moreInfo.style.display = "block";
        moreInfo.classList.add('animate-fadeIn');
        button.setAttribute('data-i18n', 'about_less');
        // Mettre à jour le texte immédiatement si i18n est disponible
        if (window.i18n) {
            button.innerHTML = window.i18n.translate('about_less');
        }
    } else {
        // Cacher les infos instantanément
        moreInfo.classList.remove('animate-fadeIn');
        moreInfo.style.display = "none";
        button.setAttribute('data-i18n', 'about_more');
        // Mettre à jour le texte immédiatement si i18n est disponible
        if (window.i18n) {
            button.innerHTML = window.i18n.translate('about_more');
        }
    }
});