"use strict";

import style from "../scss/style.scss";
import Vue from 'vue';
import App from './App';

console.log("App started!");


new Vue({
  el: 'body',
  components: { App }
})