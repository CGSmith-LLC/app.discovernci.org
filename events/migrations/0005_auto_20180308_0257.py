# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-08 08:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_ditwticketpurchase_stripe_customer_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ditwticketpurchase',
            name='stripe_token',
            field=models.CharField(blank=True, max_length=75),
        ),
    ]
