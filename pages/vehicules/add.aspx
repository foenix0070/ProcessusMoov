<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<form action="" method="" class="form" id="form">
    <div class="elts">

        <fieldset class="form-elts">
            <legend>Demandeur</legend>
            <div class="mb-3">
              <label  class="form-label">Nom & Prenom(s)</label>
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
            <legend>Demande</legend>

            <div class="mb-3">
                <label class="form-label"> Objet de la demande</label>
                <input type="text" class="form-control" name="TxtObjet" id="TxtObjet" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Description</label>
                <textarea type="text" class="form-control" name="TxtMotif" id="TxtMotif" cols="30"
                    placeholder=""></textarea>
            </div>

            <div class="mb-3">
                <input id="TxtVerif" type="hidden" >
            </div>

            <div class="mb-3">
                <input id="TxtID" type="hidden" >
            </div>

        </fieldset>


        <div class="alert alert-dark" role="alert" id="DivNoteFormulaire">   </div>

    </div>

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