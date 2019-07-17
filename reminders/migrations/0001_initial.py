# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-07-17 23:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('locations', '0014_auto_20180814_0130'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=128)),
                ('html', models.TextField()),
                ('send_date', models.DateField()),
                ('sent', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('fieldtrip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='locations.FieldTrip')),
            ],
        ),
        migrations.CreateModel(
            name='ReminderAddresses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140)),
                ('email', models.EmailField(max_length=254)),
                ('reminder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reminders.Reminder')),
            ],
        ),
        migrations.CreateModel(
            name='ReminderTemplates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=128)),
                ('template', models.TextField()),
            ],
        ),
    ]
