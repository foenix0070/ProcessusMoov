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
            <legend>Demande</legend>

            <div class="mb-3">
                <label class="form-label"> Gadget</label>
                <input type="text" class="form-control" name="TxtArticle" id="TxtArticle"
                    placeholder="ex: Ordinateur portable" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Quantité</label>
                <input type="number" class="form-control" name="TxtQuantite" id="TxtQuantite" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Description</label>
                <textarea type="text" class="form-control" name="TxtMotif" id="TxtMotif" cols="30"
                    placeholder=""></textarea>
            </div>

            <!--<label style="display: block;">
                Materiel
                <input type="text" name="TxtArticle" placeholder="ex: Ordinateur portable" id="TxtArticle">
            </label>
            <div class="form-elts__block" style="display: block;">
                <label style="display: inline-block;">
                    Quantit&eacute;
                    <input type="number" name="TxtQuantite" placeholder="" id="TxtQuantite">
                </label>


            </div>
            <div class="form-elts__block" style="display: block;">

                <label>
                    Description
                    <textarea name="TxtMotif" style="width: 100%;" id="TxtMotif" cols="30" rows="10"></textarea>
                </label>

            </div>-->


        </fieldset>



    </div>

    <div class="input-optn">
        <button class="Submit" id="BtnSave" type="button"> Valider </button>
    </div>
</form>



<script type="text/javascript">
    appHelper.loadJSWithNameSpace("appGadget", 'appGadget', "controller/Gadget/add.js");
</script>