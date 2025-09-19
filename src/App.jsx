import creeperFlat from './assets/Creeper.png'
import nether from './assets/Nether.jpg'
import AnimatedText from './components/AnimatedText'
import { FitScreen } from './components/FitScreen'

export default function App() {
  return (
    <div className='overflow-x-hidden'>
      <Page1 />
      <FitScreen>
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <h2 className='font-bold text-4xl'> Are you lonely? </h2>
          <p className='text-xl'> I'm here with you. </p>
        </div>
      </FitScreen>
    </div>
  )
}

function Page1() {
  return (
    <FitScreen className='relative bg-gray-950 text-white overflow-hidden'>
      <div className='absolute inset-0 flex place-content-center'>
        <div className='absolute w-full h-full bg-cover bg-center bg-no-repeat brightness-50 blur-xs'
          style={{ backgroundImage: `url(${nether})` }}>
        </div>
        
        <div className='relative aspect-square'>
          <img src={creeperFlat} alt="creeper" className={`absolute w-full h-full [image-rendering:pixelated] 
            outline-[100rem] outline-[#1DB53C] brightness-20 drop-shadow-2xl drop-shadow-black`}
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

