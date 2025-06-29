'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Props {
  name: string;
}

const ProfileMenu: React.FC<Props> = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
     window.location.href = '/'; 
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Profile Icon (Click to toggle) */}
      <div
        className="cursor-pointer text-lg p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FiUser />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full w-45 bg-white text-black border border-gray-200 rounded shadow-md z-50">
          <div className="px-4 py-2 text-sm border-b border-gray-100">{name}</div>
          <button
            onClick={handleLogout}
            className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-secondary hover:text-white text-left"
          >
            <FiLogOut className="text-base" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
