var appUIControle = appUIControle || {};

appUIControle.DestroyChosen = function (selector) {
  selector = "." + selector;
  $(selector).chosen("destroy");
};

appUIControle.addEventToMultiHtmlItem = function(elements, event, callBack ){
  Array.from(elements).forEach((element) => {
    element.addEventListener(event,function(){
      let $that =this;
      if(callBack){
        callBack( $that, event);
      }
    });
  });
};

appUIControle.UpdateChosen = function (selector) {
  selector = "#" + selector;
  $(selector).trigger("chosen:updated");
};

appUIControle.InitChosen = function (
  selector,
  isMultiple = false,
  callBackSelect = null
) {
  let elements = document.getElementsByClassName(selector);
  if (isMultiple) {
    Array.from(elements).forEach((element) => {
      if (!element.hasAttribute("multiple")) {
        element.setAttribute("multiple", "multiple");
      }
    });
  }
  selector = "." + selector;
  $(selector)
    .chosen({
      width: "95%",
      no_results_text: "Oups! aucun élément trouvé!",
      disable_search_threshold: 15,
    })
    .change(function (e, p) {
      if (callBackSelect) {
        callBackSelect(e, p);
      }
    });
};


appUIControle.InitChosenByIdWithAddOption = function (  selector,  isMultiple = false, callBackSelect = null, callBackAddNewItem=null) {

  let element = document.getElementById(selector);

  if (isMultiple) {
    if (!element.hasAttribute("multiple")) {
      element.setAttribute("multiple", "multiple");
    }
  }

   selector = "#" + selector;
  let chosen_add_buttun = selector + "_chosen > .chosen-drop > .chosen-results";

  $(selector).chosen({
    width: "95%",
    no_results_text: "Aucun élément trouvé! cliquez ici pour ajouter une nouvelle entrée à la base de données : ",
    disable_search_threshold: 15,
  }).change(function (e, p) {
    if (callBackSelect) {
      callBackSelect(e, p);
    }
  });

  $(chosen_add_buttun).on("click", ".no-results", function () {
    let val = $(this).find("span").text();
    if(callBackAddNewItem){
      callBackAddNewItem(val)
      $(selector).val("").trigger("chosen:updated");
    }else{
      console.log('Add new: ',val);
      $(selector).val("").trigger("chosen:updated");
    }
  });

};
