"use client";

import React from 'react';
import Link from 'next/link';
import Button from './button';
import ProfileMenu from './Profilemenu';

interface WebnavProps {
  user: { name: string } | null;
}

export default function Webnav({ user }: WebnavProps) {
  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <Link href="/">
          <span className="text-xl md:2xl font-bold tracking-wide text-secondary cursor-pointer hover:opacity-90 transition">
            Study Tracker
          </span>
        </Link>

        <ul className="flex items-center space-x-4 sm:space-x-6 text-base font-sm md:font-medium ">
          <li>
            <Link href="/">
              <span className="cursor-pointer hover:text-primary transition-colors">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="cursor-pointer hover:text-primary transition-colors">Dashboard</span>
            </Link>
          </li>
          <li>
            {!user ? (
              <Link href="/login">
                <Button text="Login" />
              </Link>
            ) : (
              <ProfileMenu name={user.name} />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
