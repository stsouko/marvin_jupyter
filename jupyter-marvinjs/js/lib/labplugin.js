var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter-marvinjs',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-marvinjs',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

