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



              <div class="row">

                <div class="col-12">
                  <section id="SectionFirst"> </section>
                </div>


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

              <script id="tmpl_form_first" type="x-tmpl-mustache">
                <div class="mb-2" style="background-color: whitesmoke; border-bottom:5px solid #007bff ;">
                  <div>
                    <tr>
                      <td style="text-align:left; font-weight: 700; font-size: 26px;"><h3><b>DEMANDE DE FRAIS DE MISSION</h3></b></td>
                    </tr>
                  </div></br>
                  
                  <table class="col-12">
                    <tr>
                      <td style="text-align:left;"><h4><b>NUMERO DE LA DEMANDE : {{id}}</h5></b></td>
                    </tr>
                      <tr class="mb-2">
                        <td style="text-align:left;">Creer par : <b>{{create}}</b> le , <b>{{requestdate}}</b> &agrave; <b>{{heure}}</b></td>
                      </tr>
                  </table><br/>
                </div>
              </script>


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
                    </div></br>
                    <div>
                      <h2 style="color:#c50000 !important;">
                        <b>
                          {{etat}}
                        </b>
                      </h2>
                    </div>
                  </div></br>
                  
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
                      Details du demandeur
                    </h2>
                  </div></br>
                  <table>
                    <tr>
                      <td style="text-align:left;"class="fw-bold" width="200px">Demandeur</td>
                      <td style="text-align:left;">{{demandeur}}</td>
                    </tr>

                    <tr>
                      <td style="text-align:left;"class="fw-bold" width="200px">Demandeur Email</td>
                      <td style="text-align:left;">{{demandeuremail}}</td>
                    </tr>
                    <tr>
                      <td style="text-align:left;" class="fw-bold" width="200px">Superieur hierarchique </td>
                      <td style="text-align:left;"> {{superieur}}  </td>
                    </tr>
                  </table></br>

                  <div class="head-titre">
                    <h2>
                      Details de la demande
                    </h2>
                  </div>
                  {{#id}}
                  <div class="sect-bn"><button class="btn btn-warning btn-sm linkOffCanvasNavigation" data-url="/tools1/pages/fraisMission/add.aspx?DID={{id}}" data-target="ffcMainFormContainer" data-bs-toggle="offcanvas" data-bs-target="#ffcMainForm" id="BtnModification" >Modifier la demande</button></div>
                  {{/id}}
                  {{#regul}}
                  <div class="sect-bn"><button class="btn btn-primary btn-sm linkOffCanvasNavigation" data-url="/tools1/pages/regularisationFraisMission/add.aspx?DID={{regul}}" data-target="ffcMainFormContainer" data-bs-toggle="offcanvas" data-bs-target="#ffcMainForm" data-info="fraisMission" id="BtnRegularisation" >Effectuer une regularisation</button></div>
                  {{/regul}}
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
                        <td style="text-align:left;" class="fw-bold" width="300px" >Titre :</td>
                        <td style="text-align:left;">{{title}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Date de debut :</td>
                        <td style="text-align:left;">{{datedepart}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Date de fin :</td>
                        <td style="text-align:left;">{{dateretour}}</td>
                      </tr>
                      
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Destination :</td>
                        <td style="text-align:left;">{{destination}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Montant Total :</td>
                        <td style="text-align:left;">{{cout}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Zone geographique :</td>
                        <td style="text-align:left;">{{zone}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Caisse de paiement :</td>
                        <td style="text-align:left;">{{caisse}}</td>
                      </tr>
                      <tr>
                        <td style="text-align:left;"class="fw-bold" width="300px">Mode de paiement :</td>
                        <td style="text-align:left;">{{mode}}</td>
                      </tr>
                  </table>
                </script>

              <script type="text/javascript">
                appHelper.loadJSWithNameSpace("showFraisMission", 'showFraisMission', "controller/FraisMission/show.js");
              </script>
              <script type="text/javascript">

                function OpenFileUpload(str_select) {
                  let transElt = document.getElementById(str_select);
                  transElt.click();
                }
              </script>