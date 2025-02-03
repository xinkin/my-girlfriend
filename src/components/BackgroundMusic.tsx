"use client";
import React, { useEffect, useRef } from "react";

const BackgroundMusic = ({ play }: { play: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (play && audioRef.current) {
      // Set starting time in seconds (e.g., 45 seconds into the song)
      audioRef.current.currentTime = 33;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio autoplay failed:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [play]);

  return (
    <audio
      ref={audioRef}
      loop
      className="hidden"
      src="/audio/dildara.mp3"
      onTimeUpdate={() => {
        // Loop specific portion (e.g., 45s to 1m30s)
        if (audioRef.current && audioRef.current.currentTime >= 240) {
          audioRef.current.currentTime = 30;
        }
      }}
    />
  );
};

export default BackgroundMusic;
