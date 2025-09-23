import { FitScreen } from '../components/FitScreen';
import MovingImage from '../components/MovingImage';
import ground1 from '../assets/images/overworld/ground1.png'
import ground2 from '../assets/images/overworld/ground2.png'
import ground3 from '../assets/images/overworld/ground3.png'
import ground4 from '../assets/images/overworld/ground4.png'
import ground5 from '../assets/images/overworld/ground5.png'
import background1 from '../assets/images/overworld/background1.png'
import background2 from '../assets/images/overworld/background2.png'
import background3 from '../assets/images/overworld/background3.png'
import background4 from '../assets/images/overworld/background4.png'
import { useEffect, useRef, useState } from 'react';

export default function Page4() {
  const [isLooking, setIsLooking] = useState(false);
  const intersectRef = useRef(null); 
  const bg1Ref = useRef(null); 
  const bg2Ref = useRef(null); 
  const bg3Ref = useRef(null); 
  const bg4Ref = useRef(null); 

  const fg1Ref = useRef(null); 
  const fg2Ref = useRef(null); 
  const fg3Ref = useRef(null); 
  const fg4Ref = useRef(null); 
  const fg5Ref = useRef(null); 
  
  useEffect(() => {
    if (!intersectRef.current) return;
    
    const animateElements = [
      fg1Ref, fg2Ref, fg3Ref, fg4Ref, fg5Ref,
      bg4Ref, bg3Ref, bg2Ref, bg1Ref, 
    ];
    const animatedBefore = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          setIsLooking(true);
          if (!animatedBefore) {
          animateElements.forEach((ref, i) => {
              if (ref.current) {
                ref.current.classList.add('animate-flip-up');
                ref.current.style.animationDelay = `${(i + 1) * 150}ms`;
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
    <FitScreen className='relative overflow-hidden snap-start bg-[#726FEB]'>
      {/* Intersect Target */}
      <div ref={intersectRef} className='absolute inset-0'></div>

      {/* Backgrounds | Fogs */}
      <div ref={bg1Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background1} speed={0.001} animating={isLooking} />
      </div>
      <div ref={bg2Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background2} speed={0.002} animating={isLooking} />
      </div>
      <div ref={bg3Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background3} speed={0.004} animating={isLooking} />
      </div>
      <div ref={bg4Ref} className='absolute inset-0'>
        <MovingImage className='absolute! w-full h-full [image-rendering:pixelated]' image={background4} speed={0.007} animating={isLooking} />
      </div>

      {/* Grounds */}
      <div ref={fg1Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${ground1})` }} />

      <div ref={fg2Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${ground2})` }} />

      <div ref={fg3Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${ground3})` }} />

      <div ref={fg4Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${ground4})` }} />

      <div ref={fg5Ref} className='absolute inset-0 bg-cover bg-center [image-rendering:pixelated]' 
        style={{ backgroundImage: `url(${ground5})` }} />

    </FitScreen>
  );
}
