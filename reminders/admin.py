from django.contrib import admin

from .models import Reminder, ReminderAddresses, ReminderTemplates


class ReminderAddressInline(admin.TabularInline):
    model = ReminderAddresses
    verbose_name_plural = "Email Recipients"
    extra = 0


class ReminderAdmin(admin.ModelAdmin):
    search_fields = ('name', 'email')
    list_filter = ('sent', 'send_date')
    inlines = [
        ReminderAddressInline,
    ]


admin.site.register(Reminder, ReminderAdmin)
admin.site.register(ReminderAddresses)
admin.site.register(ReminderTemplates)
