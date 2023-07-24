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
      <legend>Interimaire</legend>
      <div class="mb-3">
        <label class="form-label"> Interimaire</label>
        <div id="plePickerInterimaireDiv"></div>
      </div>

      <div class="mb-3">
        <label class="form-label"> Nom & Prenoms</label>
        <input type="text" class="form-control" id="TxtIntName" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Matricule</label>
        <input type="text" class="form-control" id="TxtIntMatricule" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Direction</label>
        <input type="text" class="form-control" id="TxtIntDirection" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label"> Categorie</label>
        <input type="text" class="form-control" id="TxtIntCategorie" placeholder="" />
      </div>

      <span class="note">
        L'interim ne concerne que les validations dans Moovinside.
        Toutes vos taches &aacute; venir seront automatiquement r&eacute;-affecct&eacute; &aacute;
        l'interimaire durant la periode de la mission
      </span>
    </fieldset>

    <fieldset class="form-elts">
      <legend>Motif de la demande</legend>

      <div class="mb-3 d-flex flex-row">
        <label class="form-label"> Nature absence</label>

        <div class="d-flex flex-column">
          <label>
            <input type="radio" name="Absence" id="" value="Absence exceptionnelle" />
            Absence exceptionnelle
          </label>
          <label>
            <input type="radio" name="Absence" id="" value="Permission exceptionnelle" />
            Permission exceptionnelle
          </label>
        </div>

      </div>

      <div class="mb-3">
        <label class="form-label">Motif</label>
        <input type="text" class="form-control" id="TxtMotif" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Durée</label>
        <input type="number" class="form-control" id="TxtDuree" placeholder="Jours" />
      </div>

      <div class="mb-3">
        <label class="form-label">Date de debut</label>
        <input type="date" class="form-control" id="DateDebut" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Date de fin</label>
        <input type="date" class="form-control" id="DateFin" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Date de reprise</label>
        <input type="date" class="form-control" id="DateReprise" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Doc justificatifs</label>
        <input type="file" class="form-control" id="DocJustificatif" placeholder="" />
      </div>

      <span class="note">
        NB : Le nombre total de jours accordés au titre des Permissions exceptionnelles est limité à 10 jours
        ouvrables par employé et par an
      </span>

    </fieldset>



  </div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appConge", 'appConge', "controller/conge/add.js");
</script>