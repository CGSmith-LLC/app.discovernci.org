"""
Django settings for djnci project.

Generated by 'django-admin startproject' using Django 1.9.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
from distutils.util import strtobool
import raven

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = strtobool(os.getenv('DJNCI_DEBUG', 'false'))

ALLOWED_HOSTS = ['.discovernci.org', '.nciw.org', 'localhost', 'djnci.local']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_extensions',
    'django_filters',
    'django_measurement',
    'froala_editor',
    'multiselectfield',
    'graphene_django',
    'raven.contrib.django.raven_compat',

    'accounts.apps.AccountsConfig',
    'events.apps.EventsConfig',
    'locations.apps.LocationsConfig',
    'posts.apps.PostsConfig',
    'students.apps.StudentsConfig'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'graphql_jwt.middleware.JWTMiddleware',
]

ROOT_URLCONF = 'djnci.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend/build/'),
            # os.path.join(BASE_DIR, 'templates/'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djnci.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# A list of authentication backend classes (as strings) to use when
# attempting to authenticate a user.
AUTHENTICATION_BACKENDS = [
    # 'graphql_jwt.backends.JWTBackend',
    'django.contrib.auth.backends.ModelBackend',
]
AUTH_USER_MODEL = 'accounts.AccountProfile'
LOGIN_URL = '/login'

GRAPHENE = {
    'SCHEMA': 'djnci.schema.schema',
    # 'MIDDLEWARE': [
    #     'graphene_django.debug.DjangoDebugMiddleware',
    # ]
}

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'}
]

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Chicago'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    # os.path.join(BASE_DIR, 'static/'),
    os.path.join(BASE_DIR, 'frontend/build/static/'),
)
STATIC_ROOT = os.path.join(BASE_DIR, 'static_collected')

# Media files (those that are uploaded by users) via admin panel, api...
MEDIA_ROOT = os.path.join(BASE_DIR, 'assets/media')
MEDIA_URL = '/media/'

# A list of all the people who get code error notifications. Details of
# exceptions raised in the request/response cycle are emailed to these addresses.
ADMINS = [
    ('Chris Smith', 'chris@cgsmith.net'),
]

# All email sent from site is done through our SendGrid account.
# Credentials cited here can also be used on their site (https://sendgrid.com/)
DEFAULT_FROM_EMAIL = "Nature's Classroom <office@discovernci.org>"
SERVER_EMAIL = DEFAULT_FROM_EMAIL
if DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
else:
    EMAIL_HOST = os.environ['SMTP_HOST']
    EMAIL_HOST_PASSWORD = os.environ['SMTP_PASSWORD']
    EMAIL_HOST_USER = os.environ['SMTP_USER']

FROALA_UPLOAD_PATH = 'froala_editor/uploads'
FROALA_EDITOR_OPTIONS = {
    'imageResize': True,
    'spellcheck': True,
    'borderColor': "#eee",
    'width': 540,
    'heightMin': 300,
    'toolbarButtons': [
        'fullscreen',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        # 'subscript',
        # 'superscript',
        '|',
        'fontFamily',
        'fontSize',
        'color',
        'inlineStyle',
        'paragraphStyle',
        '|',
        'paragraphFormat',
        'align',
        'formatOL',
        'formatUL',
        'outdent',
        'indent',
        'quote',
        '-',
        'insertLink',
        'insertImage',
        'insertVideo',
        'insertFile',
        'insertTable',
        '|',
        'emoticons',
        'specialCharacters',
        'insertHR',
        # 'selectAll',
        'clearFormatting',
        '|',
        'print',
        'spellChecker',
        'help',
        'html',
        '|',
        'undo',
        'redo'
    ]
}
FROALA_EDITOR_PLUGINS = (
    'align',
    'char_counter',
    'code_beautifier',
    'code_view',
    'colors',
    'draggable',
    'emoticons',
    'entities',
    'file',
    # 'font_family',
    'font_size',
    # 'fullscreen',
    'image_manager',
    'image',
    # 'inline_style',
    'line_breaker',
    'link',
    'lists',
    # 'paragraph_format',
    # 'paragraph_style',
    'quick_insert',
    'quote',
    # 'save',
    'table',
    'url',
    'video',
    # 'word_paste',
)

if DEBUG:
    STRIPE_PUBLIC_KEY = os.environ['STRIPE_TEST_PUBLIC_KEY']
    STRIPE_SECRET_KEY = os.environ['STRIPE_TEST_SECRET_KEY']
    STAFF_TO_LIST = ['chris@cgsmith.net']
    TECH_SUPPORT_TO_LIST = ['chris@cgsmith.net']
else:
    STRIPE_PUBLIC_KEY = os.environ['STRIPE_LIVE_PUBLIC_KEY']
    STRIPE_SECRET_KEY = os.environ['STRIPE_LIVE_PRIVATE_KEY']
    STAFF_TO_LIST = [
        'mirko@discovernci.org',
        'office@nciw.org',
        'geoffrey@nciw.org',
    ]
    TECH_SUPPORT_TO_LIST = [
        'mirko@discovernci.org',
        'office@nciw.org',
    ]
    RAVEN_CONFIG = {
        'dsn': os.environ['SENTRY_DSN_URL'],
        # If you are using git, you can also automatically configure the
        # release based on the git info.
        'release': raven.fetch_git_sha(BASE_DIR)
    }
