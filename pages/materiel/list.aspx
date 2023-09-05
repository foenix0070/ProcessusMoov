<div class="col-12">
  <div class="head-titre">
    <h2 id="h2Titre">
      Listes des demandes
    </h2>
  </div>

  <!-- <Table /> -->
  <div id="DivMaterielTableShow">
    <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
      <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
    </div>
  </div>
</div>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("ListMateriel", 'ListMateriel', "controller/Materiel/list.js");
</script>

<script id="tmpl_table_materiel" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>N*</th>
            <th>Intitule</th>
            <th>Date de d&eacutepart</th>
            <th>Motif</th>
            <th></th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {{#materiel}}
          <tr class="" >
            <td>{{id}}</td>
            <td>{{title}}</td>
            <td>{{startdate}}</td>
            <td>{{motif}}</td>
          <td><a href="tools1/pages/materiel/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="tools1/pages/materiel/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
          </tr>
          {{/materiel}}
        </tbody>
      </table>
    </div>
  </script>