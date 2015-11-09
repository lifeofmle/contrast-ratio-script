module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'script/colour.gs',
      'tests/colourTest.js'
    ]
  });
};