jupyter-marvinjs
===============================

MarvinJS and CGRtools integration

Installation
------------

To install use pip:

    $ pip install jupyter_marvinjs
    $ jupyter nbextension enable --py --sys-prefix jupyter_marvinjs

To install for jupyterlab

    $ jupyter labextension install jupyter_marvinjs

For a development installation (requires npm),

    $ git clone https://github.com//jupyter-marvinjs.git
    $ cd jupyter-marvinjs
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_marvinjs
    $ jupyter nbextension enable --py --sys-prefix jupyter_marvinjs
