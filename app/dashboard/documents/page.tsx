'use client';

import { useState } from 'react';

export default function DocumentsPage() {
  const [documents] = useState([]);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">
              My Documents
            </h1>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Upload Document
            </button>
          </div>

          {documents.length > 0 ? (
            <div className="grid gap-6">
              {/* Documents will be listed here */}
            </div>          ) : (
            <div className="text-center py-16">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 max-w-lg mx-auto">
                <svg className="w-24 h-24 text-white/60 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
                  No Documents Yet
                </h3>
                <p className="text-white/80 text-lg mb-8">
                  You don&apos;t have any documents yet. Upload your driving license and other required documents.
                </p>
                <div className="space-y-4">
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur border border-blue-400/30">
                    Upload Driving License
                  </button>
                  <button className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur border border-white/20">
                    Upload Insurance Document
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
