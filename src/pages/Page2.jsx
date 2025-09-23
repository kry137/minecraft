import { useState, useRef, useEffect } from 'react';
import alex from '../assets/images/Alex.webp';
import steve from '../assets/images/Steve.png';
import AnimatedText from '../components/AnimatedText';
import { FitScreen } from '../components/FitScreen';

export default function Page2() {
  const [label, setLabel] = useState(['', '']);
  const refSteve = useRef(null);
  const refAlex = useRef(null);

  // OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observ) => {
      entries.forEach(entry => {
        const element = entry.target;
        const observeClass = element.dataset.observ ?? "animate-fade";

        if (entry.isIntersecting) {
          element.classList.add(observeClass);
          setLabel(['Ready', 'To Explore the World?']);

          observ.unobserve(element);
        }
      });
    }, { threshold: 0.8 });

    const refs = [refSteve, refAlex];
    refs.forEach(ref => {
      const element = ref.current;
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <FitScreen className='relative snap-start'>
      {/* Text */}
      <div className='absolute inset-0 flex flex-col justify-center items-center font-minecraft text-white'>
        <h1 className="flex text-7xl drop-shadow-[5px_5px_0px_black]">
          <AnimatedText text={label[0]} delayStep={50} />
        </h1>
        <p className='flex text-md drop-shadow-[2px_2px_0px_black]'>
          <AnimatedText text={label[1]} delay={300} delayStep={20} />
        </p>
      </div>

      {/* Alex & Steve */}
      <div ref={refAlex} className='absolute bottom-0 left-0 rotate-x-90' data-observ="animate-flip-up">
        <img src={alex} alt="steve" className='h-80 drop-shadow-[0px_0px_4px_white] animate-wiggle animate-infinite animate-reverse animate-duration-[4000ms] origin-bottom' />
      </div>
      <div ref={refSteve} className='absolute bottom-0 right-0 rotate-x-90' data-observ="animate-flip-up">
        <img src={steve} alt="steve" className='h-80 drop-shadow-[0px_0px_4px_white] animate-wiggle animate-infinite animate-duration-[5000ms] origin-bottom' />
      </div>
    </FitScreen>
  );
}
