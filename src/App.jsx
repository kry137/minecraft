import { useEffect, useRef, useState } from 'react';
import alex from './assets/images/Alex.webp';
import dirtBlock from './assets/images/blocks/dirt.webp';
import creeperFlat from './assets/images/Creeper.png';
import nether from './assets/images/Nether.jpg';
import steve from './assets/images/Steve.png';
import AnimatedText from './components/AnimatedText';
import { FitScreen } from './components/FitScreen';


export default function App() {
  return (
    <div className='overflow-x-hidden overflow-y-auto h-screen snap-y snap-mandatory scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600'>
      <Page1 />
      <Page2 />
    </div>
  )
}

function Page1() {
  return (
    <FitScreen className='relative bg-gray-950 text-white overflow-hidden snap-start'>
      <div className='absolute inset-0 flex place-content-center'>
        <div className='absolute w-full h-full bg-cover bg-center bg-no-repeat brightness-50 blur-xs'
          style={{ backgroundImage: `url(${nether})` }}>
        </div>
        
        <div className='relative aspect-square'>
          <img src={creeperFlat} alt="creeper" className={`absolute w-full h-full [image-rendering:pixelated] 
            outline-[200rem] outline-[#1DB53C] brightness-20 drop-shadow-[0px_0px_20px_black]`}
          />
        </div>

        <div className='absolute inset-0 flex justify-center items-center'>
          <h1 className='font-minecraft font-extrabold text-8xl text-center text-shadow-md text-shadow-white flex tracking-wider animate-fade'>
            <AnimatedText text={"Minecraft"} delayStep={40} />
          </h1>
        </div>
      </div>
    </FitScreen>
  )
}

function Page2() {
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
        const observeClass = element.dataset.observ ?? "animate-fade-in";

        if (entry.isIntersecting) {
          console.log(observeClass);
          element.classList.add(observeClass);
          observ.unobserve(element);
        }
      });
    });

    const refs = [ refGenerate, refLabel, refLoading ];
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
    }, { threshold: 0.8 });

    if (refMain.current) observer.observe(refMain.current);

    return () => observer.disconnect();
  }, []);

  // ANIMATION LOADING PROGRESS
  useEffect(() => {
    if (!isLoading) return;

    const steps = [
      { delay: 0, data: { label: "Creating...", value: 0 } },
      { delay: 1000, data: { label: "Creating..." , value: 20 } },
      { delay: 2000, data: { label: "Creating..." , value: 40 } },
      { delay: 3000, data: { label: "Creating...", value: 60 } },
      { delay: 4000, data: { label: "Raising...", value: 60 } },
      { delay: 5500, data: { label: "Raising..." , value: 75 } },
      { delay: 7000, data: { label: "Raising...", value: 90 } },
      { delay: 7800, data: { label: "Making...", value: 90 } },
      { delay: 9000, data: { label: "Making...", value: 95 } },
      { delay: 10000, data: { label: "Making...", value: 98 } },
      { delay: 13000, data: { label: "Completed", value: 100 } },
    ];

    const timeOuts = steps.map(step =>
      setTimeout(() => setLoading(step.data), step.delay)
    );

    return () => timeOuts.forEach(clearTimeout);
  }, [isLoading])
  
  return (
    <FitScreen className='relative snap-start'>
      <div className='absolute flex flex-col inset-0 justify-center items-center brightness-30 [image-rendering:pixelated] bg-[length:100px]' 
        style={{ backgroundImage: `url(${dirtBlock})` }}>
      </div>
      <div ref={refMain} className='absolute inset-0 flex flex-col gap-2 justify-center items-center font-minecraft text-white text-2xl'>
        <p ref={refGenerate} className='mb-6' data-observ="animate-jump-in"> Generating Level </p>
        <p ref={refLabel} className= 'animate-delay-100' data-observ="animate-jump-in"> {loading.label} </p>
        <div ref={refLoading} className='w-60 h-2 bg-gray-500 animate-delay-200' data-observ="animate-jump-in">
          <div className='w-0 h-full bg-green-400 transition-all' style={{ width: loading.value + '%' }}></div> 
        </div>
      </div>
    </FitScreen>
  )
}

// function Page2() {
//   const [loading, setLoading] = useState({ label: "Creating...", value: 0 });
//   const refP = useRef(null);
//   const refH1 = useRef(null);
//   const refSteve = useRef(null);
//   const refAlex = useRef(null);

//   // OBSERVER
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries, observ) => {
//       entries.forEach(entry => {
//         const element = entry.target;
//         const observeClass = element.dataset.observ ?? "animate-fade-in";

//         if (entry.isIntersecting) {
//           element.classList.add(observeClass);
//           observ.unobserve(element);
//         }
//       });
//     });

//     const refs = [refP, refH1, refSteve, refAlex];
//     refs.forEach(ref => {
//       const element = ref.current;
//       if (element) observer.observe(element);
//     });

//     return () => observer.disconnect();
//   }, []);

//   // ANIMATION LOADING
//   useEffect(() => {
//     const steps = [
//       { delay: 0, data: { label: "Creating...", value: 0 } },
//       { delay: 1000, data: { label: "Creating..." , value: 20 } },
//       { delay: 2000, data: { label: "Creating..." , value: 40 } },
//       { delay: 3000, data: { label: "Raising...", value: 60 } },
//       { delay: 5000, data: { label: "Raising..." , value: 75 } },
//       { delay: 7000, data: { label: "Making...", value: 90 } },
//       { delay: 9000, data: { label: "Making...", value: 95 } },
//       { delay: 10000, data: { label: "Making...", value: 98 } },
//       { delay: 16000, data: { label: "Completed", value: 100 } },
//     ];

//     const timeOuts = steps.map(step =>
//       setTimeout(() => setLoading(step.data), step.delay)
//     );

//     return () => timeOuts.forEach(clearTimeout);
//   }, [])
  
//   return (
//     <FitScreen className='relative snap-start'>
//       <div className='absolute flex flex-col inset-0 justify-center items-center brightness-30 [image-rendering:pixelated]' 
//         style={{ backgroundImage: `url(${dirtBlock})`, backgroundSize: "100px" }}>
//       </div>
//       <div className='absolute inset-0 flex flex-col gap-2 justify-center items-center font-minecraft text-white text-2xl'>
//         <p className='mb-6'> Generating Level </p>
//         <p> {loading.label} </p>
//         <div className='w-60 h-2 bg-gray-500'>
//           <div className='w-0 h-full bg-green-400 transition-all' style={{ width: loading.value + '%' }}></div> 
//         </div>
//       </div>
//       <div ref={refAlex} className='absolute bottom-0 left-0 rotate-x-90' data-observ="animate-flip-up">
//         <img src={alex} alt="steve" className='h-80 drop-shadow-[0px_0px_4px_white] animate-wiggle animate-infinite animate-reverse animate-duration-[4000ms] origin-bottom' />
//       </div>
//       <div ref={refSteve} className='absolute bottom-0 right-0 rotate-x-90' data-observ="animate-flip-up">
//         <img src={steve} alt="steve" className='h-80 drop-shadow-[0px_0px_4px_white] animate-wiggle animate-infinite animate-duration-[5000ms] origin-bottom' />
//       </div>
//     </FitScreen>
//   )
// }