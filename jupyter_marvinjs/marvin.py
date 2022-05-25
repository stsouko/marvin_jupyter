from chython.files import MRVRead, MRVWrite
from io import BytesIO, StringIO
from ipywidgets import DOMWidget, register
from traitlets import Unicode


@register
class MarvinJS(DOMWidget):
    # Name of the widget view class in front-end
    _view_name = Unicode('MarvinJSView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('MarvinJSModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('jupyter-marvinjs').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('jupyter-marvinjs').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.2.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.2.0').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
    _value = Unicode('').tag(sync=True)

    @property
    def structure(self):
        if self._value:
            with BytesIO(self._value.encode()) as f, MRVRead(f) as r:
                return next(r, None)

    @structure.setter
    def structure(self, data):
        with StringIO() as f:
            with MRVWrite(f) as w:
                w.write(data)
            data = f.getvalue()
        self._value = data


__all__ = ['MarvinJS']
