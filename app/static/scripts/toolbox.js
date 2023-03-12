function afficher(message) {
    console.log(message);
};

function majuscule(chaine_caracteres) {
    return chaine_caracteres.toUpperCase();
};

/**
 * L'index de l'élément dans le tableau
 * @param {Object} element
 * @param {Array} tableau
 * @returns {Boolean}
 * @example
 * // returns 2
 * index(18, [3, 10, 18, 20]);
 * @example
 * // returns -1
 * index("maxime", ["jean", "paul", "christian"]);
 */
function index(element, tableau) {
    return tableau.findIndex((element_analyse) => {
        return element_analyse === element;
    });
};

/**
 * L'élément est-il présent dans le tableau ?
 * @param {Object} element
 * @param {Array} tableau
 * @returns {Boolean}
 * @returns {Boolean}
 * @example
 * // returns true
 * est_present(18, [3, 10, 18, 20]);
 * @example
 * // returns false
 * est_present("maxime", ["jean", "paul", "christian"]);
 */
function est_present(element, tableau) {
    return index(element, tableau) !== -1;
};
