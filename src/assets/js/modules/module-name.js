/*
 * Module: module name
 */
 
(function () {
    'use strict';
    /* global window, document, $*/

    var projectnamespace = window.projectnamespace || {};

    projectnamespace.moduleName = {
        
        init: function () {          
            this.moduleInit(); //function initiated here        
        },

        moduleInit: function () {
            //console.log('module init');
        }
    };

    $(document).ready(function () {
        projectnamespace.moduleName.init();
    });

}());