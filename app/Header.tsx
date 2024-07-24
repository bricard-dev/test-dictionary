import { Container, Flex, Heading } from '@radix-ui/themes';
import { BookText } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b bg-gray-100 flex justify-center">
      <Container size="2">
        <Flex p="4" justify="between">
          <Link href="/">
            <Flex align="center" gapX="2">
              <BookText />
              <Heading size="3">Dictionary</Heading>
            </Flex>
          </Link>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
