import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <nav
        className="mx-auto flex items-center justify-between p-5"
        aria-label="Global"
      >
        <div className="flex items-center">
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" height={29} width={146} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Link href="/login" className="text-xs font-semibold text-gray-900">
            Register / Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
