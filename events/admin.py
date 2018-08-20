from django.contrib import admin

from events.models import DitwTicketPurchase, Event


class DitwTicketPurchaseAdmin(admin.ModelAdmin):
    search_fields = ('name', 'email', 'phone')
    list_filter = (
        'defer_guest_list',
        'has_vegetarian_restriction',
        'has_vegan_restriction',
        'has_dairy_restriction',
        'has_gluten_restriction',
        'is_parent_guardian',
        'modified',
        'payment_method',
        'received_manual_payment'
    )
    list_display = (
        'name',
        'last_name',
        'email',
        'phone',
        'ticket_qty',
        'ticket_enhancer',
        'is_parent_guardian',
        'wants_cabana',
        'wants_childcare',
        'wants_valet_parking',
        'payment_method',
        'stripe_token',
        'created'
    )


class EventAdmin(admin.ModelAdmin):
    search_fields = ('title', 'body', 'teaser')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_published', 'in_calendar', 'is_featured', 'start_date')
    list_display = ('title', 'modified', 'start_date', 'end_date',
                    'is_published', 'is_featured', 'is_main_feature')
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'title',
                'slug',
                'start_date',
                'end_date'
            )
        }),
        ('Event Details', {
            'classes': ('collapse',),
            'fields': (
                'feature_image',
                'location',
                'teaser',
                'body',
                'physical_flyer'
            )
        }),
        ('Settings', {
            'fields': (
                'custom_url',
                'display_in_menu',
                'display_menu_title',
                'is_featured',
                'is_main_feature',
                'sort_order',
                'in_calendar',
                'is_published'
            )
        }),
    )


admin.site.register(Event, EventAdmin)
admin.site.register(DitwTicketPurchase, DitwTicketPurchaseAdmin)
