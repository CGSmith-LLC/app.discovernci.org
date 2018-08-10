import datetime as dt

from django.db.models import Manager
from django.utils.timezone import localtime, now


class EventManager(Manager):

    def all(self):
        return self.get_queryset()

    def public(self):
        return self.get_queryset().filter(
            is_published=True,
            start_date__gte=localtime(now()).replace(hour=0, minute=0, second=0, microsecond=0)
        ).order_by('start_date')

    def published(self):
        return self.get_queryset().filter(
            is_published=True,
        ).order_by('start_date')

    def previous(self):
        return self.get_queryset().filter(
            is_published=True,
            end_date__lt=dt.date.today()
        ).order_by('start_date')

    def upcoming(self):
        return self.get_queryset().filter(
            is_published=True,
            end_date__gte=dt.datetime.now()
        ).order_by('start_date')

    def featured(self):
        return self.get_queryset().filter(
            is_featured=True,
            is_published=True,
            end_date__gte=dt.datetime.now()
        ).order_by('start_date')
