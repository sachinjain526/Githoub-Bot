const jQuery = require('jquery');
import 'popper.js';
import 'bootstrap';
require("./AjaxSetting");
require("../scss/main.scss");
// my code start from here
console.log('app loaded');
import { eventListener, onLoadEventToFetchData } from "./EventListener";

jQuery(document).ready(function () {
  onLoadEventToFetchData();
  eventListener();
});
