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

        // var btnRegularisation = document.getElementById("BtnRegularisation");
        // var info = btnRegularisation.getAttribute("data-info");
        // console.log(info);

        var elementsWithDataInfo = document.querySelectorAll('[data-info]');

        elementsWithDataInfo.forEach(function (element) {
            var info = element.getAttribute('data-info');
            console.log(info);

            if (info != "regularisationFraisMission") {
                // document.getElementById("cmbSortie").disabled=true;
                document.getElementById("cmbMission").style.display = "none";
                document.getElementById("TxtMission").style.display = "block";
                appRegularisationFraisMission.ShowMission(appHelper.GetQueryStringFromAjaxQuery('DID'), info, function () { });
            }
            else {
                // appRegularisationSortieCaisse.initCmbSortie(function () { });
                appRegularisationFraisMission.initCmbMission(function () { });
                //appRegularisationFraisMission.ShowDetails(appHelper.GetQueryStringFromAjaxQuery('DID'), function () { });
            }

        });

    });

    const BtnSave = document.querySelector("#BtnSave");

    BtnSave.addEventListener("click", function () {
        //let mission = document.getElementById("cmbMission").value;
        let nbre = document.getElementById("TxtNombre").value;
        let forfait = document.getElementById("TxtForfait").value;
        if (nbre != 0 && forfait != 0) {
            let verif = document.getElementById("TxtVerif").value;
            if (verif == "Edit") {
                let valID = document.getElementById("TxtID").value;
                console.log(valID);
                appRegularisationFraisMission.Edit(valID, function (a) {
                    // location.reload();
                    const appUrl = '/pages/regularisationSortieCaisse/show.aspx?ID=' + a.get_id();
                    const url = "/tools" + appUrl;
                    appHelper.navigation("DivMainPageContainer", url);
                    var closeButton = document.querySelector('[aria-label="Close"]');
                    closeButton.click();
                });
            }
            else {
                appRegularisationFraisMission.Add(function (a) {
                    //location.reload();
                    const appUrl = '/pages/regularisationFraisMission/show.aspx?ID=' + a.get_id();
                    const url = "/tools" + appUrl;
                    appHelper.navigation("DivMainPageContainer", url);
                    var closeButton = document.querySelector('[aria-label="Close"]');
                    closeButton.click();
                });
            }
        }

    });



};

function calculTotal() {
    var nombre = parseFloat(document.getElementById("TxtNombre").value);
    var forfait = parseFloat(document.getElementById("TxtForfait").value);

    if (!isNaN(nombre) && !isNaN(forfait)) {
        var total = nombre * forfait;
        document.getElementById("TxtTotal").value = total;
        //   document.getElementById("TxtTotal").value = total.toFixed(2);
    } else {
        document.getElementById("TxtTotal").value = "";
    }
}

appRegularisationFraisMission.initCmbMission = function (callBack) {
    ListerMission(function () {
        let cmb = document.getElementById("cmbMission");
        let txtColor = document.getElementById("TxtMissionColeur");
        let txtText = document.getElementById("TxtMissionText");
        cmb.addEventListener("change", function () {
            let selectedOption = this.options[this.selectedIndex];
            //let color = selectedOption.getAttribute("data-color");
            //txtColor.value = color;
            txtText.value = selectedOption.text;
        });

        if (callBack) {
            callBack();
        }
    });

};

function ListerMission(callBack) {
    let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
    let q = `<View><Query><Where><And>
                <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                <Eq><FieldRef ID="Statut"/><Value Type="Text">VALIDEE</Value></Eq>
            </And></Where></Query></View>`;

    let camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(q);
    let listItemMission = oList.getItems(camlQuery);
    clientContext.load(listItemMission);
    clientContext.executeQueryAsync(
        function () {
            var listItemEnumerator = listItemMission.getEnumerator();

            while (listItemEnumerator.moveNext()) {
                console.log("IN");
                let oListItemTp = listItemEnumerator.get_current();
                let opt = document.createElement("option");
                //opt.setAttribute("data-duree", oListItemTp.get_item('Duree'));
                //opt.setAttribute("data-color", oListItemTp.get_item('Background'));
                opt.setAttribute("value", oListItemTp.get_id());
                opt.innerHTML = oListItemTp.get_item('Title');
                document.getElementById('cmbMission').appendChild(opt);
            }


            if (callBack) {
                callBack();
            }
        },
        function (sender, args) { console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()); });
}

function afficher() {
    var selectValue = document.getElementById("CmbCaisse").value;
    var inputMasque = document.getElementById("AutreCaisse");

    if (selectValue === "Autre") {
        //alert("OK");
        inputMasque.style.display = "block";
    }
    else {
        inputMasque.style.display = "none";
    }
}

function ajouterLigne() {
    var table = document.getElementById("TableFraisMission");
    var newRow = table.insertRow(table.rows.length);

    //var cell = newRow.insertCell(0);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    //cell.innerHTML = '<select class="mt-3" id="CmbPerdieme" name"CmbPerdieme"><option value"Hotel">Hotel</option></select>';
    cell1.innerHTML = '<input type="date" id="DateDebut" name="DateDebut">';
    cell2.innerHTML = '<input type="date" id="DateFin" name="DateFin">';
    cell3.innerHTML = '<input type="text" id="TxtNombre" name="TxtNombre" oninput="calculTotal()">';
    cell4.innerHTML = '<input type="text" id="TxtForfait" name="TxtForfait" oninput="calculTotal()">';
    cell5.innerHTML = '<input type="text" id="TxtTotal" name="TxtTotal" readonly>';
    cell6.innerHTML = '<button onclick="supprimerLigne(this)">Supprimer</button>';
}

function supprimerLigne(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
}

appRegularisationFraisMission.Add = function (callBack) {
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

        for (var i = 0; i < data.length; i++) {

            var item = data[i];

            let oList = appRegularisationFraisMission.clientContext
                .get_web()
                .get_lists()
                .getByTitle(appHelper.ListName.RegularisationFraisMission);
            let itemCreateInfo = new window.SP.ListItemCreationInformation();
            let oListItem = oList.addItem(itemCreateInfo);

            // Sélectionnez tous les boutons radio avec le nom "options"
            var boutonsRadio = document.querySelectorAll("input[name='Etat']");

            // Parcourir les boutons radio et récupérer la valeur du bouton sélectionné
            for (var b = 0; b < boutonsRadio.length; b++) {
                if (boutonsRadio[i].checked) {
                    var valeurSelectionnee = boutonsRadio[i].value;
                    oListItem.set_item("Etat", valeurSelectionnee);
                    console.log("Bouton radio sélectionné : ", valeurSelectionnee);
                    break; // Sortir de la boucle une fois le bouton trouvé
                }
            }

            let verifid = document.getElementById("TxtMissionID").value;
            let ref = appHelper.getReference("RFDM");

            if (verifid) {
                oListItem.set_item("MissionID", parseInt(document.getElementById("TxtMissionID").value));
                oListItem.set_item("Mission", document.getElementById("TxtMission").value);
                oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
                oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
                oListItem.set_item("Reference", ref);

                oListItem.set_item("DateDebut", item.DateDebut);
                oListItem.set_item("DateFin", item.DateFin);

                oListItem.set_item(
                    "Forfait", item.TxtForfait);

                oListItem.set_item(
                    "Title", item.Txtlibelle);

                oListItem.set_item(
                    "Total", item.TxtTotal);

                oListItem.set_item(
                    "Nombre", item.TxtNombre);

                //oListItem.set_item("Etat", document.getElementsByName('Etat').value);

                oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


                oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

                oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
                oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

                oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
                oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

                oListItem.update();
                clientContext.load(oListItem);
                clientContext.executeQueryAsync(function () {

                    let FpUploadAttachement = document.getElementById('FileDoc');
                    files = FpUploadAttachement.files;
                    console.log(FpUploadAttachement);
                    console.log(files);
                    for (const file of files) {
                        let reader = new FileReader();
                        reader.onload = function (e) {
                            console.log(file.name);
                            console.log(e.target.result);
                            appHelper.AttachFile(clientContext, oListItem.get_id(), e.target.result, file.name, appHelper.ListName.RegularisationFraisMission, function () {
                                const appUrl = '/pages/regularisationFraisMission/show.aspx?ID=' + oListItem.get_id();
                                let WF = new WFManager(appHelper.AppCode.REGULARISATIONFRAISMISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
                                WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONFRAISMISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, ref, function () { })

                                appRegularisationFraisMission.UpDateStatusFraisMission(verifid, function () { });

                                if (callBack) {
                                    callBack(oListItem);
                                }
                            })
                        }
                        reader.onerror = function (e) {
                            console.log(e.target.error);
                        }
                        reader.readAsArrayBuffer(file);
                    };


                }, appSpHelper.writeError);
            }
            else {
                oListItem.set_item("MissionID", parseInt(document.getElementById("cmbMission").value));
                oListItem.set_item("Mission", document.getElementById("TxtMissionText").value);

                oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
                oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
                oListItem.set_item("Reference", ref);


                oListItem.set_item("DateDebut", item.DateDebut);
                oListItem.set_item("DateFin", item.DateFin);

                oListItem.set_item(
                    "Forfait", item.TxtForfait);

                oListItem.set_item(
                    "Title", item.Txtlibelle);

                oListItem.set_item(
                    "Total", item.TxtTotal);

                oListItem.set_item(
                    "Nombre", item.TxtNombre);

                //oListItem.set_item("Etat", document.getElementsByName('Etat').value);

                oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


                oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

                oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
                oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

                oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
                oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

                oListItem.update();
                clientContext.load(oListItem);
                clientContext.executeQueryAsync(function () {

                    appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.RegularisationFraisMission, 0, function () {

                        const appUrl = '/pages/regularisationFraisMission/show.aspx?ID=' + oListItem.get_id();
                        let WF = new WFManager(appHelper.AppCode.REGULARISATIONFRAISMISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
                        WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONFRAISMISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })

                        appRegularisationFraisMission.UpDateStatusFraisMission(parseInt(document.getElementById("cmbMission").value), function () { });

                        if (callBack) {
                            callBack(oListItem);
                        }

                        // let FpUploadAttachement = document.getElementById('FileDoc');
                        // files = FpUploadAttachement.files;
                        // console.log(FpUploadAttachement);
                        // console.log(files);
                        // for (const file of files) {
                        //     let reader = new FileReader();
                        //     reader.onload = function (e) {
                        //         console.log(file.name);
                        //         console.log(e.target.result);
                        //         appHelper.AttachFile(clientContext, oListItem.get_id(), e.target.result, file.name, appHelper.ListName.RegularisationFraisMission, function () {
                        //             const appUrl = '/pages/regularisationFraisMission/show.aspx?ID=' + oListItem.get_id();
                        //             let WF = new WFManager(appHelper.AppCode.REGULARISATIONFRAISMISSION, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOW);
                        //             WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REGULARISATIONFRAISMISSION, oListItem.get_id(), App.CurrentUser.Manager.Login, App.CurrentUser.Manager2.Login, function () { })

                        //             appRegularisationFraisMission.UpDateStatusFraisMission(parseInt(document.getElementById("cmbMission").value), function () { });

                        //             if (callBack) {
                        //                 callBack(oListItem);
                        //             }
                        //         })
                        //     }
                        //     reader.onerror = function (e) {
                        //         console.log(e.target.error);
                        //     }
                        //     reader.readAsArrayBuffer(file);
                        // };


                    }, appSpHelper.writeError);
                })
            }





        }
    }
}

appRegularisationFraisMission.Edit = function (demandeid, callBack) {
    var table = document.getElementById("TableFraisMission");
    var data = [];
    console.log(demandeid);

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

        for (var i = 0; i < data.length; i++) {

            var item = data[i];

            let oList = appRegularisationFraisMission.clientContext
                .get_web()
                .get_lists()
                .getByTitle(appHelper.ListName.RegularisationFraisMission);
            let itemCreateInfo = new window.SP.ListItemCreationInformation();
            let oListItem = oList.addItem(itemCreateInfo);

            // Sélectionnez tous les boutons radio avec le nom "options"
            var boutonsRadio = document.querySelectorAll("input[name='Etat']");

            // Parcourir les boutons radio et récupérer la valeur du bouton sélectionné
            for (var b = 0; b < boutonsRadio.length; b++) {
                if (boutonsRadio[i].checked) {
                    var valeurSelectionnee = boutonsRadio[i].value;
                    oListItem.set_item("Etat", valeurSelectionnee);
                    console.log("Bouton radio sélectionné : ", valeurSelectionnee);
                    break; // Sortir de la boucle une fois le bouton trouvé
                }
            }

            oListItem.set_item("MissionID", parseInt(document.getElementById("cmbMission").value));
            oListItem.set_item("Mission", document.getElementById("TxtMissionText").value);

            oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
            oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");

            oListItem.set_item("DateDebut", item.DateDebut);
            oListItem.set_item("DateFin", item.DateFin);

            oListItem.set_item(
                "Forfait", item.TxtForfait);

            oListItem.set_item(
                "Title", item.Txtlibelle);

            oListItem.set_item(
                "Total", item.TxtTotal);

            oListItem.set_item(
                "Nombre", item.TxtNombre);

            //oListItem.set_item("Etat", document.getElementsByName('Etat').value);

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
}

appRegularisationFraisMission.UpDateStatusFraisMission = function (demandeid, callBack) {
    let oList1 = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
    let It1 = oList1.getItemById(demandeid);

    console.log("ID UPDATE : " + demandeid);

    if (It1) {
        console.log("test");
        It1.set_item("Statut", "ENATTENTEREGULARISATION");
        It1.set_item("StatutLibelle", "En attente de regularisation ");
    }
    It1.update();
    clientContext.load(It1);
    clientContext.executeQueryAsync(function () {
        if (callBack) {
            callBack();
        }
    }, appSpHelper.writeError);
}

appRegularisationFraisMission.ShowMission = function (demandeid, info, callBack) {

    let oList = appRegularisationFraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Mission);
    let It = oList.getItemById(demandeid);
    console.log(demandeid);
    console.log(info);
    console.log("IN ShowMission");
  
    appRegularisationFraisMission.clientContext.load(It);
    appRegularisationFraisMission.clientContext.executeQueryAsync(function () {
      if (It) {
  
        var montChamp = document.getElementById("TxtMont");
  
        var mont = new AutoNumeric(montChamp, {
          digitGroupSeparator: " ",
          decimalPlaces: 0,
          unformatOnSubmit: true,
        });
  
        // Mettre à jour le champ Solde à reverser avec le résultat formaté
        mont.set(info);
  
        //document.getElementById("TxtMont").value = info;
        document.getElementById("TxtMissionID").value = demandeid;
        document.getElementById("TxtMission").value = It.get_item('Title') != null ? It.get_item('Title') : '';
  
        if (callBack) { callBack(); }
  
      } else { if (callBack) { callBack(); } }
    }, appSpHelper.writeError);
  }

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appRegularisationFraisMission.InitializePage);
