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
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Image as={NextImage} src="/hamilton-realty.png" width={50} height={50} alt="Hamilton Family Realty Logo" />
          <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        {navbarItems.map((item) => (
          <NavbarMenuItem key={item.title}>
            <Link color="foreground" className="w-full" size="lg" href={item.href}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <Button size="md" color="warning" variant="flat" onPress={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AdminNavbar;