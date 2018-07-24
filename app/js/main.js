const jQuery = require('jquery');
import 'popper.js';
import 'bootstrap';
import { eventListener } from './EventListener';
import { onLoadEventToFetchData } from './onloadrendering';
require('./AjaxSetting');
require('../scss/main.scss');

jQuery(document).ready(function () {
  onLoadEventToFetchData()
  eventListener()
})
