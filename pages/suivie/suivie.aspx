<form action="" method="" class="form" id="form">
  <div class="elts">
    <fieldset class="form-elts">
      <legend>Demandeur</legend>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkAllStepProcessus">
        <label class="form-check-label" for="ChkAllStepProcessus">
          M'avertir &aacute; chaque &eacute;tape du processus
        </label>
      </div>

      <div class="mb-3">
        <label class="form-label">Nume&eacute;ro t&eacute;l: <span class="asterix">*</span></label>
        <input type="text" id="TxtTelephone" class="  form-control" name="" placeholder="" />
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkTreatTask">
        <label class="form-check-label" for="ChkTreatTask">
         Lorqu'une t&agrave;che est trait&eacute; (Valid&eacute;e ou Rej&eacute;t&eacute;e)
        </label>
      </div>


      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ChkAffectedTask">
        <label class="form-check-label" for="ChkTreatTask">
         Lorqu'une t&agrave;che est affect&eacute;e ou r&eacute;affect&eacute;e
        </label>
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>Pr&eacute;f&eacute;rences</legend>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="RdPreference" id="RdPreferenceUse">
        <label class="form-check-label" for="RdPreferenceUse">
         Utiliser ces versions pour mes prochaines demandes
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="RdPreference" id="RdPreferenceNotUse" checked>
        <label class="form-check-label" for="RdPreferenceNotUse">
          Ne pas utiliser ces versions pour mes prochaines demandes
        </label>
      </div>
    </fieldset>

  </div>

  <input type="hidden" id="txtPrefID" name="txtPrefID">
  <div class="input-optn">
    <button class="Submit" id="BtnPreferenceSave" type="button"> Valider </button>
  </div>
</form>

<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appSuivieDemande", 'appSuivieDemande', "controller/suivie/suivie.js");
</script>