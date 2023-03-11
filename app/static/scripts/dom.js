/**
 * Fonctions liées au DOM (manipulation, inspection, ...)
 */

/**
 * Insérer du HTML dans une div
 * @param {String} html
 * @param {Object} div
 */
function inserer(html, div) {
    div.innerHTML = html;
};

/**
 * Ajouter une classe à une div
 * @param {String} classe La classe à ajouter
 * @param {Object} div La div sélectionnée
 */
function ajouter_classe(classe, div) {
    div.classList.add(classe);
};

/**
 * Supprimer une classe à une div
 * @param {String} classe La classe à supprimer
 * @param {Object} div La div sélectionnée
 */
function supprimer_classe(classe, div) {
    div.classList.remove(classe);
};

/**
 * La div sélectionnée possède-t-elle la classe spécifiée ?
 * @param {Object} div La div sélectionnée
 * @param {String} nom_classe
 * @returns {Boolean}
 */
function possede_classe(div, nom_classe) {
    let classes = div.classList.value.split(" "); // Un tableau regroupant les différentes classes que possède la div sélectionnée

    return est_present(nom_classe, classes);
};

/**
 * L'id de l'élément cliqué
 * @param {Object} evenement_clic // Click event
 * @returns {String}
 */
function id_element_clique(evenement_clic) {
    return evenement_clic.target.id;
};
