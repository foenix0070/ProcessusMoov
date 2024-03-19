<%@ Assembly Name="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

  <%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls"
      Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
      <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities"
        Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Import Namespace="Microsoft.SharePoint" %>
          <%@ Assembly
            Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages"
              Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

              <html lang="fr-fr">

              <head>
                <meta charset="utf-8">
                <link rel="icon" href="/favicon.ico">
                <meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#000000">
                <meta name="description" content="Web site created using create-react-app">
                <link rel="apple-touch-icon" href="/assets/logo.png">
                <title>GADGET</title>


                <script type="text/javascript"  src="/_layouts/15/MicrosoftAjax.js"></script>
                <SharePoint:ScriptLink name="SP.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink  name="SP.UserProfiles.js" runat="server" ondemand="false" localizable="false" loadafterui="true" />
                <!-- <SharePoint:ScriptLink name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
                <SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" /> -->

                <script type="text/javascript"  src="/_layouts/15/MicrosoftAjax.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.js"></script>
                <!-- <script type="text/javascript" src="/_layouts/15/SP.UserProfiles.js.js"></script> -->
                <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
                <script type="text/javascript"  src="/_layouts/15/clientforms.js"></script>
                <script type="text/javascript"  src="/_layouts/15/clientpeoplepicker.js"></script>
                <script type="text/javascript"  src="/_layouts/15/autofill.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.runtime.js"></script>
                <script type="text/javascript"  src="/_layouts/15/sp.core.js"></script>   <!---->
                <!-- <script type="text/javascript"  src="/_layouts/15/1033/strings.js"></script> -->
                <!-- <script type="text/javascript"  src="/_layouts/15/clienttemplates.js"></script> -->
                <!-- <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
                <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
                <script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
                <script type="text/javascript" src="/_layouts/15/autofill.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
                <script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
                <script type="text/javascript" src="/_layouts/15/SP.UserProfiles.js.js"></script>-->

                <link rel="stylesheet" href="/_layouts/15/1036/styles/Themable/corev15.css">
                <link href="/tools/assets/css/reset.css" rel="stylesheet" />
                <link href="/tools/assets/css/w3c.css" rel="stylesheet" />
                <link href="/tools/assets/css/style.css" rel="stylesheet" />
                <script src="/tools/assets/js/workflow_template.js"></script>
                <script src="/tools/assets/js/SpGroupConstante.js"></script>
                <script src="/tools/assets/js/mustache.js"></script>
                <script src="/tools/assets/js/script.js"></script>
                <script src="/tools/assets/js/extensions.js"></script>
                <script src="/tools/assets/js/appHelper.js"></script>
                <script src="/tools/assets/js/appSpHelper.js"></script>
                <script src="/tools/assets/js/WFManager.js"></script>

              </head>

              <body>
                <noscript>Vous avez besoin d'activer JAVASCRIPT pour exploiter cette application.</noscript>
                <div id="root">
                  <div class="App">
                    <header class="header">
                      <div class="header1"><img src="/tools/assets/img/Moov_Africa_logo.png" alt="" class="logo">
                      </div>
                      <div class="header2">
                        <div class="pro" id="pro" onClick="showUserMenu()"><img class="profil"
                            src="/tools/assets/img/person-circle.svg" alt="">
                        </div>
                        <div class="none" id="pop">
                          <ul>
                            <li>Sortir</li>
                          </ul>
                        </div>
                      </div>
                    </header>
                    <div class="block2">
                      <nav class="nav">
                        <ul class="show-color">
                          <li class="color-0 color-ad" id="color-0"><img src="/tools/assets/img/person-vcard-fill.svg"
                              alt=""></li>
                          <li class="color-1 color-ad" id="color-1"><img src="/tools/assets/img/eye.svg" alt=""></li>
                        </ul>
                      </nav>
                      <section class="block2-change2">
                        <section class="sect1">
                          <h2 class="bord-title "><span class="document"> Demande de gadget </span></h2>
                        </section>
                        <section class="sect1">
                          <h3>Historique</h3>
                          <div class="sect-btn"><button class="btn btn1" id="demande"
                              onclick="OpenForm('#transition')">Faire une demande </button></div>
                        </section>
                        <div id="DivGadgetTableShow">


                          <div style="padding: 10px 0 10px 2px;"
                           class="w3-panel w3-pale-yellow w3-border">
                            <p>Aucun &eacute;l&eacute;ment &agrave; afficher ici.</p>
                          </div>


                        </div>
                      </section>
                      <div class="transition" id="transition">
                        <span class="none" onclick="CloseForm('transition')" id="close">x</span>
                        <div class="elts" id="DivPopupContenair">

                          <form action="" method="" class="form" id="form">
                            <div class="elts">

                                <fieldset class="f" style="width: 100%;">
                                    <legend>Demande</legend>



                                    <label style="display: block;">
                                     Article
                                      <input type="text" name="TxtArticle" placeholder="ex: Gomme" id="TxtArticle">
                                  </label>
                                  <div class="form-elts__block"  style="display: block;">
                                    <label style="display: inline-block;">
                                      Quantit&eacute;
                                      <input type="number" name="TxtQuantite" placeholder="" id="TxtQuantite">
                                  </label>


                                  </div>
                                  <div class="form-elts__block"  style="display: block;">

                                    <label>
                                      Description
                                     <textarea name="TxtMotif"  style="width: 100%;" id="TxtMotif" cols="30" rows="10"></textarea>
                                  </label>

                                  </div>


                                </fieldset>



                             </div>

                            <div class="input-optn">
                                <button class="Submit" id="BtnSave" type="button"> Valider </button>
                            </div>
                        </form>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                <script id="tmpl_table_gadget" type="x-tmpl-mustache">
                  <div class="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>N*</th>
                          <th>Gadget</th>
                          <th>Quantit&eacute;</th>
                          <th>Date</th>
                          <th>Etat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {{#gadget}}
                        <tr class="rang click" data-url="show.aspx?id={{id}}">
                          <td>{{id}}</td>
                          <td>{{title}}</td>
                          <td>{{nbre}}</td>
                          <td>{{startdate}}</td>
                          <td><span class="{{classe}}">{{status}}</span></td>
                        </tr>
                        {{/gadget}}
                      </tbody>
                    </table>
                  </div>
                </script>




                <script  src="/tools/gadget/app.js" ></script>
                <script type="text/javascript">
                  appHelper.loadJSWithNameSpace("appGadget", 'appGadget' ,"app.js");
              </script>
              </body>


              </html>