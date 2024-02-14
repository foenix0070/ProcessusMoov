// DDC
$(document).ready(function () {
    $('#chargerDonneesDDCEncours').click(function () {
        $.ajax({
            url: './SDC/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesDDCValide').click(function () {
        $.ajax({
            url: './SDC/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesDDCRejete').click(function () {
        $.ajax({
            url: './SDC/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// DDC End






// AAbs
$(document).ready(function () {
    $('#chargerDonneesAAbsEncours').click(function () {
        $.ajax({
            url: './AAbs/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesAAbsValide').click(function () {
        $.ajax({
            url: './AAbs/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesAAbsRejete').click(function () {
        $.ajax({
            url: './AAbs/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// AAbs End




// FDM 
$(document).ready(function () {
    $('#chargerDonneesFDMEncours').click(function () {
        $.ajax({
            url: './FDM/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesFDMValide').click(function () {
        $.ajax({
            url: './FDM/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesFDMRejete').click(function () {
        $.ajax({
            url: './FDM/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// FDM End



// RFDM 
$(document).ready(function () {
    $('#chargerDonneesRFDMEncours').click(function () {
        $.ajax({
            url: './RFDM/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesRFDMValide').click(function () {
        $.ajax({
            url: './RFDM/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesRFDMRejete').click(function () {
        $.ajax({
            url: './RFDM/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// RFDM End



// SDC 
$(document).ready(function () {
    $('#chargerDonneesSDCEncours').click(function () {
        $.ajax({
            url: './SDC/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesSDCValide').click(function () {
        $.ajax({
            url: './SDC/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesSDCRejete').click(function () {
        $.ajax({
            url: './SDC/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// SDC End




// RSDC 
$(document).ready(function () {
    $('#chargerDonneesRSDCEncours').click(function () {
        $.ajax({
            url: './RSDC/encours.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesRSDCValide').click(function () {
        $.ajax({
            url: './RSDC/valide.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});


$(document).ready(function () {
    $('#chargerDonneesRSDCRejete').click(function () {
        $.ajax({
            url: './RSDC/rejete.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// RSDC End



//Profil
$(document).ready(function () {
    $('#chargerDonneesProfil').click(function () {
        $.ajax({
            url: 'profil.html',
            method: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#reponseAjax').html(data);
            },
            error: function () {
                $('#reponseAjax').html('Erreur lors du chargement des données.');
            }
        });
    });
});
// Profil End










/*
function afficherContenuMobile() {
    // var url = "https://www.codeur.com/";
    var url = "contenu.html";
    var request = new XMLHttpRequest();
    request.onreadystatechange = afficher;
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(null);

    function afficher() {
        if (request.readyState == 4) {
            var emplacement = document.getElementById("contenuMobile");
            var texte = request.responseText;

            emplacement.innerHTML = texte;
        }
    }
}
*/