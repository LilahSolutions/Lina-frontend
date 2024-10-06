import farmer from '@/public/assets/farmer.png';
import Img from '../Img';

const Bubble: React.FC<{ user?: string }> = ({ user = 'Lina' }) => {
  return (
    <div>
      {user === 'user' ? (
        <Img
          src={farmer}
          alt="farmer icon"
          className="shadow-Elevation2 rounded-[62rem]"
        />
      ) : (
        <div
          className="bg-[#6B7280] shadow-Elevation2 text-white p-2 rounded-[62rem] w-12 h-12 text-center flex items-center 
                    justify-center "
        >
          {user}
        </div>
      )}
    </div>
  );
};

export default Bubble;
