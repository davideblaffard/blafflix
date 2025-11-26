"use client";

interface PlayerButtonsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  volume: number; // 0 - 1
  onChangeVolume: (value: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function PlayerButtons({
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward,
  volume,
  onChangeVolume,
  isFullscreen,
  onToggleFullscreen
}: PlayerButtonsProps) {
  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value) / 100;
    onChangeVolume(value);
  };

  return (
    <div className="flex items-center justify-between text-sm text-white">
      <div className="flex items-center gap-3">
        {/* Play / Pause */}
        <button
          onClick={onTogglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform duration-150"
        >
          {isPlaying ? (
            <span className="text-lg leading-none">❚❚</span>
          ) : (
            <span className="text-lg leading-none">▶</span>
          )}
        </button>

        {/* Back 10s */}
        <button
          onClick={onStepBack}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs hover:bg-black/80"
        >
          -10
        </button>

        {/* Forward 10s */}
        <button
          onClick={onStepForward}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs hover:bg-black/80"
        >
          +10
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Volume */}
        <div className="flex items-center gap-2">
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs hover:bg-black/80">
            {volume === 0 ? "🔇" : volume < 0.5 ? "🔈" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={handleVolumeChange}
            className="h-1 w-24 cursor-pointer accent-blafflix-red"
          />
        </div>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs hover:bg-black/80"
        >
          {isFullscreen ? "⤢" : "⤢"}
        </button>
      </div>
    </div>
  );
}
