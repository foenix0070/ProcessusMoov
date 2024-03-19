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


  <div class="col-12 d-none" id="SectionVehiculeSortie">
    <br><br>
    <section class="sect2">
      <div class="head-titre">
        <h2 id="head-titre-id">
          ETAT DU VEHICULE
        </h2>
      </div>
      <div class=" mb-3">
        <label for="TxtIndexDepart" class="form-label d-block">INDEX  </label>
        <input type="number" class="form-control" id="TxtIndexDepart" aria-describedby="basic-addon2" placeholder="125025">
      </div>

      <div class="mb-3">
        <label for="TxtIndexDepart" class="form-label">NIVEAU DE CARBURANT </label>
        <select id="CmbNiveauCarburant" class="form-select" aria-label="Default select example">
          <option value="0" selected>Non d&eacute;fini</option>
          <option value="Vide">Vide</option>
          <option value="Un quart">un quart</option>
          <option value="Un demi">Un demi</option>
          <option value="Trois quarts">Trois quarts</option>
          <option value="Plein">Plein</option>
        </selectid>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkRS">
        <label class="form-check-label" for="ChkRS">
          R/S
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkCRIC">
        <label class="form-check-label" for="ChkCRIC">
          CRIC
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkMANIVELLE">
        <label class="form-check-label" for="ChkMANIVELLE">
          MANIVELLE
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkENJOLIVEURS">
        <label class="form-check-label" for="ChkENJOLIVEURS">
          ENJOLIVEURS
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkRADIO">
        <label class="form-check-label" for="ChkRADIO">
          RADIO
        </label>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkPIECESADMINISTRATIVES">
        <label class="form-check-label" for="ChkPIECESADMINISTRATIVES">
          PIECES ADMINISTRATIVES
        </label>
      </div>

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
        <td style="text-align:left; font-weight: 700; font-size: 26px;"><h3><b>DEMANDE DE VEHICULE</h3></b></td>
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
    <div class="sect-bn"><button class="btn btn-warning btn-sm" id="addfile" type="button">Joindre un fichier</button></div>
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
                  <div class="sect-bn"><button class="btn btn-warning btn-sm linkOffCanvasNavigation" data-url="/tools/pages/vehicule/add.aspx?DID={{id}}" data-target="ffcMainFormContainer" data-bs-toggle="offcanvas" data-bs-target="#ffcMainForm" id="BtnModification" >Modifier la demande</button></div>
                  {{/id}}

                </br>
                  <div>
                    <h3 style="color:#c50000 !important;">
                      <b>
                        {{etat}}
                      </b>
                    </h3>
                  </div></br>
                  <table >
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
                  </table>

<br><br>
                  <div class="head-titre">
                    <h2>
                      Etat du vehicule au depart
                    </h2>
                  </div>
                  <table class="table">
<tr>
<td> Kilometrage</td>
<td> Niveau Carburant</td>
<td> R/S</td>
<td> CRICD</td>
<td> MANIVELLE</td>
<td> ENJOLIVEURS</td>
<td> RADIO</td>
<td> PIECES ADMINISTRATIVES</td>
</tr>
<tr>
  <td> {{IndexDepart}}</td>
  <td> {{NiveauCarburantDepart}}</td>
  <td> {{RSDepart}}</td>
  <td> {{CRICDepart}}</td>
  <td> {{MANIVELLEDepart}}</td>
  <td> {{ENJOLIVEURSDepart}}</td>
  <td> {{RADIODepart}}</td>
  <td> {{PIECESADMINISTRATIVESDepart}}</td>
  </tr>

                  </table>



<br><br>
<div class="head-titre">
  <h2>
    Etat du vehicule au retour
  </h2>
</div>
<table class="table">
<tr>
<td> Kilometrage</td>
<td> Niveau Carburant</td>
<td> R/S</td>
<td> CRICD</td>
<td> MANIVELLE</td>
<td> ENJOLIVEURS</td>
<td> RADIO</td>
<td> PIECES ADMINISTRATIVES</td>
</tr>
<tr>
<td> {{IndexRetour}}</td>
<td> {{NiveauCarburantRetour}}</td>
<td> {{RSRetour}}</td>
<td> {{CRICRetour}}</td>
<td> {{MANIVELLERetour}}</td>
<td> {{ENJOLIVEURSRetour}}</td>
<td> {{RADIORetour}}</td>
<td> {{PIECESADMINISTRATIVESRetour}}</td>
</tr>

</table>

                </script>

<script type="text/javascript">
  appHelper.loadJSWithNameSpace("showVehicule", 'showVehicule', "controller/Vehicule/show.js");
</script>
