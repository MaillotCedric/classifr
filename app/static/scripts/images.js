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

function afficher_nom_categorie(data) {
    let h5 = document.getElementById("h5_" + data.id);

    h5.innerHTML = "Catégorie : " + data.nom;
};


function afficher_images(data) {
    let images = data.results;
    let images_container = document.getElementById("images-container");
    let count = 0;

    images_container.innerHTML = "";
    images.forEach((image, index) => {
        count++;
        images_container.innerHTML += `
            <!-- Bouton -->
            <div class="img-thumbnail " data-toggle="modal" data-target="#exampleModal`+count+`" id="`+image.nom+count+`">
                    <img id_categorie=`+ image.categorie +` src="`+ image.chemin +`" alt="`+ image.nom +`" />
            </div>


            <!-- Modal -->
            <div class="modal fade" id="exampleModal`+count+`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="`+image.nom+ ' '+count+`">`+ image.nom +`</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="false">&times;</span>
                            </button>
                        </div>

                        <!-- Contenu du Modal -->
                    <div class="modal-body">
                        <img  id="`+image.nom+count+`" src="`+ image.chemin +`" alt="`+ image.nom +`"/> 
                        <h5 id="h5_`+ image.categorie +`">`+"Code catégorie : "+ image.categorie +`</h5>
                    </div>

                    <!-- Boutton en bas du modal -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary stretched-link" data-dismiss="modal">Fermer</button>
                        </div>
                </div>
            </div>
            </div>
        `;
    });

    $("img").click((event) => {
        let id_categorie = event.target.attributes.id_categorie.value;

        ajax_call("GET", "../api/categorie/" + id_categorie, donnees={}, success_callback=afficher_nom_categorie, error_callback=afficher_error);
    })
};



ajax_call("GET", "../api/categorie", donnees={}, success_callback=creer_select_categorie);

ajax_call("GET", "../api/image", donnees={}, success_callback=afficher_images);

$(document).on("change", "#select-categorie", function(event){
    event.preventDefault();
    id_categorie = event.target.value;
    ajax_url = id_categorie !== "" ? "../api/image/?categorie_id="+id_categorie : "../api/image";
    
    ajax_call("GET", ajax_url, donnees={}, success_callback=afficher_images, error_callback=afficher_error);
});
