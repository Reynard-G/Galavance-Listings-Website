import { useEffect, useState } from 'react';
import Router from 'next/router';
import NextImage from 'next/image';
import { Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Spinner } from '@nextui-org/spinner';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuth = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        Router.push('/login');
      } else {
        setAuthenticated(true);
      }
    });
  };

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

  useEffect(() => {
    handleAuth();
  }, []);

  const logout = () => {
    handleLogout();
  };

  if (!authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner label="Authenticating..." size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div>
      <Navbar isBordered>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
          <NavbarBrand>
            <Image as={NextImage} src="/hamilton-realty.png" width={50} height={50} alt="Hamilton Family Realty Logo" />
            <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <Link color="foreground" href="/admin/listings">
              Listings
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Admin;