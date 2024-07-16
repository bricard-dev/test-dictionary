import { Container } from '@radix-ui/themes';
import Search from './Search';
import WordDefinition from './WordDefinition';

interface Props {
  searchParams?: { query?: string };
}

export default function Home({ searchParams }: Props) {
  const query = searchParams?.query || '';
  return (
    <main>
      <Container size="1" py="3" px="5">
        <Search />
        <WordDefinition query={query} />
      </Container>
    </main>
  );
}
