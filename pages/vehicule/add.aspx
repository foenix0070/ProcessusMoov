<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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

            <div class="form-check">
                <input class="form-check-input rdMotifPretVehicule" type="radio" name="rdMotifPretVehicule" id="rdMotifPretVehiculeMission" value="MISSION" >
                <label class="form-check-label" for="rdMotifPretVehiculeMission">
                    MISSION
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input rdMotifPretVehicule" type="radio" name="rdMotifPretVehicule" id="rdMotifPretVehiculeGarage" value="VEHICULE AU GARAGE">
                <label class="form-check-label" for="rdMotifPretVehiculeGarage">
                    VEHICULE AU GARAGE
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input rdMotifPretVehicule" type="radio" name="rdMotifPretVehicule" id="rdMotifPretVehiculeAUTRE" value="AUTRE">
                <label class="form-check-label" for="rdMotifPretVehiculeAUTRE">
                    AUTRE
                </label>
              </div>

              <div id="DivVehiculeMotif" class="mb-3 d-none">
                <label class="form-label"> Motif <span class="asterix">*</span></label>
                <input type="text" class="form-control" name="TxtObjet" id="TxtObjet" placeholder="" />
              </div>

              <div class="row g-3">
                <div class="col">
                  <label class="form-label"> V&eacute;hicule utilis&eacute;  du <span class="asterix">*</span>:</label>
                  <input type="date" id="TxtDateDebut" class="form-control">
                </div>
                <div class="col">
                  <label class="form-label"> Au <span class="asterix">*</span>:</label>
                  <input type="date" id="TxtDateFin" class="form-control">
                </div>
              </div>

            <div class="mb-3">
                <label class="form-label"> Objet de la demande <span class="asterix">*</span></label>
                <textarea name="" class="form-control" name="TxtCommentaire" id="TxtCommentaire"  cols="30" rows="10"></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label"> Document justificatif</label>
                <input type="file" multiple class="form-control fileUpload" id="FileDoc" placeholder="" />
            </div>

        </fieldset>

        <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>
    </div>

    <div id="DivErreurMessage"></div>

    <div class="input-optn mt-3">
        <button class="Submit" id="BtnSave" type="button"> Valider </button>
        <a href="/tools/pages/suivie/suivie.aspx" class="linkModalNavigation" data-bs-toggle="modal" data-bs-target="#staticModalForm"  data-url="/sites/proc/tools/pages/suivie/suivie.aspx"
        data-target="staticModalFormContainer" style="text-decoration: none; ">
        Option de suivie
      </a>
    </div>
</form>
<!--<script src="http://ci08vmmitest/tools1/controller/Vehicule/add.js"></script>-->
<script type="text/javascript">
    appHelper.loadJSWithNameSpace("appVehicule", 'appVehicule', "controller/Vehicule/add.js");
</script>