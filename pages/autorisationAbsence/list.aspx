<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<div class="col-12">
  <div class="head-titre">
    <h2 id="h2Titre">
     Liste des demandes
    </h2>
  </div>

<!-- <Table /> -->
<div id="DivAbsenceTableShow">
  <div style="padding: 10px 0 10px 2px;"
      class="w3-panel w3-pale-yellow w3-border">
      <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
  </div>
</div>
</div>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("ListAbsence", 'ListAbsence', "controller/absence/list.js");
</script>

<script id="tmpl_table_absence" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>N*</th>
          <th>Date de départ</th>
          <th>Nombre de jours</th>
          <th>Intitulé</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {{#absences}}
        <tr class="" >
          <td>{{id}}</td>
          <td>{{startdate}}</td>
          <td>{{nbre}}</td>
          <td><a href="/tools/pages/autorisationAbsence/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="tools/pages/autorisationAbsence/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
        </tr>
        {{/absences}}
      </tbody>
    </table>
  </div>
</script>
