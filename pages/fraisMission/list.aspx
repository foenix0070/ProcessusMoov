
<div class="col-12">
  <div class="head-titre">
    <h2 id="h2Titre">
     Listes des demandes
    </h2>
  </div>

<!-- <Table /> -->
<div id="DivMissionTableShow">
  <div style="padding: 10px 0 10px 2px;"
      class="w3-panel w3-pale-yellow w3-border">
      <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
  </div>
</div>
</div>




<script id="tmpl_table_Mission" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>Intitul&eacute</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Destination/th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {{#mission}}
        <tr class="" >
          <td>{{title}}</td>
          <td>{{startdate}}</td>
          <td>{{enddate}}</td>
          <td>{{destination}}</td>
          <td><a href="http://ci08vmmitest/tools1/pages/fraisMission/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="http://ci08vmmitest/tools1/pages/fraisMission/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
        </tr>
        {{/mission}}
      </tbody>
    </table>
  </div>
</script>

<script type="text/javascript">
  appHelper.loadJSWithNameSpace("ListMission", 'ListMission', "controller/FraisMission/list.js");
</script>
