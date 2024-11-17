import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Peer } from 'peerjs';
import { VideoGrid } from '../components/VideoGrid';
import { Controls } from '../components/Controls';
import { Chat } from '../components/Chat';
import { useMeetStore } from '../store/meetStore';
import { getMediaStream } from '../lib/utils';

export function Room() {
  const { roomId } = useParams();
  const { setRoomId, setLocalStream, setPeer, addParticipant, removeParticipant, isChatOpen } = useMeetStore();

  useEffect(() => {
    if (!roomId) return;

    const initRoom = async () => {
      try {
        const stream = await getMediaStream();
        setLocalStream(stream);

        const peer = new Peer();
        setPeer(peer);

        peer.on('open', (id) => {
          setRoomId(roomId);
          console.log('My peer ID is:', id);
        });

        peer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            addParticipant({
              id: call.peer,
              stream: remoteStream,
              name: `Participant ${call.peer.slice(0, 5)}`,
            });
          });
        });

        return () => {
          stream.getTracks().forEach(track => track.stop());
          peer.destroy();
        };
      } catch (error) {
        console.error('Error setting up room:', error);
      }
    };

    initRoom();
  }, [roomId]);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="flex-1 relative flex flex-col min-h-0">
        <VideoGrid />
        <Controls />
      </div>
      {isChatOpen && (
        <div className="w-full md:w-80 border-t md:border-l md:border-t-0 border-gray-700 h-1/2 md:h-full">
          <Chat />
        </div>
      )}
    </div>
  );
}