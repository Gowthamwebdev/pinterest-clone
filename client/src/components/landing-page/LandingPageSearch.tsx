import { SearchOutlined } from '@mui/icons-material';

const LandingPageSearch = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-[90vh] bg-yellow-200 px-8">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="relative w-[500px] h-[600px]">
          <img
            alt="easy chicken dinner"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[450px] object-cover rounded-xl z-1000"
            src="https://s.pinimg.com/webapp/center-2d76a691.png"
          />

          <img
            alt="chicken rice recipe"
            className="absolute top-0 right-10 w-[200px] h-[250px] object-cover rounded-lg z-20"
            src="https://s.pinimg.com/webapp/topRight-6902088a.png"
          />

          <img
            alt="Orange chicken recipe"
            className="absolute bottom-0 right-10 w-[170px] h-[250px] object-cover rounded-lg z-30"
            src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
          />

          <img
            alt="multiple chicken recipes"
            className="absolute bottom-[220px] left-0 w-[300px] h-[240px] object-cover rounded-4xl z-40"
            src="https://s.pinimg.com/webapp/left-ccce7532.png"
          />
          <div className="bg-white opacity-90 text-center transform -translate-x-0 -translate-y-1/2 w-fit p-8 top-3/7 rounded-full right-1/2 absolute z-1000 ">
            <SearchOutlined />
            <span className="text-[rgb(110, 15, 60)] font-bold text-md">
              easy chicken dinner
            </span>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[rgb(195,25,82)] mb-6">
            Search for an idea
          </h1>
          <p className="text-lg text-[rgb(195,25,82)] mb-8 max-w-md">
            What do you want to try next? Think of something you're into—like
            "easy chicken dinner"—and see what you find.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-2xl text-lg transition-colors">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSearch;
