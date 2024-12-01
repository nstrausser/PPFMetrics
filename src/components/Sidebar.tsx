"use client"

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Scroll } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Package,
  BarChart3,
  Settings as SettingsIcon,
  Users,
  Scissors,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/' },
  { name: 'Inventory', icon: Package, path: '/inventory' },
  { name: 'Installers', icon: Users, path: '/installers' },
  { name: 'Installations', icon: Scissors, path: '/installations' },
  { name: 'Quality', icon: ShieldCheck, path: '/quality' },
  { name: 'Training', icon: GraduationCap, path: '/training' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Settings', icon: SettingsIcon, path: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[72px] flex flex-col bg-background border-r">
      <div className="flex items-center justify-center h-[72px] border-b">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-primary/10"
          >
            <Scroll className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center py-6 space-y-4">
        {navigation.slice(1).map((item) => (
          <Link key={item.name} href={item.path}>
            <Button
              variant={pathname === item.path ? 'secondary' : 'ghost'}
              size="icon"
              className={cn(
                'h-12 w-12 relative group hover:bg-primary/10',
                pathname === item.path && 'bg-secondary hover:bg-secondary/80'
              )}
            >
              <item.icon className="h-6 w-6" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {item.name}
              </div>
              {pathname === item.path && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full" />
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}