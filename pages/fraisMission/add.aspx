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
      <legend>INTERIMAIRE</legend>

      <div class="mb-3">
        <label  class="form-label"> Interimaire</label>
        <div id="plePickerInterimaireDiv" ></div>
      </div>

      <div class="mb-3">
        <label  class="form-label"> Nom</label>
        <input type="text" class="form-control"  id="TxtIntName" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label"> Matricule</label>
        <input type="text" class="form-control" id="TxtIntMatricule" placeholder="" />
      </div>

      <div class="mb-3">
        <label  class="form-label"> Email</label>
        <input type="text" class="form-control" id="TxtIntEmail" placeholder="" />
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>MISSION</legend>


      <div class="mb-3">
        <label class="form-label"> Période du :</label>
        <input type="date" id="DateDebut">

        <label class="form-label"> Au:</label>
        <input type="date" id="DateFin">
      </div>

      <div class="mb-3">
        <label  class="form-label"> Zone géographique</label>
        <select id="cmbZoneGeo" name="cmbZoneGeo" class="form-control">
          <option value="0" data-color="#000">Choisir la zone geographique</option>
        </select>
        <input id="TxtZoneGeoColeur" value="" type="hidden" >
        <input id="TxtZoneGeoText" value="" type="hidden" >
      </div>
      <div class="mb-3">
        <label class="form-label">Motif :</label>
        <input type="text" id="TxtMotif" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Destination :</label>
        <input type="text" id="TxtDestination" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Commentaire :</label>
        <input type="text" id="TxtCommentaire" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Site BTS :</label>
        <input type="text" id="TxtSite" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Coût Total :</label>
        <input type="number" id="TxtCoutTotal" class="  form-control">
      </div>

      <div class="mb-3">
        <label  class="form-label"> Caisse de paiement :</label>
        <select id="cmbCaisse" name="cmbCaisse" class="form-control" onchange="afficher()">
          <option value="0" data-color="#000">Choisir la Caisse de paiement</option>
        </select>
        <input id="TxtCaisseColeur" value="" type="hidden" >
        <input id="TxtCaisseText" value="" type="hidden" >
      </div>

      <div class="mb-3">

        <label class="form-label">Mode de paiement :</label>
        <select id="cmbMode" name="cmbMode" class="form-control">
          <option value="0" data-color="#000">Choisir le mode de paiement</option>
        </select>
        <input id="TxtModeColeur" value="" type="hidden" >
        <input id="TxtModeText" value="" type="hidden" >
      </div>
      <div class="mb-3" id="AutreCaisse" style="display: none;" class="form-control">
        <label class="form-label">Autre Caisse :</label>
        <input type="text" id="TxtAutreCaisse" class="  form-control">
      </div>
      <!--<div class="mb-3">
        <label class="form-label">Mode de paiement :</label>
        <select id="CmbMode">
          <option value="1">Orange Money</option>
          <option value="2">Wave</option>
          <option value="3">Virement</option>
        </select>
      </div>-->
      <!--<div class="mb-3">
        <label class="form-label">Doc Justificatifs :</label>
        <input type="text" id="TxtDoc" class="  form-control">
      </div>-->

    </fieldset>

    <fieldset class="form-elts">
      <legend>FRAIS DE MISSION</legend>
      <table id="TableFraisMission">
        <tr>
          <!--<th>Libelle</th>-->
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Nombre</th>
          <th>Forfait</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        <tr>
          <!--<td><select id="CmbPerdieme" name="CmbPerdieme"><option>Hotel</option></select></td>-->
          <!--<td><input type="text" id="Txtlibelle" name="Txtlibelle"></td>-->
          <td><input type="date" id="DateDebut" name="DateDebut"></td>
          <td><input type="date" id="DateFin" name="DateFin"></td>
          <td><input type="number" id="TxtNombre" name="TxtNombre"></td>
          <td><input type="number" id="TxtForfait" name="TxtForfait"></td>
          <td><input type="number" id="TxtTotal" name="TxtTotal"></td>
          <td><input type="button" onclick="supprimerLigne(this)" value="Supprimer"></td>

        </tr>
      </table>
      <div class="input-optn mt-3">
        <input type="button" onclick="ajouterLigne()" value="Ajouter une nouvelle ligne">
      </div>
    </fieldset>

  </div>

  <div class="input-optn mt-3">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appMission", 'appMission', "controller/FraisMission/add.js");
</script>


<!--

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
      <legend>INTERIMAIRE</legend>

      <div class="mb-3">
        <label class="form-label">Matricule :</label>
        <input type="text" id="TxtMatricule" class="  form-control" value="" placeholder="" />
      </div>
      <div class="mb-3">
        <label class="form-label"> Nom & Prenoms :</label>
        <input type="text" id="TxtNom" class="  form-control" name="" placeholder="" />
      </div>
      <div class="mb-3">
        <label class="form-label">Catégorie :</label>
        <input type="text" id="TxtCategorie" class="  form-control" name="" placeholder="" />
      </div>

      <div class="mb-3">
        <label class="form-label">Direction :</label>
        <input type="text" id="TxtDirection" class="  form-control" name="" placeholder="" />
      </div>

    </fieldset>

    <fieldset class="form-elts">
      <legend>MISSION</legend>


      <div class="mb-3">
        <label class="form-label"> P&eacute;riode du :</label>
        <input type="date" id="DateDebut">

        <label class="form-label"> Au:</label>
        <input type="date" id="DateFin">
      </div>

      <div class="mb-3 d-flex flex-row">
        <label for="CmbZone" class="form-label">Zone geographique: &nbsp;</label>

        <select id="CmbZone" name="CmbZone">
          <option value="cote d'ivoire">Cote d'Ivoire</option>
          <option value="Afrique">Afrique</option>
          <option value="hors afrique">Hors Afrique</option>
        </select>

      </div>
      <div class="mb-3">
        <label class="form-label">Motif :</label>
        <input type="text" id="TxtMotif" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Destination :</label>
        <input type="text" id="TxtDestination" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Commentaire :</label>
        <input type="text" id="TxtMotif" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Site BTS :</label>
        <input type="text" id="TxtMotif" class="  form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Caisse de paiement :</label>
        <select id="CmbCaisse" name="fruits">
          <option value="Test 1">Test 1</option>
          <option value="Test 2">Test 2</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Mode de paiement :</label>
        <select id="CmbCaisse" name="fruits">
          <option value="Test 1">Test 1</option>
          <option value="Test 2">Test 2</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      
    </fieldset>

    <fieldset class="form-elts">
      <legend>FRAIS DE MISSION</legend>
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
          <td><label for="">Total : </label></td>
          <td><input type="text" id="TotalAutreFrais"></td>

        </tr>
      </table>
    </fieldset>

  </div>

  <div class="input-optn">
    <button class="Submit" id="BtnSave" type="button"> Valider </button>
  </div>
</form>


<script type="text/javascript">
  appHelper.loadJSWithNameSpace("appFraisMission", 'appFraisMission', "controller/fraisMission/add.js");
</script>

-->