import { count } from 'console'
import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  //await redis.hincrby('referral:access-count', subscriberId, 1)
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank == null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
