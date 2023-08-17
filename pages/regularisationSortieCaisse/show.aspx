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
                  </div></br>
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
                      <td style="text-align:left;">{{titre}}</td>
                    </tr>
                    <tr>
                      <td style="text-align:left;" class="fw-bold" width="200px" >Date :</td>
                      <td style="text-align:left;">{{datedepart}}</td>
                    </tr>
                      <tr>
                        <td style="text-align:left;" class="fw-bold" width="200px" >Montant utilisé:</td>
                        <td style="text-align:left;">{{montant}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left; "class="fw-bold" width="200px">Solde reverser :</td>
                        <td style="text-align:left;">{{solde}}</td>
                      </tr>
                      
                      <tr>
                        <td style="text-align:left; "class="fw-bold" width="200px">Observation :</td>
                        <td style="text-align:left;">{{Observation}}</td>
                      </tr>

                  </table>
                </script>

<script type="text/javascript">
  //appHelper.loadJSWithNameSpace("showConge", 'showConge', "controller/conge/show.js");
  appHelper.loadJSWithNameSpace("showRegularisationSortieCaisse", 'showRegularisationSortieCaisse', "controller/RegularisationSortieCaisse/show.js");
</script>
<script type="text/javascript">

  function OpenFileUpload(str_select) {
    let transEshowRegularisationSortieCaisselt = document.getElementById(str_select);
    transElt.click();
  }
</script>