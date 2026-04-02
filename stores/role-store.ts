import { create } from 'zustand';

interface RoleStore {
  role: 'user' | 'admin';
}

export const useRoleStore = create<RoleStore>(() => ({
  role: 'user'
}));
