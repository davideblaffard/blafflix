"use client";

interface PlayerTimelineProps {
  progress: number; // 0 - 1
  onChangeProgress: (value: number) => void;
  currentTimeLabel: string;
  totalTimeLabel: string;
}

export function PlayerTimeline({
  progress,
  onChangeProgress,
  currentTimeLabel,
  totalTimeLabel
}: PlayerTimelineProps) {
  const handleClickBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = x / rect.width;
    onChangeProgress(Math.min(1, Math.max(0, ratio)));
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className="relative h-1.5 w-full cursor-pointer rounded-full bg-neutral-700"
        onClick={handleClickBar}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-blafflix-red"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[0.7rem] text-neutral-300">
        <span>{currentTimeLabel}</span>
        <span>{totalTimeLabel}</span>
      </div>
    </div>
  );
}
