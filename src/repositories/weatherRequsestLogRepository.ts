import { prisma } from '../db/prismaClient';

export const WeatherRequestLogRepository = {
  log: (params: { cityId: number; clientIp?: string; success: boolean; statusCode?: number; error?: string | null }) =>
    prisma.weatherRequestLog.create({
      data: {
        cityId: params.cityId,
        clientIp: params.clientIp,
        success: params.success,
        statusCode: params.statusCode,
        error: params.error ?? null,
      },
    }),
};