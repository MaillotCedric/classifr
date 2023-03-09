function creer_select_modele(data) {
    let modeles = data.results;
    let select_modele = document.getElementById("select-modele");

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

ajax_call("GET", "../api/modele", donnees={}, success_callback=creer_select_modele, error_callback=afficher_error);

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
    let modele_id = document.getElementById("select-modele").value;
    let donnees = {data_image, image, nom_image};

    ajax_call("POST", "../api/modele/"+ modele_id +"/predict/", donnees=donnees, success_callback=afficher_success, error_callback=afficher_error);
});
