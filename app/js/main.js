const jQuery = require('jquery');
import 'popper.js';
import 'bootstrap';
require("./AjaxSetting");
require("../scss/main.scss");
// my code start from here
console.log('app loaded');
import { eventListener } from "./EventListener";
import { getAllUserRepo } from "./GetDataService";
import { createUserRepository } from "./CreateWidget";

// main document ready start
function createRepoSection(repoData) {
  createUserRepository("userRepoSection", repoData)
}

jQuery(document).ready(function () {
  //getAllUserRepo("users/sachinjain526/repos", createRepoSection);
  eventListener();
});
