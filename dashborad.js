
"use strict";

function getData(file, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', file, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.send(null);
 }

 var showData = function(response){
   var actual_JSON = JSON.parse(response);
   var arrLength = actual_JSON.length;
   for(var i = 0; i < arrLength; i++) {
       var result = actual_JSON[i];
       var div = document.createElement("a");
       var searcht = document.createElement("a");
       searcht.id = "emp-" + result.id ;
       div.id = "emp-" + result.id ;
       searcht.className += "employeesinfo"; 
       div.className += "employeesinfo";       
       div.innerHTML = '<img src=" ' + result.image + '" />' + '<div class="desc"><a id=' + result.id +' " class="name" onclick="PopUpOpen(this.id)">' + result.name + '</a><div class="desjob">' + result.job + ' <span class="gray-text">at </span> ' + result.company_name + '</div><div class="gray-text">' + result.joining_date + '</div>      <div class="home-town">' + result.home_town + '</div><div class="workat"><span class="gray-text"> Wroked at </span>' + result.workat + '</div>        <div class="gray-text">' + result.totalex + '</div></div>' ;
       searcht.innerHTML = '<img src=" ' + result.image + '" />' + '<div class="desc"><a id=' + result.id +' " class="name" >' + result.name + '</a><div class="desjob">' + result.job + ' </div><div class ="resultser">' + result.company_name + '</div>' ;
       document.getElementById("EmployeeData").appendChild(div);
       document.getElementById("searchresult").appendChild(searcht);

   }
 }
getData("data.json", showData);

var PopUpOpen = function(id){
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('GET', "data.json", true);
   xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4) {
           if(xmlhttp.status == 200) {
             var actual_JSON = JSON.parse(xmlhttp.responseText);
             var arrLength = actual_JSON.length;
             for(var i = 0; i < arrLength; i++) {
               var result = actual_JSON[i];
               if(id == result.id) {
                 var el = document.getElementById('popup');
                 el.style.display = 'block';
                 el.classList.add("open");
                 var div = document.createElement("a");
                 div.id = "emp-" + result.id ;
                 div.className += "popup";
                 div.innerHTML = '<a class="close" onclick="PopUpClose()"><i class="fa fa-times" aria-hidden="true"></i></a><img src=" ' + result.image + '" />' + '<div class="desc"><a id=' + result.id +' " class="name" onclick="PopUpOpen(this.id)">' + result.name + '</a><div class="desjob">' + result.job + ' <span class="gray-text">at </span> ' + result.company_name + '</div><div class="gray-text">' + result.joining_date + '</div>      <div class="home-town">' + result.home_town + '</div><div class="workat"><span class="gray-text"> Wroked at </span>' + result.workat + '</div>        <div class="gray-text">' + result.totalex + '</div></div>' ;
                     if(id >= 1 ) {
                       document.getElementById("popup").appendChild(div);
                     }
               }
             }
           }
       }
   };
   xmlhttp.send(null);
 }

function PopUpClose() {
  var el = document.getElementById('popup');
  el.style.display = 'none';
  el.classList.remove('open');
  el.innerHTML = '';
}

function SearchShowData() {
  var sear = document.getElementById("searchresult");
  sear.style.display = 'none';
}

SearchShowData();

function SearchRecord() {
    // Declare variables
    var input, filter, id, div, a, i;
    input = document.getElementById('search_emp');
    filter = input.value.toUpperCase();
    id = document.getElementById("searchresult");
    div = id.getElementsByClassName('employeesinfo');
     // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < div.length; i++) {
        a = div[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            id.style.display = 'block';
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }

    }
}
