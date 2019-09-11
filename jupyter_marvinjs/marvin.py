from CGRtools.files import MRVread, MRVwrite
from io import BytesIO, StringIO
from ipywidgets import DOMWidget, register
from traitlets import Unicode


@register
class MarvinJS(DOMWidget):
    def __init__(self, marvin_url):
        super().__init__()
        self._marvin_url = marvin_url

    _view_name = Unicode('MarvinJSView').tag(sync=True)
    _view_module = Unicode('jupyter-marvinjs').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_name = Unicode('MarvinJSModel').tag(sync=True)
    _model_module = Unicode('jupyter-marvinjs').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    _value = Unicode('').tag(sync=True)
    _marvin_url = Unicode('').tag(sync=True)

    @property
    def structure(self):
        if self._value:
            with BytesIO(self._value.encode()) as f, MRVread(f) as r:
                return next(r, None)

    @structure.setter
    def structure(self, data):
        with StringIO() as f:
            with MRVwrite(f) as w:
                w.write(data)
            data = f.getvalue()
        self._value = data


__all__ = ['MarvinJS']
