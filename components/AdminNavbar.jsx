import { cloneElement } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group } from '@mantine/core';

import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const AdminNavbar = ({ children }) => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();

  const navbarItemsData = [
    { title: 'Dashboard', href: '/admin', icon: <QueryStatsRoundedIcon fontSize="small" /> },
    { title: 'Listings', href: '/admin/listings', icon: <FormatListBulletedRoundedIcon fontSize="small" /> },
    { title: 'Towns', href: '/admin/towns', icon: <LocationCityRoundedIcon fontSize="small" /> },
  ];

  const navbarItems = navbarItemsData.map((item) => ({
    ...item,
    className: `py-2 pl-2 hover:bg-zinc-800 rounded-md ${router.pathname === item.href ? 'bg-sky-600/[.25]' : ''}`,
    icon: cloneElement(item.icon, {
      className: `p-1.5 ml-2 box-content rounded ${router.pathname !== item.href && 'bg-zinc-700'}`,
      sx: router.pathname === item.href && { color: '#74c0fc' },
    }),
  }));

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        router.push('/login');
      }
    });
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 50 }}
      navbar={{
        width: 250,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Link color="foreground" className="flex" href="/admin">
              <Image as={NextImage} src="/hamilton-realty.png" width={30} height={30} alt="Hamilton Family Realty Logo" className="rounded-none" />
              <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
            </Link>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar pt="lg" px="md">
        <div className="flex flex-col h-full">
          {navbarItems.map((item) => (
            <Link key={item.title} color="foreground" className={`py-2 pl-2 rounded-md ${router.pathname === item.href ? 'bg-sky-600/[.25]' : 'hover:bg-zinc-800'}`} href={item.href}>
              {item.icon}
              <span className={`ml-4 font-medium text-sm ${router.pathname === item.href && 'text-[#74c0fc]'}`}>{item.title}</span>
            </Link>
          ))}
        </div>

        <Divider className="my-2" />

        <Link color="foreground" className="py-2 pl-2 mb-2 hover:bg-zinc-800 rounded-md cursor-pointer" onPress={handleLogout}>
          <LogoutRoundedIcon fontSize="small" className="p-1.5 ml-2 box-content" />
          <span className="ml-4 font-medium text-sm">Logout</span>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminNavbar;