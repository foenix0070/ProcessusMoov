<form action="" method="" class="form" id="form">
  <div class="elts">
    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom & Prenoms <span class="asterix">*</span></label>
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
      <legend>Sortie de caisse</legend>
      <div class="mb-3">
        <label class="form-label"> Titre <span class="asterix">*</span></label>
        <input type="text" class="form-control" id="TxtTitle" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Montant <span class="asterix">*</span></label>
        <input type="text" step="0.01" class="form-control" id="TxtMontant" placeholder="" />
      </div>

      <div class="mb-3">

        <label class="form-label">Mode de paiement <span class="asterix">*</span> :</label>
        <select id="cmbMode" name="cmbMode" class="form-control">
          <option value="0" data-color="#000">Choisir le mode de paiement</option>
        </select>
        <input id="TxtModeColeur" value="" type="hidden">
        <input id="TxtModeText" value="" type="hidden">
      </div>

      <div class="mb-3">
        <label class="form-label"> Payer &aacute; <span class="asterix">*</span></label>
        <div id="plePickerInterimaireDiv"></div>
      </div>

      <!-- <div class="mb-3">
        <label class="form-label"> Nom & Pr&eacute;nom(s) <span class="asterix">*</span></label>
        <input type="text" class="form-control" id="TxtPayerA" placeholder="" disabled />
      </div> -->

      <div class="mb-3">
        <label class="form-label"> Caisse de paiement <span class="asterix">*</span> :</label>
        <select id="cmbCaisse" name="cmbCaisse" class="form-control">
          <option value="0" data-color="#000">Choisir la Caisse de paiement</option>
        </select>
        <input id="TxtCaisseColeur" value="" type="hidden">
        <input id="TxtCaisseText" value="" type="hidden">
      </div>

      <div class="mb-3">
        <label class="form-label"> Objet de reglement <span class="asterix">*</span></label>
        <!--<input type="file" class="form-control" id="TxtReglement" placeholder="" />-->
        <textarea type="text" class="form-control" id="TxtObjetReglement" placeholder=""></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label"> Document justificatif</label>
        <input type="file" class="form-control fileUpload" id="FileDoc" placeholder="" />
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

    <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>
  </div>

  <div id="DivErreurMessage"></div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
    <a href="/tools/pages/suivie/suivie.aspx" class="linkModalNavigation" data-bs-toggle="modal" data-bs-target="#staticModalForm"  data-url="/sites/proc/tools/pages/suivie/suivie.aspx"
    data-target="staticModalFormContainer" style="text-decoration: none; ">
    Option de suivie
  </a>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appSortieCaisse", 'appSortieCaisse', "controller/SortieCaisse/add.js");
</script>