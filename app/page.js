import Video from 'next-video';
import video2 from '../videos/0609.mp4'
import Link from 'next/link';

export default function Home() {
  return (
  <div>
    <div className="mx-auto relative lg:h-[89.6vh] md:h-[85vh] h-[600px]  home-box-1 overflow-hidden ">
      <div className='w-full h-full '>

        <div className='lg:w-1/2 md:w-1/2 w-full flex flex-col justify-center items-end h-full '>          
          <div className='w-4/5 mr-8 text-center lg:text-start md:text-start'>
            <h2 className='font-bold  text-4xl mb-8'>Go ahead, stream free</h2>
            <p className=' mb-12'>With Plex you can watch over 20,000 free movies and shows, plus Live TV on almost any device. What are you waiting for?</p>
            <Link href={''} className=' py-3 px-10 rounded-3xl bg-amber-500 text-black font-bold'>Sign Up</Link>
          </div>         
        </div>
        
      </div>
       
       <div className=' absolute sm:w-full lg:w-3/4 md:w-3/4 h-full lg:top-0 md:top-0 top-[-200px]  right-0 z-[-1000] home-box-1-video'>
        <Video 
          src={video2}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className='h-full '
        />
       </div>
    </div>

    <div className=''>

    </div>
  </div>
  );
}
