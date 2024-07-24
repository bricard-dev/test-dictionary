import { Box, Flex, Heading, Link, Separator, Text } from '@radix-ui/themes';
import AudioButton from './AudioButton';
import { fetchWordDefinition } from './lib/data';

interface Props {
  query?: string;
}

const WordDefinition = async ({ query }: Props) => {
  if (!query) {
    return (
      <Flex align="center" justify="center" flexGrow="1">
        <Text weight="medium" size="1" className="uppercase">
          Search for a word
        </Text>
      </Flex>
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const wordDefinition = await fetchWordDefinition(query);

  if (!wordDefinition) {
    return <div>No word definition</div>;
  }

  const { word, phonetic, phonetics, meanings, license, sourceUrls } =
    wordDefinition[0];

  const firstPhoneticWithAudioAndText = phonetics?.find(
    (phonetic) => phonetic.audio && phonetic.text
  );

  const hasLicense = license?.name && license?.url;
  const hasSourceUrls = !!sourceUrls?.length;

  return (
    <Box className="space-y-6">
      {/* Word & Phonetic */}
      <Box className="space-y-3">
        {/* Word */}
        <Heading
          as="h1"
          size={{
            initial: '8',
            sm: '9',
          }}
        >
          {word}
        </Heading>

        {/* Phonetic */}
        <Flex align="center" gapX="4">
          <Text size={{ initial: '3', sm: '4' }} color="blue">
            {firstPhoneticWithAudioAndText
              ? firstPhoneticWithAudioAndText.text
              : phonetic}
          </Text>
          {firstPhoneticWithAudioAndText?.audio && (
            <AudioButton audioUrl={firstPhoneticWithAudioAndText.audio} />
          )}
        </Flex>
      </Box>

      {/* Meanings */}
      <Box className="space-y-8">
        {meanings?.map((meaning, index) => {
          const hasDefinitions = meanings?.some((meaning) =>
            meaning.definitions?.some((definition) => definition.definition)
          );
          const hasSynonyms = !!meaning.synonyms?.length;
          const hasAntonyms = !!meaning.antonyms?.length;

          return (
            <Box key={`${meaning.partOfSpeech}-${index}`} className="space-y-8">
              <Flex align="center" gapX="4">
                <Heading as="h2" size="5" className="italic">
                  {meaning.partOfSpeech}
                </Heading>
                <Separator size="4" />
              </Flex>

              <Box className="space-y-8">
                {/* Definitions */}
                {hasDefinitions && (
                  <Box className="space-y-4">
                    {/* Title */}
                    <Heading
                      as="h3"
                      size="1"
                      color="blue"
                      className="uppercase"
                    >
                      Definition
                    </Heading>
                    {/* Body */}
                    <ul className="space-y-4">
                      {meaning.definitions?.map(
                        ({ definition, example }, index) =>
                          definition && (
                            <li key={index} className="space-y-1">
                              <Text as="p">
                                {index + 1}. {definition}
                              </Text>

                              {example && (
                                <Text
                                  as="p"
                                  color="gray"
                                  size="2"
                                  className="italic"
                                >
                                  {example}
                                </Text>
                              )}
                            </li>
                          )
                      )}
                    </ul>
                  </Box>
                )}

                {/* Synonyms */}
                {hasSynonyms && (
                  <Box className="space-y-3">
                    <Heading
                      as="h3"
                      size="1"
                      color="blue"
                      className="uppercase"
                    >
                      Synonyms
                    </Heading>
                    <Text as="p">{meaning.synonyms?.join(', ')}.</Text>
                  </Box>
                )}

                {/* Antonyms */}
                {hasAntonyms && (
                  <Box className="space-y-3">
                    <Heading
                      as="h3"
                      size="1"
                      color="blue"
                      className="uppercase"
                    >
                      Antonyms
                    </Heading>
                    <Text as="p">{meaning.antonyms?.join(', ')}.</Text>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Separator size="4" />

      {/* License and Source */}
      <Box className="space-y-6">
        {/* License */}
        {hasLicense && (
          <Box className="space-y-3">
            <Heading as="h3" size="4">
              License
            </Heading>

            <Link href={license.url} target="_blank" className="inline-block">
              {license.name}
            </Link>
          </Box>
        )}

        {/* Source */}
        {hasSourceUrls && (
          <Box className="space-y-3">
            <Heading as="h3" size="4">
              Sources
            </Heading>

            <ul className="list-inside list-disc">
              {sourceUrls.map((sourceUrl, index) => (
                <li key={`${sourceUrl}-${index}`}>
                  <Link href={sourceUrl} target="_blank">
                    {sourceUrl}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WordDefinition;
