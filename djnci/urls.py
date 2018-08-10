"""djnci URL Configuration."""

import os
from distutils.util import strtobool

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import RedirectView, TemplateView

from graphene_django.views import GraphQLView

from locations.views import PostVisitSubmission


def rewrite(url):
    """Rewrite URL pattern and redirect the user."""
    return RedirectView.as_view(url=url, permanent=True)


def template(template_name):
    """Reusable TemplateView to keep things shorter down below."""
    return ensure_csrf_cookie(TemplateView.as_view(template_name=template_name))


urlpatterns = [
    url(r'^$', template(template_name='index.html')),
    url(r'^sitemap.xml$', template(template_name='sitemap.xml')),

    # GraphQL Resources
    url(r'^graphql', GraphQLView.as_view(
        graphiql=strtobool(os.getenv('DJNCI_GRAPHIQL', 'false'))
    )),

    # Django Admin panel
    url(r'^a/', admin.site.urls),
    url(r'^froala_editor/', include('froala_editor.urls')),

    # Manual POST endpoints
    url(r'^post/visit/$', PostVisitSubmission.as_view()),

    # URL Rewrites
    # url(r'^admin',       rewrite('https://discovernci.org/dashboardadmin')),
    # url(r'^log-in.aspx', rewrite('https://discovernci.org/dashboard')),

    # Static routes for SEO (html generated via react-snapshot)
    # TODO: Nginx should do this instead if the url/index.html exists,
    #       load it, otherwise defer to root index
    url(r'^environmental/$',                         template('environmental/index.html')),
    url(r'^environmental/prepare/$',                 template('environmental/prepare/index.html')),
    url(r'^environmental/angelus-oaks-california/$', template('environmental/angelus-oaks-california/index.html')),
    url(r'^environmental/ben-lomond-california/$',   template('environmental/ben-lomond-california/index.html')),
    url(r'^environmental/bruceville-texas/$',        template('environmental/bruceville-texas/index.html')),
    url(r'^environmental/new-ulm-texas/$',         template('environmental/new-ulm-texas/index.html')),
    url(r'^environmental/lake-geneva-wisconsin/$',   template('environmental/lake-geneva-wisconsin/index.html')),
    url(r'^environmental/a-day-in-the-life/$',       template('environmental/a-day-in-the-life/index.html')),
    url(r'^montessori/childrens-house/$',            template('montessori/childrens-house/index.html')),
    url(r'^events/dinner-in-the-woods/$',            template('events/dinner-in-the-woods/index.html')),

    # Used for Stripe's Apple Pay integration
    url(r'^.well-known/apple-developer-merchantid-domain-association', template(
        'apple-developer-merchantid-domain-association.txt'
    )),

    # Anything that wasn't caught up above, we defer to index.html
    url(r'^.*/$', template(template_name='index.html'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
