<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">

      <div class="mb-3">
        <label  class="form-label">Matricule</label>
          <input type="text" id="TxtMatricule"   class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label">Nom </label>
          <input type="text" id="TxtNom"   class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label">Prenoms</label>
          <input type="text" id="TxtPrenom"   class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label">Email</label>
          <input type="text" id="TxtEmail"   class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label"> Manager</label>
        <div id="plePickerManagerDiv" ></div>
      </div>


      <div class="mb-3">
        <label  class="form-label">Solde initial de cong&eacute;s</label>
          <input type="number" id="TxtNbreJour"  class="numeric form-control" style="width:200px;" name="TxtNbreJour" placeholder="" />
      </div>

    </fieldset>


  </div>

  <div class="input-optn">
      <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>




<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appAdminUserEdit", 'appAdminUserEdit', "controller/admin/agent_edit.js");
</script>
