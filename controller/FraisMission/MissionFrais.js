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

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', FraisMission.InitializePage);
