import { Container, Flex } from '@radix-ui/themes';
import { Suspense } from 'react';
import Search from './Search';
import WordDefinition from './WordDefinition';
import { SkeletonWordDefinition } from './skeletons';

interface Props {
  searchParams?: { query?: string };
}

export default function Home({ searchParams }: Props) {
  const query = searchParams?.query || '';
  return (
    <>
      <Container role="main" size="1" minHeight="100vh" mb="9">
        <Flex direction="column" p="4" height="100%">
          <Search />
          <Suspense key={query} fallback={<SkeletonWordDefinition />}>
            <WordDefinition query={query} />
          </Suspense>
        </Flex>
      </Container>
    </>
  );
}
