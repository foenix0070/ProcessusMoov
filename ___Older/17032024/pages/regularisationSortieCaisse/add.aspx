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
      <legend>Regularisation de la sortie de caisse</legend>
      <label class="form-label"> Sortie de caisse <span class="asterix">*</span> :</label>
      <select id="cmbSortie" name="cmbSortie" class="form-control">
        <option value="0" data-color="#000" data-target="0">Choisir la sortie de caisse</option>
      </select>
      <input id="TxtSortieColeur" value="" type="hidden">
      <input id="TxtSortieText" value="" type="hidden">
      <!-- <input id="TxtSortieID" value="test" type="hidden" > -->
  </div></br>
  <div class="mb-3">
    <input id="TxtSortie" class="form-control" type="text" style="display: none;" disabled>
  </div>
  <div class="mb-3">
    <label class="form-label"> Titre <span class="asterix">*</span></label>
    <input type="text" class="form-control" id="TxtTitle" placeholder="" />
  </div>
  <div class="mb-3">
    <label class="form-label"> Montant <span class="asterix">*</span></label>
    <input type="text" class="form-control" id="TxtMont" placeholder="" disabled />
  </div>
  <div class="mb-3">
    <label class="form-label"> Montant utilis&eacute; <span class="asterix">*</span></label>
    <input type="text" class="form-control" id="TxtMontant" placeholder="" />
  </div>

  <div class="mb-3">
    <label class="form-label"> Solde a reverser <span class="asterix">*</span></label>
    <input type="text" class="form-control" id="TxtSolde" placeholder="" />
  </div>

  <div class="mb-3">
    <label class="form-label"> Observation <span class="asterix">*</span></label>
    <textarea class="form-control" type="text" name="TxtObservation" id="TxtObservation" cols="30"></textarea>
    <!-- <input type="text" class="form-control" id="TxtObservation" placeholder="" /> -->
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
    <input id="TxtSortieID" type="hidden">
  </div>

  <div class="mb-3">
    <input id="TxtRef" type="hidden">
  </div>

  <div class="mb-3">
    <input id="TxtMontantSortie" type="hidden">
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
  appHelper.loadJSWithNameSpace("appRegularisationSortieCaisse", 'appRegularisationSortieCaisse', "controller/RegularisationSortieCaisse/add.js");
</script>