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
      <legend>Sortie de caisse</legend>
      <div class="mb-3">
        <label class="form-label"> Titre</label>
        <input type="text" class="form-control" id="TxtTitle" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Montant</label>
        <input type="number" step="0.01" class="form-control" id="TxtMontant" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Mode de paiement</label>
        <!-- <input type="text" class="form-control" id="TxtModePaiement" placeholder="" /> -->
        <select id="TxtModePaiement" name="TxtModePaiement" class="form-control">
          <option value="0" data-color="#000">Choisir le mode de paiement</option>
        </select>
        <input id="TxtModeColeur" value="" type="hidden">
        <input id="TxtModeText" value="" type="hidden">
      </div>

      <div class="mb-3">
        <label class="form-label"> Payer à</label>
        <input type="text" class="form-control" id="TxtPayerA" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Caisse de paiement</label>
        <input type="text" class="form-control" id="TxtCaissePaiement" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Objet de reglement</label>
        <!--<input type="file" class="form-control" id="TxtReglement" placeholder="" />-->
        <textarea class="form-control" id="TxtObjetReglement" placeholder=""></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label"> Doc justificatifs</label>
        <input type="file" class="form-control" id="FileDoc" placeholder="" />
      </div>

      <span class="note">
        L'interim ne concerne que les validations dans Moovinside.
        Toutes vos taches &aacute; venir seront automatiquement r&eacute;-affecct&eacute; &aacute;
        l'interimaire durant la periode de la mission
      </span>
    </fieldset>

  </div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appSortieCaisse", 'appSortieCaisse', "controller/SortieCaisse/add.js");
</script>