var nunjucks = require('nunjucks');
var filesizeformat = require('./');
var test = require('tape');

var env = new nunjucks.Environment();
env.addFilter('filesizeformat', filesizeformat);

// tests based on https://github.com/pallets/jinja/blob/master/tests/test_filters.py#L75

test('Pluralises "Byte"', function (t) {
	t.equal(env.renderString('{{ 0|filesizeformat }}'), '0 Bytes');
	t.equal(env.renderString('{{ 1|filesizeformat }}'), '1 Byte');
	t.equal(env.renderString('{{ 2|filesizeformat }}'), '2 Bytes');
	t.equal(env.renderString('{{ 10|filesizeformat }}'), '10 Bytes');
	t.end();
});

test('Replaces zeros with human-readable unit', function (t) {
	t.equal(env.renderString('{{ 1|filesizeformat }}'), '1 Byte');
	t.equal(env.renderString('{{ 1000|filesizeformat }}'), '1.0 kB');
	t.equal(env.renderString('{{ 1000000|filesizeformat }}'), '1.0 MB');
	t.equal(env.renderString('{{ 1000000000|filesizeformat }}'), '1.0 GB');
	t.equal(env.renderString('{{ 1000000000000|filesizeformat }}'), '1.0 TB');
	t.equal(env.renderString('{{ 1000000000000000|filesizeformat }}'), '1.0 PB');
	t.equal(env.renderString('{{ 1000000000000000000|filesizeformat }}'), '1.0 EB');
	t.equal(env.renderString('{{ 1000000000000000000000|filesizeformat }}'), '1.0 ZB');
	t.equal(env.renderString('{{ 1000000000000000000000000|filesizeformat }}'), '1.0 YB');
	t.end();
});

test('Uses binary units when `binary` is true', function (t) {
	t.equal(env.renderString('{{ 100|filesizeformat(true) }}'), '100 Bytes');
	t.equal(env.renderString('{{ 1000|filesizeformat(true) }}'), '1000 Bytes');
	t.equal(env.renderString('{{ 1000000|filesizeformat(true) }}'), '976.6 KiB');
	t.equal(env.renderString('{{ 1000000000|filesizeformat(true) }}'), '953.7 MiB');
	t.equal(env.renderString('{{ 1000000000000|filesizeformat(true) }}'), '931.3 GiB');
	t.end();
});

test('Accepts `binary` as keyword argument', function(t) {
	t.equal(env.renderString('{{ 100|filesizeformat(binary=true) }}'), '100 Bytes');
	t.equal(env.renderString('{{ 1000000|filesizeformat(binary=true) }}'), '976.6 KiB');
	t.equal(env.renderString('{{ 100|filesizeformat(binary=false) }}'), '100 Bytes');
	t.equal(env.renderString('{{ 1000000|filesizeformat(binary=false) }}'), '1.0 MB');
	t.end();
});

test('Works with value not starting with `1`', function (t) {
	t.equal(env.renderString('{{ 300|filesizeformat }}'), '300 Bytes');
	t.equal(env.renderString('{{ 3000|filesizeformat }}'), '3.0 kB');
	t.equal(env.renderString('{{ 3000000|filesizeformat }}'), '3.0 MB');
	t.equal(env.renderString('{{ 3000000000|filesizeformat }}'), '3.0 GB');
	t.equal(env.renderString('{{ 3000000000000|filesizeformat }}'), '3.0 TB');
	t.equal(env.renderString('{{ 300|filesizeformat(true) }}'), '300 Bytes');
	t.equal(env.renderString('{{ 3000|filesizeformat(true) }}'), '2.9 KiB');
	t.equal(env.renderString('{{ 3000000|filesizeformat(true) }}'), '2.9 MiB');
	t.end();
});
