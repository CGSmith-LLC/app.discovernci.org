# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-06 23:20
from __future__ import unicode_literals

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DitwTicketPurchase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rsvp_token', models.CharField(max_length=35)),
                ('name', models.CharField(max_length=75)),
                ('email', models.CharField(max_length=75)),
                ('phone', models.CharField(max_length=25)),
                ('newsletter_subscribe', models.BooleanField(default=True)),
                ('ticket_qty', models.IntegerField()),
                ('wants_cabana', models.CharField(max_length=3)),
                ('wants_valet_parking', models.CharField(max_length=3)),
                ('additional_valet_count', models.IntegerField(default=0, null=True)),
                ('defer_guest_list', models.BooleanField(default=False)),
                ('guest_list', jsonfield.fields.JSONField(blank=True, null=True)),
                ('has_vegetarian_restriction', models.BooleanField(default=False)),
                ('vegetarian_count', models.IntegerField(default=0, null=True)),
                ('has_vegan_restriction', models.BooleanField(default=False)),
                ('vegan_count', models.IntegerField(default=0, null=True)),
                ('has_dairy_restriction', models.BooleanField(default=False)),
                ('dairy_count', models.IntegerField(default=0, null=True)),
                ('has_gluten_restriction', models.BooleanField(default=False)),
                ('gluten_count', models.IntegerField(default=0, null=True)),
                ('has_food_allergies', models.CharField(max_length=3)),
                ('food_allergen_notes', models.TextField()),
                ('is_parent_guardian', models.CharField(max_length=3)),
                ('wants_childcare', models.CharField(max_length=3)),
                ('childcare_children', jsonfield.fields.JSONField(blank=True, null=True)),
                ('stripe_token', models.CharField(max_length=75)),
                ('payment_method', models.CharField(choices=[('credit', 'Credit Card'), ('check', 'Check'), ('onsite', 'On-site, day of event')], default='credit', max_length=10)),
                ('retain_payment_info', models.BooleanField(default=False)),
                ('total_price', models.IntegerField(null=True)),
                ('additional_donation', models.IntegerField(null=True)),
                ('guid', models.CharField(blank=True, max_length=140)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-modified'],
                'get_latest_by': 'created',
            },
        ),
    ]
