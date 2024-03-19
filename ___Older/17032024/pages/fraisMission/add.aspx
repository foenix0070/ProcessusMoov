<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom <span class="asterix">*</span></label>
        <input type="text" id="TxtNom" disabled class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Matricule <span class="asterix">*</span></label>
        <input type="text" id="TxtMatricule" disabled class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email <span class="asterix">*</span></label>
        <input type="text" id="TxtEmail" disabled class="  form-control" name="" placeholder="" />
      </div>

    </fieldset>
    <fieldset class="form-elts">
      <legend>INTERIMAIRE</legend>

      <div class="mb-3">
        <label class="form-label"> Interimaire</label>
        <div id="plePickerInterimaireDiv"></div>
      </div>

      <div class="mb-3">
        <label class="form-label"> Nom</label>
        <input type="text" class="form-control" id="TxtIntName" placeholder="" disabled />
      </div>

      <div class="mb-3">
        <label class="form-label"> Matricule</label>
        <input type="text" class="form-control" id="TxtIntMatricule" placeholder="" disabled />
      </div>

      <div class="mb-3">
        <label class="form-label"> Email</label>
        <input type="text" class="form-control" id="TxtIntEmail" placeholder="" disabled />
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>MISSION</legend>

      <div class="row g-3">
        <div class="col">
          <label class="form-label"> P&eacute;riode du <span class="asterix">*</span>:</label>
          <input type="date" id="TxtDateDebut" class="form-control">
        </div>
        <div class="col">
          <label class="form-label"> Au <span class="asterix">*</span>:</label>
          <input type="date" id="TxtDateFin" class="form-control">
        </div>
      </div>


      <div class="mb-3">
        <label class="form-label"> Zone g&eacute;ographique <span class="asterix">*</span></label>
        <select id="cmbZoneGeo" name="cmbZoneGeo" class="cmbZoneGeo form-control">
          <option value="0" data-color="#000">Choisir la zone geographique</option>
        </select>
        <input id="TxtZoneGeoColeur" value="" type="hidden">
        <input id="TxtZoneGeoText" value="" type="hidden">
      </div>

      <div class="mb-3">
        <label class="form-label">Motif <span class="asterix">*</span> :</label>
        <select id="cmbMotif" name="cmbMotif" class="cmbMotif form-control">
          <option value="0" data-color="#000">Choisir le motif</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Destination <span class="asterix">*</span> :</label>
        <select id="cmbDestination" name="cmbDestination" class=" cmbDestination form-control">
          <option value="0" data-color="#000">Choisir la destination</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Commentaire :</label>
        <textarea id="TxtCommentaire" type="text" class="form-control" name="TxtCommentaire" cols="30"></textarea>
      </div>



      <div class="row g-3">
        <div class="col">


          <table class="table table-condensed">
            <tbody id="tbbtsintervention">
              <tr id="trbtsintervention0" class="trsitebtsinter">
                <td>
                  <div class="mb-3">
                    <label class="form-label">Site BTS :</label>
                    <select id="cmbSite" name="cmbSite" placeholder="Choisir un site BTS" class="form-control cmbSite">
                    </select>
                  </div>
                </td>
                <td>
                  <div class="mb-3">
                    <label class="form-label">Intervention :</label>
                    <select id="cmbIntervention" name="cmbIntervention" placeholder="Choisir une intervention"
                      class="form-control cmbIntervention">
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2"> <button type="button" class="btn btn-outline-light text-dark pull-right"
                    id="BtnAddLigneBts">Ajouter une nouvelle ligne</button> </td>
              </tr>
            </tfoot>
          </table>

        </div>
      </div>


      <div class="mb-3">
        <label class="form-label"> Caisse de paiement <span class="asterix">*</span> :</label>
        <select id="cmbCaisse" name="cmbCaisse" class="form-control cmbCaisse" onchange="afficher()">
          <option value="0" data-color="#000">Choisir la Caisse de paiement</option>
        </select>
        <input id="TxtCaisseColeur" value="" type="hidden">
        <input id="TxtCaisseText" value="" type="hidden">
      </div>


      <div class="mb-3">
        <label class="form-label">Mode de paiement <span class="asterix">*</span> :</label>
        <select id="cmbMode" name="cmbMode" class="form-control cmbMode">
          <option value="0" data-color="#000">Choisir le mode de paiement</option>
        </select>
        <input id="TxtModeColeur" value="" type="hidden">
        <input id="TxtModeText" value="" type="hidden">
      </div>
      <div class="mb-3" id="AutreCaisse" style="display: none;" class="form-control">
        <label class="form-label">Autre Caisse :</label>
        <input type="text" id="TxtAutreCaisse" class="  form-control">
      </div>

      <div class="mb-3 d-none">
        <label class="form-label">Co&ucirc;t Total <span class="asterix">*</span> :</label>
        <input type="text" id="TxtCoutTotal" class="  form-control">
      </div>

      <div class="mb-3">
        <label class="form-label"> Document justificatif</label>
        <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
      </div>

      <div class="mb-3">
        <input id="TxtVerif" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtID" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtRef" type="hidden">
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>FRAIS DE MISSION</legend>
      <table class="table table-borderless" id="TableFraisMission">
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Date de d&eacute;but</th>
            <th>Date de fin</th>
            <th>Nombre</th>
            <th>Forfait</th>
            <th>Total</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody id="TbDetailsFraisMission">

        </tbody>
        <tfoot>
          <tr>
            <td colspan="5"></td>
            <td>
              <input type="number" id="totalGeneral" class="form-control" name="totalGeneral" readonly>
            </td>
          </tr>
        </tfoot>
      </table>

    </fieldset>
    <div class="alert alert-dark" role="alert" id="DivNoteFormulaire"> </div>
  </div>

  <div id="DivErreurMessage"></div>

  <div class="input-optn mt-3">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
    <a href="/tools/pages/suivie/suivie.aspx" class="linkModalNavigation" data-bs-toggle="modal"
      data-bs-target="#staticModalForm" data-url="/sites/proc/tools/pages/suivie/suivie.aspx"
      data-target="staticModalFormContainer" style="text-decoration: none; ">
      Option de suivie
    </a>
  </div>
</form>

<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appMission", 'appMission', "controller/FraisMission/add.js");
</script>

<script id="tmpl_table_Details_Mission" type="x-tmpl-mustache">
{{#Details}}
  <tr>
    <td class="p-0"><input type="text" id="TxtDetailslibelle{{id}}" class="form-control" value="{{libelle}}"  name="Txtlibelle"></td>
    <td class="p-0"><input type="date" id="TxtDetailsDateDebut{{id}}" class="form-control" name="DateDebut"></td>
    <td class="p-0"><input type="date" id="TxtDetailsDateFin{{id}}" class="form-control" name="DateFin"></td>
    <td class="p-0"><input type="number" id="TxtDetailsNombre{{id}}" value="1" name="TxtNombre"class="form-control" oninput="calculTotal()"></td>
    <td class="p-0"><input type="number" id="TxtDetailsForfait{{id}}" value="0" name="TxtForfait" class="form-control" oninput="calculTotal()"></td>
    <td class="p-0"><input type="number" id="TxtDetailsTotal{{id}}" value="0" name="TxtTotal" class="form-control" readonly></td>
  </tr>
  {{/Details}}
</script>

