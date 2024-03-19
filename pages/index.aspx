
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<div class="popup" id="popup"
  style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #f9f9f9; border: 1px solid #ccc; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); z-index: 9999;">
  <h2>Information</h2>
  <p>Veillez contacter votre administrateur afin qu'il termine votre configuration</p>
</div>


<div class="row mt-4" id="section">

  <div class="col-12" style="display: none;" id="divListTaches">
    <div class="head-titre">
      <h2>
        Mes tâches à faire
      </h2>
    </div>
    <!-- <Table /> -->
    <div id="DivTacheTableShow">
      <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
        <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
      </div>
    </div>
  </div>

  <div class="col-12 mt-3">
    <div class="head-titre">
      <h2>
        Mes demandes
      </h2>
    </div>
  </div>
  <div class="col-8 mt-3">
    <button class="btn btn-secondary">
      <a href="/tools/pages/demande.aspx" class="linkMainNavigation" data-url="tools/pages/demande.aspx"
        data-target="DivMainPageContainer" style="text-decoration: none; color: white;">
        Voir la liste de mes demandes
      </a>
    </button>
    <div class="sect-bn" id="reprise" style="display: none;"><button
        class="btn btn-warning btn-sm linkOffCanvasNavigation" data-url="/tools/pages/reprise/add.aspx"
        data-target="ffcMainFormContainer" data-bs-toggle="offcanvas" data-info="reprise"
        data-bs-target="#ffcMainForm">Reprise</button></div>

  </div>
  <div class="col-4 mt-4 text-right" id="accSideMainMenuItem">

  </div>
  <div class="col-12 mt-5">
    <div class="content">
      <div id="DivDemandeENTTableShow">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 mt-5" style="display: none;">
    <div class="content">
      <div id="DivRepriseTable">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 mt-5" style="display: none;">
    <div class="content">
      <div id="DivDemandeVTableShow">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 mt-5" style="display: none;">
    <div class="content">
      <div id="DivDemandeETableShow">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
    </div>
  </div>

</div>

</div>


<script id="tmpl_table_tache" type="x-tmpl-mustache">
  <div class="table-container" id="liena">
    <table class="table table-responsive table-striped" style="border:0px;">
      <thead style="border-bottom:1px solid rgba(255,255,255,0.7);">
        <tr>
          <th>N*</th>
          <th>R&eacute;f&eacute;rence</th>
          <th>Demandeur</th>
          <th>Intitul&eacute</th>
          <th>Date de r&eacute;ception </th>
          <th>Date de cr&eacute;ation </th>
        </tr>
      </thead>
      <tbody style="border-bottom:1px solid #b4a7a7;">
        {{#taches}}
        <tr class="">
          <td>{{i}}</td>
          <td>{{reference}}</td>
          <td>{{author}}</td>
          <td><a href="#" class=" linkMainNavigation2" data-target="DivMainPageContainer"   data-url="{{url}}">{{title}}</b></td>
          <td>{{startdate}}</td>
          <td>{{requestdate}}</td>

        </tr>
        {{/taches}}
      </tbody>
    </table>
  </div>
</script>

<script id="tmpl_table_demande_encours" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>Cr&eacute;ateur</th>
          <th>Date</th>
          <th>Type</th>
          <th>Demande</th>
          <th>Etat</th>
          <th>Demandeur</th>
        </tr>
      </thead>
      <tbody>
        {{#demandesEn}}
        <tr class="" >
          <td>{{create}}</td>
          <td>{{requestdate}}</td>
          <th>{{nomdemande}}</th>
          <td><a href="tools/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
          <td>{{demandeur}}</td>
        </tr>
        {{/demandesEn}}
      </tbody>
    </table>
  </div>
</script>

<script id="tmpl_table_demande_val" type="x-tmpl-mustache">
  <div class="table-container">
    <table class="table table-bordered table-responsive table-striped">
      <thead>
        <tr>
          <th>Cr&eacute;ateur</th>
          <th>Date</th>
          <th>Type</th>
          <th>Demande</th>
          <th>Etat</th>
          <th>Demandeur</th>
        </tr>
      </thead>
      <tbody>
        {{#demandesVal}}
        <tr class="" >
          <td>{{create}}</td>
          <td>{{requestdate}}</td>
          <th>{{nomdemande}}</th>
          <td><a href="tools/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
          <td>{{demandeur}}</td>
        </tr>
        {{/demandesVal}}
      </tbody>
    </table>
  </div>
</script>

<script id="tmpl_table_demande_enattente" type="x-tmpl-mustache">
  <div class="table-container" id="liena2">
    <table class="table table-responsive table-striped" style="border:0px;">
      <thead style="border-bottom:1px solid rgba(255,255,255,0.7);">
        <tr>
          <th>R&eacute;f&eacute;rence</th>
          <th>Cr&eacute;ateur</th>
          <th>Date</th>
          <th>Type</th>
          <th>Demande</th>
          <th>Etat</th>
          <th>Demandeur</th>
        </tr>
      </thead>
      <tbody style="border-bottom:1px solid #b4a7a7;">
        {{#demandesEnt}}
        <tr class="" >
          <td>{{reference}}</td>
          <td>{{create}}</td>
          <td>{{requestdate}}</td>
          <th>DEMANDE DE {{create}} POUR {{nomdemande}}</th>
          <td><a href="tools/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
          <td><span class="{{classe}}">{{status}}</span></td>
          <td>{{demandeur}}</td>
        </tr>
        {{/demandesEnt}}
      </tbody>
    </table>
  </div>
</script>

<script id="tmpl_side_main_menu_item" type="x-tmpl-mustache">
  {{#menus}}
          <div class="dropdown" id="menudrop">
              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Effectuer une demande
              </button>
              <div class="dropdown-menu dropdown-menu-light" style="background-color: #f8f9fa; border: 1px solid #ced4da; height: 300px ; overflow: auto; ">
                <ul>
                  {{#arrsmenu}}

                  <li style="margin: 0px; border-bottom: 1px solid black; padding:5px; background-color:#f8f9fa; color:#212529; ">

                      {{#offcanvas}}

                    <a href="{{url}}" id="{{id}}" class=" aNavigationLinkDdwn" data-url="{{url}}"
                       data-target="{{target}}" data-info="{{dataInfo}}"
                       data-menu-id="{{title}}"  data-bs-toggle="offcanvas"
                       data-bs-target="#ffcMainForm" aria-controls="ffcMainForm" >
                      {{title}}
                    </a>

                      {{/offcanvas}}

                      {{#link}}

                      <a href="{{url}}"
                      data-url="{{url}}"
                      class="linkMainNavigation aNavigationLinkDdwn"
                      data-target="{{target}}" data-info="{{dataInfo}}"
                      data-menu-id="{{title}}" id="{{id}}">
                      {{title}}
                    </a>

                      {{/link}}

                </li>

                {{/arrsmenu}}

              </ul>
              </div>
          </div>
  {{/menus}}
</script>

<script id="tmpl_table_demande" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <!--<th>N*</th>-->
            <th>Cr&eacute;ateur</th>
            <th>Date</th>
            <th>Type</th>
            <th>Demande</th>
            <th>Etat</th>
            <th>Demandeur</th>
          </tr>
        </thead>
        <tbody>
          {{#demandes}}
          <tr class="" >
            <!--<td>{{id}}</td>-->
            <td>{{create}}</td>
            <td>{{requestdate}}</td>
            <th>{{nomdemande}}</th>
            <td><a href="pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
            <td>{{demandeur}}</td>
          </tr>
          {{/demandes}}
        </tbody>
      </table>
    </div>
</script>

<!--<script id="tmpl_table_reprise" type="x-tmpl-mustache">
  <div class="table-container">
    <div class="offcanvas offcanvas-top" id="myOffcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Reprise de Service</h5>
      </div>
      <div class="offcanvas-body">
        {{#reprise}}
          <p>Votre de {{create}} de {{title}} de {{create}} nombre de jour à compter du {{create}} au {{create}} a été terminé. <p/>
            <p>Effectuer votr reprise en cliquant sur Reprise. <p/>
          {{/reprise}}
      </div>
    </div>
  </div>
</script>-->

<script id="tmpl_table_reprise" type="x-tmpl-mustache">
  <div class="table-container">
        {{#reprise}}
          <p>Votre {{typerep}} de {{title}} de {{nombre}} jour(s) a débuté le {{startdate}} et pris fin le {{reprisedate}} avec pour intérim {{interim}}. <p/>
          <p>Effectuer votre reprise en cliquant sur le bouton <b>Reprise</b>. <p/>
          <div><button class="btn btn-primary">Reprise</button></div>
        {{/reprise}}
  </div>
</script>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("MoovTools", 'MoovTools', "controller/index.js");
</script>