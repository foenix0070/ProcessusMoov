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


      <div class="mb-3">
        <label class="form-label"> P&eacute;riode du <span class="asterix">*</span>:</label>
        <input type="date" id="TxtDateDebut">

        <label class="form-label"> Au <span class="asterix">*</span>:</label>
        <input type="date" id="TxtDateFin">
      </div>

      <div class="mb-3">
        <label class="form-label"> Zone g&eacute;ographique <span class="asterix">*</span></label>
        <select id="cmbZoneGeo" name="cmbZoneGeo" class="form-control">
          <option value="0" data-color="#000">Choisir la zone geographique</option>
        </select>
        <input id="TxtZoneGeoColeur" value="" type="hidden">
        <input id="TxtZoneGeoText" value="" type="hidden">
      </div>
      <div class="mb-3">
        <label class="form-label">Motif <span class="asterix">*</span> :</label>
        <input type="text" id="TxtMotif" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Destination <span class="asterix">*</span> :</label>
        <input type="text" id="TxtDestination" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Commentaire :</label>
        <!-- <input type="text" id="TxtCommentaire" class="  form-control"> -->
        <textarea id="TxtCommentaire" type="text" class="form-control" name="TxtCommentaire" cols="30"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Site BTS :</label>
        <input type="text" id="TxtSite" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Co&ucirc;t Total <span class="asterix">*</span> :</label>
        <input type="text" id="TxtCoutTotal" class="  form-control">
      </div>

      <div class="mb-3">
        <label class="form-label"> Caisse de paiement <span class="asterix">*</span> :</label>
        <select id="cmbCaisse" name="cmbCaisse" class="form-control" onchange="afficher()">
          <option value="0" data-color="#000">Choisir la Caisse de paiement</option>
        </select>
        <input id="TxtCaisseColeur" value="" type="hidden">
        <input id="TxtCaisseText" value="" type="hidden">
      </div>

      <div class="mb-3">

        <label class="form-label">Mode de paiement <span class="asterix">*</span> :</label>
        <select id="cmbMode" name="cmbMode" class="form-control">
          <option value="0" data-color="#000">Choisir le mode de paiement</option>
        </select>
        <input id="TxtModeColeur" value="" type="hidden">
        <input id="TxtModeText" value="" type="hidden">
      </div>
      <div class="mb-3" id="AutreCaisse" style="display: none;" class="form-control">
        <label class="form-label">Autre Caisse :</label>
        <input type="text" id="TxtAutreCaisse" class="  form-control">
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
      <table id="TableFraisMission">
        <tr>
          <th>Libelle</th>
          <th>Date de d&eacute;but</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
          <!-- <th>Action</th> -->
        </tr>
        <tr>
          <!--<td><select id="CmbPerdieme" name="CmbPerdieme"><option>Hotel</option></select></td>-->
          <td><input type="text" id="Txtlibelle" name="Txtlibelle"></td>
          <td><input type="date" id="DateDebut" name="DateDebut"></td>
          <td><input type="date" id="DateFin" name="DateFin"></td>
          <td><input type="number" id="TxtNombre" name="TxtNombre" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtForfait" name="TxtForfait" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtTotal" name="TxtTotal" readonly></td>
          <!-- <td><input type="number" id="TxtNombre" name="TxtNombre" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtForfait" name="TxtForfait" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtTotal" name="TxtTotal" readonly></td> -->
          <!-- <td><input type="button" onclick="supprimerLigne(this)" value="Supprimer"></td> -->

        </tr>
      </table>

      <div class="input-optn mt-3" style="float: right;">
        <input type="number" id="totalGeneral"  name="totalGeneral" readonly>
      </div>

      <div class="input-optn mt-3">
        <input type="button" id="ajouterLigne" value="Ajouter une nouvelle ligne">
      </div>
    </fieldset>

  </div>

  <div id="DivErreurMessage"></div>

  <div class="input-optn mt-3">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appMission", 'appMission', "controller/FraisMission/add.js");
</script>