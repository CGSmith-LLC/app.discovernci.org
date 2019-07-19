from django.contrib import admin

from .models import Reminder, ReminderAddresses, ReminderTemplates

admin.site.register(Reminder)
admin.site.register(ReminderAddresses)
admin.site.register(ReminderTemplates)
