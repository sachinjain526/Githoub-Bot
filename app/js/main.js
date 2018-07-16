var jQuery = require('jQuery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
const headerJson = { method: "get", "Access-Control-Allow-Origin": "*", mode: "cors", "Content-Type": "application/json" };
document.write('<h1 class="text-secondary display-4">welcome to my app</h1>');
console.log('app loaded');


function createRepo(data, callback) {
  jQuery.ajax({
    url: "https://api.github.com/orgs/sachinjain526/repos?access_token=313ccd01a0c47904416cd54df379dabcb0d08820",
    method: "POST",
    data: passData,
    dataType: "json"
  }).done(function (msg) {
    callback(msg);
  }).fail(function (jqXHR, textStatus) {
    console.log("Request failed: " + textStatus);
  })
}
function showResponse(data) {
  console.log(data);
}
jQuery(document).ready(function () {
  let createData = {
    "name": "Hello-World",
    "description": "This is your first repository",
    "homepage": "https://github.com",
    "private": false,
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true
  }
  createRepo(createData, showResponse);
});
