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
      <legend>Reprise<span class="asterix">*</span></legend>

      <div class="mb-3">

        <div class="mb-3">
          <div>Votre <span id="TxtTypeR"></span> de <span id="TxtReprise"></span> de <span id="TxtNbreJour"></span> jour a debuter le <span id="TxtDateDepart"></span> et a pris fin le  <span id="TxtDateReprise"></span> avec pour interim <span id="TxtInterimaire"></span> .</div>
          <div>Effectuer votre reprise en cliquant sur le bouton <b>Reprise</b>.</div>          
        </div>

        <div class="mb-3">
          <label class="form-label"> Pieces justificatifs</label>
          <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
        </div>


        <!-- <div class="mb-3">
          <label class="form-label">Reprise de <span class="asterix">*</span></label>
          <input type="Text" id="TxtReprise" class="form-control" name="TxtReprise" disabled />
        </div>

        <div class="mb-3" id="nbre">
          <label class="form-label">Nombre de Jours <span class="asterix">*</span></label>
          <input type="number" id="TxtNbreJour" min="1" class="numeric form-control" name="TxtNbreJour" disabled />
        </div>

        <div class="mb-3">
          <label class="form-label">Interimaire <span class="asterix">*</span></label>
          <input type="Text" id="TxtInterimaire" class="form-control" style="width:200px;" name="TxtInterimaire"
            disabled />
        </div>

        <div class="mb-3">
          <label class="form-label">Date de d&eacute;part<span class="asterix">*</span></label>
          <input type="date" name="TxtDateDepart" class="date form-control" style="width:200px;" id="TxtDateDepart"
            placeholder="" disabled />
        </div>

        <div class="mb-3">
          <label class="form-label">Date de reprise<span class="asterix">*</span></label>
          <input type="date" name="TxtDateReprise" class="date form-control" style="width:200px;" id="TxtDateReprise"
            placeholder="" disabled />
        </div>

         -->

        <div class="mb-3">
          <input id="TxtID" type="hidden">
        </div>

        <div class="mb-3">
          <input id="TxtType" type="hidden">
        </div>

    </fieldset>
  </div>

  <div id="DivErreurMessage"></div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Reprise </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appReprise", 'appReprise', "controller/reprise/add.js");
</script>