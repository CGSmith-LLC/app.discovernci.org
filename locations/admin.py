from django import forms
from django.contrib import admin
from django.utils.functional import curry

from reminders.models import Reminder
from .models import FieldTrip, Location

email_copy = """
Dear all –<br /><br />

Attached you will find instructional documents for our NCI online registration process. Each guardian will create an account through our website in order to input his/her student’s personal and medical information.<br /><br />

Your role will be to ensure that all participating student information has been submitted.<br /><br />

In order to do so, you will need to create an account of your own.<br /><br />

>>Note: As of February 1st, 2018 this is a NEW portal. All previously entered accounts are no longer active. Everyone will be treated as a new user and will need to create a new account. This is a one-time event.<br /><br />

Both teachers and parents/guardians will access the NCI online registration portal at: https://app.discovernci.org<br /><br />

We have pre-approved the following teachers for this trip:<br /><br />

[...]<br /><br /><br />

If we should pre-approve additional teacher(s), please provide us with their name(s) and email address(es). We have implemented a process to ensure only teachers that are attending the field trip have access to the pertinent information related to the trip. Any teacher that has not been pre-approved and tries to register online will have to wait to receive approval from one of our NCI administrators. In this case, one of our administrators would reach out to the lead teacher on the trip or the head of school/principal to confirm whether the teacher who has requested approval should be approved. This process will help ensure your students’ information is protected.<br /><br />

Our Education Director, Britta Casey, will be reaching out to you 2-3 weeks prior of your trip to help you organize your housing, field group assignments and curriculum.<br />

Should you or any of your parents have any questions relating to the online registration process, please let me know. Any questions in regards to details regarding your experience, please direct those to Britta.<br /><br />

**Nature’s Classroom values the privacy and protection of each student’s personal information. Our security measures are twofold. First, we utilize an active SSL Certificate which provides a secure connection between the parent/administrator inputting the personal information and the server that stores the information. Secondly, our server hosting company performs an internal cyber security audit for all its websites and features a pair of high availability load balanced firewalls. These, together, will provide the needed security measures to ensure information is submitted, accessed and stored in a secure and confidential manner.**<br /><br />

We look forward to seeing you this coming fall!<br /><br />
Have a great summer :)<br /><br />

Thanks!<br /><br />
"""

subject = "NCI Online Registration"


class ReminderFormSet(forms.models.BaseInlineFormSet):
    @property
    def empty_form(self):
        form = super(ReminderFormSet, self).empty_form
        # you can access self.instance to get the model parent object
        form.fields['subject'].initial = subject
        form.fields['html'].initial = email_copy
        return form


class ReminderInline(admin.TabularInline):
    model = Reminder
    formset = ReminderFormSet
    verbose_name_plural = "Email Reminders"
    readonly_fields = ('sent',)
    extra = 1

    def get_formset(self, request, obj=None, **kwargs):
        initial = []
        if request.method == "GET":
            initial.append({
                'subject': subject,
                'html': email_copy,
            })
        formset = super(ReminderInline, self).get_formset(request, obj, **kwargs)
        formset.__init__ = curry(formset.__init__, initial=initial)
        return formset


class LocationAdmin(admin.ModelAdmin):
    readonly_fields = ['guid', 'created', 'modified', 'slug']
    search_fields = (
        'name',
        'short_name',
        'address',
        'open_graph_desc',
        'body',
        'sidebar_json',
        'guid'
    )
    list_filter = ('is_active', 'location_type', 'open_enrollment')
    list_display = (
        'name',
        'location_type',
        'primary_contact',
        'phone',
        'is_active',
        'open_enrollment',
        'rank',
        'modified'
    )
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'name',
                'short_name',
                'location_type',
                'address',
                'address_url',
                'phone',
                'primary_contact',
                'is_active',
                'open_enrollment',
                'fact_sheet_file',
                'floor_plan_file',
                'food_menu_file',
            )
        }),
        ('Social / Open Graph', {
            'classes': ('collapse',),
            'fields': (
                'open_graph_desc',
                'open_graph_image'
            )
        }),
        ('Website Settings', {
            'classes': ('collapse',),
            'fields': (
                'hero_image',
                'bg_image',
                'body',
                'sidebar_json',
                'rank'
            )
        }),
        ('System Settings', {
            'classes': ('collapse',),
            'fields': (
                'slug',
                'guid',
                'created',
                'modified'
            )
        })
    )


class FieldTripAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_filter = ('building_list', 'is_enabled', 'created', 'school_list')
    list_display = ('name', 'location', 'start_date', 'end_date', 'is_enabled', 'modified')
    readonly_fields = ['guid', 'created', 'modified']
    filter_horizontal = ('school_list', 'student_list')
    inlines = [
        ReminderInline,
    ]
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'name',
                'location',
                ('reg_start_date', 'reg_end_date'),
                ('start_date', 'end_date'),
                'is_enabled',
                # 'customer_list',
                'school_list'
            )
        }),
        ('Housing', {
            'classes': ('collapse',),
            'fields': (
                'building_list',
                'assignment'
            )
        }),
        # ('Legacy Portal Data', {
        #     'classes': ('collapse',),
        #     'fields': (
        #         'legacy_fieldtrip_id',
        #         'legacy_school_id',
        #         'legacy_class_id',
        #         'legacy_teacher_id',
        #         'legacy_finalized'
        #     )
        # }),
        ('Settings', {
            'classes': ('collapse',),
            'fields': (
                'expected_head_count',
                'student_list',
                'guid',
                'created',
                'modified'
            )
        })
    )

    # def get_changeform_initial_data(self, request):
    #     return {'name': 'custom_initial_value'}


admin.site.register(FieldTrip, FieldTripAdmin)
admin.site.register(Location, LocationAdmin)
