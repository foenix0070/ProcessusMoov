
<div class="col-12">
  <div class="head-titre">
    <h2 id="h2Titre">
     Liste des demandes
    </h2>
  </div>

<!-- <Table /> -->
<div id="DivVehiculeTableShow">
  <div style="padding: 10px 0 10px 2px;"
      class="w3-panel w3-pale-yellow w3-border">
      <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
  </div>
</div>
</div>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("ListVehicule", 'ListVehicule', "controller/Vehicule/list.js");
</script>

<script id="tmpl_table_Vehicule" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>N*</th>
          <th>Date</th>
          <th>Motif</th>
          <th>Titre</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {{#vehicule}}
        <tr class="" >
          <td>{{id}}</td>
          <td>{{startdate}}</td>
          <td>{{motif}}</td>
          <td><a href="tools/pages/vehicule/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="tools/pages/vehicule/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
        </tr>
        {{/vehicule}}
      </tbody>
    </table>
  </div>
</script>
