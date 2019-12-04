# Nunjucks filter `filesizeformatfilter`

[Nunjucks](https://mozilla.github.io/nunjucks/) [filter](https://mozilla.github.io/nunjucks/templating.html#filters) Formats to user friendly file sizes such as 1.8MB or 1.2TB

## Install

```bash
$ npm install --save nunjucks-filesizeformatfilter
```

## Usage

Install as [custom filter](https://mozilla.github.io/nunjucks/api#custom-filters):

```javascript
var nunjucks = require('nunjucks');
var filesize = require('nunjucks-filesizeformatfilter');

var env = new nunjucks.Environment();
env.addFilter('filesizeformat', filesize);
```

Use in template:

```jinja
{{ 1230456|filesize }}
```
Outputs `1.2 MB`

## Support

Same support as Nunjucks:
* Node >= v0.10


## License

[MIT Licensed](LICENSE) 
