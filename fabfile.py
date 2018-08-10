"""Fabric Config for Django Projects."""

from fabric.api import cd, env, get, lcd, local, put, run

SITE_DIR = '/home/ubuntu/djnci/'
PYTHON_PATH = '/home/ubuntu/.virtualenvs/djnci/bin/'


# Environments ---------------------------------------------------------------

def production():
    """HOST: Use the production server."""
    env.fqdn = 'discovernci.org'
    env.hosts = ['ubuntu@discovernci.org']
    env.site_dir = SITE_DIR
    env.python_path = PYTHON_PATH


# Database -------------------------------------------------------------------

def getdb():
    """Grab a copy of a hosts database for local use."""
    get('%(site_dir)sdb.sqlite3' % env, 'db.sqlite3')


# Media ----------------------------------------------------------------------

def getmedia():
    """Rsync production media directory to local."""
    local('rsync -vraz %(user)s@%(host)s:%(site_dir)smedia .' % env)


# Deployment -----------------------------------------------------------------

def commit():
    # local('git add -A')
    # local('git commit -m "auto commit"')
    local('git push origin master')


def migrations():
    with cd('%(site_dir)s' % env):
        run('%(python_path)spython ./manage.py migrate' % env)


def build_frontend():
    with lcd('./frontend'):
        local('yarn build')
        local('tar jcvf build.tar.bz2 build')


def send_frontend_build():
    put('./frontend/build.tar.bz2', '%(site_dir)sfrontend/' % env)


def unpack_frontend_build():
    with cd('%(site_dir)sfrontend' % env):
        run('rm -rf build')
        run('tar jxvf build.tar.bz2')


def collect_static():
    with cd('%(site_dir)s' % env):
        run('%(python_path)spython ./manage.py collectstatic --noinput' % env)


def take_frontend_live():
    with cd('%(site_dir)sfrontend' % env):
        run('rsync -vr --delete-after build/ live')


def restart_gunicorn():
    run('sudo systemctl stop gunicorn.service && sudo systemctl start gunicorn.service')


def system_check():
    run('tail /tmp/gunicorn_error.log')
    run('curl -sSL -D - https://discovernci.org -o /dev/null')


def deploy():
    build_frontend()
    commit()
    migrations()
    send_frontend_build()
    unpack_frontend_build()
    collect_static()
    take_frontend_live()
    restart_gunicorn()
    system_check()
