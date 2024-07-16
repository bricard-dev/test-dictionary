import { WordDefinitionType } from './definitions';

export const fetchWordDefinition = async (
  query?: string
): Promise<WordDefinitionType[] | null> => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
