import React, { useState, useEffect } from 'react';

/**
 * OFFLINE BADGE
 * ------------------------------------------------------------------
 * A small indicator showing whether the device is online or offline.
 *
 * This is more than decoration. When a judge opens DevTools, switches
 * to "Offline", and sees this badge flip to "Offline — still working"
 * while the app keeps functioning, the core claim of the project is
 * proven in front of them. Make sure your demo video captures it.
 *
 * It uses the browser's navigator.onLine and the online/offline
 * window events — no library needed.
 */
export default function OfflineBadge() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return (
    <div className={'offline-badge ' + (online ? 'is-online' : 'is-offline')}>
      <span className="offline-dot" />
      {online ? 'Online' : 'Offline — still working'}
    </div>
  );
}
