<form action="" method="" class="form" id="form">
    <div class="elts">

        <fieldset class="form-elts">
            <legend>Demande</legend>

            <div class="mb-3">
                <label  class="form-label"> Materiel</label>
                <input type="text" class="form-control" name="TxtMateriel"  id="TxtMateriel"  placeholder="ex: Ordinateur portable" />
            </div>

            <div class="mb-3">
                <label  class="form-label">  Quantité</label>
                <input type="text" class="form-control" name="TxtQuantite"  id="TxtQuantite"  placeholder="" />
            </div>

            <div class="mb-3">
                <label  class="form-label">  Description</label>
                <textarea type="text" class="form-control" name="TxtMotif"  id="TxtMotif" cols="30"  placeholder=""></textarea>
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
    appHelper.loadJSWithNameSpace("appMarteriel", 'appMarteriel', "controller/marteriel/add.js");
</script>