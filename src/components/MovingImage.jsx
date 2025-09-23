import { useEffect, useRef } from "react";

export default function MovingImage({ image, speed = 0.1, direction = 1, className, animating = true }) {
  const progressRef = useRef(0);
  const rafRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    if (!animating) return;

    function main() {
      progressRef.current += speed * direction;
      if (direction > 0 && progressRef.current > 100) progressRef.current -= 100;
      if (direction < 0 && progressRef.current < -100) progressRef.current += 100;

      if (divRef.current) {
        divRef.current.style.transform = `translateX(${-50 + progressRef.current / 2}%)`;
      }

      rafRef.current = requestAnimationFrame(main);
    }

    rafRef.current = requestAnimationFrame(main);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction, animating]);

  return (
    <div className={`${className} relative overflow-hidden`}>
      <div
        ref={divRef}
        className="absolute inset-0 flex w-[300%] h-full bg-contain bg-center [image-rendering:pixelated]"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
}
