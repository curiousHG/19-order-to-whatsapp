import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <div className="justify-center items-center flex p-1 pt-2">
      <img src={logo} alt="Logo" className="h-15" />
      <h1 className="text-5xl font-bold text-amber-600 ml-2">
        Online Shop
      </h1>
    </div>
  );
};
//   <div className='bg-gray-800 text-white flex justify-between items-center p-4 w-full'>
