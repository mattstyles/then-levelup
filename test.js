'use strict';

var tape = require('tape');

var root = require('levelup')({
  db: require('memdown'),
  encoding: 'json'
});
var then = require('./');

var db = then( root );
var sub = then( require( 'level-sublevel' )( root ).sublevel('sub') )


tape( 'It wraps the levelup api with promises', function (t) {
  t.plan( 1 )
  db.put('foo', 'bar')
    .then(function () {
      return db.get('foo');
    })
    .then(function (val) {
      t.ok(val === 'bar', 'sets and gets ok');
    })
})

tape( 'It wraps a sublevelled instance api with promises', function (t) {
  t.plan( 1 )
  sub.put('foo', 'bar')
    .then(function () {
      return sub.get('foo');
    })
    .then(function (val) {
      t.ok(val === 'bar', 'sets and gets ok from sublevel');
    })
})
