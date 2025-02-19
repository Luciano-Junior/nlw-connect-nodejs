import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { AccessInviteLink } from '../functions/access-invite-link'
import { SubscribeToEvent } from '../functions/subscribe-to-event'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['Referral'],
        params: z.object({
          //https://zod.dev/
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await AccessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      // redirect 301 - permanente || 302 - temporário

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
