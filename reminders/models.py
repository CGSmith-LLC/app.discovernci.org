# -*- coding: utf-8 -*-
from django.db import models
from django.template.defaultfilters import slugify

from jsonfield import JSONField

from .managers import ReminderManager


class Reminder(models.Model):

    fieldtrip_id = models.ForeignKey(
        'locations.FieldTrip',
        blank=False,
        null=False
    )
    subject = models.CharField(max_length=128,blank=False)
    html = models.TextField(blank=False)
    send_date = models.DateField()
    sent = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


class ReminderAddresses(models.Model):

    reminder_id = models.ForeignKey(
        'reminders.Reminder',
        blank=False,
        null=False
    )
    name = models.CharField(max_length=140,blank=False)
    email = models.EmailField(blank=False)


class ReminderTemplates(models.Model):

    subject = models.CharField(max_length=128,blank=False)
    template = models.TextField(blank=False)