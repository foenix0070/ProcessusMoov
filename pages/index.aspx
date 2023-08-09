<!--<div class="popup" style="position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); background-color: #FFA500; border: 1px solid #ccc; padding: 20px; box-shadow: 0 4px 8px rgb(255, 255, 255); z-index: 9999;">
  <h2><b>ATTENTION!</b></h2>
  <p style="color: #fff"><b>L'ajout de nouveaux processus sont en cours et cela pourrait créer quelques perturbations sur la plateforme. Veillez-nous excuser !</b></p>
</div>-->

<div class="popup" id="popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #f9f9f9; border: 1px solid #ccc; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 9999;">
  <h2>Information</h2>
  <p>Veillez contacter votre administrateur afin qu'il termine votre configuration</p>
</div>


<div class="row mt-4" id="section">

  <div class="col-7">
    <div class="head-titre">
      <h2>
       Listes des demandes
      </h2>
    </div>
      <!-- <Table /> -->
      <div id="DivDemandeTableShow">
          <div style="padding: 10px 0 10px 2px;"
              class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
          </div>
      </div>
      <!--<div id="DivCongeTableShow">
        <div style="padding: 10px 0 10px 2px;"
            class="w3-panel w3-pale-yellow w3-border">
            <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
    </div>-->
  </div>

  <div class="col-5">
    <div class="head-titre">
      <h2>
       Listes des taches
      </h2>
    </div>
      <!-- <Table /> -->
      <div id="DivTacheTableShow">
          <div style="padding: 10px 0 10px 2px;"
              class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
          </div>
      </div>
  </div>

</div>



<script id="tmpl_table_tache" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>N*</th>
          <th>Intitul&eacute</th>
          <th>Date pr&eacutevue </th>
        </tr>
      </thead>
      <tbody>
        {{#taches}}
        <tr class="">
          <td>{{id}}</td>
          <td><a href="#" class=" linkMainNavigation2" data-target="DivMainPageContainer"   data-url="{{url}}">{{title}}</b></td>
          <td>{{startdate}}</td>
        </tr>
        {{/taches}}
      </tbody>
    </table>
  </div>
</script>


  <script id="tmpl_table_conge" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>N*</th>
            <th></th>
            <th>Intitul&eacute</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {{#conges}}
          <tr class="" >
            <td>{{id}}</td>
            <th>CONGE</th>
            <td><a href="tools1/pages/conge/show.aspx?id={{id}}"  class="linkMainNavigation" data-url="tools1/pages/conge/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
          </tr>
          {{/conges}}
        </tbody>
      </table>
    </div>
  </script>

  <script id="tmpl_table_demande" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>N*</th>
            <th></th>
            <th>Intitul&eacute</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {{#demandes}}
          <tr class="" >
            <td>{{id}}</td>
            <th>{{nomdemande}}</th>
            <td><a href="tools1/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools1/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
          </tr>
          {{/demandes}}
        </tbody>
      </table>
    </div>
  </script>


<script type="text/javascript">
    appHelper.loadJSWithNameSpace("MoovTools", 'MoovTools', "controller/index.js");
</script>
