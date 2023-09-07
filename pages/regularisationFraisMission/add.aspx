
<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input type="text" id="TxtNom" disabled class="  form-control" value="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Matricule</label>
        <input type="text" id="TxtMatricule" disabled class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="text" id="TxtEmail" disabled class="  form-control" name="" placeholder="" />
      </div>

    </fieldset>
    
    <fieldset class="form-elts">
      <legend>REGULATION DE LA MISSION</legend>

      <h4>CERTIFICATION DE LA MISSION</h4></br>

      <div class="mb-3">
        <label  class="form-label"> Mission :</label>
        <select id="cmbMission" name="cmbMission" class="form-control"">
          <option value="0" data-color="#000">Choisir la mission</option>
        </select>
        <input id="TxtMissionColeur" value="" type="hidden" >
        <input id="TxtMissionText" value="" type="hidden" >
      </div></br>

      <div class="mb-3">
        <input id="TxtMission" class="form-control" type="text" style="display: none;" disabled>
      </div>

      <input type="radio" name="Etat" value="Mission effectuee" id="RadSucces" checked="checked">
      <label for="RadSucces">Mission effectu&eacute;e</label> &nbsp;&nbsp;&nbsp;
      <input type="radio" name="Etat" value="Mission non effectuee" id="RadEchec">
      <label for="RadEchec">Mission non effectuee</label><br><br>

      <h4>REMBOURSEMENT DES FRAIS COMPLEMENTAIRES</h4></br>
      <!--<table>
        <tr>
          <td>
            <label for="">Avance N:</label>
          </td>
          <td>
            <input type="text" id="AvanceNumero">
          </td>
          <td>
            <label for=""> du :</label>
          </td>
          <td>
            <input type="date" id="AvanceDu">
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Libellé</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
        </tr>
        <tr>
          <td><label for="">Hotel/Nuits</label></td>
          <td><input type="date" id="DateDebutHotel"></td>
          <td><input type="date" id="DateFinHotel"></td>
          <td><input type="number" id="NombreHotel"></td>
          <td><input type="number" id="ForfaitHotel"></td>
          <td><input type="number" id="TotalHotel"></td>


        </tr>
        <tr>
          <td><label for="">Repas/Jours</label></td>
          <td><input type="date" id="DateDebutRepas"></td>
          <td><input type="date" id="DateFinRepas"></td>
          <td><input type="number" id="NombreRepas"></td>
          <td><input type="number" id="ForfaitRepas"></td>
          <td><input type="number" id="TotalRepas"></td>

        </tr>
        <tr>
          <td><label for="">Frais de transport</label></td>
          <td><input type="date" id="DateDebutFraisTransport"></td>
          <td><input type="date" id="DateFinFraisTransport"></td>
          <td><input type="number" id="NombreFraisTransport"></td>
          <td><input type="number" id="ForfaitFraisTransport"></td>
          <td><input type="number" id="TotalFraisTransport"></td>

        </tr>
        <tr>
          <td><label for="">Autre frais a justifier</label></td>
          <td><input type="date" id="DateDebutAutreFrais"></td>
          <td><input type="date" id="DateFinAutreFrais"></td>
          <td><input type="number" id="NombreAutreFrais"></td>
          <td><input type="number" id="ForfaitAutreFrais"></td>
          <td><input type="number" id="TotalAutreFrais"></td>

        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Total :</label></td>
          <td><input type="number" id="Total"></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Total des frais perçus (F CFA):</label></td>
          <td><input type="number" id="TotalFraisPercus"></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Solde à reverser à la caisse (F CFA) :</label></td>
          <td><input type="number" id="SoldeReverserCaisse"></td>
        </tr>

      </table>-->
      
      <table id="TableFraisMission">
        <tr>
          <th>Libelle</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
        </tr>
        <tr>
          <!--<td><select id="CmbPerdieme" name="CmbPerdieme"><option>Hotel</option></select></td>-->
          <td><input type="text" id="Txtlibelle" name="Txtlibelle" placeholder="Libelle"></td>
          <td><input type="date" id="DateDebut" name="DateDebut"></td>
          <td><input type="date" id="DateFin" name="DateFin"></td>
          <td><input type="number" id="TxtNombre" name="TxtNombre" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtForfait" name="TxtForfait" oninput="calculTotal()"></td>
          <td><input type="number" id="TxtTotal" name="TxtTotal" readonly></td>
          <!--<td><input type="button" onclick="supprimerLigne(this)" value="Supprimer"></td>-->

        </tr>
      </table>
      <div class="input-optn mt-3">
        <input type="button" onclick="ajouterLigne()" value="Ajouter une nouvelle ligne">
      </div>

      <div class="mb-3">
        <input id="TxtMissionID" type="hidden">
      </div>

    </fieldset>

  </div>

  <div class="input-optn mt-3">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appRegularisationFraisMission", 'appRegularisationFraisMission', "controller/RegularisationFraisMission/add.js");
</script>