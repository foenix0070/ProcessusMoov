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
      <legend>Interimaire</legend>
      <div class="mb-3">
        <label class="form-label"> Interimaire</label>
        <div id="plePickerInterimaireDiv"></div>
      </div>

      <div class="mb-3">
        <label class="form-label"> Nom </label>
        <input type="text" class="form-control" id="TxtIntName" placeholder="" disabled />
      </div>

      <div class="mb-3">
        <label class="form-label"> Matricule </label>
        <input type="text" class="form-control" id="TxtIntMatricule" placeholder="" disabled />
      </div>

      <div class="mb-3">
        <label class="form-label"> Email </label>
        <input type="text" class="form-control" id="TxtIntEmail" placeholder="" disabled />
      </div>

      <span class="note">
        L'interim ne concerne que les validations dans Moovinside.
        Toutes vos taches &aacute; venir seront automatiquement r&eacute;-affecct&eacute; &aacute;
        l'interimaire durant la periode de la mission
      </span>
    </fieldset>

    <fieldset class="form-elts">
      <legend>Motif de la demande</legend>

      <div class="mb-3">

        <label class="form-label"> Nature de l'absence <span class="asterix">*</span></label>
        <select id="cmbTypeAbsence" name="cmbTypeAbsence" class="form-control">
          <option value="0" data-color="#000">Choisir le type de absence</option>
        </select>
        <input id="TxtTypeAbsenceColeur" value="" type="hidden">
        <input id="TxtTypeAbsenceText" value="" type="hidden">

      </div>

      <div class="mb-3">
        <label class="form-label">Motif <span class="asterix">*</span></label>
        <input type="text" class="form-control" id="TxtMotif" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Dur&eacute;e <span class="asterix">*</span></label>
        <input type="number" class="form-control" id="TxtDuree" placeholder="Jours" />
      </div>

      <div class="mb-3">
        <label class="form-label">Date de debut <span class="asterix">*</span></label>
        <input type="date" class="form-control" id="DateDebut" placeholder="" />
      </div>

      <!-- <div class="mb-3">
        <label class="form-label">Date de reprise <span class="asterix">*</span></label>
        <input type="date" class="form-control" id="DateReprise" placeholder="" />
      </div> -->

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

      <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>

    </fieldset>

  </div>

  <a href="#" class="link" id="aLinkShowHistorique"  style="text-decoration: none; "> Afficher mon historique </a>

  <div id="DivHistoAbsence" class="d-none"> historique des absences </div>
  <br>
  <hr>
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
  appHelper.loadJSWithNameSpace("appAbsence", 'appAbsence', "controller/absence/add.js");
</script>


<script id="tmpl_table_absence" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>Intitule</th>
          <th>Date de depart</th>
          <th>Nombre de jours</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {{#absences}}
        <tr class="" >
          <td>{{title}}</td>
          <td>{{startdate}}</td>
          <td>{{nbre}}</td>
          <td><span class="{{classe}}">{{status}}</span></td>
        </tr>
        {{/absences}}
      </tbody>
    </table>
  </div>
</script>
