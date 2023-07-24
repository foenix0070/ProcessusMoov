<form action="" method="" class="form" id="form">
  <div class="elts">

    <!--<fieldset class="form-elts">
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
        <label class="form-label">Catégorie</label>
        <input type="text" id="TxtCategorie" disabled class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Direction</label>
        <input type="text" id="TxtDirection" disabled class="  form-control" name="" placeholder="" />
      </div>
      <div class="mb-3">
        <label class="form-label">Division</label>
        <input type="text" id="TxtDivision" disabled class="  form-control" name="" placeholder="" />
      </div>
      <div class="mb-3">
        <label class="form-label">Service</label>
        <input type="text" id="TxtService" disabled class="  form-control" name="" placeholder="" />
      </div>


    </fieldset>-->

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
    
    <!--
    <fieldset class="form-elts">
      <legend>Motif de la demande</legend>


      <div class="mb-3">
        <label class="form-label"> Nature du cong&eacute;s</label>
        <select id="cmbTypeConge" name="cmbTypeConge" class="form-control">
          <option value="0" data-color="#000">Choisir le type de cong&eacute;s</option>
        </select>
        <input id="TxtTypeCongeColeur" value="" type="hidden">
        <input id="TxtTypeCongeText" value="" type="hidden">
      </div>

      <div class="mb-3">
        <label class="form-label">Nombre de Jours</label>
        <input type="number" id="TxtNbreJour" class="numeric form-control" style="width:200px;" name="TxtNbreJour"
          placeholder="" />
      </div>


      <div class="mb-3">
        <label class="form-label"> Date de depart souhait&eacute;</label>
        <input type="date" name="TxtDateDepart" class="date form-control" style="width:200px;" id="TxtDateDepart"
          placeholder="" />
      </div>

    </fieldset>
    -->

    <fieldset class="form-elts">
      <legend>Sortie de caisse</legend>
      <div class="mb-3">
        <label class="form-label"> Montant</label>
        <input type="text" class="form-control" id="TxtIntName" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Mode de paiement</label>
        <input type="text" class="form-control" id="TxtIntName" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Payer à</label>
        <input type="text" class="form-control" id="TxtIntDirection" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Caisse de paiement</label>
        <input type="text" class="form-control" id="TxtIntCategorie" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Objet de reglement</label>
        <input type="file" class="form-control" id="FileReglement" placeholder="" />
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