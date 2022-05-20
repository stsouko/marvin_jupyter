from __future__ import print_function
from setuptools import setup, find_packages
import os
from os.path import join as pjoin
from distutils import log

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)


here = os.path.dirname(os.path.abspath(__file__))

log.set_verbosity(log.DEBUG)
log.info('setup.py entered')
log.info('$PATH=%s' % os.environ['PATH'])

name = 'jupyter_marvinjs'
LONG_DESCRIPTION = 'MarvinJS and Chython integration'

# Get jupyter_marvinjs version
version = get_version(pjoin(name, '_version.py'))

js_dir = pjoin(here, 'js')

# Representative files that should exist after a successful build
jstargets = [
    pjoin(js_dir, 'dist', 'index.js'),
]

data_files_spec = [
    ('share/jupyter/nbextensions/jupyter-marvinjs', 'marvin_jupyter/nbextension', '*.*'),
    ('share/jupyter/labextensions/jupyter-marvinjs', 'marvin_jupyter/labextension', '**'),
    ('share/jupyter/labextensions/jupyter-marvinjs', '.', 'install.json'),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'jupyter-marvinjs.json'),
]

cmdclass = create_cmdclass('jsdeps', data_files_spec=data_files_spec)
cmdclass['jsdeps'] = combine_commands(
    install_npm(js_dir, npm=['yarn'], build_cmd='build:prod'), ensure_targets(jstargets),
)

setup_args = dict(
    name=name,
    version=version,
    description='MarvinJS and Chython integration',
    long_description=LONG_DESCRIPTION,
    include_package_data=True,
    install_requires=[
        'ipywidgets>=7.6.0', 'chython'
    ],
    packages=find_packages(),
    zip_safe=False,
    cmdclass=cmdclass,
    author='Ramil Nugmanov',
    author_email='nougmanoff@protonmail.com',
    url='https://github.com/stsouko/marvin_jupyter',
    keywords=[
        'ipython',
        'jupyter',
        'widgets',
    ],
    classifiers=[
        'Framework :: IPython',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Multimedia :: Graphics',
        'Programming Language :: Python :: 3.8',
    ],
)

setup(**setup_args)
