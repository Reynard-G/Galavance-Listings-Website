import { useState } from 'react';
import Router from 'next/router';
import NextImage from 'next/image';
import { Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Listings', href: '/admin/listings' },
    { title: 'Towns', href: '/admin/towns' },
    { title: 'Property Types', href: '/admin/property-types' },
    { title: 'Operation Types', href: '/admin/operation-types' }
  ];

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        Router.push('/login');
      }
    });
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Image as={NextImage} src="/hamilton-realty.png" width={50} height={50} alt="Hamilton Family Realty Logo" />
          <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex md:hidden">
          <Button size="md" color="warning" variant="flat" onClick={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {navbarItems.map((item) => (
          <NavbarItem key={item.title} isActive={Router.pathname === item.href}>
            <Link color="foreground" href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {navbarItems.map((item) => (
          <NavbarMenuItem key={item.title} isActive={Router.pathname === item.href}>
            <Link color="foreground" className="w-full" size="lg" href={item.href}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AdminNavbar;