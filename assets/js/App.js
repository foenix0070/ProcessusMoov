var App = App || {};
App.CurrentUser = null;

App.LoadUser = function (callBack) {
    let clientContext = new SP.ClientContext.get_current();
    let oWeb = clientContext.get_web();
    currentUser = oWeb.get_currentUser();
    clientContext.load(currentUser);
    clientContext.executeQueryAsync(
        function () {
            console.log(currentUser);
            App.CurrentUser = {};
            App.CurrentUser.Login = currentUser.get_loginName();
            App.CurrentUser.Nom = currentUser.get_title();
            App.CurrentUser.Email = currentUser.get_email();

            let targetList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Employe);
            let camlQuery = new SP.CamlQuery();

            let login = "";

            if (App.CurrentUser.Login.indexOf('\\') > -1) {
                login = App.CurrentUser.Login.split('\\')[1];
                login = login.trim();
            }

            let q = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + login + '</Value></Eq></Where></Query></View>';
            camlQuery.set_viewXml(q);
            let collListItemInfo = targetList.getItems(camlQuery);
            clientContext.load(collListItemInfo);
            clientContext.executeQueryAsync(function (s, a) {
                let listItemEnumerator = collListItemInfo.getEnumerator();
                let oListItem = null;
                while (listItemEnumerator.moveNext()) {
                    oListItem = listItemEnumerator.get_current();
                    App.CurrentUser.Prenom = oListItem.get_item('EmpPrenom') != null ? oListItem.get_item('EmpPrenom') : "";
                    App.CurrentUser.Nom = oListItem.get_item('EmpNom') != null ? oListItem.get_item('EmpNom') : "";
                    App.CurrentUser.Email = oListItem.get_item('EmpEmail') != null ? oListItem.get_item('EmpEmail') : "";
                    App.CurrentUser.Mail = oListItem.get_item('EmpMail') != null ? oListItem.get_item('EmpMail') : "";
                    App.CurrentUser.MailPersonnel = oListItem.get_item('EmpMailPersonnel') != null ? oListItem.get_item('EmpMailPersonnel') : "";
                    App.CurrentUser.CellPhone = oListItem.get_item('EmpCellPhone') != null ? oListItem.get_item('EmpCellPhone') : "";
                    App.CurrentUser.Phone = oListItem.get_item('EmpPhone') != null ? oListItem.get_item('EmpPhone') : "";
                    App.CurrentUser.Departement = oListItem.get_item('EmpDepartement') != null ? oListItem.get_item('EmpDepartement') : "";
                    App.CurrentUser.Grade = oListItem.get_item('EmpGrade') != null ? oListItem.get_item('EmpGrade') : "";
                    App.CurrentUser.Fonction = oListItem.get_item('EmpFonction') != null ? oListItem.get_item('EmpFonction') : "";
                    App.CurrentUser.ManagerPersonne = oListItem.get_item('EmpManager') != null ? oListItem.get_item('EmpManager') : "";
                    App.CurrentUser.NombreJoursAcquis = oListItem.get_item('NombreJoursAcquis') != null ? oListItem.get_item('NombreJoursAcquis') : "";
                    App.CurrentUser.HomeLeave = oListItem.get_item('HomeLeave') != null ? oListItem.get_item('HomeLeave') : "";
                    App.CurrentUser.SickNoCertified = oListItem.get_item('SickNoCertified') != null ? oListItem.get_item('SickNoCertified') : "";
                    App.CurrentUser.Gender = oListItem.get_item('Gender') != null ? oListItem.get_item('Gender') : 0;
                    App.CurrentUser.DateFinContrat = oListItem.get_item('DateFinContrat') != null ? oListItem.get_item('DateFinContrat') : "";
                    App.CurrentUser.DepartementID = oListItem.get_item('DepartementID') != null ? oListItem.get_item('DepartementID') : 0;
                    App.CurrentUser.Localisation = oListItem.get_item('Localisation') != null ? oListItem.get_item('Localisation') : "";
                    App.CurrentUser.JourtotalConge = oListItem.get_item('JourtotalConge') != null ? oListItem.get_item('JourtotalConge') : 0;
                    App.CurrentUser.TxDateDepartEf = oListItem.get_item('TxDateDepartEf') != null ? oListItem.get_item('TxDateDepartEf') : "";
                    App.CurrentUser.DateFinCertif = oListItem.get_item('DateFinCertif') != null ? oListItem.get_item('DateFinCertif') : "";
                    App.CurrentUser.ContratID = oListItem.get_item('EmpContratID') != null ? oListItem.get_item('EmpContratID') : 0;
                    App.CurrentUser.Contrat = oListItem.get_item('EmpContrat') != null ? oListItem.get_item('EmpContrat') : "";
                    App.CurrentUser.ContactsCC = oListItem.get_item('ContactsCC') != null ? oListItem.get_item('ContactsCC') : "";
                    App.CurrentUser.DateEmbauche = oListItem.get_item('EmpDateEmbauche') != null ? oListItem.get_item('EmpDateEmbauche') : "";
                    App.CurrentUser.Matricule = oListItem.get_item('EmpMatricule') != null ? oListItem.get_item('EmpMatricule') : "0000";
                    App.CurrentUser.HRID = oListItem.get_item('EmpHRID') != null ? oListItem.get_item('EmpHRID') : 0;
                    App.CurrentUser.Directeur = oListItem.get_item('EmpDirecteur') != null ? oListItem.get_item('EmpDirecteur') : "";

                    App.CurrentUser.DisplayName = App.CurrentUser.Nom + " " + App.CurrentUser.Prenom;
                }
                if (callBack) { callBack(App.CurrentUser); }
            }, appSpHelper.writeError);

        }
        , appSpHelper.writeError);
}

App.LoadManager = function (manager, callBack) {
    let ManagerUser = {};
    let clientContext = new SP.ClientContext.get_current();

    var user = clientContext.get_web().ensureUser(manager.get_lookupValue());
    clientContext.load(user);
    clientContext.executeQueryAsync(
        function () {

            let targetList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.Employe);
            let camlQuery = new SP.CamlQuery();

            let login = user.get_loginName();

            if (login.indexOf('\\') > -1) {
                login = login.split('\\')[1];
                login = login.trim();
            }

            let q = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + login + '</Value></Eq></Where></Query></View>';
            camlQuery.set_viewXml(q);
            let collListItemInfo = targetList.getItems(camlQuery);
            clientContext.load(collListItemInfo);
            clientContext.executeQueryAsync(function (s, a) {
                let listItemEnumerator = collListItemInfo.getEnumerator();
                let oListItem = null;
                while (listItemEnumerator.moveNext()) {
                    oListItem = listItemEnumerator.get_current();
                    ManagerUser.Login = oListItem.get_item('EmpLogin') != null ? oListItem.get_item('EmpLogin') : "";
                    ManagerUser.Prenom = oListItem.get_item('EmpPrenom') != null ? oListItem.get_item('EmpPrenom') : "";
                    ManagerUser.Nom = oListItem.get_item('EmpNom') != null ? oListItem.get_item('EmpNom') : "";
                    ManagerUser.Email = oListItem.get_item('EmpEmail') != null ? oListItem.get_item('EmpEmail') : "";
                    ManagerUser.Mail = oListItem.get_item('EmpMail') != null ? oListItem.get_item('EmpMail') : "";
                    ManagerUser.MailPersonnel = oListItem.get_item('EmpMailPersonnel') != null ? oListItem.get_item('EmpMailPersonnel') : "";
                    ManagerUser.CellPhone = oListItem.get_item('EmpCellPhone') != null ? oListItem.get_item('EmpCellPhone') : "";
                    ManagerUser.Phone = oListItem.get_item('EmpPhone') != null ? oListItem.get_item('EmpPhone') : "";
                    ManagerUser.Departement = oListItem.get_item('EmpDepartement') != null ? oListItem.get_item('EmpDepartement') : "";
                    ManagerUser.Grade = oListItem.get_item('EmpGrade') != null ? oListItem.get_item('EmpGrade') : "";
                    ManagerUser.Fonction = oListItem.get_item('EmpFonction') != null ? oListItem.get_item('EmpFonction') : "";
                    ManagerUser.ManagerPersonne = oListItem.get_item('EmpManager') != null ? oListItem.get_item('EmpManager') : "";
                    ManagerUser.NombreJoursAcquis = oListItem.get_item('NombreJoursAcquis') != null ? oListItem.get_item('NombreJoursAcquis') : "";
                    ManagerUser.HomeLeave = oListItem.get_item('HomeLeave') != null ? oListItem.get_item('HomeLeave') : "";
                    ManagerUser.SickNoCertified = oListItem.get_item('SickNoCertified') != null ? oListItem.get_item('SickNoCertified') : "";
                    ManagerUser.Gender = oListItem.get_item('Gender') != null ? oListItem.get_item('Gender') : 0;
                    ManagerUser.DateFinContrat = oListItem.get_item('DateFinContrat') != null ? oListItem.get_item('DateFinContrat') : "";
                    ManagerUser.DepartementID = oListItem.get_item('DepartementID') != null ? oListItem.get_item('DepartementID') : 0;
                    ManagerUser.Localisation = oListItem.get_item('Localisation') != null ? oListItem.get_item('Localisation') : "";
                    ManagerUser.JourtotalConge = oListItem.get_item('JourtotalConge') != null ? oListItem.get_item('JourtotalConge') : 0;
                    ManagerUser.TxDateDepartEf = oListItem.get_item('TxDateDepartEf') != null ? oListItem.get_item('TxDateDepartEf') : "";
                    ManagerUser.DateFinCertif = oListItem.get_item('DateFinCertif') != null ? oListItem.get_item('DateFinCertif') : "";
                    ManagerUser.ContratID = oListItem.get_item('EmpContratID') != null ? oListItem.get_item('EmpContratID') : 0;
                    ManagerUser.Contrat = oListItem.get_item('EmpContrat') != null ? oListItem.get_item('EmpContrat') : "";
                    ManagerUser.ContactsCC = oListItem.get_item('ContactsCC') != null ? oListItem.get_item('ContactsCC') : "";
                    ManagerUser.DateEmbauche = oListItem.get_item('EmpDateEmbauche') != null ? oListItem.get_item('EmpDateEmbauche') : "";
                    ManagerUser.Matricule = oListItem.get_item('EmpMatricule') != null ? oListItem.get_item('EmpMatricule') : "0000";
                    ManagerUser.HRID = oListItem.get_item('EmpHRID') != null ? oListItem.get_item('EmpHRID') : 0;
                    ManagerUser.Directeur = oListItem.get_item('EmpDirecteur') != null ? oListItem.get_item('EmpDirecteur') : "";

                    ManagerUser.DisplayName = ManagerUser.Nom + " " + ManagerUser.Prenom;
                }
                if (callBack) { callBack(ManagerUser); }
            }, appSpHelper.writeError);

        }, appSpHelper.writeError);
}