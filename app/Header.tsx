import { BookmarkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-4 border-b bg-gray-100 flex justify-center">
      <Link href="/" className="flex items-center">
        <BookmarkIcon />
        Dictionary
      </Link>
    </header>
  );
};

export default Header;
