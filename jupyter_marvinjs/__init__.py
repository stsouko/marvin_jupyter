from ._version import version_info, __version__

from .marvin import *


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-marvinjs',
        'require': 'jupyter-marvinjs/extension'
    }]
