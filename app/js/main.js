const jQuery = require('jQuery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
// my code start from here
console.log('app loaded');
import { eventListener } from "./EventListener";
import { getAllFromGitApi } from "./GetDataService";
import { createUserRepository } from "./CreateWidget";

// main document ready start
function createRepoSection(repoData) {
  createUserRepository("userRepoSection", repoData)
}

jQuery(document).ready(function () {
  //getAllFromGitApi("users/sachinjain526/repos", createRepoSection);
  eventListener();
});
