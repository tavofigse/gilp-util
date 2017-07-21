#!/usr/bin/env node
var execSync = require('child_process').execSync;
var spawn = require('child_process').spawn;
var path = require('path');
var util = require('util');
var env = process.env;

env.PATH = execSync('npm bin').toString().trim() + ':' + env.PATH;

var gulp = spawn(
  'gulp',
  ['gilp-%s'].concat(process.argv.slice(2).map(function (arg) { return util.format('--gilp-args=%%s', arg); })),
  {
    stdio: 'inherit',
    cwd: process.env.PWD || process.cwd(),
    env: env
  }
);

gulp.on('close', function (code) {
  process.exit(code);
});
