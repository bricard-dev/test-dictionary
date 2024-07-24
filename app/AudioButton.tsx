'use client';

import { SpeakerLoudIcon } from '@radix-ui/react-icons';
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
      variant="ghost"
      radius="full"
      style={{ cursor: 'pointer' }}
      onClick={() => playAudio(audioUrl)}
    >
      <SpeakerLoudIcon />
    </IconButton>
  );
};

export default AudioButton;
