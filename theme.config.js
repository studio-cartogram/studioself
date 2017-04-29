/**
 * Project info config object
 *
 * All params optional unless
 * otherwise noted
 *
 * @params {
 *  string name         (required) Site text-domain
 *  string devURI       (required) Site URL for local development, proxied in Browser Sync
 *                                 http://lvh.me:9293
 *                                 http://lvh.me:9292 shows format dev tools, loads theme in iframe
 * }
 */

var argv = require('yargs').argv
var name = 'meander'
var devURI = argv.builder ? 'http://lvh.me:9292' : 'http://lvh.me:9293'

console.log(`Starting ${name}${argv.builder ? ' with builder' : ''} on ${devURI}`)

module.exports = {
	name: name,
  devURI: devURI,
};
