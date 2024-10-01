import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const company = await prisma.company.findUnique({
          where: { email: credentials.email as string }
        });

        if (!company) {
          return null;
        }

        const isPasswordValid = credentials.password as string;

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: company.id.toString(),
          email: company.email,
          name: company.name
        };
      }
    })
  ],
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/', // página de error de autenticación
    verifyRequest: '/', // (usado para proveedores sin contraseña)
    newUser: '/dashboard' // Nueva URL de usuario después del registro
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
};

export default authConfig;
