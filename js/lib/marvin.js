const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');


const MarvinJSModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name: 'MarvinJSModel',
        _view_name: 'MarvinJSView',
        _model_module: 'jupyter-marvinjs',
        _view_module: 'jupyter-marvinjs',
        _model_module_version: '0.2.0',
        _view_module_version: '0.2.0',
        _value: ''
    })
});


const MarvinJSView = widgets.DOMWidgetView.extend({
    render: function () {
        const model = this.model;
        const marvin = document.createElement('iframe');

        marvin.id = 'marvinjs_sketch';
        marvin.src = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/jupyter-marvinjs/mjs/editor.html';
        marvin.width = '900';
        marvin.height = '450';
        marvin.setAttribute('data-toolbars', 'reaction');

        function marvin_events() {
            const sketcher = marvin.contentWindow.marvin.sketcherInstance;
            const button = {
                'name': 'Upload',
                'image-url': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAArlBMVEUAAAAAAAA' +
                             'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                             'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                             'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeyFOlAAAAAXRSTlMAQObYZgAAAAFiS0' +
                             'dEAIgFHUgAAAAJcEhZcwAACcUAAAnFAYeExPQAAAAHdElNRQfjCQwVADLJ+C5eAAABUklEQVR42u3ZQWrDMBC' +
                             'F4TlMIFun2JD//hdLodBFLamWrMlL2jc7WWbmi2LkEY44FRsQulj4ClV9vkNdXyMArQC0AtAKQCsArQC0AtAK' +
                             'QCsArQC0AtAKQCsArQC0AtAKQCsArWBfojpIESz7AvVRhqCQvjGcD9gK2Vvj6YJS7uaFXECtLX8WoH4uSHwIC' +
                             'olpX1vTj2HFX5u3Eezzlpc7cTP+ua61/zth/V/zcGqAAQZkAY63ea25bbRZ7Ok06zMfzSzXevlLV69bnViGW2' +
                             'bmAH5Ncxvv/I8AtuFTwyTAgTT3KUfvEwDeFrDOeQjHASEGHN2IkgBrx1Z8GpDxMjLAAAMMMMAAAwwwwAADDDD' +
                             'AAAMMMODvAaLzO3EmIDSAGLt7IqDvO3EKoCcMMMAAAwwwwAADDDDAgPcCZIcBBrwmIP4RoLJTXNWAUNePuInr' +
                             'f8b92eUfelqXBAH/Tb4AAAAASUVORK5CYII=',
                'toolbar': 'N'
            };

            // JavaScript -> Python update
            sketcher.addButton(button, async () => {
                const mrv = await sketcher.exportStructure('mrv');
                if (mrv !== '<cml><MDocument></MDocument></cml>') {
                    model.set('_value', mrv);
                    model.save_changes();
                }
            });

            // Python -> JavaScript update
            model.on('change:_value', () => sketcher.importAsMrv(model.get('_value')), this);
        }
        marvin.onload = () => marvin.contentWindow.marvin.onReady(marvin_events);
        this.el.appendChild(marvin);
    }
});


module.exports = {
    MarvinJSModel : MarvinJSModel,
    MarvinJSView : MarvinJSView
};
