# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-09-30 14:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_schoolfile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schoolfile',
            name='url',
        ),
    ]
