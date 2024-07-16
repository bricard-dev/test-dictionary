import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import AudioButton from './AudioButton';
import { fetchWordDefinition } from './lib/data';

interface Props {
  query?: string;
}

const WordDefinition = async ({ query }: Props) => {
  if (!query) {
    return <div>No query</div>;
  }

  const wordDefinition = await fetchWordDefinition(query);

  if (!wordDefinition) {
    return <div>No word definition</div>;
  }

  const { word, phonetic, phonetics, meanings } = wordDefinition[0];

  const firstPhoneticWithAudioAndText = phonetics?.find(
    (phonetic) => phonetic.audio && phonetic.text
  );

  return (
    <Box>
      <Flex justify="between" align="center" mb="5">
        <Box>
          <Heading as="h1" size="7" mb="2">
            {word}
          </Heading>
          {firstPhoneticWithAudioAndText ? (
            <Box className="flex items-center space-x-4">
              <Text color="blue">{firstPhoneticWithAudioAndText.text}</Text>
            </Box>
          ) : (
            <Text color="blue">{phonetic}</Text>
          )}
        </Box>
        {firstPhoneticWithAudioAndText?.audio && (
          <AudioButton audioUrl={firstPhoneticWithAudioAndText.audio} />
        )}
      </Flex>
      <Box>
        {meanings?.map((meaning, index) => {
          const hasDefinitions = meanings?.some((meaning) =>
            meaning.definitions?.some((definition) => definition.definition)
          );
          const hasSynonyms = !!meaning.synonyms?.length;
          const hasAntonyms = !!meaning.antonyms?.length;

          return (
            <Box key={`${meaning.partOfSpeech}-${index}`}>
              <Flex align="center" gapX="4">
                <Heading as="h2" size="4">
                  {meaning.partOfSpeech}
                </Heading>
                <Separator size="4" />
              </Flex>

              {/* Definition */}
              {hasDefinitions && (
                <Box>
                  <Heading
                    as="h3"
                    size="2"
                    mt="2"
                    color="blue"
                    className="uppercase"
                  >
                    Definition
                  </Heading>
                  <ul className="list-inside list-decimal">
                    {meaning.definitions?.map((definition, index) => (
                      <li key={index}>
                        <Text as="p" mb="2">
                          {definition.definition}
                        </Text>
                        {definition.example && (
                          <Text as="p" color="gray" size="2">
                            {definition.example}
                          </Text>
                        )}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {/* Synonyms */}
              {hasSynonyms && (
                <Box>
                  <Heading
                    as="h3"
                    size="2"
                    mb="3"
                    color="blue"
                    className="uppercase"
                  >
                    Synonyms
                  </Heading>
                  <Text as="p">{meaning.synonyms?.join(', ')}</Text>
                </Box>
              )}

              {/* Antonyms */}
              {hasAntonyms && (
                <Box>
                  <Heading
                    as="h3"
                    size="2"
                    mt="2"
                    color="blue"
                    className="uppercase"
                  >
                    Antonyms
                  </Heading>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WordDefinition;
