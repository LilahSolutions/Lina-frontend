import React from 'react';
import MapPIN from '@/public/assets/carrot.svg';
import ChevronRight from '@/public/assets/chevron-right.svg';
import Img from '@/common/components/Img';
import { useRouter } from 'next/router';
import chevronRightBlue from '@/public/assets/chevron-right-blue.svg';
import chevronRightBrown from '@/public/assets/chevron-right-brown.svg';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-semibold mb-4">Lina</h1>

      {/* Greeting */}
      <h6 className="font-semibold mb-4 text-gray-500">Hi, Manuel!</h6>

      {/* Farm Information */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="font-medium mb-2">My farm</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Img height={16} alt="" src={MapPIN} className="mr-2" />
              <span>Godoy Cruz, Mendoza</span>
            </div>
          </div>
        </div>
        <div className="h-full flex items-center justify-center">
          <Img
            src={ChevronRight}
            alt=""
            height={24}
            className="text-gray-400"
          />
        </div>
      </div>

      {/* Alerts */}
      <h2 className="font-medium mb-2">Alerts</h2>
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center whitespace-nowrap">
          <span className="mr-1">🌱</span> Tomato
        </div>
        <div className="text-gray-400 W px-3 py-1 rounded-full flex items-center whitespace-nowrap">
          <span className="mr-1">🌱</span> Lettuce
        </div>
        <div className="text-gray-400 WW px-3 py-1 rounded-full flex items-center whitespace-nowrap">
          <span className="mr-1">🌱</span> Potato
        </div>
      </div>
      {/* Alert Messages */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">Wet season</h3>
            <span className="text-xs text-gray-500">5 min ago</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Your carrots will be wetter than usual. Do not overwater them.
          </p>
          <div className="flex justify-end w-full">
            <button className="text-blue-500 text-sm font-medium">
              Ask Lina{' '}
            </button>
            <Img
              src={chevronRightBlue}
              alt=""
              height={16}
              className="text-blue-500"
            />
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-yellow-800">A drought is coming</h3>
            <span className="text-xs text-yellow-800">5 min ago</span>
          </div>
          <p className="text-sm text-yellow-800 mb-2">
            Hot temperatures are coming.
          </p>
          <div className="flex justify-end w-full">
            <button
              className="text-yellow-800 text-sm font-medium"
              onClick={() =>
                router.push({
                  pathname: '/chat',
                  query: {
                    question: 'Hot temperatures are coming',
                  },
                })
              }
            >
              Ask Lina{' '}
            </button>
            <Img
              src={chevronRightBrown}
              alt=""
              height={16}
              className="text-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Talk to Lina Button */}
      <div className="mt-auto flex justify-end">
        <button
          onClick={() => router.push('/chat')}
          className="w-2/6 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
        >
          <span className="mr-2"></span> Talk to Lina
        </button>
      </div>
    </div>
  );
}
