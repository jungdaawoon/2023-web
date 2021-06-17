

// 대괄호 같은역활(HTML 해드에 집어넣을 경우 이코드 필요 없을씨 body에 script 태그 가장 하단에 사용할것)
window.onload = function(){

//Make the DIV element draggagle:
dragElement(document.getElementById("dragdiv"));



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "dragdiv")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "dragdiv").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
}


 function randomlinks(){
  var myrandom=Math.round(Math.random()*9)
  var links=new Array()
  links[0]="https://nice-glue.com/1.%20source/2.%20poster/9.%20youth/youth.html"
  links[1]="https://nice-glue.com/1.%20source/1.%20book/11.%20annualreport/annualreport.html"
  links[2]="https://nice-glue.com/1.%20source/3.%20others/7.%20plants/plants.html"
  links[3]="https://nice-glue.com/1.%20source/3.%20others/1.%20drawings/2.%20ISTdrawing/ISTdrawing.html"
  links[4]="https://nice-glue.com/1.%20source/2.%20poster/7.%20tiger/tiger.html"
  links[5]="https://nice-glue.com/1.%20source/1.%20book/5.%20bart%20book/bart.html"
  links[6]="https://nice-glue.com/1.%20source/2.%20poster/3.%20housing/housing.html"
  links[7]="https://nice-glue.com/1.%20source/1.%20book/2.%20flower%20book/flowerbook.html"
  links[8]="https://nice-glue.com/1.%20source/2.%20poster/4.%20hail/hail.html"
  links[9]="https://nice-glue.com/1.%20source/1.%20book/8.%20building/building.html"

  window.location=links[myrandom]
}
