<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input type="text" id="TxtNom" disabled class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Matricule</label>
        <input type="text" id="TxtMatricule" disabled class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="text" id="TxtEmail" disabled class="  form-control" name="" placeholder="" />
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>REGULATION DE LA MISSION</legend>

      <h4>CERTIFICATION DE LA MISSION</h4></br>

      <div class="mb-3">
        <label class="form-label"> Mission :</label>
        <select id="cmbMission" name="cmbMission" class="form-control"">
          <option value=" 0" data-color="#000">Choisir la mission</option>
        </select>
        <input id="TxtMissionColeur" value="" type="hidden">
        <input id="TxtMissionText" value="" type="hidden">
      </div></br>

      <div class="mb-3">
        <input id="TxtMission" class="form-control" type="text" style="display: none;" disabled>
      </div>

      <div class="mb-3">
        <input id="TxtMont" class="form-control" type="text" style="display: none;" disabled>
      </div>

      <input type="radio" name="Etat" value="Mission effectuee" id="RadSucces" checked="checked">
      <label for="RadSucces">Mission éffectu&eacute;e</label> &nbsp;&nbsp;&nbsp;
      <input type="radio" name="Etat" value="Mission non effectuee" id="RadEchec">
      <label for="RadEchec">Mission non éffectuée</label><br><br>

      <h4>REMBOURSEMENT DES FRAIS COMPLEMENTAIRES</h4></br>

      <table id="TableFraisMission">
        <tr>
          <th>Libelle</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
        </tr>
        <tr>
          <!--<td><select id="CmbPerdieme" name="CmbPerdieme"><option>Hotel</option></select></td>-->
          <td><input type="text" id="Txtlibelle" name="Txtlibelle" placeholder="Libelle"></td>
          <td><input type="date" id="DateDebut" name="DateDebut"></td>
          <td><input type="date" id="DateFin" name="DateFin"></td>
          <td><input type="number" id="TxtNombre" name="TxtNombre" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtForfait" name="TxtForfait" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtTotal" name="TxtTotal" readonly></td>
          <!--<td><input type="button" onclick="supprimerLigne(this)" value="Supprimer"></td>-->

        </tr>
      </table>
      <div class="input-optn mt-3">
        <input type="button" onclick="ajouterLigne()" value="Ajouter une nouvelle ligne">
      </div>
      <div class="mb-3">
        <label class="form-label"> Document justificatif</label>
        <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
      </div>

      <div class="mb-3">
        <input id="TxtMissionID" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtRef" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtVerif" type="hidden">
      </div>

    </fieldset>
    <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>
  </div>

  <div class="input-optn mt-3">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
    <a href="/tools/pages/suivie/suivie.aspx" class="linkModalNavigation" data-bs-toggle="modal" data-bs-target="#staticModalForm"  data-url="/sites/proc/tools/pages/suivie/suivie.aspx"
    data-target="staticModalFormContainer" style="text-decoration: none; ">
    Option de suivie
  </a>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appRegularisationFraisMission", 'appRegularisationFraisMission', "controller/RegularisationFraisMission/add.js");
</script>