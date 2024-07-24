import { Flex } from '@radix-ui/themes';
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
    <Flex as="div" height="100%" p="4" direction="column">
      <Search />
      <Suspense key={query} fallback={<SkeletonWordDefinition />}>
        <WordDefinition query={query} />
      </Suspense>
    </Flex>
  );
}
