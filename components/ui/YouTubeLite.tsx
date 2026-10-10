"use client";

import { useEffect, useRef, useState } from "react";

type YouTubeLiteProps = {
  videoId: string;
  title: string;
};

/// Shows the video thumbnail and only loads the YouTube player after the user presses Play.
export function YouTubeLite({ videoId, title }: YouTubeLiteProps) {
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (active) frameRef.current?.focus();
  }, [active]);

  if (active) {
    return (
      <iframe
        ref={frameRef}
        className="video-frame__media"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
        title={`${title} – MRI Plan video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="video-frame__poster" onClick={() => setActive(true)} aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, lazy-loaded without the image optimizer */}
      <img
        className="video-frame__media"
        src={`https://i.ytimg.com/vi/${videoId}/oardefault.jpg`}
        alt=""
        width={540}
        height={960}
        loading="lazy"
        decoding="async"
      />
      <span className="video-frame__play" aria-hidden="true">
        <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor">
          <path d="M3 1.8v20.4c0 1.1 1.2 1.8 2.2 1.2l15.6-10.2c.9-.6.9-1.8 0-2.4L5.2.6C4.2 0 3 .7 3 1.8Z" />
        </svg>
      </span>
    </button>
  );
}
