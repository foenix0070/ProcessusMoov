<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<div class="row mt-4">

    <div class="col-12">
      <div class="head-titre">
        <h2>
          Mes taches
        </h2>
      </div>

      <div class="col-12 mt-5">
        <div class="progress-container">
          <div class="steps">
            <!-- <div class="step active">Toutes mes demandes</div> -->
            <div class="step active" data-target="DivTacheTableShow">En cours</div>
            <div class="step" data-target="DivTacheEffectuerTableShow">Effectu&eacute;es</div>
          </div>

        </div>

        <div class="content" id="DivTacheTableShow">
          <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
            <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
          </div>
        </div>

        <div class="content" id="DivTacheEffectuerTableShow" style="display: none;">
            <div style="padding: 10px 0 10px 2px;" class="w3-panel w3-pale-yellow w3-border">
              <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
            </div>
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
            <th>R&eacute;f&eacute;rence</th>
            <th>Demandeur</th>
            <th>Intitul&eacute</th>
            <th>Date de reception </th>
            <th>Date de creation </th>
          </tr>
        </thead>
        <tbody>
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
  </script>

<script type="text/javascript">
    appHelper.loadJSWithNameSpace("TacheTools", 'TacheTools', "controller/tache.js");

    document.addEventListener('DOMContentLoaded', function () {
        loadMainSideBarMenu();
        appHelper.listenNavigationLink2('linkMainNavigation2');
        appHelper.listenNavigationLink('linkMainNavigation');
    });
</script>