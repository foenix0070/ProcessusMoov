
<div class="col-12">
  <div class="head-titre">
    <h2 id="h2Titre">
     Listes des demandes
    </h2>
  </div>

<!-- <Table /> -->
<div id="DivCongeTableShow">
  <div style="padding: 10px 0 10px 2px;"
      class="w3-panel w3-pale-yellow w3-border">
      <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
  </div>
</div>
</div>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("ListConge", 'ListConge', "controller/conge/list.js");
</script>

<script id="tmpl_table_conge" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>N*</th>
          <th>Intitul&eacute</th>
          <th>Date de d&eacutepart</th>
          <th>Nombre de jours</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {{#conges}}
        <tr class="" >
          <td>{{id}}</td>
          <td>{{title}}</td>
          <td>{{startdate}}</td>
          <td>{{nbre}}</td>
          <td><a href="http://ci08vmmitest/tools1/pages/conge/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="http://ci08vmmitest/tools1/pages/conge/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
        </tr>
        {{/conges}}
      </tbody>
    </table>
  </div>
</script>
