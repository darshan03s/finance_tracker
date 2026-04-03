'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRoleStore } from '@/stores/role-store';
import { ShieldUser, User } from 'lucide-react';

const UserAdminToggle = () => {
  const role = useRoleStore((s) => s.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          {role === 'user' ? (
            <User className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <ShieldUser className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => useRoleStore.setState({ role: 'user' })}>
          User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => useRoleStore.setState({ role: 'admin' })}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAdminToggle;
