var FraisMission = FraisMission || {};
var clientContext;
FraisMission.clientContext;

FraisMission.InitializePage = function () {
  FraisMission.clientContext = SP.ClientContext.get_current();
  clientContext = SP.ClientContext.get_current();
};

FraisMission.AddFraisMission = function (data, oListItem) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    let oList = FraisMission.clientContext
      .get_web()
      .get_lists()
      .getByTitle(appHelper.ListName.FraisMission);
    let itemCreateInfo = new window.SP.ListItemCreationInformation();
    let oListItem1 = oList.addItem(itemCreateInfo);

    let startDate = new Date();

    let repDate = new Date();


    oListItem1.set_item("DateDebut", startDate);
    oListItem1.set_item("DateFin", repDate);

    oListItem1.set_item(
      "MissionID", oListItem.get_id());

    oListItem1.set_item(
      "PerdiemeID", item.CmbPerdieme);

    oListItem1.set_item(
      "Forfait", item.TxtForfait);

    oListItem1.set_item(
      "Total", item.TxtTotal);

    oListItem1.set_item(
      "Nombre", item.TxtNombre);

    oListItem1.update();
    clientContext.load(oListItem1);
    clientContext.executeQueryAsync(function (callBack) {
      callBack(oListItem1);
    });

  }
  console.log("Add FraisMission");
}

FraisMission.EditFraisMission = function (data, demandeid) {

  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    let oList = clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);
    let oListItem1 = oList.getItemById(demandeid);

    let startDate = new Date();

    let repDate = new Date();


    oListItem1.set_item("DateDebut", startDate);
    oListItem1.set_item("DateFin", repDate);

    oListItem1.set_item(
      "MissionID", demandeid);

    oListItem1.set_item(
      "PerdiemeID", item.CmbPerdieme);

    oListItem1.set_item(
      "Forfait", item.TxtForfait);

    oListItem1.set_item(
      "Total", item.TxtTotal);

    oListItem1.set_item(
      "Nombre", item.TxtNombre);

    oListItem1.update();
    clientContext.load(oListItem1);
    clientContext.executeQueryAsync(function (callBack) {
      callBack(oListItem1);
    });

  }
  console.log("Add FraisMission");
}

FraisMission.ShowDetails = function (demandeid, callBack) {

  let oList = FraisMission.clientContext.get_web().get_lists().getByTitle(appHelper.ListName.FraisMission);
  //let It = oList.getItemById(demandeid);
  console.log("IN ShowDetails");

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='MissionID' /><Value Type='Text'>" + demandeid + "</Value></Eq></Where></Query></View>");

  let It = oList.getItems(camlQuery);

  FraisMission.clientContext.load(It);
  FraisMission.clientContext.executeQueryAsync(function () {
    if (It.get_count() > 0) {
      //var itemEnumerator = It.getEnumerator();
      console.log("BOUCLE");
      //while (itemEnumerator.moveNext()) {
        let test = new Date(It.get_item('DateDebut')).toLocaleDateString();
        console.log(test);
        //document.getElementById("DateDebut").value = new Date(It.get_item('DateDebut')).toLocaleDateString();
        //document.getElementById("DateFin").value = new Date(It.get_item('DateFin')).toLocaleDateString();
        document.getElementById("TxtForfait").value = It.get_item('Forfait') != null ? It.get_item('Forfait') : '';
        document.getElementById("TxtTotal").value = It.get_item('Total') != null ? It.get_item('Total') : '';
        document.getElementById("TxtNombre").value = It.get_item('Nombre') != null ? It.get_item('Nombre') : '';

      //}
      if(callBack){callBack();}
    }else{if(callBack){callBack();}}
  }, appSpHelper.writeError);
}

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', FraisMission.InitializePage);
