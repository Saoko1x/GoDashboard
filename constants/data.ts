import { NavItem } from '@/types';

export type Image = {
  url: string;
  alt: string;
};

export const images: Image[] = [
  {
    url: '../../public/images/alcanza.jpeg',
    alt: 'Alcanza'
  },
  {
    url: '../public/images/ahorro.png',
    alt: 'Ahorro'
  },
  {
    url: '../public/images/contabilidad.jpg',
    alt: 'Contabilidad'
  }
];

export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Onboarding',
    href: '/dashboard/onboarding',
    icon: 'help',
    label: 'Onboarding'
  },
  {
    title: 'System',
    href: '/dashboard/system',
    icon: 'user',
    label: 'system'
  },
  {
    title: 'Boost your business',
    href: '/dashboard/boost',
    icon: 'employee',
    label: 'boost'
  },
  {
    title: 'Training',
    href: '/dashboard/training',
    icon: 'kanban',
    label: 'training'
  },
  {
    title: 'Info & News',
    href: '/dashboard/info',
    icon: 'spinner',
    label: 'info'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: 'users',
    label: 'users'
  }
];
