
<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label  class="form-label">Nom & Prenoms</label>
          <input type="text" id="TxtNom" disabled class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label">Matricule</label>
          <input type="text" id="TxtMatricule" disabled class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label">Email</label>
          <input type="text" id="TxtEmail" disabled class="  form-control" name="" placeholder="" />
      </div>

    </fieldset>

      <fieldset class="form-elts">
          <legend>Motif de la demande</legend>


          <div class="mb-3">
            <label  class="form-label"> Nature du cong&eacute;s</label>
            <select id="cmbTypeConge" name="cmbTypeConge" class="form-control">
              <option value="0" data-color="#000">Choisir le type de cong&eacute;s</option>
            </select>
            <input id="TxtTypeCongeColeur" value="" type="hidden" >
            <input id="TxtTypeCongeText" value="" type="hidden" >
          </div>

          <div class="mb-3">
            <label  class="form-label">Nombre de Jours</label>
              <input type="number" id="TxtNbreJour"  class="numeric form-control" style="width:200px;" name="TxtNbreJour" placeholder="" />
          </div>


          <div class="mb-3">
            <label  class="form-label"> Date de depart souhait&eacute;</label>
            <input type="date" name="TxtDateDepart" class="date form-control" style="width:200px;" id="TxtDateDepart" placeholder="" />
          </div>

      </fieldset>

      <fieldset class="form-elts">
<legend>Interimaire</legend>
        <div class="mb-3">
          <label  class="form-label"> Interimaire</label>
          <div id="plePickerInterimaireDiv" ></div>
        </div>

        <div class="mb-3">
          <label  class="form-label"> Nom</label>
          <input type="text" class="form-control"  id="TxtIntName" placeholder="" />
        </div>

        <div class="mb-3">
          <label  class="form-label"> Matricule</label>
          <input type="text" class="form-control" id="TxtIntMatricule" placeholder="" />
        </div>

        <div class="mb-3">
          <label  class="form-label"> Email</label>
          <input type="text" class="form-control" id="TxtIntEmail" placeholder="" />
        </div>

        <span class="note">
          L'interim ne concerne que les validations dans Moovinside.
          Toutes vos taches &aacute; venir seront automatiquement r&eacute;-affecct&eacute; &aacute;
          l'interimaire durant la periode de la mission
      </span>
    </fieldset>


      <fieldset class="form-elts">
          <legend>Adresse pendant les cong&eacute;s</legend>

          <div class="mb-3">
            <label  class="form-label">  Domicile habituel</label>
            <input type="text" class="form-control" name="TxtCongeDomicile"  id="TxtCongeDomicile"  placeholder="" />
          </div>


          <div class="mb-3">
            <label  class="form-label"> Contact t&eacute;l&eacute;phonique</label>
            <input type="tel" class="form-control" name="TxtCongeTelephone" id="TxtCongeTelephone"  placeholder="" />
          </div>
          <label>


          <div class="mb-3">
            <label  class="form-label">   Personne &agrave; contacter</label>
            <input type="text" class="form-control" id="TxtCongeContact" name="TxtCongeContact" placeholder="" />
          </div>
          <label>


      </fieldset>
  </div>

  <div class="input-optn">
      <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appConge", 'appConge', "controller/conge/add.js");
</script>