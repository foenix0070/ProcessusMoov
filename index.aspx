<%@ Assembly Name="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
  <%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls"
      Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
      <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities"
        Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Import Namespace="Microsoft.SharePoint" %>
          <%@ Assembly
            Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages"
              Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>



              <html lang="fr">

              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ESPACE UTILISATEUR</title>
                <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>

                <link rel="stylesheet" href="/_layouts/15/1036/styles/Themable/corev15.css">

                <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
                <SharePoint:ScriptLink name="SP.js" runat="server" OnDemand="true" LoadAfterUI="true"
                  Localizable="false" />
                <SharePoint:ScriptLink name="SP.UserProfiles.js" runat="server" ondemand="false" localizable="false"
                  loadafterui="true" />
                <!-- <SharePoint:ScriptLink name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
<SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" /> -->

                <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.js"></script>
                <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
                <script type="text/javascript" src="/_layouts/15/autofill.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.core.js"></script> <!---->
                <!-- <script type="text/javascript"  src="/_layouts/15/1033/strings.js"></script> -->
                <!-- <script type="text/javascript"  src="/_layouts/15/clienttemplates.js"></script> -->
                <!-- <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
<script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
<script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
<script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
<script type="text/javascript" src="/_layouts/15/autofill.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.UserProfiles.js.js"></script>-->


                <!-- STYLE -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                  crossorigin="anonymous" />
                <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css"
                  integrity="sha512-pTaEn+6gF1IeWv3W1+7X7eM60TFu/agjgoHmYhAfLEU8Phuf6JKiiE8YmsNC0aCgQv4192s4Vai8YZ6VNM6vyQ=="
                  crossorigin="anonymous" referrerpolicy="no-referrer" />

                <link rel="stylesheet" href="/tools1/assets/css/reset.css?t=1" />
                <link rel="stylesheet" href="/tools1/assets/css/font-awesome.css?t=1" />
                <link rel="stylesheet" href="/tools1/assets/plugins/DataTables/datatables.min.css?t=1">
                <link rel="stylesheet" href="/tools1/assets/css/style.css?t=1" />
                <!-- END STYLE -->

                <!-- SCRIPT -->
                <script src="https://code.jquery.com/jquery-3.7.0.min.js"
                  integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js"
                  integrity="sha512-IOebNkvA/HZjMM7MxL0NYeLYEalloZ8ckak+NDtOViP7oiYzG5vn6WVXyrJDiJPhl4yRdmNAG49iuLmhkUdVsQ=="
                  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script src="/tools1/assets/js/bootstrap.bundle.min.js"></script>

                <script src="/tools1/assets/plugins/DataTables/datatables.min.js?t=1"></script>
                <script src="/tools1/assets/js/workflow_template.js?t=1"></script>
                <script src="/tools1/assets/js/SpGroupConstante.js?t=1"></script>
                <script src="/tools1/assets/js/script.js?t=1"></script>
                <script src="/tools1/assets/js/extensions.js?t=1"></script>
                
                <script src="/tools1/assets/js/appSpHelper.js?t=1"></script>
                <script src="/tools1/assets/js/WFManager.js?t=1"></script>
                <script src="/tools1/assets/js/autoNumeric.min.js?t=1"></script>
                <script src="/tools1/assets/js/mustache.js?t=1"></script>
                <script src="/tools1/assets/js/App.js?t=1"></script>
                <script src="/tools1/assets/js/appHelper.js?t=1"></script>
                <!--END SCRIPT -->

              </head>

              <body>

                <!-- HEADER -->
                <header class="container-fluid border-bottom header" id="header">
                  <div class="container-fluid">
                    <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
                      <div class="d-flex">
                        <!-- TOP MENU -->
                        <img id="btn" data-bs-toggle="offcanvas" data-bs-target="#ffcSideMenu"
                          aria-controls="ffcSideMenu" src="/tools1/assets/img/logo-sans-fond.png" alt="logo-sans-fond"
                          width="100" height="" />
                        <a href="" class="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none">
                          Acceuil
                        </a>
                      </div>
                      <!-- END TOP MENU -->

                      <!-- FORM CANVAS -->
                      <div class="offcanvas offcanvas-50 offcanvas-end" tafandex="-1" id="ffcMainForm"
                        data-bs-backdrop="true" aria-labelledby="ffcMainFormTitle">
                        <div class="offcanvas-header">
                          <h5 id="ffcMainFormTitle">Demande de congés</h5>
                          <button type="button" class="btn-close " data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
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
                            aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                          <div class="accordion accordion-flush" id="accSideMainMenu">
                            <!-- <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      <i class="fa fa-2x fa-globe"></i>
                      Demande de congés
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accSideMainMenu">
                    <div class="accordion-body d-flex flex-column">
                      <a href="#!" id="chargerDonneesDours"  data-bs-toggle="offcanvas"
                      data-bs-target="#ffcMainForm" aria-controls="ffcMainForm"> Effectuer une demande</a>
                      <a href="#!" id="chargerDonneesDDCEncours">  Demande en cours</a>
                      <a href="#!" id="chargerDonneesDDCValide"> Demande validé</a>
                      <a href="#!" id="chargerDonneesDDCRejete"> Demande réjeté</a>
                    </div>
                  </div>
                </div> -->


                          </div>
                        </div>
                      </div>
                      <!--END SIDE MENU CANVAS -->


                      <!-- USER MENU -->
                      <div class="dropdown d-flex align-self-lg-end text-end p-2">
                        <span id="h4User" class="text-light pe-1 spanCurrentUserName">#</span>
                        <a href="#" class="d-block link-dark text-decoration-none text-light dropdown-toggle"
                          id="cmdShowUserMenu" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src="/tools1/assets/img/user.svg" alt="USER" width="32" height="32"
                            class="rounded-circle bg-light" />
                        </a>
                        <ul class="dropdown-menu text-small" aria-labelledby="cmdShowUserMenu">
                          <li>
                            <a class="dropdown-item" href="#" id="lnkLoadUserData">Mon profil</a>
                          </li>
                          <li><a class="dropdown-item" href="#">Parametre</a></li>
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
                      <div class="carousel-content ">
                        <h4 class="display-4">Intranet</h4>
                        <p class="lead fw-bold">Espace applicatif de Moov Africa</p>
                      </div>
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


                  <div class="infoboxs_box">
                    <div class="infoboxs_item ">
                      <a href="#" class="infoboxs-item_link">
                        <div class="infoboxs-item_bg"></div>
                        <div class="infoboxs-item_title">
                          Solde de cong&eacute;s annuels
                        </div>
                        <div id="spanSolde" class="infoboxs-item_date">20</div>
                      </a>
                    </div>


                    <div class="infoboxs_item ">
                      <a href="#" class="infoboxs-item_link">
                        <div class="infoboxs-item_bg"></div>
                        <div class="infoboxs-item_title">
                          Frais de mission &agrave; justifier
                        </div>
                        <div class="infoboxs-item_date">0</div>
                      </a>
                    </div>

                    <div class="infoboxs_item ">
                      <a href="#" class="infoboxs-item_link">
                        <div class="infoboxs-item_bg"></div>
                        <div class="infoboxs-item_title">
                          Sortie de caisse &agrave; justifier
                        </div>
                        <div class="infoboxs-item_date">0</div>
                      </a>
                    </div>

                    <div class="infoboxs_item ">
                      <a href="#" class="infoboxs-item_link">
                        <div class="infoboxs-item_bg"></div>
                        <div class="infoboxs-item_title">
                          Materi&egrave;ls en attente de livraison
                        </div>
                        <div class="infoboxs-item_date">0</div>
                      </a>
                    </div>

                  </div>

                </section>


                <section class="container">

                  <div id="DivMainPageContainer">
                    <div class="row">

                      <div class="col-8">
                        <div class="head-titre">
                          <h2>
                            Listes des demandes
                          </h2>
                        </div>

                        <!-- <Table /> -->
                        <div>
                          <div class="table-container">
                            <table class="table table-bordered table-responsive table-striped">
                              <tr>
                                <th>Nom</th>
                                <th>Date</th>
                                <th>Decision</th>
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
                            Listes des taches
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


                <script src="/tools1/assets/js/main.js"></script>


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
             <a href="{{url}}" id="{{id}}" class="linkOffCanvasNavigation" data-url="{{url}}" data-target="{{target}}"   data-bs-toggle="offcanvas"
             data-bs-target="#ffcMainForm" aria-controls="ffcMainForm">{{title}}</a>
             {{/offcanvas}}
             {{#link}}
             <a href="{{url}}" data-url="{{url}}" class="linkMainNavigation" data-target="{{target}}" id="{{id}}">{{title}}</a>
             {{/link}}
            {{/arrsmenu}}
          </div>

        </div>
      </div>
    {{/menus}}
  </script>









              </body>

              </html>