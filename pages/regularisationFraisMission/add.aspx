
<form action="" method="" class="form" id="form">
  <div class="elts">

    <fieldset class="form-elts">
      <legend>Demandeur</legend>
      <div class="mb-3">
        <label class="form-label">Nom & Prenoms</label>
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

      <h4>CERTIFICATION DE LA MISSION</h4>

      <input type="radio" name="success" value="Succes" id="RadSucces">
      <label for="RadSucces">La mission a été effectuée</label><br>
      <input type="radio" name="echec" value="Echecs" id="RadEchecs">
      <label for="RadEchecs">La mission n'a pas été effectuée</label><br>

      <h4>REMBOURSEMENT DES FRAIS COMPLEMENTAIRES</h4>
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
          <td><input type="text" id="ForfaitHotel"></td>
          <td><input type="text" id="TotalHotel"></td>


        </tr>
        <tr>
          <td><label for="">Repas/Jours</label></td>
          <td><input type="date" id="DateDebutRepas"></td>
          <td><input type="date" id="DateFinRepas"></td>
          <td><input type="number" id="NombreRepas"></td>
          <td><input type="text" id="ForfaitRepas"></td>
          <td><input type="text" id="TotalRepas"></td>

        </tr>
        <tr>
          <td><label for="">Frais de transport</label></td>
          <td><input type="date" id="DateDebutFraisTransport"></td>
          <td><input type="date" id="DateFinFraisTransport"></td>
          <td><input type="number" id="NombreFraisTransport"></td>
          <td><input type="text" id="ForfaitFraisTransport"></td>
          <td><input type="text" id="TotalFraisTransport"></td>

        </tr>
        <tr>
          <td><label for="">Autre frais a justifier</label></td>
          <td><input type="date" id="DateDebutAutreFrais"></td>
          <td><input type="date" id="DateFinAutreFrais"></td>
          <td><input type="number" id="NombreAutreFrais"></td>
          <td><input type="text" id="ForfaitAutreFrais"></td>
          <td><input type="text" id="TotalAutreFrais"></td>

        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Total :</label></td>
          <td><input type="text" id="Total"></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Total des frais perçus (F CFA):</label></td>
          <td><input type="text" id="TotalFraisPercus"></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><label for="">Solde à reverser à la caisse (F CFA) :</label></td>
          <td><input type="text" id="SoldeReverserCaisse"></td>
        </tr>

      </table>-->
      
      <table id="TableFraisMission">
        <tr>
          <th>Libelle</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        <tr>
          <!--<td><select id="CmbPerdieme" name="CmbPerdieme"><option>Hotel</option></select></td>-->
          <td><input type="text" id="Txtlibelle" name="Txtlibelle" placeholder="Libelle"></td>
          <td><input type="date" id="DateDebut" name="DateDebut"></td>
          <td><input type="date" id="DateFin" name="DateFin"></td>
          <td><input type="text" id="TxtNombre" name="TxtNombre"></td>
          <td><input type="text" id="TxtForfait" name="TxtForfait"></td>
          <td><input type="text" id="TxtTotal" name="TxtTotal"></td>
          <td><input type="button" onclick="supprimerLigne(this)" value="Supprimer"></td>

        </tr>
      </table>
      <div class="input-optn mt-3">
        <input type="button" onclick="ajouterLigne()" value="Ajouter une nouvelle ligne">
      </div>

    </fieldset>

  </div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appRegularisationFraisMission", 'appRegularisationFraisMission', "controller/regularisationFraisMission/add.js");
</script>