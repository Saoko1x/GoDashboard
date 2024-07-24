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

export type Week = {
  id: number;
  name: string;
  step: string;
  type: string;
};
export const weeks: Week[] = [
  {
    id: 1,
    name: 'Week 1',
    step: 'Step 1',
    type: 'Type 1'
  },
  {
    id: 2,
    name: 'Week 2',
    step: 'Step 2',
    type: 'Type 2'
  },
  {
    id: 3,
    name: 'Week 3',
    step: 'Step 3',
    type: 'Type 3'
  },
  {
    id: 4,
    name: 'Week 4',
    step: 'Step 4',
    type: 'Type 4'
  },
  {
    id: 5,
    name: 'Week 5',
    step: 'Step 5',
    type: 'Type 5'
  },
  {
    id: 6,
    name: 'Week 6',
    step: 'Step 6',
    type: 'Type 6'
  },
  {
    id: 7,
    name: 'Week 7',
    step: 'Step 7',
    type: 'Type 7'
  },
  {
    id: 8,
    name: 'Week 8',
    step: 'Step 8',
    type: 'Type 8'
  },
  {
    id: 9,
    name: 'Week 9',
    step: 'Step 9',
    type: 'Type 9'
  },
  {
    id: 10,
    name: 'Week 10',
    step: 'Step 10',
    type: 'Type 10'
  }
];

export type Boost = {
  id: number;
  name: string;
  task: string;
  taskNumber: number;
  type: string;
};

export const boosts: Boost[] = [
  {
    id: 1,
    name: 'Boost 1',
    task: 'Task 1',
    taskNumber: 1,
    type: 'Type 1'
  },
  {
    id: 2,
    name: 'Boost 2',
    task: 'Task 2',
    taskNumber: 2,
    type: 'Type 2'
  },
  {
    id: 3,
    name: 'Boost 3',
    task: 'Task 3',
    taskNumber: 3,
    type: 'Type 3'
  },
  {
    id: 4,
    name: 'Boost 4',
    task: 'Task 4',
    taskNumber: 4,
    type: 'Type 4'
  },
  {
    id: 5,
    name: 'Boost 5',
    task: 'Task 5',
    taskNumber: 5,
    type: 'Type 5'
  },
  {
    id: 6,
    name: 'Boost 6',
    task: 'Task 6',
    taskNumber: 6,
    type: 'Type 6'
  },
  {
    id: 7,
    name: 'Boost 7',
    task: 'Task 7',
    taskNumber: 7,
    type: 'Type 7'
  },
  {
    id: 8,
    name: 'Boost 8',
    task: 'Task 8',
    taskNumber: 8,
    type: 'Type 8'
  },
  {
    id: 9,
    name: 'Boost 9',
    task: 'Task 9',
    taskNumber: 9,
    type: 'Type 9'
  },
  {
    id: 10,
    name: 'Boost 10',
    task: 'Task 10',
    taskNumber: 10,
    type: 'Type 10'
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
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
