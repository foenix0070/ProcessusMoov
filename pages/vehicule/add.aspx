<form action="" method="" class="form" id="form">
    <div class="elts">

        <fieldset class="form-elts">
            <legend>Demande</legend>

            <div class="mb-3">
                <label class="form-label"> Objet de la demande</label>
                <input type="text" class="form-control" name="TxtObjet" id="TxtObjet" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Nature de la demande</label>
                <input type="text" class="form-control" name="TxtObjet" id="TxtNature" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label">Nombre de Jours</label>
                <input type="number" id="TxtNbreJour" class="numeric form-control" name="TxtNbreJour" placeholder="" />
            </div>


            <div class="mb-3">
                <label class="form-label"> Date de depart souhait&eacute;</label>
                <input type="date" name="TxtDateDepart" class="date form-control" id="TxtDateDepart" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Description</label>
                <textarea type="text" class="form-control" name="TxtMotif" id="TxtMotif" cols="30"
                    placeholder=""></textarea>
            </div>

        </fieldset>



    </div>

    <div class="input-optn mt-3">
        <button class="Submit" id="BtnSave" type="button"> Valider </button>
    </div>
</form>
<script src="http://ci08vmmitest/tools1/controller/Vehicule/add.js"></script>

<!--<script type="text/javascript">
    appHelper.loadJSWithNameSpace("appVehicule", 'appVehicule', "controller/Vehicule/add.js");
</script>-->