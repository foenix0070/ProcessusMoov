var appRegularisationFraisMission = appRegularisationFraisMission || {};
var clientContext;
appRegularisationFraisMission.clientContext;

appRegularisationFraisMission.InitializePage = function () {
    appRegularisationFraisMission.clientContext = SP.ClientContext.get_current();
    clientContext = SP.ClientContext.get_current();


    appSpHelper.GetMyProperties(function () {

        document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
        document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
        document.getElementById("TxtEmail").value = App.CurrentUser.Email;
    });


    const BtnSave = document.querySelector("#BtnSave");


    BtnSave.addEventListener("click", function () {
        appMission.Add(function () {
            location.reload();
        });
    });

};


function afficher() {
    var selectValue = document.getElementById("CmbCaisse").value;

    var inputMasque = document.getElementById("AutreCaisse");

    if (selectValue === "Autre") {
        //alert("OK");
        inputMasque.style.display = "block";
    } else {
        inputMasque.style.display = "none";
    }
}

function ajouterLigne() {
    var table = document.getElementById("TableFraisMission");
    var newRow = table.insertRow(table.rows.length);

    //var cell = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);
    var cell5 = newRow.insertCell(5);
    var cell6 = newRow.insertCell(6);

    //cell.innerHTML = '<select class="mt-3" id="CmbPerdieme" name"CmbPerdieme"><option value"Hotel">Hotel</option></select>';
    cell1.innerHTML = '<input type="date" id="DateDebut" name="DateDebut">';
    cell2.innerHTML = '<input type="date" id="DateFin" name="DateFin">';
    cell3.innerHTML = '<input type="text" id="TxtNombre" name="TxtNombre">';
    cell4.innerHTML = '<input type="text" id="TxtForfait" name="TxtForfait">';
    cell5.innerHTML = '<input type="text" id="TxtTotal" name="TxtTotal">';
    cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
}

function supprimerLigne(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
}

AddRFM();

function AddRFM() {
    var table = document.getElementById("TableFraisMission");
    var data = [];

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cells = row.getElementsByTagName('td');
        var rowData = {};

        for (var j = 0; j < cells.length; j++) {
            var input = cells[j].getElementsByTagName('input')[0];
            var name = input.getAttribute('name');
            var value = input.value;
            rowData[name] = value;
        }

        data.push(rowData);
    }

    Add(data);
}

function Add(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];

        let oList = appRegularisationFraisMission.clientContext
            .get_web()
            .get_lists()
            .getByTitle(appHelper.ListName.RegularisationFraisMission);
        let itemCreateInfo = new window.SP.ListItemCreationInformation();
        let oListItem = oList.addItem(itemCreateInfo);

        let startDate = new Date();

        let repDate = new Date();


        oListItem.set_item("DateDebut", startDate);
        oListItem.set_item("DateFin", repDate);

        oListItem.set_item(
            "Forfait", item.TxtForfait);

        oListItem.set_item(
            "Libelle", item.TxtLibelle);

        oListItem.set_item(
            "Total", item.TxtTotal);

        oListItem.set_item(
            "Nombre", item.TxtNombre);

        oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


        oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

        oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
        oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

        oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
        oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

        oListItem.update();
        clientContext.load(oListItem);
        clientContext.executeQueryAsync(function () {

            const appUrl = '/pages/regularisationFraisMission/show.aspx?ID=' + oListItem.get_id();
            let WF = new WFManager(appHelper.AppCode.REGULARISATIONFRAISMISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
            WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONFRAISMISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })
            if (callBack) {
                callBack(oListItem);
            }
        }, appSpHelper.writeError);

    }
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appRegularisationFraisMission.InitializePage);
