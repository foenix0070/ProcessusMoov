
<div class="col-12">
    <div class="head-titre">
      <h2 id="h2Titre">
       Listes des demandes
      </h2>
    </div>
  
  <!-- <Table /> -->
  <div id="DivSortieCaisseTableShow">
    <div style="padding: 10px 0 10px 2px;"
        class="w3-panel w3-pale-yellow w3-border">
        <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
    </div>
  </div>
  </div>
  
  
  <script type="text/javascript">
    appHelper.loadJSWithNameSpace("ListSortieCaisse", 'ListSortieCaisse', "controller/SortieCaisse/list.js");
  </script>
  
  <script id="tmpl_table_sortieCaisse" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>N*</th>
            <th>Objet de reglement</th>
            <th>Montant</th>
            <th>Payer &agrave</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {{#sortiecaisse}}
          <tr class="" >
            <td>{{id}}</td>
            <td>{{objetReglement}}</td>
            <td>{{montant}}</td>
            <td>{{payerA}}</td>
            <td><a href="http://ci08vmmitest/tools1/pages/SortieCaisse/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="http://ci08vmmitest/tools1/pages/SortieCaisse/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
          </tr>
          {{/sortiecaisse}}
        </tbody>
      </table>
    </div>
  </script>
  