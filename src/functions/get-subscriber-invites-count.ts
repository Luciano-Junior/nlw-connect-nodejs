import { redis } from '../redis/client'

interface GetSubscriberIviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({
  subscriberId,
}: GetSubscriberIviteCountParams) {
  //await redis.hincrby('referral:access-count', subscriberId, 1)
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
