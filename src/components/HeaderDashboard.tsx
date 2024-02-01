import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth/core/types';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

interface InterfaceProps {
  user: Session;
}

export default function HeaderDashboard({ user }: InterfaceProps) {
  const [showImage, setShowImage] = useState(true);

  const handleImageError = () => {
    setShowImage(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      <nav
        className="mx-auto flex items-center justify-between p-5"
        aria-label="Practice"
      >
        <div className="flex items-center">
          <Link href="/?from=practice">
            <Image src="/assets/logo.png" alt="logo" height={29} width={146} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Link
            href="/"
            onClick={() => signOut()}
            className="text-sm font-semibold text-gray-900"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>

          {showImage && (
            <img
              className="ml-4 size-8 rounded-full"
              src={user?.user?.image ?? '/assets/google.svg'}
              alt=""
              onError={handleImageError}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
