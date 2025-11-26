"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { PlayerControls } from "./PlayerControls";

interface FakePlayerProps {
  movie: Movie;
}

const INACTIVITY_TIMEOUT_MS = 3000;

export function FakePlayer({ movie }: FakePlayerProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 - 1
  const [volume, setVolume] = useState<number>(0.7); // 0 - 1
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Durata finta in secondi
  const fakeDurationSeconds =
    (movie.durationMinutes ?? 120) * 60; // default 2 ore

  const formattedCurrentTime = formatTime(progress * fakeDurationSeconds);
  const formattedTotalTime = formatTime(fakeDurationSeconds);

  function formatTime(totalSeconds: number): string {
    const seconds = Math.floor(totalSeconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");

    if (h > 0) {
      return `${h}:${mm}:${ss}`;
    }
    return `${m}:${ss}`;
  }

  const handleBack = () => {
    router.back();
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    setShowControls(true);
  };

  const handleChangeProgress = (nextProgress: number) => {
    setProgress(Math.min(1, Math.max(0, nextProgress)));
    setShowControls(true);
  };

  const handleStepForward = () => {
    const delta = 10 / fakeDurationSeconds;
    setProgress((p) => Math.min(1, p + delta));
    setShowControls(true);
  };

  const handleStepBack = () => {
    const delta = 10 / fakeDurationSeconds;
    setProgress((p) => Math.max(0, p - delta));
    setShowControls(true);
  };

  const handleChangeVolume = (nextVolume: number) => {
    setVolume(Math.min(1, Math.max(0, nextVolume)));
    setShowControls(true);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const resetInactivityTimer = () => {
    setShowControls(true);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, INACTIVITY_TIMEOUT_MS);
  };

  // Gestione movimento mouse per mostrare controlli
  const handleMouseMove = () => {
    resetInactivityTimer();
  };

  // Gestione tastiera
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        handleTogglePlay();
      } else if (event.key === "ArrowRight") {
        handleStepForward();
      } else if (event.key === "ArrowLeft") {
        handleStepBack();
      } else if (event.key === "Escape") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fakeDurationSeconds]);

  // Simulazione avanzamento progresso quando in play
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            return 1;
          }
          const delta = 1 / fakeDurationSeconds; // 1 sec ogni tick
          return Math.min(1, prev + delta);
        });
      }, 1000);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, fakeDurationSeconds]);

  // Timer inattività iniziale
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        "relative flex min-h-screen w-full items-center justify-center bg-black"
      }
      onMouseMove={handleMouseMove}
    >
      {/* Sfondo dinamico */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center opacity-40 blur-sm"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      </div>

      {/* Area "video" */}
      <div
        className={
          isFullscreen
            ? "relative z-10 h-screen w-screen bg-black"
            : "relative z-10 w-full max-w-6xl aspect-video bg-black shadow-2xl"
        }
      >
        {/* Finto frame video */}
        <div className="relative h-full w-full bg-black">
          {/* Immagine di sfondo come video congelato */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

          {/* Overlay top con back & titolo */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 text-sm text-white transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="pointer-events-auto flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
              >
                ←
              </button>
              <span className="font-semibold drop-shadow">
                {movie.title}
              </span>
            </div>
          </div>

          {/* Controlli player (bottom overlay) */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-4 pb-4 pt-10 text-white transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="pointer-events-auto">
              <PlayerControls
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onStepBack={handleStepBack}
                onStepForward={handleStepForward}
                progress={progress}
                onChangeProgress={handleChangeProgress}
                currentTimeLabel={formattedCurrentTime}
                totalTimeLabel={formattedTotalTime}
                volume={volume}
                onChangeVolume={handleChangeVolume}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
              />
            </div>
          </div>

          {/* Icona play grande (solo se in pausa) */}
          {!isPlaying && (
            <button
              onClick={handleTogglePlay}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-2xl hover:bg-black/90">
                ▶
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
