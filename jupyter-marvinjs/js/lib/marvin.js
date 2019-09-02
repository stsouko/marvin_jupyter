var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var MarvinJSModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'MarvinJSModel',
        _view_name : 'MarvinJSView',
        _model_module : 'jupyter-marvinjs',
        _view_module : 'jupyter-marvinjs',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _value : '',
        _marvin_url : ''
    })
});


// Custom View. Renders the widget model.
var MarvinJSView = widgets.DOMWidgetView.extend({
    render: function() {
        this.marvin = document.createElement('iframe');
        this.marvin.id = 'marvinjs_sketch';
        this.marvin.src = this.model.get('_marvin_url');
        this.marvin.width = '900';
        this.marvin.height = '450';
        this.marvin.setAttribute('data-toolbars', 'reaction');

        // JavaScript -> Python update
        async function marvin_export() {
            let mrv = await this.sketcher.exportStructure('mrv');
            this.model.set('_value', mrv);
            this.model.save_changes();
        }
        function marvin_molchange() {
            const this_bind = {sketcher: this.marvin.sketcherInstance, model: this.model};
            this.marvin.sketcherInstance.on('molchange', marvin_export.bind(this_bind));
        }
        function marvin_ready() {
            const this_bind = {marvin: this.marvin.contentWindow.marvin, model: this.model};
            this.marvin.contentWindow.marvin.onReady(marvin_molchange.bind(this_bind));
        }
        this.marvin.onload = marvin_ready.bind(this);

        // Python -> JavaScript update
        this.model.on('change:_value', function() {
            this.marvin.contentWindow.marvin.sketcherInstance.importAsMrv(this.model.get('_value'));
        }, this);

        this.el.appendChild(this.marvin);
    }
});


module.exports = {
    MarvinJSModel : MarvinJSModel,
    MarvinJSView : MarvinJSView
};
