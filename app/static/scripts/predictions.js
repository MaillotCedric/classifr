function afficher_predictions(data) {
    let predictions = data.results;
    let predictions_container = document.getElementById("predictions-container");
    
    predictions_container.innerHTML = "";
    predictions.forEach(prediction => {
        predictions_container.innerHTML += `
            <div id_prediction="`+ prediction.id +`" class="img-thumbnail img-thumbnail-preview" data-toggle="modal" data-target="#modal-details-prediction-`+ prediction.id +`">
                <img id_prediction="`+ prediction.id +`" src="`+ prediction.image.chemin +`" alt="`+ prediction.image.nom +`"/>
            </div>

            <!-- modal détails prédiction -->
            <div class="modal fade" id="modal-details-prediction-`+ prediction.id +`" tabindex="-1" role="dialog" aria-labelledby="detailsPredictionModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            Détails de la prédiction
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="details-prediction-`+ prediction.id +`-image-container" class="img-thumbnail">
                                image
                            </div>
                            <hr/>
                            <div id="details-prediction-`+ prediction.id +`-resultats-container">
                                résultats
                            </div>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div> -->
                    </div>
                </div>
            </div>
        `;
    });
};

function creer_select_modele_prediction(data) {
    let modeles = data.results;
    let select_modele = document.getElementById("select-modele-prediction");

    modeles.forEach((modele, index) => {
        if (index === 0) {
            select_modele.innerHTML += `
                <option value="`+ modele.id +`" selected>`+ modele.nom +`</option>
            `;
        } else {
            select_modele.innerHTML += `
                <option value="`+ modele.id +`">`+ modele.nom +`</option>
            `;
        };
    });
};

function creer_select_modele_filtre(data) {
    let modeles = data.results;
    let select_modele = document.getElementById("select-modele-filtre");

    select_modele.innerHTML = `
        <option value="" selected>Sélectionner un modèle</option>
    `;

    modeles.forEach((modele, index) => {
        select_modele.innerHTML += `
            <option value="`+ modele.id +`">`+ modele.nom +`</option>
        `;
    });
};

function creer_selects(data) {
    creer_select_modele_prediction(data);
    creer_select_modele_filtre(data);
};

function afficher_image_details_prediction(data) {
    let id_prediction = data.id;
    let chemin_image = data.image.chemin;
    let image_container = document.getElementById("details-prediction-"+ id_prediction +"-image-container");

    image_container.innerHTML = "";
    image_container.innerHTML = `
        <img src="`+ chemin_image +`"/>
    `;
};

ajax_call("GET", "../api/modele", donnees={}, success_callback=creer_selects, error_callback=afficher_error);
ajax_call("GET", "../api/prediction", donnees={}, success_callback=afficher_predictions, error_callback=afficher_error);

$(document).on("change", "#input-file-image", (event) => {
    event.preventDefault();

    let src = URL.createObjectURL(event.target.files[0]);
    let nom_image = event.target.files[0].name;
    let reader = new FileReader();

    $("#image-preview-container").html(`
        <img id="image-preview" class="img-thumbnail" src="`+ src +`" alt="`+ nom_image +`">
    `);

    // nettoyage du local storage
    localStorage.clear();

    // enregistrement de l'image dans le local storage
    reader.onload = function () {
        let this_image = reader.result;
        localStorage.setItem("image_data", this_image);
    };
    reader.readAsDataURL(event.target.files[0]);
});

$(document).on("click", "#form-prediction-submit-btn", (event) => {
    event.preventDefault();

    // récupération de l'image à partir du local storage (image en base 64)
    let data_image = localStorage.getItem("image_data");
    let image = document.getElementById("image-preview").alt;
    let nom_image = image.replace(/\.[^/.]+$/, "");
    let modele_id = document.getElementById("select-modele-prediction").value;
    let donnees = {data_image, image, nom_image};

    ajax_call("POST", "../api/modele/"+ modele_id +"/predict/", donnees=donnees, success_callback=afficher_success, error_callback=afficher_error);
});

$(document).on("change", "#select-modele-filtre", function(event){
    event.preventDefault();
    id_modele = event.target.value;
    ajax_url = id_modele !== "" ? "../api/prediction/?modele_id="+id_modele : "../api/prediction";
    
    ajax_call("GET", ajax_url, donnees={}, success_callback=afficher_predictions, error_callback=afficher_error);
});

$(document).on("click", ".img-thumbnail-preview", (event) => {
    id_prediction = event.target.attributes.id_prediction.value;
    ajax_url_prediction_instance = "../api/prediction/" + id_prediction;
    ajax_url_prediction_resultats = "../api/resultat/?prediction_id=" + id_prediction;

    ajax_call("GET", ajax_url_prediction_instance, donnees={}, success_callback=afficher_image_details_prediction, error_callback=afficher_error);
    // ajax_call("GET", ajax_url_prediction_resultats, donnees={}, success_callback=afficher_success, error_callback=afficher_error);
});
