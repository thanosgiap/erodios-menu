import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const manager = await prisma.manager.findUnique({
          where: { username: credentials.username as string },
        })

        if (!manager) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          manager.password
        )

        if (!valid) return null

        return { id: String(manager.id), name: manager.username }
      },
    }),
  ],
})