# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-07-04 21:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0029_auto_20190701_1200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicalrecord',
            old_name='guardian_supplies_food',
            new_name='dietary_caution',
        ),
    ]
