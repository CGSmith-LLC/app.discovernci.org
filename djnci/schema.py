import graphene

import locations.schema
import events.schema
import students.schema
import posts.schema
import accounts.schema


class Query(
    locations.schema.Query,
    events.schema.Query,
    posts.schema.Query,
    students.schema.Query,
    accounts.schema.Query,
    graphene.ObjectType
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    # debug = graphene.Field(DjangoDebug, name='__debug')
    pass


class Mutation(
    accounts.schema.Mutation,
    students.schema.Mutation,
    locations.schema.Mutation,
    events.schema.Mutation,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
