/**
 * Project info config object
 *
 * All params optional unless
 * otherwise noted
 *
 * @params {
 *  string name         (required) Site text-domain
 */

var argv = require('yargs').argv
var name = 'meander'
var devURI = 'localhost:4000'

module.exports = {
	name: name,
  devURI: devURI,
};
