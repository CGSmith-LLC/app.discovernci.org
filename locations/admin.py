from django.contrib import admin

from .models import Building, FieldTrip, Location, VisitSubmission


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


class VisitSubmissionAdmin(admin.ModelAdmin):
    search_fields = ('personal_name', 'email', 'phone', 'comments')
    list_filter = ('location', 'preferred_time', 'created',)
    list_display = ('personal_name', 'email', 'phone', 'location', 'created')


admin.site.register(FieldTrip, FieldTripAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Building)
admin.site.register(VisitSubmission, VisitSubmissionAdmin)
