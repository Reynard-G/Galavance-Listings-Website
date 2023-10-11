import { useEffect, useState } from 'react';
import Router from 'next/router';
import AdminNavbar from '@components/AdminNavbar';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Spinner } from '@nextui-org/spinner';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Listings', href: '/admin/listings' },
    { title: 'Property Types', href: '/admin/property-types' },
    { title: 'Operation Types', href: '/admin/operation-types' }
  ];

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
      <AdminNavbar />
    </div>
  );
};

export default Admin;