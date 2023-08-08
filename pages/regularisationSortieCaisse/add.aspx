<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom & Prenoms</label>
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
      <legend>Regularisation de la sortie de caisse</legend>
      <div class="mb-3">
        <label class="form-label"> Titre</label>
        <input type="text" class="form-control" id="TxtTitle" placeholder="" />
      </div>
      <div class="mb-3">
        <label class="form-label"> Montant utilis&eacute;</label>
        <input type="number" class="form-control" id="TxtMontant" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Solde &agrave; reverser</label>
        <input type="number" class="form-control" id="TxtSolde" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Observation</label>
        <input type="text" class="form-control" id="TxtObservation" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Doc justificatifs</label>
        <input type="file" class="form-control" id="FileDoc" placeholder="" />
      </div>

      <span class="note">
        Une copie du papier du document de la justification qui motive la sortie de caisse est obligatoire pour 
        accompagner le formulaire de Regularisation de la sortie de caisse (fonctionnement dégradé).
      </span>
    </fieldset>

  </div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appRegularisationSortieCaisse", 'appRegularisationSortieCaisse', "controller/RegularisationSortieCaisse/add.js");
</script>