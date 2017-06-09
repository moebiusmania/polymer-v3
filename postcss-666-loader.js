const fs = require('fs-extra')
const parse5 = require('parse5')

const postcss = require('postcss')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const postcssReporter = require('postcss-reporter')

const postcssCompile = css => {
  const postcssPlugins = [
    cssnext({
      browsers: ['last 2 version']
    }),
    cssnano({
      autoprefixer: false
    }),
    postcssReporter({
      filter: () => true,
      clearReportedMessages: true
    })
  ];

  return postcss(postcssPlugins).process(css);
}

const fixTemplate = (source, template) =>  {
  return source
            .replace(/<postcss.+<\/postcss>/g, '')
            .replace(/<template>/i, template);
}

const getPostcssSrc = domModule => {
  return domModule.childNodes.reduce((acc, item) => {
    if (item.attrs === undefined || item.attrs.length === 0) {
      return acc;
    }

    const src = item.attrs.find(attr => attr.name === 'src');
    acc = acc.concat(src.value);
    return acc;
  }, [])
}

const getPostcssFromFile = (filePath, resourcePath) => {
  const folderPath = resourcePath.replace('template.html', '');
  return fs.readFile(require('path').join(folderPath, filePath), 'utf8');
}

const processPostcss = (sources, resourcePath) => {
  if (sources.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise(resolve => {
    let postcssRes = [];
    sources.forEach((filePath, i) => {
      getPostcssFromFile(filePath, resourcePath)
        .then(postcssFileContent => postcssCompile(postcssFileContent))
        .then(postcssProcessed => {
          postcssRes[i] = postcssProcessed.css;
          if (i === sources.length - 1) resolve(postcssRes);
        })
        .catch(err => {
          throw err
        })
    })
  })
}

module.exports = function(source) {
  const cb = this.async();
  const resourcePath = this.resourcePath;
  
  if (source.includes('<postcss src') === false) {
    return cb(null, source);
  }

  const domModule = parse5.parse(source).childNodes[0].childNodes[1].childNodes[0];
  const sources = getPostcssSrc(domModule);
  processPostcss(sources, resourcePath)
    .then(res => {
      const template = `
      <template> <style>${res.join(' ')}</style>
      `
      const newSource = fixTemplate(source, template);
      cb(null, newSource);
    })
    .catch(err => cb(err))
};