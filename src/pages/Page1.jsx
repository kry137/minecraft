import { useRef, useState, useEffect } from 'react';
import creeperFlat from '../assets/images/Creeper.png';
import AnimatedText from '../components/AnimatedText';
import { FitScreen } from '../components/FitScreen';

export default function Page1() {
  const refMain = useRef(null);
  const [label, setLabel] = useState("");

  // OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const observeClass = element.dataset.observ ?? "animate-fade";

        element.classList.remove(observeClass);

        void element.offsetWidth; // Reflow

        element.classList.add(observeClass);
        element.classList.toggle("animate-reverse", !entry.isIntersecting);
      });
    }, { threshold: 0.8 });

    if (refMain.current) observer.observe(refMain.current);

    return () => observer.disconnect();
  }, []);

  // SHOW LABEL
  useEffect(() => {
    const timeOut = setTimeout(() => setLabel("Minecraft"), 1200);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <FitScreen className='relative text-white overflow-hidden snap-start'>
      <div ref={refMain} className='absolute inset-0 flex place-content-center backdrop-blur-xs' data-observ="animate-fade-down">

        {/* Creeper Face */}
        <div className='relative aspect-square'>
          <img src={creeperFlat} alt="creeper" className='absolute w-full h-full [image-rendering:pixelated] 
            outline-[200rem] outline-[#1DB53C] brightness-50 drop-shadow-[0px_0px_20px_black]'/>
        </div>

        {/* Minecraft Label */}
        <div className='absolute inset-0 flex justify-center items-center'>
          <h1 className='font-minecraft font-extrabold text-8xl text-center text-shadow-md text-shadow-white flex tracking-wider animate-fade'>
            <AnimatedText text={label} delayStep={40} />
          </h1>
        </div>
      </div>
    </FitScreen>
  );
}
