'use client';

import { PlayIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

const AudioButton = ({ audioUrl }: { audioUrl: string }) => {
  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio
      .play()
      .catch((error) =>
        console.error("Erreur lors de la lecture de l'audio:", error)
      );
  };

  return (
    <IconButton
      size="3"
      radius="full"
      style={{ cursor: 'pointer' }}
      onClick={() => playAudio(audioUrl)}
    >
      <PlayIcon height="18" width="18" />
    </IconButton>
  );
};

export default AudioButton;
