# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-12 01:36
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20180209_1520'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='postcategory',
            options={'verbose_name': 'Post Category', 'verbose_name_plural': 'Post Categories'},
        ),
    ]
