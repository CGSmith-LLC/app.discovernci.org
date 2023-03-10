# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-13 18:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0006_auto_20180205_1857'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='address_url',
            field=models.URLField(blank=True, help_text='If provided, the street address will click-through to this                     URL. Usually a Google Maps URL.'),
        ),
    ]
