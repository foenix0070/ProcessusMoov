<div class="row">


  <div class="col-6">
    <section id="SectionDetails"> </section>
  </div>

  <div class="col-6">
    <section class="sect1" id="SectionDocumentsJoint"> </section>
  </div>
  <div class="col-12">

    <br><br>

    <section class="sect1" id="SectionHistoriqueValidation">

    </section>


  </div>

  <div class="col-12">
    <br><br>
    <section class="sect2" id="SectionValidation">

    </section>
  </div>


</div>

<script id="tmpl_form_fichiers_attaches" type="x-tmpl-mustache">

                  <div class="head-titre">
                    <h2>
                      Documents attach&eacute;s
                    </h2>
                  </div>
                  <div class="sect-card">
                    <div class="sect-bn"><button class="btn btn-warning btn-sm" id="addfile" onclick="OpenFileUpload('FpUploadAttachement')">Joindre un fichier</button></div>
                    <input type="file" id="FpUploadAttachement" style="display:none;"  name="FpUploadAttachement[]" multiple>
                    <div class='card-head'>
                      <div class='card-item-1'>
                        <span class='elt'>Nom</span>
                      </div>
                      <span class='card-item-date'>Date cr&eacute;ation</span>
                      <span class='card-item-size'>Taille</span>
                    </div>
                    {{#fichiers}}
                    <div class='card'>
                      <div class='card-item-1'>
                       <a target="_blank" href="{{url}}"> <span class='elt'>{{nom}}</span> </a>
                      </div>
                      <span class='card-item-date'>{{dateajout}}</span>
                      <span class='card-item-size'>{{taille}}</span>
                    </div>
                    {{/fichiers}}
                  </div>
                </script>

<script id="tmpl_form_historique_validation" type="x-tmpl-mustache">


                  <div class="head-titre">
                    <h2>
                      Historique de validations
                    </h2>
                  </div>

                  <div>
                    <div class="table-container">
                      <table>
                        {{#historique}}
                        <tr>
                          <th>{{commentaire}}</th>
                        </tr>
                        {{/historique}}
                      </table>
                    </div>
                  </div></br>
                  <div>
                    <h2 style="color:#c50000 !important;">
                      <b>
                        {{etat}}
                      </b>
                    </h2>
                  </div>
                </script>

<script id="tmpl_form_validation" type="x-tmpl-mustache">
<br/>
                  <div class="head-titre">
                    <h2>
                     Validation
                    </h2>
                  </div>
                  <form action="" method="" class="formComment" id="formComment">
                    <textarea id="TxtCommentaire" name="TxtCommentaire" rows="10" cols="33"
                      placeholder="Commentaire de validation"></textarea>
                    <div class="formComment-submit">
                      <input type="button" id="BtnValidationOK" value="Valider" data-act="APPROUVER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                      <input type="button" id="BtnValidationNOK" value="Rejeter" data-act="REJETER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                      <input type="button" id="BtnValidationModification" value="Demander une modification" data-act="MODIFIER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                    </div>
                  </form>
                </script>

              <script id="tmpl_form_details" type="x-tmpl-mustache">

                  <div class="head-titre">
                    <h2>
                      Details de la demande
                    </h2>
                  </div>
                  {{#id}}
                  <div class="sect-bn"><button class="btn btn-warning btn-sm linkOffCanvasNavigation" data-url="/tools1/pages/vehicule/add.aspx?DID={{id}}" data-target="ffcMainFormContainer" data-bs-toggle="offcanvas" data-bs-target="#ffcMainForm" id="BtnModification" >Modifier la demande</button></div>
                  {{/id}}  
                
                </br>
                  <div>
                    <h3 style="color:#c50000 !important;">
                      <b>
                        {{etat}}
                      </b>
                    </h3>
                  </div></br>
                  <table>
                      <tr>
                        <td style="text-align:left;" class="fw-bold" width="200px" >Titre :</td>
                        <td style="text-align:left;">{{title}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Date de depart :</td>
                        <td style="text-align:left;">{{datedepart}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Date de retour :</td>
                        <td style="text-align:left;">{{dateretour}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Motif :</td>
                        <td style="text-align:left;">{{motif}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Demandeur :</td>
                        <td style="text-align:left;">{{demandeur}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Demandeur Email :</td>
                        <td style="text-align:left;">{{demandeuremail}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="200px">Superieur hierarchique :</td>
                        <td style="text-align:left;">{{superieur}}</td>
                      </tr>
                  </table>
                </script>

              <!--<script src="http://ci08vmmitest/tools1/controller/Vehicule/show.js"></script>-->
                
              <script type="text/javascript">
                appHelper.loadJSWithNameSpace("showVehicule", 'showVehicule', "controller/Vehicule/show.js");
              </script>

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

              <html lang="fr-fr">

              <head>
                <meta charset="utf-8">
                <link rel="icon" href="/favicon.ico">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#000000">
                <meta name="description" content="Web site created using create-react-app">
                <link rel="apple-touch-icon" href="/assets/logo.png">
                <title>VEHICULE</title>


                <script type="text/javascript"  src="/_layouts/15/MicrosoftAjax.js"></script>
                <SharePoint:ScriptLink name="SP.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink  name="SP.UserProfiles.js" runat="server" ondemand="false" localizable="false" loadafterui="true" />
                

                <script type="text/javascript"  src="/_layouts/15/MicrosoftAjax.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.js"></script>
                <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
                <script type="text/javascript"  src="/_layouts/15/clientforms.js"></script>
                <script type="text/javascript"  src="/_layouts/15/clientpeoplepicker.js"></script>
                <script type="text/javascript"  src="/_layouts/15/autofill.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.runtime.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.core.js"></script>


                <link rel="stylesheet" href="/_layouts/15/1036/styles/Themable/corev15.css">
                <link href="/tools/assets/css/reset.css" rel="stylesheet" />
                <link href="/tools/assets/css/w3c.css" rel="stylesheet" />
                <link href="/tools/assets/css/App.css" rel="stylesheet" />
                <link href="/tools/assets/css/style.css" rel="stylesheet" />


                <script src="/tools/assets/js/workflow_template.js"></script>
                <script src="/tools/assets/js/SpGroupConstante.js"></script>
                <script src="/tools/assets/js/mustache.js"></script>
                <script src="/tools/assets/js/script.js"></script>
                <script src="/tools/assets/js/extensions.js"></script>
                <script src="/tools/assets/js/appHelper.js"></script>
                <script src="/tools/assets/js/appSpHelper.js"></script>
                <script src="/tools/assets/js/WFManager.js"></script>

              </head>


              <body>
                <noscript>Vous avez besoin d'activer JAVASCRIPT pour exploiter cette application.</noscript>
                <div id="root">
                  <div class="App">
                    <header class="header">
                      <div class="header1"><img src="/tools/assets/img/Moov_Africa_logo.png" alt="" class="logo">
                      </div>
                      <div class="header2">
                        <div class="pro" id="pro" onClick="showUserMenu()"><img class="profil"
                            src="/tools/assets/img/person-circle.svg" alt="">
                        </div>
                        <div class="none" id="pop">
                          <ul>
                            <li>Sortir</li>
                          </ul>
                        </div>
                      </div>
                    </header>
                    <div class="block2">
                      <nav class="nav">
                        <ul class="show-color">
                          <li class="color-0 color-ad" id="color-0"><img src="/tools/assets/img/person-vcard-fill.svg"
                              alt=""></li>
                          <li class="color-1 color-ad" id="color-1"><img src="/tools/assets/img/eye.svg" alt=""></li>
                        </ul>
                      </nav>
                      <section class="block2-change2">

                        <section class="sect1" id="SectionDetails">

                        </section>

                        <section class="sect1" id="SectionDocumentsJoint">

                        </section>

                        <section class="sect1" id="SectionHistoriqueValidation">

                        </section>

                        <section class="sect2" id="SectionValidation">

                        </section>

                    </div>
                  </div>
                </div>

                <script id="tmpl_form_fichiers_attaches" type="x-tmpl-mustache">
                  <h3 class="type-document">
                    <span>Documents attach&eacute;s</span>
                  </h3>
                  <div class="sect-card">
                    <div class="sect-btn"><button class="btn btn1" id="addfile" onclick="OpenFileUpload('FpUploadAttachement')">Joindre un fichier</button></div>
                    <input type="file" id="FpUploadAttachement" style="display:none;"  name="FpUploadAttachement[]" multiple>
                    <div class='card-head'>
                      <div class='card-item-1'>
                        <span class='elt'>Nom</span>
                      </div>
                      <span class='card-item-date'>Date cr&eacute;ation</span>
                      <span class='card-item-size'>Taille</span>
                    </div>
                    {{#fichiers}}
                    <div class='card'>
                      <div class='card-item-1'>
                       <a target="_blank" href="{{url}}"> <span class='elt'>{{nom}}</span> </a>
                      </div>
                      <span class='card-item-date'>{{dateajout}}</span>
                      <span class='card-item-size'>{{taille}}</span>
                    </div>
                    {{/fichiers}}
                  </div>
                </script>

                <script id="tmpl_form_historique_validation" type="x-tmpl-mustache">
                  <h3 class="type-document">
                    <span>Historique de validation </span>
                  </h3>

                  <div>
                    <div class="table-container">
                      <table>
                        {{#historique}}
                        <tr>
                          <th>{{commentaire}}</th>
                        </tr>
                        {{/historique}}
                      </table>
                    </div>
                  </div>
                </script>

                <script id="tmpl_form_validation" type="x-tmpl-mustache">
                  <h3 class="type-document">
                    <span>Validation </span>
                  </h3>
                  <form action="" method="" class="formComment" id="formComment">
                    <textarea id="TxtCommentaire" name="TxtCommentaire" rows="10" cols="33"
                      placeholder="Commentaire de validation"></textarea>
                    <div class="formComment-submit">
                      <input type="button" id="BtnValidationOK" value="Valider" data-act="APPROUVER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                      <input type="button" id="BtnValidationNOK" value="Rejeter" data-act="REJETER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                      <input type="button" id="BtnValidationModification" value="Demander une modification" data-act="MODIFIER" data-did="{{did}}" data-tid="{{tid}}" data-process="{{process}}" class="btn btn1"></input>
                    </div>
                  </form>
                </script>

                <script id="tmpl_form_details" type="x-tmpl-mustache">
                  <h3 class="type-document">
                    <span>Details de demande </span>
                    <div class="sect-btn"><a class="btn btn1" href="index.aspx">Retour &agrave; la liste</a></div>
                  </h3>
                  <table>
                      <tr>
                        <td style="text-align:left;" width="200px" >Article </td>
                        <td style="text-align:left;">{{title}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;" width="200px">Demandeur</td>
                        <td style="text-align:left;">{{Nature}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;" width="200px">Nombre</td>
                        <td style="text-align:left;">{{nbrejour}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;" width="200px">Date de la demande </td>
                        <td style="text-align:left;">{{datedepart}}</td>
                      </tr>
                  </table>
                </script>


                <script src="/tools/Vehicule/show.js"></script>
                <script type="text/javascript">
                  appHelper.loadJSWithNameSpace("showVehicule", 'showVehicule', "show.js");
                </script>
              </body>

              </html>

            -->