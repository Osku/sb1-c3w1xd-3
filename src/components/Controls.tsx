import React from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, MessageCircle, Share2, Users } from 'lucide-react';
import { useMeetStore } from '../store/meetStore';
import { cn } from '../lib/utils';

export function Controls() {
  const { isMuted, isVideoOff, toggleMute, toggleVideo, toggleScreenShare } = useMeetStore();

  const ControlButton = ({ onClick, active, children }: any) => (
    <button
      onClick={onClick}
      className={cn(
        'p-3 rounded-full transition-all duration-200',
        active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 flex items-center justify-center gap-4 px-4">
      <ControlButton onClick={toggleMute} active={isMuted}>
        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </ControlButton>
      
      <ControlButton onClick={toggleVideo} active={isVideoOff}>
        {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
      </ControlButton>

      <ControlButton onClick={toggleScreenShare}>
        <Share2 className="w-6 h-6" />
      </ControlButton>

      <button className="bg-red-500 hover:bg-red-600 p-3 rounded-full transition-colors">
        <Phone className="w-6 h-6" />
      </button>

      <ControlButton onClick={() => {}}>
        <MessageCircle className="w-6 h-6" />
      </ControlButton>

      <ControlButton onClick={() => {}}>
        <Users className="w-6 h-6" />
      </ControlButton>
    </div>
  );
}