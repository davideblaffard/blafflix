"use client";

import { PlayerTimeline } from "./PlayerTimeline";
import { PlayerButtons } from "./PlayerButtons";

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  progress: number; // 0 - 1
  onChangeProgress: (value: number) => void;
  currentTimeLabel: string;
  totalTimeLabel: string;
  volume: number; // 0 - 1
  onChangeVolume: (value: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function PlayerControls({
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward,
  progress,
  onChangeProgress,
  currentTimeLabel,
  totalTimeLabel,
  volume,
  onChangeVolume,
  isFullscreen,
  onToggleFullscreen
}: PlayerControlsProps) {
  return (
    <div className="space-y-2 text-sm">
      <PlayerTimeline
        progress={progress}
        onChangeProgress={onChangeProgress}
        currentTimeLabel={currentTimeLabel}
        totalTimeLabel={totalTimeLabel}
      />

      <PlayerButtons
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onStepBack={onStepBack}
        onStepForward={onStepForward}
        volume={volume}
        onChangeVolume={onChangeVolume}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
}
