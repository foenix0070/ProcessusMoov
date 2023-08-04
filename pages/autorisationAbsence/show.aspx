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
                        <td style="text-align:left;" width="200px" >Nature</td>
                        <td style="text-align:left;">{{title}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;" width="200px">Date de d&eacute;part</td>
                        <td style="text-align:left;">{{datedepart}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;" width="200px">Nombre de jours</td>
                        <td style="text-align:left;">{{nbrejour}}</td>
                      </tr>

                      <tr>
                        <td style="text-align:left;" width="200px">Motif </td>
                        <td style="text-align:left;"> {{motif}}  </td>
                      </tr>
                  </table>
                </script>


<script src="/tools1/pages//show.js"></script>
<script type="text/javascript">
  appHelper.loadJSWithNameSpace("showAbsence", 'showAbsence', "controller/absence/show.js");
</script>