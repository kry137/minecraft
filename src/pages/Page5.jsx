import { FitScreen } from '../components/FitScreen';
import MovingImage from '../components/MovingImage';
import foreground1 from '../assets/images/nether/foreground1.png';
import foreground2 from '../assets/images/nether/foreground2.png';

import background1 from '../assets/images/nether/background1.png';
import background2 from '../assets/images/nether/background2.png';
import background3 from '../assets/images/nether/background3.png';
import background4 from '../assets/images/nether/background4.png';
import background5 from '../assets/images/nether/background5.png';

import fog1 from '../assets/images/nether/fog1.png';
import fog2 from '../assets/images/nether/fog2.png';
import fog3 from '../assets/images/nether/fog3.png';

import { useEffect, useRef, useState } from 'react';

export default function Page5() {
  const [isLooking, setIsLooking] = useState(false);
  const intersectRef = useRef(null); 
  const bg1Ref = useRef(null); 
  const bg2Ref = useRef(null); 
  const bg3Ref = useRef(null); 
  const bg4Ref = useRef(null); 
  const bg5Ref = useRef(null); 

  const fg1Ref = useRef(null); 
  const fg2Ref = useRef(null); 
  const fg3Ref = useRef(null); 

  const fog1Ref = useRef(null); 
  const fog2Ref = useRef(null); 
  const fog3Ref = useRef(null); 
  
  useEffect(() => {
    if (!intersectRef.current) return;

    const animateElements = [
      fg1Ref, fg2Ref, fg3Ref, bg5Ref, 
      bg4Ref, bg3Ref, bg2Ref, bg1Ref,
      fog1Ref, fog2Ref, fog3Ref
    ];
    const animatedBefore = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          setIsLooking(true);
          if (!animatedBefore) {
          animateElements.forEach((ref, i) => {
              if (ref.current) {
                const element = ref.current;
                const newClass = element.dataset.observ ?? "animate-flip-up";
                element.classList.add(newClass);
                element.style.animationDelay = `${(i + 1) * 300}ms`;
              }
            });
          }
        } else {
          setIsLooking(false);
        }

      });
    }, { threshold: 0.4 });

    observer.observe(intersectRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <FitScreen className='relative overflow-hidden snap-start bg-[#A22120]'>
      {/* Intersect Target */}
      <div ref={intersectRef} className='absolute inset-0'></div>

      {/* <div ref={bg2Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background2} speed={0.002} animating={isLooking} />
        </div> */}
      {/* <div ref={bg3Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background3} speed={0.004} animating={isLooking} />
        </div> */}
      {/* <div ref={bg4Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background4} speed={0.007} animating={isLooking} />
        </div> */}

      {/* Fog */}
      <div ref={fog3Ref} className='absolute inset-0 opacity-30'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={fog3} speed={0.005} animating={isLooking} />
      </div>
      <div ref={fog2Ref} className='absolute inset-0 opacity-30'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={fog2} speed={0.008} animating={isLooking} />
      </div>

      {/* Backgrounds */}
      <div ref={bg2Ref} className='absolute inset-0 bg-cover bg-center opacity-60 [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${background2})` }} />

      <div ref={bg3Ref} className='absolute inset-0 bg-cover bg-center opacity-60 [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${background3})` }} />

      <div ref={bg4Ref} className='absolute inset-0 bg-cover bg-center opacity-50 [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${background4})` }} />

      <div ref={bg5Ref} className='absolute inset-0 bg-cover bg-center opacity-60 [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${background5})` }} data-observ="animate-flip-down"  />

      <div ref={bg1Ref} className='absolute inset-0 bg-cover bg-center opacity-30 [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${background1})` }} />

      {/* Fog */}
      <div ref={fog1Ref} className='absolute inset-0 opacity-30'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={fog1} speed={0.012} animating={isLooking} />
      </div>

      {/* Foregrounds */}
      <div ref={fg1Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${foreground1})` }} />

      <div ref={fg2Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]'
        style={{ backgroundImage: `url(${foreground2})` }} data-observ="animate-flip-down"  />
      
    </FitScreen>
  );
}
