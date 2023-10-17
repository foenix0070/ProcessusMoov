var appReprise = appReprise || {};
var clientContext;
appReprise.clientContext;

appReprise.InitializePage = function () {
    appReprise.clientContext = SP.ClientContext.get_current();
    clientContext = SP.ClientContext.get_current();

    appSpHelper.GetMyProperties(function () {
        appReprise.ListeReprise(appHelper.ListName.Conge, "Conge", function () {
            appReprise.ListeReprise(appHelper.ListName.Absence, "Absence", function () {
                document.getElementById("TxtNom").value = App.CurrentUser.DisplayName;
                document.getElementById("TxtMatricule").value = App.CurrentUser.Matricule;
                document.getElementById("TxtEmail").value = App.CurrentUser.Email;
            })
        })

    });

    const BtnSave = document.querySelector("#BtnSave");

    BtnSave.addEventListener("click", function () {

        if (appReprise.TestFields()) {
            BtnSave.disabled = true;
            appReprise.Add(function (a) {
                //location.reload();
                const appUrl = '/pages/reprise/show.aspx?ID=' + a.get_id();
                const url = "/tools" + appUrl;
                appHelper.navigation("DivMainPageContainer", url);
                var closeButton = document.querySelector('[aria-label="Close"]');
                closeButton.click();
            });
        }
    });

};


appReprise.TestFields = function () {

    let v = true;
    let str = '';

    // Récupérer les valeurs des champs
    let nom = document.getElementById("TxtReprise").textContent;
    let nbre = document.getElementById("TxtNbreJour").textContent;
    let datedebut = document.getElementById("TxtDateDepart").textContent;
    let datereprise = document.getElementById("TxtDateReprise").textContent;

    // Vérifier si les champs obligatoires sont vides
    if (nom === "" || nbre === "0" || datedebut === "" || datereprise === "") {
        str += ("Veuillez remplir tous les champs obligatoires. <br>");
        v = false; // Empêche l'envoi du formulaire
    }
    return v;
};

appReprise.ListeReprise = function (DemandeList, type, callback) {
    let oList = appReprise.clientContext
        .get_web()
        .get_lists()
        .getByTitle(DemandeList);
    let q = `<View><Query><Where><And>
                <Eq><FieldRef ID="Demandeur"/><Value Type="Integer"><UserID/></Value></Eq>
                <Eq><FieldRef ID="Statut"/><Value Type="Text">RETOURCONGE</Value></Eq>
            </And></Where></Query></View>`;

    let camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(q);
    let collListItem = oList.getItems(camlQuery);
    MoovTools.clientContext.load(collListItem);
    MoovTools.clientContext.executeQueryAsync(function (sender, args) {
        if (collListItem.get_count() > 0) {
            var listItemEnumerator = collListItem.getEnumerator();

            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                
                document.getElementById("TxtInterimaire").textContent = oListItem.get_item("Interimaire") != null ? oListItem.get_item("Interimaire").get_lookupValue() : "";
                document.getElementById("TxtReprise").textContent = oListItem.get_item("Title");
                document.getElementById("TxtNbreJour").textContent = oListItem.get_item("NombreJours");
                document.getElementById("TxtID").value = oListItem.get_item("ID");
                document.getElementById("TxtTypeR").textContent = type;
                document.getElementById("TxtType").value = type;
                document.getElementById("TxtDateDepart").textContent = oListItem.get_item("DateDepart").toLocaleDateString();
                document.getElementById("TxtDateReprise").textContent = oListItem.get_item("DateReprise").toLocaleDateString();

                // document.getElementById("TxtInterimaire").value = oListItem.get_item("Interimaire") != null ? oListItem.get_item("Interimaire").get_lookupValue() : "";
                // document.getElementById("TxtReprise").value = oListItem.get_item("Title");
                // document.getElementById("TxtNbreJour").value = oListItem.get_item("NombreJours");
                // document.getElementById("TxtID").value = oListItem.get_item("ID");
                // document.getElementById("TxtType").value = type;
                // document.getElementById("TxtDateDepart").value = new Date(oListItem.get_item("DateDepart")).toISOString().split('T')[0];
                // document.getElementById("TxtDateReprise").value = new Date(oListItem.get_item("DateReprise")).toISOString().split('T')[0];

            }
        }

        if (callback) {
            callback(MoovTools.view.reprise);
        }
    }, appSpHelper.writeError);
};


appReprise.Add = function (callBack) {
    let oList = appReprise.clientContext
        .get_web()
        .get_lists()
        .getByTitle(appHelper.ListName.Reprise);
    let itemCreateInfo = new window.SP.ListItemCreationInformation();
    let oListItem = oList.addItem(itemCreateInfo);
    console.log("Test Debut");

    // let startDate = new Date(document.getElementById("TxtDateDepart").textContent);
    // // let startDate = new Date(document.getElementById("TxtDateDepart").value);
    // let endDate = new Date(document.getElementById("TxtDateReprise").textContent);
    // let endDate = new Date(document.getElementById("TxtDateReprise").value);

    let ref = appHelper.getReference("REP");

    let idRep = document.getElementById("TxtID").value;
    let typeRep = document.getElementById("TxtType").value;

    oListItem.set_item("Statut", appHelper.Status.ENATTENTE);
    oListItem.set_item("StatutLibelle", "VALIDATION DU SUPERIEUR HIERARCHIQUE");
    oListItem.set_item("Reference", ref);

    oListItem.set_item("DateDepart", document.getElementById("TxtDateDepart").textContent);
    oListItem.set_item("DateReprise", document.getElementById("TxtDateReprise").textContent);

    oListItem.set_item("NombreJours", parseInt(document.getElementById("TxtNbreJour").textContent));
    // oListItem.set_item("NombreJours", parseInt(document.getElementById("TxtNbreJour").value));
    oListItem.set_item("Interimaire", document.getElementById("TxtInterimaire").textContent);
    // oListItem.set_item("Interimaire", document.getElementById("TxtInterimaire").value);

    oListItem.set_item("Title", document.getElementById("TxtReprise").textContent);
    // oListItem.set_item("Title", document.getElementById("TxtReprise").value);
    oListItem.set_item("Identifiant", idRep);
    oListItem.set_item("TypeReprise", typeRep);


    oListItem.set_item("Demandeur", SP.FieldUserValue.fromUser(App.CurrentUser.Login));

    oListItem.set_item("DemandeurEmail", App.CurrentUser.Email);


    oListItem.set_item("ResponsableN1", App.CurrentUser.ManagerPersonne);
    oListItem.set_item("ResponsableN2", App.CurrentUser.ManagerPersonne2);

    oListItem.set_item("ResponsableN1Email", App.CurrentUser.Manager.Email);
    oListItem.set_item("ResponsableN2Email", App.CurrentUser.Manager2.Email);

    console.log("Fin test");
    console.log(oListItem);

    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(function () {
        appHelper.upploadAttachmentFiles("FileDoc", oListItem.get_id(), appHelper.ListName.Reprise, 0, function () {
            const appUrl = '/pages/reprise/show.aspx?ID=' + oListItem.get_id();
            console.log(ACTIV_WORKFLOWREP);
            let WF = new WFManager(appHelper.AppCode.REPRISE, appHelper.AppConstante.SiteUrl, appHelper.ListName.Validation, ACTIV_WORKFLOWREP);
            WF.createWFTask(clientContext, appUrl, appHelper.AppCode.REPRISE, oListItem.get_id(), App.CurrentUser.Manager, App.CurrentUser.Manager2, ref, function () { })

            console.log(typeRep);

            appReprise.UpDateStatus(typeRep, idRep, function () { });

            if (callBack) {
                callBack(oListItem);
            }
        }, appSpHelper.writeError);
    })
};

appReprise.UpDateStatus = function (listdemande, demandeid, callBack) {

    let list = "";
    switch (listdemande) {
        case "Absence":
            list = appHelper.ListName.Absence;
            break;
        case "Conge":
            list = appHelper.ListName.Conge;
            break;
    }

    console.log("List : " +list);

    let oList1 = clientContext.get_web().get_lists().getByTitle(list);
    let It1 = oList1.getItemById(demandeid);

    console.log("ID UPDATE : " + demandeid);

    if (It1) {
        console.log("test");
        It1.set_item("Statut", "ENATTENTEREPRISE");
        It1.set_item("StatutLibelle", "En attente de reprise de service ");
    }
    It1.update();
    clientContext.load(It1);
    clientContext.executeQueryAsync(function () {
        if (callBack) {
            callBack();
        }
    }, appSpHelper.writeError);
}


SP.SOD.executeFunc('sp.js', 'SP.ClientContext', appReprise.InitializePage);
