function creer_select_categorie(data) {
    let categories = data.results;
    let select_categorie = document.getElementById("select-categorie");

    select_categorie.innerHTML = `
        <option value="" selected>Sélectionner une catégorie</option>
    `;

    categories.forEach(categorie => {
        select_categorie.innerHTML += `
            <option value="`+ categorie.id +`">`+ categorie.nom +`</option>
        `;
    });
};

function afficher_images(data) {
    let images = data.results;
    let images_container = document.getElementById("images-container");

    images_container.innerHTML = "";
    images.forEach(image => {
        images_container.innerHTML += `
            <div class="img-thumbnail">
                <img src="`+ image.chemin +`" alt="`+ image.nom +`"/>
            </div>
        `;
    });
};

ajax_call("GET", "../api/categorie", donnees={}, success_callback=creer_select_categorie);

ajax_call("GET", "../api/image", donnees={}, success_callback=afficher_images);

$(document).on("change", "#select-categorie", function(event){
    event.preventDefault();

    id_categorie = event.target.value;
    ajax_url = id_categorie !== "" ? "../api/image/?categorie_id="+id_categorie : "../api/image";
    
    ajax_call("GET", ajax_url, donnees={}, success_callback=afficher_images, error_callback=afficher_error);
});
