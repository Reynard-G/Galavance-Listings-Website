import { useState } from 'react';
import Router from 'next/router';
import NextImage from 'next/image';
import { Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Listings', href: '/admin/listings' },
    { title: 'Property Types', href: '/admin/property-types' },
    { title: 'Operation Types', href: '/admin/operation-types' }
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
          <NavbarBrand>
            <Image as={NextImage} src="/hamilton-realty.png" width={50} height={50} alt="Hamilton Family Realty Logo" />
            <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
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
  )
}

export default AdminNavbar;