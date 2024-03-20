<%@ Assembly Name="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
  <%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
      <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities"
        Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Import Namespace="Microsoft.SharePoint" %>
          <%@ Assembly
            Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages"
              Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

              <html lang="fr">

              <head>
                <SharePoint:FormDigest runat="server" />
                <meta charset="utf-8">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <!-- <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> -->

                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <title>ESPACE UTILISATEUR</title>

                <!-- SCRIPT SHAREPOINT -->
                <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
                <SharePoint:ScriptLink name="SP.js" runat="server" OnDemand="true" LoadAfterUI="true"
                  Localizable="false" />
                <SharePoint:ScriptLink name="SP.UserProfiles.js" runat="server" ondemand="false" localizable="false"
                  loadafterui="true" />
                <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.js"></script>
                <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
                <script type="text/javascript" src="/_layouts/15/autofill.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
                <!-- END SCRIPT SHAREPOINT -->

                <!-- STYLE -->
                <link rel="stylesheet" href="/_layouts/15/1036/styles/Themable/corev15.css">
                <link rel="stylesheet" href="/sites/proc/tools/assets/css/bootstrap.min.css?t=1" />
                <link rel="stylesheet" href="/sites/proc/tools/assets/css/selectize.default.min.css?t=1" />
                <link rel="stylesheet" href="/sites/proc/tools/assets/css/reset.css?t=1" />
                <link rel="stylesheet" href="/sites/proc/tools/assets/css/font-awesome.css?t=1" />
                <link rel="stylesheet" href="/sites/proc/tools/assets/plugins/DataTables/datatables.min.css?t=1">
                <link rel="stylesheet" href="/sites/proc/tools/assets/plugins/chosen/chosen.min.css">
                <link rel="stylesheet" href="/sites/proc/tools/assets/css/style.css?t=1" />
                <link
                rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
                <!-- END STYLE -->

                <!-- SCRIPT -->
                <script src="/sites/proc/tools/assets/js/jquery-3.7.0.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/autoNumeric.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/selectize.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/bootstrap.bundle.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/bootbox.all.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/plugins/DataTables/datatables.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/plugins/chosen/chosen.jquery.min.js"></script>
                <script src="/sites/proc/tools/assets/plugins/bootbox/bootbox.all.min.js"></script>
                <script src="/sites/proc/tools/assets/js/workflow_template.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/SpGroupConstante.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/appUIControle.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/extensions.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/appSpHelper.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/spFileHelper.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/WFManager.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/autoNumeric.min.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/mustache.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/App.js?t=1"></script>
                <script src="/sites/proc/tools/assets/js/appHelper.js?t=1"></script>
                <!--END SCRIPT -->

                <style>
                  .modal-backdrop.show {
                    display: none;
                  }


                </style>


              </head>

              <body>
                <SharePoint:SharePointForm runat="server"
                  onsubmit="if (typeof(_spFormOnSubmitWrapper) != 'undefined') {return _spFormOnSubmitWrapper();} else {return true;}">

                  <!-- HEADER -->
                  <header class="container-fluid border-bottom header" id="header">
                    <div class="container-fluid">
                      <div
                        class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
                        <div class="d-flex">
                          <!-- TOP MENU -->
                          <img id="btn" data-bs-toggle="offcanvas" data-bs-target="#ffcSideMenu"
                            aria-controls="ffcSideMenu" src="/sites/proc/tools/assets/img/logo.jpeg"
                            alt="logo-sans-fond" width="80" height="" />

                            <a href="/" class="d-flex align-items-center ml-2 mb-lg-0 text-dark text-decoration-none ps-2">
                              Retourner sur l'intranet
                            </a>


                            <a href="" class="d-flex align-items-center ml-2 mb-lg-0 text-dark text-decoration-none ps-2">
                              Acceuil
                            </a>

                        </div>
                        <!-- END TOP MENU -->

                        <!-- FORM CANVAS -->
                        <div class="offcanvas offcanvas-50 offcanvas-end" tafandex="-1" id="ffcMainForm"
                          data-bs-backdrop="true" aria-labelledby="ffcMainFormTitle">
                          <div class="offcanvas-header">
                            <h5 id="ffcMainFormTitle">Demande</h5>
                            <button type="button" class="btn-close " data-bs-dismiss="offcanvas"
                              aria-label="Close"><i class="fa fa-times fa-2x"></i></button>
                          </div>
                          <div class="offcanvas-body" id="ffcMainFormContainer"></div>
                        </div>
                        <!-- END FORM CANVAS -->


                        <!-- SIDE MENU CANVAS -->
                        <div class="offcanvas offcanvas-start text-dark" data-bs-scroll="true" data-bs-backdrop="true"
                          tafandex="-1" id="ffcSideMenu" aria-labelledby="ffcSideMenuLabel">
                          <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="ffcSideMenuLabel">Menu</h5>
                            <button type="button" class="btn-close " data-bs-dismiss="offcanvas"
                              aria-label="Close"><i class="fa fa-times fa-2x"></i></button>
                          </div>
                          <div class="offcanvas-body">
                            <div class="accordion accordion-flush" id="accSideMainMenu">

                            </div>
                          </div>
                        </div>
                        <!--END SIDE MENU CANVAS -->


                        <!-- FORM MODAL -->
                        <div class="modal fade" id="staticModalForm" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="staticModalFormLabel"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times fa-2x"></i></button>
                              </div>
                              <div class="modal-body">
<div id="staticModalFormContainer" ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--END FORM MODAL -->


                        <!-- USER MENU -->
                        <div class="dropdown d-flex align-self-lg-end text-end p-2">
                          <span id="h4User" class="text-light pe-1 spanCurrentUserName"></span>
                          <a href="#" class="d-block link-dark text-decoration-none text-light dropdown-toggle"
                            id="cmdShowUserMenu" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/sites/proc/tools/assets/img/user.svg" alt="USER" width="32" height="32"
                              class="rounded-circle bg-light" />
                          </a>
                          <ul class="dropdown-menu text-small" aria-labelledby="cmdShowUserMenu">
                            <li>
                              <a class="dropdown-item" href="#" id="lnkLoadUserData">Mon profil</a>
                            </li>
                            <li><a class="dropdown-item" href="#">Paramètre</a></li>
                            <li><a class="dropdown-item" href="#">Historique</a></li>
                            <li>
                              <hr class="dropdown-divider" />
                            </li>
                            <li><a class="dropdown-item" href="#">Déconnexion</a></li>
                          </ul>
                        </div>
                        <!-- END USER MENU -->

                      </div>
                    </div>
                  </header>
                  <!-- END HEADER -->



                  <section class="container-fluid">
                    <div class="jumbotron p-3" id="jumbotron">
                      <div class="container">
                        <!-- <div class="carousel-content ">
                          <h4 class="display-4">Intranet</h4>
                          <p class="lead fw-bold">Espace applicatif de Moov Africa</p>
                        </div> -->
                      </div>
                    </div>
                  </section>

                  <section class="container-fluid">
                    <ol class="breadcrumb">
                      <li>
                        <i class="icon fa fa-home"></i>
                        <a href="#">Accueil</a>
                      </li>
                      <li class="active"><span>Tableau de bord</span></li>
                    </ol>
                  </section>

                  <section class="container-fluid">
                    <div class="row m-3 p-5" style="border: 1px solid whitesmoke; background-color: whitesmoke">
                      <div class="col-sm-3">
                        <div class="card shadow-md" style="height: 120px; background-color: white;">
                          <div class="card-body" id="voirlistattente" style="cursor: pointer;">
                            <div class=" d-flex flex-row align-items-center ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor"
                                class="bi bi-newspaper text-dark" viewBox="0 0 16 16">
                                <path
                                  d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                                <path
                                  d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                              </svg>
                              <h5 class="card-title ms-2 card-body_2 ">Demandes en attente</h5>
                            </div>

                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 25px; height: 35px;"></div>
                              <p class="ms-2 card-body_2"><b>Vous avez <span id="demenattente"></span> demande(s) en
                                  attente</b></p>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="card shadow-md" style="height: 120px; background-color: white;">
                          <div class="card-body" id="voirlistcours" style="cursor: pointer;">
                            <div class=" d-flex flex-row align-items-center ">

                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor"
                                class="bi bi-ui-checks text-primary" viewBox="0 0 16 16">
                                <path
                                  d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z">
                                </path>
                              </svg>
                              <h5 class="card-title ms-2 card-body_2 ">Demandes en cours</h5>
                            </div>

                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 25px; height: 35px;"></div>
                              <p class="ms-2 card-body_2"><b>Vous avez <span id="demcours"></span> demande(s) en
                                  cours</b>
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="card shadow-md" style="height: 120px; background-color: white;">
                          <div class="card-body column" id="voirlistvalider" style="cursor: pointer;">
                            <div class="d-flex flex-row align-items-center">

                              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                                class="bi bi-check text-success" viewBox="0 0 16 16">
                                <path
                                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z">
                                </path>
                              </svg>
                              <h5 class="card-title ms-2 card-body_2">Demandes validées</h5>

                            </div>

                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 35px; height: 35px;"></div>
                              <p class="ms-2 card-body_2"><b>Vous avez <span id="demval"></span> demande(s) validée(s)</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="card shadow-md" style="height: 120px; background-color: white;">
                          <div class="card-body d-flex flex-column" id="voirlisttaches" style="cursor: pointer;">
                            <div class="d-flex flex-row align-items-center">

                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor"
                                class="bi bi-list-task" viewBox="0 0 16 16" style="color: #FC6701;">
                                <path fill-rule="evenodd"
                                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z">
                                </path>
                                <path
                                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z">
                                </path>
                                <path fill-rule="evenodd"
                                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z">
                                </path>
                              </svg>
                              <h5 class="card-title ms-1 card-body_2">Tâches à réaliser</h5>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 25px; height: 35px;"></div>
                              <p class="ms-2 card-body_2"><b>Vous avez <span id="tachetotal"></span> tâche(s) à
                                  réaliser</b></p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </section>

                  <section class="container">

                    <div id="DivMainPageContainer">
                      <div class="row">

                        <div class="col-8">
                          <div class="head-titre">
                            <h2>
                              Liste des demandes
                            </h2>
                          </div>

                          <!-- <Table /> -->
                          <div>
                            <div class="table-container">
                              <table class="table table-bordered table-responsive table-striped">
                                <tr>
                                  <th>Nom</th>
                                  <th>Date</th>
                                  <th>Décision</th>
                                  <th>Commentaire</th>
                                </tr>
                                <tr class="rang">
                                  <td>Fred Ahoussi</td>
                                  <td>20/02/2023</td>
                                  <td><span class="succed">Effectuée</span></td>
                                  <td>Ceci est un commentaire</td>
                                </tr>
                                <tr class="rang">
                                  <td>Fred Ahoussi</td>
                                  <td>20/12/2023</td>
                                  <td><span class="succed">Effectuée</span></td>
                                  <td>Ceci est un commentaire</td>
                                </tr>
                                <tr class="rang">
                                  <td>Fred Ahoussi</td>
                                  <td>25/11/2022</td>
                                  <td><span class="succed">Effectuée</span></td>
                                  <td>Ceci est un commentaire</td>
                                </tr>
                                <tr class="rang">
                                  <td>Fred Ahoussi</td>
                                  <td>10/06/2019</td>
                                  <td><span class="succed">Effectuée</span></td>
                                  <td>Ceci est un commentaire</td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div class="col-4">

                          <div class="head-titre">
                            <h2>
                              Liste des taches
                            </h2>
                          </div>

                          <div class="table-container">
                            <table style="width: 100%;" class="table table-bordered table-responsive table-striped">
                              <tr>
                                <th>Nom</th>
                                <th>Date</th>
                                <th>Commentaire</th>
                              </tr>
                              <tr class="rang">
                                <td>Fred Ahoussi</td>
                                <td>20/02/2023</td>
                                <td>Ceci est un commentaire</td>
                              </tr>
                              <tr class="rang">
                                <td>Fred Ahoussi</td>
                                <td>20/12/2023</td>
                                <td>Ceci est un commentaire</td>
                              </tr>
                              <tr class="rang">
                                <td>Fred Ahoussi</td>
                                <td>25/11/2022</td>
                                <td>Ceci est un commentaire</td>
                              </tr>
                              <tr class="rang">
                                <td>Fred Ahoussi</td>
                                <td>10/06/2019</td>
                                <td>Ceci est un commentaire</td>
                              </tr>
                            </table>
                          </div>

                        </div>

                      </div>
                    </div>
                  </section>


                  <script src="/sites/proc/tools/assets/js/main.js"></script>
                  <script id="tmpl_side_main_menu" type="x-tmpl-mustache">
                    {{#menus}}
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="{{id}}-headingOne">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#{{id}}-collapseOne" aria-expanded="false" aria-controls="{{id}}-collapseOne">
                            <i class="{{icon}}"></i>
                            {{{title}}}
                          </button>
                        </h2>
                        <div id="{{id}}-collapseOne" class="accordion-collapse collapse show" aria-labelledby="{{id}}-headingOne"
                          data-bs-parent="#accSideMainMenu">

                          <div class="accordion-body d-flex flex-column">
                            {{#arrsmenu}}
                            {{#offcanvas}}
                            <a href="{{url}}" id="{{id}}" class="linkOffCanvasNavigation aNavigationLinkDdwn" data-url="{{url}}" data-target="{{target}}"  data-bs-toggle="offcanvas"
                            data-bs-target="#ffcMainForm" aria-controls="ffcMainForm">{{title}}</a>
                            {{/offcanvas}}
                            {{#link}}
                            <a href="{{url}}" data-url="{{url}}" class="linkMainNavigation aNavigationLinkDdwn" data-target="{{target}}" id="{{id}}">{{title}}</a>
                            {{/link}}
                            {{/arrsmenu}}
                          </div>

                        </div>
                      </div>
                    {{/menus}}
                  </script>

                </SharePoint:SharePointForm>
              </body>


              <script>
                document.addEventListener("DOMContentLoaded", function () {
                  var attentedetails = document.getElementById("voirlistattente");
                  var coursdetails = document.getElementById("voirlistcours");
                  var validerdetails = document.getElementById("voirlistvalider");
                  var tachesdetails = document.getElementById("voirlisttaches");
                  attentedetails.addEventListener("click", function () {
                    appHelper.navigation("DivMainPageContainer", "/tools/pages/demande.aspx?action=Att");
                  });
                  coursdetails.addEventListener("click", function () {
                    appHelper.navigation("DivMainPageContainer", "/tools/pages/demande.aspx?action=E");
                  });
                  validerdetails.addEventListener("click", function () {
                    appHelper.navigation("DivMainPageContainer", "/tools/pages/demande.aspx?action=V");
                  });
                  tachesdetails.addEventListener("click", function () {
                    appHelper.navigation("DivMainPageContainer", "/tools/pages/tache.aspx");
                  });
                });
              </script>

              </html>