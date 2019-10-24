jupyter-marvinjs
===============================

MarvinJS and CGRtools integration

Installation
------------

To install use pip:

    $ pip install jupyter_marvinjs
    $ jupyter nbextension install --py --user jupyter_marvinjs
    $ jupyter nbextension enable --py --user jupyter_marvinjs

For a development installation (requires npm),

    $ git clone https://github.com//jupyter-marvinjs.git
    $ cd jupyter-marvinjs
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --user jupyter_marvinjs
    $ jupyter nbextension enable --py --user jupyter_marvinjs
