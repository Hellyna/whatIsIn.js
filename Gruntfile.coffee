module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      all:
        files: [
          expand: true
          cwd: 'src'
          src: '**/*.coffee'
          dest: 'lib'
          ext: '.js'
        ]
        options:
          bare: true
          spawn: false
    mochaTest:
      test:
        options:
          reporter: 'spec'
          captureFile: 'test/test.log'
          quiet: false
          clearRequireCache: false
        src: ['test/**/*.coffee']
    watch:
      src:
        files: 'src/**/*.coffee'
        tasks: [
          'coffee:all'
          'mochaTest:test'
        ]
      test:
        files: 'test/**/*.coffee'
        tasks: [
          'mochaTest:test'
        ]
      options:
        spawn: false

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', [
    'coffee:all'
    'mochaTest:test'
  ]
