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
      <legend>Motif de la demande <span class="asterix">*</span></legend>

      <div class="mb-3">
        <!--<div style="font-size: 16px;padding: 5px;text-align: center;">Votre solde de cong&eacute; annuel est <b
            id="bSolde"></b> jours</div>-->

        <div class="mb-3">
          <label class="form-label"> Nature du cong&eacute;s <span class="asterix">*</span></label>
          <select id="cmbTypeConge" name="cmbTypeConge" class="form-control" data-toggle="tooltip" data-placement="bottom" title="Selectionner la nature du congés">
            <option value="0" data-color="#000">Choisir le type de cong&eacute;s</option>
          </select>
          <input id="TxtTypeCongeColeur" value="" type="hidden">
          <input id="TxtTypeCongeText" value="" type="hidden">
        </div>

        <div class="mb-3">
          <label class="form-label">Nombre de Jours <span class="asterix" >*</span></label>
          <input type="number" id="TxtNbreJour" min="1" class="numeric form-control" style="width:200px;"
          data-toggle="tooltip" data-placement="bottom" title="Renseigner le nombre de jours du congés"  name="TxtNbreJour" />
        </div>

        <div class="mb-3">
          <label class="form-label"> Date de depart souhait&eacute; <span class="asterix">*</span></label>
          <input type="date" name="TxtDateDepart" class="date form-control" style="width:200px;" id="TxtDateDepart"
          data-toggle="tooltip" data-placement="bottom" title="Renseigner la date de départ"  placeholder="" />
        </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>Interimaire</legend>
      <div class="mb-3">
        <label class="form-label"> Interimaire</label>
        <div id="plePickerInterimaireDiv" data-toggle="tooltip" data-placement="bottom" title="Choisir l'interimaire en renseignant son nom"></div>
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

      <div class="mb-3">
        <input id="TxtVerif" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtID" type="hidden">
      </div>

      <div class="mb-3">
        <input id="TxtRef" type="hidden">
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
        <label class="form-label"> Domicile habituel</label>
        <input type="text" class="form-control" name="TxtCongeDomicile" id="TxtCongeDomicile" placeholder="" data-toggle="tooltip" data-placement="bottom" title="Renseigner votre domicile" />
      </div>


      <div class="mb-3">
        <label class="form-label"> Contact t&eacute;l&eacute;phonique</label>
        <input type="tel" class="form-control" name="TxtCongeTelephone" id="TxtCongeTelephone" placeholder="" data-toggle="tooltip" data-placement="bottom" title="Renseigner votre contact"/>
      </div>

      <div class="mb-3">
        <label class="form-label"> Personne &agrave; contacter</label>
        <input type="text" class="form-control" id="TxtCongeContact" name="TxtCongeContact" placeholder="" data-toggle="tooltip" data-placement="bottom" title="Renseigner le nom de la personne à Contacter" />
      </div>
      <label>

        <div class="mb-3">
          <label class="form-label"> Document justificatif</label>
          <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
        </div>

    </fieldset>
  </div>
  <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>

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
  appHelper.loadJSWithNameSpace("appConge", 'appConge', "controller/conge/add.js");
</script>