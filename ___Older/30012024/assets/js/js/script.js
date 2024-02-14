'use strict';

function OpenForm ( str_select){
  let transElt = document.querySelector(str_select);
  let close = document.querySelector('#close');
  transElt.className = 'transition';
  transElt.style.width = '100%';
  close.style.zIndex = '15';
  close.style.display = 'flex';
  close.style.flexDirection = 'row';
  close.style.justifyContent = 'center';
  close.style.alignItems = 'center';
  close.style.position = 'absolute';
  close.style.top = '5px';
  close.style.right = '5px';
  close.style.color = 'white';
  close.style.backgroundColor = '#E96805';
  close.style.textAlign = 'center';
  close.style.width = '20px';
  close.style.height = '20px';
  close.style.padding = '5px';
  close.style.fontSize = '20px';
  close.style.borderRadius = '20px';
};


function CloseForm ( str_select){
  // let transElt = document.querySelector(str_select);
  // transElt.style.width = '0';
  // transElt.className =  transElt.className.replaceAll('transition', '');
location.reload();

}

function OpenFileUpload(str_select){
  let transElt = document.getElementById(str_select);
  transElt.click();
}

function showUserMenu() {
  let pop = document.getElementById('pop');
  pop.className = 'pop';
}

function closeUserMenu() {
  let pop = document.getElementById('pop');
  pop.className = 'none';
}