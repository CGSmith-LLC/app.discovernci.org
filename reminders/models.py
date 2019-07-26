# -*- coding: utf-8 -*-
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
# from django.template.defaultfilters import slugify

# from jsonfield import JSONField

from .managers import ReminderManager


class Reminder(models.Model):
    fieldtrip = models.ForeignKey('locations.FieldTrip', blank=False, null=False)
    subject = models.CharField(max_length=128, blank=False)
    html = RichTextUploadingField(blank=False)
    send_date = models.DateField()
    sent = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = ReminderManager()

    class Meta:
        ordering = ['-send_date', ]

    def __str__(self):
        return '%s - Send on: %s' % (self.fieldtrip, self.send_date)


class ReminderAddresses(models.Model):
    reminder = models.ForeignKey(Reminder, blank=False, null=False, related_name="reminder_addresses")
    name = models.CharField(max_length=140, blank=False)
    email = models.EmailField(blank=False)


class ReminderTemplates(models.Model):
    subject = models.CharField(max_length=128, blank=False)
    template = models.TextField(blank=False)
