<div class="row mt-4">

  <div class="col-12">
    <div class="head-titre">
      <h2>
        Mes demandes
      </h2>
    </div>

    <div class="col-12 mt-5">
      <div class="progress-container">
        <div class="steps">
          <!-- <div class="step active">Toutes mes demandes</div> -->
          <div class="step active" data-action="A" data-target="DivDemandeENTTableShow">En attente</div>
          <div class="step" data-action="E" data-target="DivDemandeETableShow">En cours</div>
          <div class="step" data-action="M" data-target="DivDemandeMTableShow">A modifier</div>
          <div class="step" data-action="V" data-target="DivDemandeVTableShow">Approuv&eacute;es</div>
          <div class="step" data-action="R" data-target="DivDemandeRTableShow">R&eacute;jet&eacute;es</div>
        </div>

      </div>

      <div class="content" id="DivDemandeENTTableShow">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>

      <div class="content" id="DivDemandeETableShow" style="display: none;">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
      <div class="content" id="DivDemandeMTableShow" style="display: none;">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
      <div class="content" id="DivDemandeVTableShow" style="display: none;">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
      <div class="content" id="DivDemandeRTableShow" style="display: none;">
        <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
          <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
        </div>
      </div>
    </div>
  </div>

</div>



<!-- <script id="tmpl_table_demande" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>N*</th>
            <th>Createur</th>
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
            <td>{{id}}</td>
            <td>{{create}}</td>
            <td>{{requestdate}}</td>
            <th>{{nomdemande}}</th>
            <td><a href="tools1/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools1/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
            <td>{{demandeur}}</td>
          </tr>
          {{/demandes}}
        </tbody>
      </table>
    </div>
  </script> -->

<script id="tmpl_table_demande" type="x-tmpl-mustache">
    <div class="table-container">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Createur</th>
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
            <td>{{reference}}</td>
            <td>{{create}}</td>
            <td>{{requestdate}}</td>
            <th>DEMANDE DE {{create}} POUR {{nomdemande}}</th>
            <td><a href="tools/pages/{{repertoire}}/show.aspx?id={{id}}" class="linkMainNavigation" data-url="tools/pages/{{repertoire}}/show.aspx?id={{id}}" data-target="DivMainPageContainer">{{title}} </a></td>
            <td><span class="{{classe}}">{{status}}</span></td>
            <td>{{demandeur}}</td>
          </tr>
          {{/demandesEn}}
        </tbody>
      </table>
    </div>
  </script>

<script>
  const steps = document.querySelectorAll('.step');
  const contents = document.querySelectorAll('.content');

  // Afficher le premier div par défaut
  contents[0].style.display = 'block';

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const target = step.getAttribute('data-target');

      // Masquer tous les contenus
      contents.forEach(content => {
        content.style.display = 'none';
      });

      // Afficher le contenu cible
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.style.display = 'block';
        steps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');
      }

      
    });
  });

    /*
  const steps = document.querySelectorAll('.step');
  const contenu = document.getElementById('DivDemandeETableShow');

  steps.forEach(step => {
      step.addEventListener('click', function() {

          const target = step.getAttribute('data-target');
          
          contenu.id = `contenu-${target}`;

          steps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');
      });
  });
  */
</script>

<!--
  <script>
    const steps = document.querySelectorAll('.step');
    //const content = document.querySelector('.content');
    let contenu = document.getElementById("contenu");
  
    steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
  
        loadStepContent(index);
      });
    });
  
    function loadStepContent(stepIndex) {
      let stepContent = '';
  
      switch (stepIndex) {
        case 0:
          stepContent += `<div id="DivDemandeETableShow">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
          </div>`;
          break;
        case 1:
          stepContent +=  `<div id="DivDemandeMTableShow">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
          </div>`;
          break;
        case 2:
          stepContent +=  `<div id="DivDemandeVTableShow">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
          </div>`;
          break;
        case 3:
          stepContent +=  `<div id="DivDemandeVTableShow">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
          </div>`;
          break;
        default:
          stepContent +=  `<div id="DivDemandeETableShow">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
          </div>`;
      }
  
  
      contenu.innerHTML = stepContent;
    }
  </script>
  -->


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("DemandeTools", 'DemandeTools', "controller/demande.js");

  document.addEventListener('DOMContentLoaded', function () {
    loadMainSideBarMenu();
    appHelper.listenNavigationLink2('linkMainNavigation2');
    appHelper.listenNavigationLink('linkMainNavigation');
  });
</script>