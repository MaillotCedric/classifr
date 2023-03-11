function reset_form_feedback(id_prediction) {
    let select_correct_feedback = document.getElementById("select-feedback-prediction-" + id_prediction);
    let textarea_commentaire_feedback = document.getElementById("textarea-feedback-prediction-" + id_prediction);

    select_correct_feedback.value = "";
    textarea_commentaire_feedback.value = "";
};

function afficher_predictions(data) {
    let predictions = data.results;
    let predictions_container = document.getElementById("predictions-container");
    
    predictions_container.innerHTML = "";
    predictions.forEach(prediction => {
        let checked = prediction.correct === true ? "checked" : "";
        let commentaire = prediction.commentaire === null ? "" : prediction.commentaire;

        predictions_container.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <div class="prediction-image-container">
                        <img src="`+ prediction.image.chemin +`" alt="`+ prediction.image.nom +`"/>
                    </div>
                    <hr style="margin: 10px;"/>
                    <div class="prediction-actions-container">
                        <button id_prediction="`+ prediction.id +`" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-feedback-prediction-`+ prediction.id +`">
                            Feedback <i class="fa fa-comment"></i>
                        </button>
                        <button id_prediction="`+ prediction.id +`" type="button" class="btn btn-secondary btn-sm btn-details-predictions" data-toggle="modal" data-target="#modal-details-prediction-`+ prediction.id +`">
                            Détails <i id_prediction="`+ prediction.id +`" class="fa fa-eye"></i>
                        </button>
                    </div>
                </div>
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
                            <div class="details-prediction-header">
                                <div id="details-prediction-`+ prediction.id +`-image-container" class="img-thumbnail"></div>
                                <div>
                                    Modèle utilisé : <span id="details-prediction-`+ prediction.id +`-modele" class="badge badge-secondary badge-success" style="font-size: 15px;"></span>
                                </div>
                            </div>
                            <hr/>
                            <div id="details-prediction-`+ prediction.id +`-resultats-container"></div>
                            <hr/>
                            <div id="details-prediction-`+ prediction.id +`-feedback-container"></div>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div> -->
                    </div>
                </div>
            </div>

            <!-- modal feedback prédiction -->
            <div id_prediction="`+ prediction.id +`" class="modal fade modal-feedback" id="modal-feedback-prediction-`+ prediction.id +`" tabindex="-1" role="dialog" aria-labelledby="detailsPredictionModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            Faire un feedback
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <!-- <div class="form-group form-check">
                                <input id="checkbox-feedback-prediction-`+ prediction.id +`" type="checkbox" class="form-check-input" id="checkbox-prediction-correct" `+ checked +`>
                                <label class="form-check-label" for="checkbox-prediction-correct">Prédiction correcte ?</label>
                            </div> -->
                            <div class="form-group">
                                <label for="select-feedback-prediction-`+ prediction.id +`">Prédiction bonne ?</label>
                                <select id="select-feedback-prediction-`+ prediction.id +`" class="form-control">
                                    <option value="" selected>Non renseigné</option>
                                    <option value="oui">Oui</option>
                                    <option value="non">Non</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="textarea-prediction-commentaire">Commentaire</label>
                                <textarea id="textarea-feedback-prediction-`+ prediction.id +`" class="form-control" id="textarea-prediction-commentaire" rows="3">`+ commentaire +`</textarea>
                            </div>
                            <button type="submit" id_prediction="`+ prediction.id +`" class="btn btn-primary btn-submit-feedback-prediction">Envoyer le feedback</button>
                        </form>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div> -->
                    </div>
                </div>
            </div>
        `;
    });

    $(".modal-feedback").on("hidden.bs.modal", function (event) {
        let id_prediction = event.target.attributes.id_prediction.value;

        reset_form_feedback(id_prediction);
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

function afficher_header_details_prediction(data) {
    let id_prediction = data.id;
    let chemin_image = data.image.chemin;
    let nom_modele = data.modele.nom;
    let image_container = document.getElementById("details-prediction-"+ id_prediction +"-image-container");
    let nom_modele_container = document.getElementById("details-prediction-"+ id_prediction +"-modele");

    image_container.innerHTML = "";
    nom_modele_container.innerHTML == "";
    image_container.innerHTML = `
        <img src="`+ chemin_image +`"/>
    `;
    nom_modele_container.innerHTML = nom_modele;
};

function sorted_predictions(predictions) {
    predictions.sort((a, b) => {
        let score_a = a.score;
        let score_b = b.score;
        
        return score_b - score_a;
    });
};

function afficher_resultats_details_prediction(data) {
    let resultats = data.results;
    let resultats_container = document.getElementById("details-prediction-"+ id_prediction +"-resultats-container");

    sorted_predictions(resultats);

    resultats_container.innerHTML = "";
    resultats_container.innerHTML += `<div class="mb-2">Prédictions</div>`;
    resultats_container.innerHTML += `<ul class="list-group">`;
    resultats.forEach(resultat => {
        let categorie = resultat.categorie.nom;
        let score = resultat.score + " %";

        resultats_container.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                `+ categorie +`
                <span class="badge badge-primary badge-pill">`+ score +`</span>
            </li>
        `;
    });
    resultats_container.innerHTML += `</ul>`;
};

function afficher_feedback_details_prediction(data) {
    let correct = data.correct === null ? "Non renseigné" : data.correct === true ? "Oui" : "Non";
    let commentaire = data.commentaire === null ? "Aucun commentaire" : data.commentaire === "" ? "Aucun commentaire" : data.commentaire;
    let feedback_container = document.getElementById("details-prediction-"+ id_prediction +"-feedback-container");

    feedback_container.innerHTML = "";
    feedback_container.innerHTML += `<div class="mb-2">Feedback</div>`;
    feedback_container.innerHTML += `
        <div>
            Prédiction correcte : `+ correct +`
        </div>
        <div>
            Commentaire : `+ commentaire +`
        </div>
    `;
};

function afficher_details_prediction(data) {
    afficher_header_details_prediction(data);
    afficher_feedback_details_prediction(data);
};

function fermer_modale_feedback(data) {
    let id_prediction = data.id;
    
    $("#modal-feedback-prediction-" + id_prediction).modal("hide");
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

$(document).on("click", ".btn-details-predictions", (event) => {
    id_prediction = event.target.attributes.id_prediction.value;
    ajax_url_prediction_instance = "../api/prediction/" + id_prediction;
    ajax_url_prediction_resultats = "../api/resultat/?prediction_id=" + id_prediction;

    ajax_call("GET", ajax_url_prediction_instance, donnees={}, success_callback=afficher_details_prediction, error_callback=afficher_error);
    ajax_call("GET", ajax_url_prediction_resultats, donnees={}, success_callback=afficher_resultats_details_prediction, error_callback=afficher_error);
});

$(document).on("click", ".btn-submit-feedback-prediction", (event) => {
    event.preventDefault();

    let id_prediction = event.target.attributes.id_prediction.value;
    let select_correct_value = document.getElementById("select-feedback-prediction-" + id_prediction).value;
    let correct = select_correct_value === "" ? null : select_correct_value === "oui" ? true : false;
    let commentaire = document.getElementById("textarea-feedback-prediction-" + id_prediction).value;
    let ajax_url = "../api/prediction/" + id_prediction + "/";
    let donnees = {correct, commentaire};
    afficher(donnees);

    ajax_call("PUT", ajax_url, donnees=donnees, success_callback=fermer_modale_feedback, error_callback=afficher_error);
});
