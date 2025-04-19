import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  // errorFormat: 'pretty',
  // datasources: {
  //   db: {
  //     url: process.env.DATABASE_URL,
  //   },
  // },
  // __internal: {
  //   measurePerformance: true,
  // },
})
