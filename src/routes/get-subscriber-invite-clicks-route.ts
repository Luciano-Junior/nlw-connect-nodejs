import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteClick } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClickRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
          tags: ['Referral'],
          params: z.object({
            //https://zod.dev/
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              subscriberCountClicks: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteClick({ subscriberId })

        return {
          subscriberCountClicks: count,
        }
      }
    )
  }
