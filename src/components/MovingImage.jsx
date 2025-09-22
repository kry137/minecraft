import { useEffect, useState, useRef } from "react";

export default function MovingImage({ image, speed = 0.1, direction = 1, className }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    function main() {
      setProgress(prev => {
        let newProgress = prev + speed * direction;
        if (direction > 0 && newProgress > 100) newProgress -= 100;
        if (direction < 0 && newProgress < -100) newProgress += 100;
        console.log(newProgress);
        return newProgress;
      });
      rafRef.current = requestAnimationFrame(main);
    }

    rafRef.current = requestAnimationFrame(main);

    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 flex"
        style={{ transform: `translateX(${-100 + progress}%)` }}
      >
        <img src={image} alt="img" className="w-full h-full [image-rendering:pixelated]" />
        <img src={image} alt="img" className="w-full h-full [image-rendering:pixelated]" />
        <img src={image} alt="img" className="w-full h-full [image-rendering:pixelated]" />
      </div>
    </div>
  );
}
