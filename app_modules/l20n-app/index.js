/**
 * marvin
 * Created by Alexey on 03.02.2016.
 */
'use strict';
const L20n = require('l20n');
var path = require('path');

var config = require('../marvin-config');

module.exports = function(keys, lang){

    const env = new L20n.Env(L20n.fetchResource);
    var langs = [];

    //debug
    env.addEventListener('*', e => console.log(e));

    if(!lang) {
        let locales = config.get('locales');
        for (var i in locales){
            langs.push({code: locales[i]});
        }
    } else {
        langs = [{code: lang}]
    }


    const ctx = env.createContext(langs, [path.join(__dirname, '../../public/locales/{locale}.ftl')]);
    const fv = ctx.formatValues;

    return fv.apply(ctx, keys);
};