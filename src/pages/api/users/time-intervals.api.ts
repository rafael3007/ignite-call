import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '../../../lib/prisma'
import * as z from 'zod'

const TimeIntervalsSchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = TimeIntervalsSchema.parse(req.body)

  if (!session.user) {
    return res.status(400).json({ error: 'User session is invalid.' })
  }

  await Promise.all(
    intervals.map(async (interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          start_time_in_minutes: interval.startTimeInMinutes,
          end_time_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )
  // await prisma.userTimeInterval.createMany({})

  return res.status(201).end()
}
