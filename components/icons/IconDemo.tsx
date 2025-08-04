import React from 'react';

// Demonstrasi perbandingan Icon Libraries
// Uncomment library yang ingin dipakai

// 1. HEROICONS (Current - 300+ icons)
import { 
  HomeIcon, 
  UserIcon, 
  BellIcon,
  SunIcon,
  MoonIcon 
} from "@heroicons/react/24/outline";

// 2. TABLER ICONS (4000+ icons - RECOMMENDED!)
/*
import { 
  IconHome, 
  IconUser, 
  IconBell,
  IconSun,
  IconMoon 
} from "@tabler/icons-react";
*/

// 3. BOXICONS (1500+ icons - Mungkin yang Anda kenal dari Vue)
/*
import { 
  BxHome, 
  BxUser, 
  BxBell,
  BxSun,
  BxMoon 
} from 'react-boxicons';
*/

// 4. LUCIDE REACT (1000+ icons)
/*
import { 
  Home, 
  User, 
  Bell,
  Sun,
  Moon 
} from "lucide-react";
*/

export function IconDemo() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">Icon Library Comparison</h2>
      
      {/* HEROICONS Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">1. Heroicons (Current)</h3>
        <div className="flex gap-4">
          <HomeIcon className="h-6 w-6 text-primary" />
          <UserIcon className="h-6 w-6 text-primary" />
          <BellIcon className="h-6 w-6 text-primary" />
          <SunIcon className="h-6 w-6 text-primary" />
          <MoonIcon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          ✅ 300+ icons | ✅ MIT License | ✅ Made by Tailwind team
        </p>
      </div>

      {/* TABLER ICONS Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">2. Tabler Icons (Recommended)</h3>
        <div className="flex gap-4">
          {/* Uncomment when installed
          <IconHome size={24} stroke={1.5} className="text-primary" />
          <IconUser size={24} stroke={1.5} className="text-primary" />
          <IconBell size={24} stroke={1.5} className="text-primary" />
          <IconSun size={24} stroke={1.5} className="text-primary" />
          <IconMoon size={24} stroke={1.5} className="text-primary" />
          */}
          <div className="text-sm text-muted-foreground">Install: npm install @tabler/icons-react</div>
        </div>
        <p className="text-sm text-muted-foreground">
          ✅ 4000+ icons | ✅ MIT License | ✅ Stroke customizable | ✅ Most complete
        </p>
      </div>

      {/* BOXICONS Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">3. Boxicons (Vue Popular)</h3>
        <div className="flex gap-4">
          {/* Uncomment when installed
          <BxHome size="24px" color="var(--primary)" />
          <BxUser size="24px" color="var(--primary)" />
          <BxBell size="24px" color="var(--primary)" />
          <BxSun size="24px" color="var(--primary)" />
          <BxMoon size="24px" color="var(--primary)" />
          */}
          <div className="text-sm text-muted-foreground">Install: npm install react-boxicons</div>
        </div>
        <p className="text-sm text-muted-foreground">
          ✅ 1500+ icons | ✅ MIT License | ✅ Filled & Outline versions
        </p>
      </div>

      {/* LUCIDE REACT Demo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">4. Lucide React</h3>
        <div className="flex gap-4">
          {/* Uncomment when installed
          <Home size={24} className="text-primary" />
          <User size={24} className="text-primary" />
          <Bell size={24} className="text-primary" />
          <Sun size={24} className="text-primary" />
          <Moon size={24} className="text-primary" />
          */}
          <div className="text-sm text-muted-foreground">Install: npm install lucide-react</div>
        </div>
        <p className="text-sm text-muted-foreground">
          ✅ 1000+ icons | ✅ MIT License | ✅ Clean design | ✅ Lightweight
        </p>
      </div>

      {/* Recommendation */}
      <div className="border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
        <h3 className="text-xl font-semibold text-primary mb-4">🏆 Recommendation: Tabler Icons</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Mengapa Tabler Icons?</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>4000+ icons (paling lengkap di antara yang gratis)</li>
            <li>100% FREE dengan MIT License</li>
            <li>Konsisten stroke-based design</li>
            <li>Customizable stroke width</li>
            <li>Tree-shakeable (bundle size optimal)</li>
            <li>TypeScript support built-in</li>
            <li>Actively maintained</li>
          </ul>
          
          <div className="mt-4 p-3 bg-background rounded border">
            <p className="font-medium">Quick Setup:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded mt-1 block">
              npm install @tabler/icons-react
            </code>
          </div>
        </div>
      </div>

      {/* Migration Guide */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">🔄 Migration from Heroicons to Tabler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Before (Heroicons)</h4>
            <code className="text-xs bg-muted p-3 rounded block">
{`import { HomeIcon } from "@heroicons/react/24/outline";

<HomeIcon className="h-6 w-6" />`}
            </code>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">After (Tabler Icons)</h4>
            <code className="text-xs bg-muted p-3 rounded block">
{`import { IconHome } from "@tabler/icons-react";

<IconHome size={24} stroke={1.5} />`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}