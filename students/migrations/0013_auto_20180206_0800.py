# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-06 14:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0012_auto_20180130_1708'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='dob',
            field=models.DateField(blank=True, help_text='Format: MM-DD-YYYY', null=True, verbose_name='Date of Birth'),
        ),
    ]
