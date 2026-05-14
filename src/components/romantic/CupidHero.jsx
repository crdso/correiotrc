import React, { useEffect, useRef } from 'react';

const VIDEO_SRC = 'https://res.cloudinary.com/dposzysj2/video/upload/v1778721754/cupidochromakey_dew8yx.webm';

export default function CupidHero() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let animating = true;

    const drawFrame = () => {
      if (!animating) return;

      if (video.readyState >= 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (g > 80 && g > r * 1.3 && g > b * 1.3) {
            const strength = Math.min((g - Math.max(r, b)) / 60, 1);
            data[i + 3] = Math.round((1 - strength) * 255);
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play().catch(() => {});
      drawFrame();
    };

    if (video.readyState >= 2) {
      start();
    } else {
      video.addEventListener('loadeddata', start, { once: true });
    }

    return () => {
      animating = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
      <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        style={{ display: 'none', pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: 'scale(1.4) translateY(-20%)',       // aumente esse valor para ficar maior
          transformOrigin: 'center top', // cresce a partir do centro, sem sair do lugar
        }}
      />
    </div>
  );
}