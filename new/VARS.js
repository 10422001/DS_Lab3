const {Pool} = require("pg");
const {pool_new} = require("./db_client_pool");

class VARS {

    // static staticProperty = 'static value';
    static temperature = 999
    static luminosity = 999
    static airHumidity = 999
    static soilHumidity = 999
    static ph = 999

    static fan = require('./vars').fan
    static water_pump = require('./vars').water_pump
    static light = require('./vars').light

}
