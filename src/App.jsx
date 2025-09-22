import wallpaper from './assets/images/wallpaper_minecraft_java_edition_1920x1080.png';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import { Page3 } from './pages/Page3';
import { Page4 } from './pages/Page4';


export default function App() {
  return (
    <div className='overflow-x-hidden overflow-y-auto h-screen snap-y snap-mandatory scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600'>
      <Page4 />
      <div className='bg-fixed bg-cover bg-center bg-no-repeat' 
          style={{ backgroundImage: `url(${wallpaper})` }}>
        <Page1 />
        <Page2 />
      </div>
      <Page3 />
    </div>
  )
}


