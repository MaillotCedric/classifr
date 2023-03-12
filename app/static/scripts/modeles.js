function creer_select_modele(data) {
    let modeles = data.results.reverse();
    let select_modele = document.getElementById("select-modele");

    select_modele.innerHTML = `
        <option value="`+ modeles[0].id +`" selected>Sélectionner un modèle</option>
    `;

    modeles.forEach(modele => {
        select_modele.innerHTML += `
            <option value="`+ modele.id +`">`+ modele.nom +`</option>
        `;
    });
};

function afficher_modele(data) {
    console.log(data);
    let modele = data;
    
    let modeles_container = document.getElementById("modeles-container");

    console.log(modele.date_created);
    // Convertir la date au format "dd-mm-yyyy"
    let date_created = new Date(modele.date_created);
    let day = date_created.getDate().toString().padStart(2, '0');
    let month = (date_created.getMonth() + 1).toString().padStart(2, '0');
    let year = date_created.getFullYear();
    let date_created_formatted = `${day}-${month}-${year}`;

    modeles_container.innerHTML = `
        <div class="modele-thumbnail">
            <h1>${modele.nom}</h1>
            <h3>Entraînement terminé le  ${date_created_formatted}</h3>
            <br>
            
            <div class="row">
                <div class="col-md-12 col-lg-5">
                    <p class="gauge-title text-center" style="font-weight: bold;">Précision</p>
                    <canvas id="gauge-chart-precision"></canvas>
                </div>
                <div class="col-md-12 col-lg-5">
                    <p class="gauge-title text-center" style="font-weight: bold;">Recall</p>
                    <canvas id="gauge-chart-recall"></canvas>
                </div>
            </div>

            <div class="card" style="width: 35rem;">
                <div class="card-body">
                    <h4 class="card-title">Catégories</h4>
                    <br>
                    <div class="row">
                    <div class="col-md-6">
                        <h5 class="card-subtitle mb-2 text-muted">Nom de la catégorie</h5>
                    </div>
                    <div class="col-md-6">
                        <h5 class="card-subtitle mb-2 text-muted">Nb d'images</h5>
                    </div>
                    </div>
                    <hr>
                    <div id="categories" class="card-text"></div>
                </div>
            </div>

        </div>
    `;
    
    
    // Afficher les jauges
    var precision_value = modele.accuracy;
    var recall_value = modele.recall;

    var config_precision = {
        type: 'gauge',
        data: {
            labels: ['Fail', 'Warning', 'Warning','Success'],
            datasets: [{
                data: [25, 50, 85, 100],
                value: precision_value,
                minValue: 0,
                backgroundColor: ['red','orange','yellow','green'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    bottom: 30
                }
            },
            min: 0,
            max: 100,
            needle: {
                radiusPercentage: 2,
                widthPercentage: 3.2,
                lengthPercentage: 80,
                color: 'rgba(0, 0, 0, 1)'
            },
            valueLabel: {
                formatter: Math.round,
                display: true,
                fontSize: 20,
                backgroundColor: 'green'
            },
            plugins: {
                datalabels: {
                    display: true,
                    formatter:  function (value, context) {
                        return context.chart.data.labels[context.dataIndex];
                    },
                    color: 'rgba(0, 0, 0, 1.0)',
                    backgroundColor: null,
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                },
            },
        },
    };

    var config_recall = {
        type: 'gauge',
        data: {
            labels: ['Fail', 'Warning', 'Warning','Success'],
            datasets: [{
                data: [25, 50, 85, 100],
                value: recall_value,
                minValue: 0,
                backgroundColor: ['red','orange','yellow','green'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    bottom: 30
                }
            },
            min: 0,
            max: 100,
            needle: {
                radiusPercentage: 2,
                widthPercentage: 3.2,
                lengthPercentage: 80,
                color: 'rgba(0, 0, 0, 1)'
            },
            valueLabel: {
                formatter: Math.round,
                display: true,
                fontSize: 20,
                backgroundColor: 'green'
            },
            plugins: {
                datalabels: {
                    display: true,
                    formatter:  function (value, context) {
                        return context.chart.data.labels[context.dataIndex];
                    },
                    color: 'rgba(0, 0, 0, 1.0)',
                    backgroundColor: null,
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                },
            },
        },
    };

    var ctx = document.getElementById('gauge-chart-precision').getContext('2d');
    window.myGauge = new Chart(ctx, config_precision);

    var ctx = document.getElementById('gauge-chart-recall').getContext('2d');
    window.myGauge = new Chart(ctx, config_recall);

    // Récupérer les détails du modèle
    let id_modele = modele.id;
    let url_details_modele = "../api/details-modele/?modele_id=" + id_modele;

    ajax_call("GET", url_details_modele, donnees={}, success_callback= function(data) {
        let categories = data.results.filter(function(item) {
            return item.modele_id === id_modele;
        }).map(function(item) {
            return { nom: item.categorie.nom, nb_images: item.nb_images };
        });
        let categories_string = categories.map(function(item) {
            return "<div class='row'><div class='col-md-6'>" + item.nom + "</div><div class='col-md-6'>" + item.nb_images + "</div></div><br>";
        }).join("");
        document.getElementById("categories").innerHTML = categories_string;
        }, error_callback=afficher_error);
};

ajax_call("GET", "../api/modele", donnees={}, success_callback=creer_select_modele);

$(document).on("change", "#select-modele", function(event){
    event.preventDefault();

    id_modele = event.target.value;
    console.log(id_modele);
    ajax_url = id_modele !== "" ? "../api/modele/"+id_modele : "../api/modele";
    
    ajax_call("GET", ajax_url, donnees={}, success_callback=afficher_modele, error_callback=afficher_error);
});

//// le bon

// function creer_select_modele(data) {
//     let modeles = data.results;
//     let select_modele = document.getElementById("select-modele");

//     select_modele.innerHTML = `
//         <option value="" selected>Sélectionner un modèle</option>
//     `;

//     modeles.forEach(modele => {
//         select_modele.innerHTML += `
//             <option value="`+ modele.id +`">`+ modele.nom +`</option>
//         `;
//     });
// };

// function afficher_modele(data) {
//     console.log(data);
//     let modele = data;
    
//     let modeles_container = document.getElementById("modeles-container");

//     console.log(modele.date_created);
//     // Convertir la date au format "dd-mm-yyyy"
//     let date_created = new Date(modele.date_created);
//     let day = date_created.getDate().toString().padStart(2, '0');
//     let month = (date_created.getMonth() + 1).toString().padStart(2, '0');
//     let year = date_created.getFullYear();
//     let date_created_formatted = `${day}-${month}-${year}`;

//     modeles_container.innerHTML = `
//         <div class="modele-thumbnail">
//             <h1>${modele.nom}</h1>
//             <h3>Entraînement terminé le  ${date_created_formatted}</h3>
//             <br>
            
//             <div class="row">
//                 <div class="col-sm-5">
//                     <p class="gauge-title text-center" style="font-weight: bold;">Précision</p>
//                     <canvas id="gauge-chart-precision"></canvas>
//                 </div>
//                 <div class="col-sm-5">
//                     <p class="gauge-title text-center" style="font-weight: bold;">Recall</p>
//                     <canvas id="gauge-chart-recall"></canvas>
//                 </div>
//             </div>

//             <div class="card" style="width: 25rem;">
//                 <div class="card-body">
//                     <h4 class="card-title">Catégories</h4>
//                     <br>
//                     <h5 id="categories" class="card-subtitle mb-2 text-muted"></h5>
//                 </div>
//             </div>
//         </div>
//     `;
    
    
//     // Afficher les jauges
//     var precision_value = modele.accuracy;
//     var recall_value = modele.recall;

//     var config_precision = {
//         type: 'gauge',
//         data: {
//             labels: ['Fail', 'Warning', 'Warning','Success'],
//             datasets: [{
//                 data: [25, 50, 85, 100],
//                 value: precision_value,
//                 minValue: 0,
//                 backgroundColor: ['red','orange','yellow','green'],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             responsive: true,
//             layout: {
//                 padding: {
//                     bottom: 30
//                 }
//             },
//             min: 0,
//             max: 100,
//             needle: {
//                 radiusPercentage: 2,
//                 widthPercentage: 3.2,
//                 lengthPercentage: 80,
//                 color: 'rgba(0, 0, 0, 1)'
//             },
//             valueLabel: {
//                 formatter: Math.round,
//                 display: true
//             },
//             plugins: {
//                 datalabels: {
//                     display: true,
//                     formatter:  function (value, context) {
//                         return context.chart.data.labels[context.dataIndex];
//                     },
//                     color: 'rgba(0, 0, 0, 1.0)',
//                     backgroundColor: null,
//                     font: {
//                         size: 15,
//                         weight: 'bold'
//                     },
//                 },
//             },
//         },
//     };

//     var config_recall = {
//         type: 'gauge',
//         data: {
//             labels: ['Fail', 'Warning', 'Warning','Success'],
//             datasets: [{
//                 data: [25, 50, 85, 100],
//                 value: recall_value,
//                 minValue: 0,
//                 backgroundColor: ['red','orange','yellow','green'],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             responsive: true,
//             layout: {
//                 padding: {
//                     bottom: 30
//                 }
//             },
//             min: 0,
//             max: 100,
//             needle: {
//                 radiusPercentage: 2,
//                 widthPercentage: 3.2,
//                 lengthPercentage: 80,
//                 color: 'rgba(0, 0, 0, 1)'
//             },
//             valueLabel: {
//                 formatter: Math.round,
//                 display: true
//             },
//             plugins: {
//                 datalabels: {
//                     display: true,
//                     formatter:  function (value, context) {
//                         return context.chart.data.labels[context.dataIndex];
//                     },
//                     color: 'rgba(0, 0, 0, 1.0)',
//                     backgroundColor: null,
//                     font: {
//                         size: 15,
//                         weight: 'bold'
//                     },
//                 },
//             },
//         },
//     };

//     var ctx = document.getElementById('gauge-chart-precision').getContext('2d');
//     window.myGauge = new Chart(ctx, config_precision);

//     var ctx = document.getElementById('gauge-chart-recall').getContext('2d');
//     window.myGauge = new Chart(ctx, config_recall);


//     // Récupérer les catégories du modèle sélectionné à partir de l'API details-modele
//     let id_modele = modele.id;
//     let url_details_modele = "../api/details-modele/?modele_id=" + id_modele;

//     ajax_call("GET", url_details_modele, donnees={}, success_callback= function(data) {
//         let categories = data.results.filter(function(item) {
//             return item.modele_id === id_modele;
//         }).map(function(item) {
//             return item.categorie.nom;
//         });
//         console.log(categories);
//         let categories_string = categories.join("<br><br>");
//         document.getElementById("categories").innerHTML = categories_string;
//     }, error_callback=afficher_error);


// };

// ajax_call("GET", "../api/modele", donnees={}, success_callback=creer_select_modele);

// $(document).on("change", "#select-modele", function(event){
//     event.preventDefault();

//     id_modele = event.target.value;
//     console.log(id_modele);
//     ajax_url = id_modele !== "" ? "../api/modele/"+id_modele : "../api/modele";
    
//     ajax_call("GET", ajax_url, donnees={}, success_callback=afficher_modele, error_callback=afficher_error);
// });

////// le bon

let nav_link_modeles = document.getElementById("nav-link-modeles");

ajouter_classe("active", nav_link_modeles);
