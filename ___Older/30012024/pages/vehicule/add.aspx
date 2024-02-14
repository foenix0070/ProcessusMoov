<form action="" method="" class="form" id="form">
    <div class="elts">

        <fieldset class="form-elts">
            <legend>Demandeur</legend>
            <div class="mb-3">
              <label  class="form-label">Nom & Prenoms <span class="asterix">*</span></label>
                <input type="text" id="TxtNom" disabled class="  form-control" value="" placeholder="" />
            </div>
      
            <div class="mb-3">
              <label  class="form-label">Matricule <span class="asterix">*</span></label>
                <input type="text" id="TxtMatricule" disabled class="  form-control" name="" placeholder="" />
            </div>
      
            <div class="mb-3">
              <label  class="form-label">Email <span class="asterix">*</span></label>
                <input type="text" id="TxtEmail" disabled class="  form-control" name="" placeholder="" />
            </div>
      
        </fieldset>

        <fieldset class="form-elts">
            <legend>Demande</legend>

            <div class="mb-3">
                <label class="form-label"> Objet de la demande <span class="asterix">*</span></label>
                <input type="text" class="form-control" name="TxtObjet" id="TxtObjet" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Description <span class="asterix">*</span></label>
                <textarea type="text" class="form-control" name="TxtMotif" id="TxtMotif" cols="30"
                    placeholder=""></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label"> Document justificatif</label>
                <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
            </div>

            <div class="mb-3">
                <input id="TxtVerif" type="hidden" >
            </div>

            <div class="mb-3">
                <input id="TxtID" type="hidden" >
            </div>

            <div class="mb-3">
                <input id="TxtRef" type="hidden">
            </div>

        </fieldset>

    </div>

    <div id="DivErreurMessage"></div>

    <div class="input-optn mt-3">
        <button class="Submit" id="BtnSave" type="button"> Valider </button>
    </div>
</form>
<!--<script src="http://ci08vmmitest/tools1/controller/Vehicule/add.js"></script>-->
<script type="text/javascript">
    appHelper.loadJSWithNameSpace("appVehicule", 'appVehicule', "controller/Vehicule/add.js");
</script>