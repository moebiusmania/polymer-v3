const path = require('path')
const chokidar = require('chokidar')
const touch = require('touch')

const watcher = chokidar.watch('./components/**/*.postcss', {
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
})

 watcher
  .on('add', sourcePath => {        
    console.log('Added postcss files to watch...', sourcePath)
  })
  .on('change', sourcePath => {
    const folderPath = sourcePath.replace('style.postcss', '')
    touch(path.join(folderPath, 'template.html'))    
  })
  .on('unlink', sourcePath => console.log('REMOVED', sourcePath))
