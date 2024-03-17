import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs'

const TOP_OFFSET = 66

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccMenu, setShowAccMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  const toggleAccMenu = useCallback(() => {
    setShowAccMenu(current => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500
      ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
      
      `}>
        <Image
          src={'/images/logo.png'} alt={'logo'}
          priority
          width={100}
          height={50}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label={'Home'} />
          <NavbarItem label={'Series'} />
          <NavbarItem label={'Films'} />
          <NavbarItem label={'New & Popular'} />
          <NavbarItem label={'My List'} />
          <NavbarItem label={'Browse by language'} />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobileMenu
            visible={showMobileMenu}
          />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch
              className='text-sm'
            />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell
              className='text-sm'
            />
          </div>
          <div
            onClick={toggleAccMenu}
            className='flex flex-row items-center gap-2 cursor-pointer relative'
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src={'/images/default-blue.png'}
                width={100}
                height={100}
                className='w-10 h-10'
                alt='Profiles'
                priority
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccMenu ? 'rotate-180' : 'rotate-0'}`}
            />
            <AccountMenu visible={showAccMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

interface INavBarItemProps {
  label: string;
}
const NavbarItem = ({ label }: INavBarItemProps) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  )
}

interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>
          Home
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Series
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Films
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          New & Popular
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          My List
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Browse by language
        </div>
      </div>
    </div>
  );
};


interface IAccountMenuProps {
  visible?: boolean;
}
const AccountMenu: React.FC<IAccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser()
  if (!visible) return null
  return (
    <div className="bg-black w-56 py-3 absolute top-14 right-0 flex-col border-gray-800 border-2 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            src={'/images/default-blue.png'}
            width={100}
            height={100}
            className='w-8 rounded-md'
            alt='Profiles'
            priority
          />
          <p className='text-white text-sm group-hover/item:underline'>{data?.name}</p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline">
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};