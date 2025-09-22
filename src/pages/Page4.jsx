import { FitScreen } from '../components/FitScreen';
import MovingImage from '../components/MovingImage';
import overworld1 from '../assets/images/terrains/overworld1.png'

export function Page4() {
  return (
    <FitScreen className='relative overflow-hidden snap-start'>
      {/* Sky */}
      <div className='absolute inset-0 flex justify-center items-center bg-blue-300'></div>
      <MovingImage className='w-full h-full' image={overworld1} />
      
    </FitScreen>
  );
}
