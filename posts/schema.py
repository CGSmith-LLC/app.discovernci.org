from time import strptime

import graphene
from graphene_django import DjangoObjectType

from .models import Post


class PostType(DjangoObjectType):
    get_absolute_url = graphene.String()

    def resolve_get_absolute_url(self, _args, *_kwargs):
        return self.get_absolute_url()

    class Meta:
        model = Post


class Query(object):
    posts = graphene.List(
        PostType,
        limit=graphene.Int()
    )
    post = graphene.Field(
        PostType,
        year=graphene.Int(),
        month=graphene.String(),
        slug=graphene.String(),
        category=graphene.String()
    )

    def resolve_posts(self, info, **kwargs):
        limit = kwargs.get('limit')
        if limit:
            return Post.objects.published()[:limit]
        else:
            return Post.objects.published()

    def resolve_post(self, info, **kwargs):
        year = kwargs.get('year')
        month = kwargs.get('month')
        slug = kwargs.get('slug')
        category = kwargs.get('category')
        
        if month:
            month_num = strptime(month, '%b').tm_mon

        if category:
            return Post.objects.get(category__slug=category)

        if year and month and slug:
            return Post.objects.get(
                is_published=True,
                publish_date__year=year,
                publish_date__month=month_num,
                slug=slug
            )

        return None
