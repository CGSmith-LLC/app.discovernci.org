# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-08 11:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_ditwticketpurchase_qrcode_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ditwticketpurchase',
            name='stripe_token',
            field=models.CharField(blank=True, max_length=75, null=True),
        ),
    ]
