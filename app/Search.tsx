'use client';

import { CrossCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, TextField } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from './lib/utils';

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') || ''
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const params = new URLSearchParams(searchParams);
    const hasQuery = params.has('query');
    const queryValue = params.get('query');

    if (!searchValue.trim() && hasQuery) {
      // If search value (trim) is empty and query param exists, remove query param
      params.delete('query');
      replace(`${pathname}?${params.toString()}`);
    } else if (searchValue.trim() && searchValue.trim() !== queryValue) {
      // If search value (trim) is not empty and different from query param, update query param

      timeoutId.current = setTimeout(() => {
        params.set('query', searchValue.trim());
        replace(`${pathname}?${params.toString()}`);
      }, 500);
    }

    // Cleanup
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [searchValue, pathname, replace, searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <Box
      mb={{
        initial: '5',
      }}
    >
      <TextField.Root
        id="search"
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearch}
        radius="full"
        size="3"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="20" width="20" />
        </TextField.Slot>

        <TextField.Slot
          className={cn('opacity-100 transition-opacity', {
            'opacity-0 pointer-events-none': !searchValue,
          })}
        >
          <button onClick={clearSearch}>
            <CrossCircledIcon height="20" width="20" />
          </button>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

export default Search;
