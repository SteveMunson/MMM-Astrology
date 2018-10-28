/* Magic Mirror
    * Module: MMM-Astrology
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const parser = require('xml2js').parseString;
const fs = require('fs');


module.exports = NodeHelper.create({
	  
    start: function() {
    	console.log("Starting module: " + this.name);
    },
    
    getAstrology: function(url) {
    	request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(body);
                this.sendSocketNotification('ASTRO_RESULTS', result);
            }
        });
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_ASTROLOGY') {
                this.getAstrology(payload);
            }
         }  
    });
