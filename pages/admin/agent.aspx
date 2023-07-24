<div class="col-12">
  <div class="head-titre">
    <h2>
      Gestion des utilisateurs
    </h2>
  </div>


  <div id="DivListUser">

  </div>


</div>

<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appAdminUser", 'appAdminUser', "controller/admin/agent.js");
</script>


<script id="tmpl_list_employee" type="x-tmpl-mustache">

  <table id="tab_user" class="table table-bordered table-responsive table-striped">
    <thead>
    <tr>
      <th>Matricule</th>
      <th>Login</th>
      <th>Noms</th>
      <th>Email</th>
      <th>#</th>
    </tr>
  </thead>
  <tbody>

    {{#emp}}
    <tr class="rang">
      <td>{{matricule}}</td>
      <td>{{login}}</td>
      <td>{{nom}}</td>
      <td>{{email}}</td>
      <td>
        <span href="{{url}}" id="D_{{id}}" >
        <i class="fa fa-pencil linkOffCanvasNavigationUser" aria-hidden="true"  data-url="{{url}}" data-target="ffcMainFormContainer"   data-bs-toggle="offcanvas"
        data-bs-target="#ffcMainForm" aria-controls="ffcMainForm"></i>
      </span>
      </td>
    </tr>
    {{/emp}}
  </tbody>

  </table>

</script>