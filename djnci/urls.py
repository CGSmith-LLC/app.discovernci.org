"""djnci URL Configuration."""

import os
from distutils.util import strtobool

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView

from graphene_django.views import GraphQLView

from django.views.decorators.csrf import csrf_exempt



def template(template_name):
    """Reusable TemplateView to keep things shorter down below."""
    return ensure_csrf_cookie(TemplateView.as_view(template_name=template_name))


urlpatterns = [
    url(r'^$', template(template_name='index.html')),
    url(r'^sitemap.xml$', template(template_name='sitemap.xml')),

    # GraphQL Resources
    url(r'^graphql', csrf_exempt(GraphQLView.as_view(
        graphiql=strtobool(os.getenv('DJNCI_GRAPHIQL', 'false')))
    )),

    # Django Admin panel
    url(r'^a/', admin.site.urls),
    url(r'^froala_editor/', include('froala_editor.urls')),


    # Anything that wasn't caught up above, we defer to index.html
    url(r'^.*/$', template(template_name='index.html'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
