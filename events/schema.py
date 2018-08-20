from time import strptime

import graphene
from froala_editor.fields import FroalaField
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from jsonfield import JSONField

from .models import Event


@convert_django_field.register(JSONField)
def convert_JSONField(field, registry=None):
    return graphene.String()


@convert_django_field.register(FroalaField)
def convert_froalafield_to_string(field, registry=None):
    return graphene.String(description=field.help_text, required=not field.null)


class EventType(DjangoObjectType):
    get_absolute_url = graphene.String()

    def resolve_get_absolute_url(self, _args, *_kwargs):
        return self.get_absolute_url()

    class Meta:
        model = Event


class Query(object):
    events = graphene.List(
        EventType,
        limit=graphene.Int(),
        timeline=graphene.String()
    )
    event = graphene.Field(
        EventType,
        year=graphene.Int(),
        month=graphene.String(),
        slug=graphene.String()
    )

    def resolve_events(self, info, limit=None, timeline='upcoming'):
        qs = None
        if timeline == 'previous':
            qs = Event.objects.previous()
        elif timeline == 'upcoming':
            qs = Event.objects.upcoming()
        elif timeline == 'public':
            qs = Event.objects.public()

        if limit:
            qs = qs[:limit]
        return qs

    def resolve_event(self, info, **kwargs):
        year = kwargs.get('year')
        month = kwargs.get('month')
        slug = kwargs.get('slug')

        month_num = strptime(month, '%b').tm_mon

        if year and month and slug:
            return Event.objects.get(
                is_published=True,
                start_date__year=year,
                start_date__month=month_num,
                slug=slug
            )

        return None
