import { useState } from "react";
import logo from "../assets/logo.png";

export const Header = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
    // You can also trigger your i18n switch here
  };
  return (
    // <div className="justify-center items-center flex p-1 pt-2">
    //   <img src={logo} alt="Logo" className="h-15" />
    //   <h1 className="text-5xl font-bold text-amber-600 ml-2">
    //     Khari Baoli
    //   </h1>
    //   {/* add a button for switching language from hindi to english */}
    //   <button
    //     className="btn btn-sm btn-outline"
    //     onClick={toggleLanguage}
    //     aria-label="Toggle language"
    //   >
    //     {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
    //   </button>
    // </div>
    <div className="flex items-center justify-around w-full max-w-2xl mx-auto p-1 pt-2">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
        <h1 className="text-4xl font-bold text-amber-600 ml-2">
          Khari Baoli
        </h1>
      </div>

      <button
        className="btn btn-sm btn-outline"
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        {language === "en" ? "हिन्दी" : "En"}
      </button>
    </div>
  );
};
//   <div className='bg-gray-800 text-white flex justify-between items-center p-4 w-full'>
