import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Users } from 'lucide-react';
import { generateRoomId } from '../lib/utils';

export function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const createRoom = () => {
    const newRoomId = generateRoomId();
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Video className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Video Meetings
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Premium video meetings. Now free for everyone.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={createRoom}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Video className="w-5 h-5" />
            New Meeting
          </button>

          <form onSubmit={joinRoom} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room code"
                className="flex-1 min-w-0 px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-md text-blue-500 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              >
                <Users className="w-5 h-5" />
                Join
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Learn more about our features and security</p>
        </div>
      </div>
    </div>
  );
}