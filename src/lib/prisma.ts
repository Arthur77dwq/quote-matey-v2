import dns from 'node:dns';
import net from 'node:net';

dns.setDefaultResultOrder('ipv4first');
net.setDefaultAutoSelectFamily(false);

import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL!;

let adapter = null;

if (connectionString?.includes('neon.tech')) {
  adapter = new PrismaNeon({ connectionString });
} else {
  adapter = new PrismaPg({ connectionString });
}

export const prisma = new PrismaClient({ adapter });
