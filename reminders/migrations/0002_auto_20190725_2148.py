# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-07-26 02:48
from __future__ import unicode_literals

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reminders', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reminder',
            options={'ordering': ['-send_date']},
        ),
        migrations.AlterField(
            model_name='reminder',
            name='html',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
        migrations.AlterField(
            model_name='reminderaddresses',
            name='reminder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reminder_addresses', to='reminders.Reminder'),
        ),
    ]
