import React from 'react';
import { useMeetStore } from '../store/meetStore';

export function VideoGrid() {
  const { participants, localStream } = useMeetStore();

  const gridClassName = (count: number) => {
    const classes = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-2',
      4: 'grid-cols-2',
      default: 'grid-cols-3',
    };
    return classes[count as keyof typeof classes] || classes.default;
  };

  return (
    <div className={`grid gap-4 p-4 h-full ${gridClassName(participants.length + 1)}`}>
      {localStream && (
        <div className="relative rounded-lg overflow-hidden bg-gray-900">
          <video
            className="w-full h-full object-cover"
            ref={(video) => {
              if (video) {
                video.srcObject = localStream;
                video.play();
              }
            }}
            muted
            autoPlay
            playsInline
          />
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
            You
          </div>
        </div>
      )}
      {participants.map((participant) => (
        <div key={participant.id} className="relative rounded-lg overflow-hidden bg-gray-900">
          {participant.stream && (
            <video
              className="w-full h-full object-cover"
              ref={(video) => {
                if (video) {
                  video.srcObject = participant.stream;
                  video.play();
                }
              }}
              autoPlay
              playsInline
            />
          )}
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
            {participant.name}
          </div>
        </div>
      ))}
    </div>
  );
}