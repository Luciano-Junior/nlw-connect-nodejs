import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { SubscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscription someone to the event',
        tags: ['Subscription'],
        body: z.object({
          //https://zod.dev/
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await SubscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
