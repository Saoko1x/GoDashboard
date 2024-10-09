import { trpc } from '@/server/client';
import { useSession } from 'next-auth/react';
export function useCompanyId() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { data: companyId, isLoading } = trpc.auth.getCompanyIdByEmail.useQuery(
    { email: email ?? '' },
    { enabled: !!email }
  );

  return { companyId: companyId as number, isLoading };
}
