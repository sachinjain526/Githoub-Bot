import 'jquery';
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
const headerJson = { method: "get", "Access-Control-Allow-Origin": "*", mode: "cors", "Content-Type": "application/json" };
document.write('<h1 class="text-secondary display-4">welcome to my app</h1>');
console.log('app loaded');

fetch('/api/posts', headerJson).then(function (response) {
     // Examine the text in the response
     response.json().then(function(data) {
        console.log(data);
      });
});