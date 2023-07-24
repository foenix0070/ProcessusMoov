<form action="" method="" class="form" id="form">
    <div class="elts">

        <fieldset class="form-elts">
            <legend>Demande</legend>

            <div class="mb-3">
                <label class="form-label"> Article</label>
                <input type="text" class="form-control" name="TxtArticle" id="TxtArticle" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Quantité</label>
                <input type="text" class="form-control" name="TxtQuantite" id="TxtQuantite" placeholder="" />
            </div>

            <div class="mb-3">
                <label class="form-label"> Description</label>
                <textarea type="text" class="form-control" name="TxtMotif" id="TxtMotif" cols="30"
                    placeholder=""></textarea>
            </div>

        </fieldset>

    </div>

    <div class="input-optn">
        <button class="Submit" id="BtnSave" type="button"> Valider </button>
    </div>
</form>


<script type="text/javascript">
    appHelper.loadJSWithNameSpace("appGadget", 'appGadget', "controller/gadget/add.js");
</script>