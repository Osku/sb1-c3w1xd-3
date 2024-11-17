import { create } from 'zustand';
import { Peer } from 'peerjs';

interface Participant {
  id: string;
  stream?: MediaStream;
  name: string;
}

interface MeetStore {
  roomId: string | null;
  localStream: MediaStream | null;
  participants: Participant[];
  peer: Peer | null;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  setRoomId: (id: string | null) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  setPeer: (peer: Peer | null) => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
}

export const useMeetStore = create<MeetStore>((set) => ({
  roomId: null,
  localStream: null,
  participants: [],
  peer: null,
  isMuted: false,
  isVideoOff: false,
  isScreenSharing: false,
  setRoomId: (id) => set({ roomId: id }),
  setLocalStream: (stream) => set({ localStream: stream }),
  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),
  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    })),
  setPeer: (peer) => set({ peer }),
  toggleMute: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getAudioTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
      }
      return { isMuted: !state.isMuted };
    }),
  toggleVideo: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getVideoTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
      }
      return { isVideoOff: !state.isVideoOff };
    }),
  toggleScreenShare: () =>
    set((state) => ({ isScreenSharing: !state.isScreenSharing })),
}));