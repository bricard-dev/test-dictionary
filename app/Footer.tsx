import { Flex, Link, Text } from '@radix-ui/themes';

const Footer = () => {
  return (
    <footer>
      <Flex p="4" justify="center">
        <Text size="2" color="gray">
          This app use{' '}
          <Link href="https://dictionaryapi.dev/" target="_blank">
            Dictionary API
          </Link>
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
