import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface GetSubscriberIniteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClick({
  subscriberId,
}: GetSubscriberIniteClicksParams) {
  //await redis.hincrby('referral:access-count', subscriberId, 1)
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
