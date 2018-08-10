from django.contrib import admin

from posts.models import Post, PostCategory


class PostAdmin(admin.ModelAdmin):
    search_fields = ('title', 'post', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_published', 'publish_date', 'category')
    readonly_fields = ('modified', )
    list_display = (
        'title',
        'modified',
        'publish_date',
        'is_pinned',
        'is_published'
    )
    fieldsets = (
        ('', {
            'fields': (
                'category',
                'title',
                'slug',
                'publish_date',
                'post',
                'is_pinned',
                'is_published'
            )
        }),
        ('Additional Settings', {
            'classes': ('collapse',),
            'fields': (
                'short_description',
                'feature_image',
                'expire_date',
                'modified'
            )
        }),
    )

    # class Media:
    #     js = ('js/admin/my_own_admin.js',)
    #     css = {'all': ('django-admin.css',)}


admin.site.register(Post, PostAdmin)
admin.site.register(PostCategory)
# admin.site.unregister(Post)
