# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from froala_editor.fields import FroalaField

from .managers import PostManager


class Post(models.Model):

    title = models.CharField(max_length=140)
    slug = models.SlugField(
        max_length=140,
        help_text="Same as the title, but should only contain Letters, \
                    Numbers, Underscores or Hyphens. No spaces."
    )

    category = models.ForeignKey(
        'posts.PostCategory',
        blank=True,
        null=True,
        help_text="The category to publish this post under."
    )

    publish_date = models.DateTimeField(
        help_text="The date you want this Post to be published on. Future \
                    dates will not be visible on the site until day-of."
    )
    expire_date = models.DateTimeField(
        blank=True, null=True,
        help_text="If set, this Post will automatically unpublish from the \
                    site. It will still be available via Admin Panel.")

    post = FroalaField(blank=True)
    short_description = models.TextField(
        blank=True,
        help_text="2 to 3 scentences that describe the gist of this Post. \
                    This is what displays when you share the Post on \
                    Facebook, Twitter..."
    )
    feature_image = models.ImageField(
        blank=True,
        upload_to='parents',
        help_text="An image that meets OpenGraph specification. Used when \
                    sharing the Post on Facebook, Twitter... Image size \
                    should be at least 1200 x 630."
    )

    is_published = models.BooleanField(
        "Publish on Site",
        default=False,
        help_text="Only Published Posts are displayed publicaly on the site."
    )
    is_pinned = models.BooleanField(
        "Pin to top",
        default=False,
        help_text="If pinned, this Post will be listed before Posts in \
                    chronological order."
    )

    created = models.DateTimeField(editable=False, auto_now_add=True)
    modified = models.DateTimeField(
        blank=True,
        help_text="Automatically updates everytime you click Save.",
        auto_now=True
    )

    objects = PostManager()

    class Meta:
        get_latest_by = 'publish_date'
        ordering = ['-is_pinned', '-publish_date']

    def get_absolute_url(self):
        i = self.publish_date
        year = i.strftime('%Y')
        month = i.strftime('%b')
        return '/montessori/parents/%s/%s/%s' % (year, month.lower(), self.slug)

    def get_previous_post(self):
        return self.get_previous_by_publish(is_published=True)

    def get_next_post(self):
        return self.get_next_by_publish(is_published=True)


class PostCategory(models.Model):
    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140)
    is_enabled = models.BooleanField(default=False)
    created = models.DateTimeField(editable=False, auto_now_add=True)
    modified = models.DateTimeField(blank=True, auto_now=True)

    class Meta:
        verbose_name = "Post Category"
        verbose_name_plural = "Post Categories"

    def __str__(self):
        return self.title
