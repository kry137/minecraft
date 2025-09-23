import { useState, useRef, useEffect } from 'react';
import dirtBlock from '../assets/images/blocks/dirt.webp';
import { FitScreen } from '../components/FitScreen';

export default function Page3({ setWorld }) {
  const [loading, setLoading] = useState({ label: "Creating...", value: 0 });
  const [isLoading, setIsloading] = useState(false);
  const refMain = useRef(null);
  const refGenerate = useRef(null);
  const refLabel = useRef(null);
  const refLoading = useRef(null);

  // ELEMENT ANIMATIONS
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observ) => {
      entries.forEach(entry => {
        const element = entry.target;
        const observeClass = element.dataset.observ ?? "animate-fade";

        if (entry.isIntersecting) {
          element.classList.add(observeClass);
          observ.unobserve(element);
        }
      });
    });

    const refs = [refGenerate, refLabel, refLoading];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // START THE LOADING BUTTON
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observ) => {
      entries.forEach(entry => {
        const element = entry.target;

        if (entry.isIntersecting) {
          setIsloading(true);
          observ.unobserve(element);
        }
      });
    }, { threshold: 0.9 });

    if (refMain.current) observer.observe(refMain.current);

    return () => observer.disconnect();
  }, []);

  // ANIMATION LOADING PROGRESS
  useEffect(() => {
    if (!isLoading) return;

    const steps = [
      { delay: 0, data: { label: "Building Terrain", value: 0 } },
      { delay: 500, data: { label: "Building Terrain", value: 20 } },
      { delay: 750, data: { label: "Building Terrain", value: 40 } },
      { delay: 1200, data: { label: "Building Terrain", value: 60 } },
      { delay: 1500, data: { label: "Saving Chunks", value: 60 } },
      { delay: 2000, data: { label: "Saving Chunks", value: 75 } },
      { delay: 2500, data: { label: "Saving Chunks", value: 90 } },
      { delay: 3000, data: { label: "Saving Chunks", value: 90 } },
      { delay: 3800, data: { label: "Saving Chunks", value: 95 } },
      { delay: 4500, data: { label: "Saving Chunks", value: 98 } },
      { delay: 5500, data: { label: "Completed", value: 100 } },
    ];

    const timeOuts = steps.map(step => setTimeout(() => setLoading(step.data), step.delay)
    );

    return () => timeOuts.forEach(clearTimeout);
  }, [isLoading]);

  // GENERATE WORLD IF LOADING STATE IS 100%
  useEffect(() => {
    if (loading.value >= 100) setWorld(true);
  }, [loading])

  return (
    <FitScreen className='relative snap-start'>
      <div className='absolute flex flex-col inset-0 justify-center items-center brightness-30 [image-rendering:pixelated] bg-[length:100px]'
        style={{ backgroundImage: `url(${dirtBlock})` }}>
      </div>
      <div ref={refMain} className='absolute inset-0 flex flex-col gap-2 justify-center items-center font-minecraft text-white text-2xl'>
        <p ref={refGenerate} className='mb-6' data-observ="animate-jump-in"> Generating Level </p>
        <p ref={refLabel} className='animate-delay-100' data-observ="animate-jump-in"> {loading.label} </p>
        <div ref={refLoading} className='w-60 h-2 bg-gray-500 animate-delay-200' data-observ="animate-jump-in">
          <div className='w-0 h-full bg-green-400 transition-all' style={{ width: loading.value + '%' }}></div>
        </div>
      </div>
    </FitScreen>
  );
}
