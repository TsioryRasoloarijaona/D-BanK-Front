
import { FaArrowRight } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaGoogleWallet } from "react-icons/fa6";
import { SiSpeedypage } from "react-icons/si";

export default function Home() {
  return (
    <main>
     <div className="h-screen w-screen flex flex-row overflow-hidden">
        <div className="h-full w-screen">
          <h1 className="pl-28 pt-60 text-4xl font-bold">Digital-BanK</h1>
          <button className="btn btn-error bg-red-500 bg-opacity-85 text-white ml-28 mt-20 px-20 py-4 hover:bg-red-600">get started <FaArrowRight /></button>
          <button className="btn btn-error bg-red-500 bg-opacity-85 text-white ml-28 mt-20 px-20 py-4">about us <FaArrowRight /></button>

        </div>
        <div className="h-full w-screen rounded-bl-full bg-red-500 grid grid-cols-2 grid-rows-2 gap-0 overflow-hidden items-baseline text-center">
          <div className=" py-36 text-xl text-white flex items-center justify-center"><p className="text-center">security<RiSecurePaymentFill className="text-9xl text-white mt-4"/></p> </div>
          <div className=" py-36 text-xl text-white flex items-center justify-center"><p className="text-center">fast<SiSpeedypage className="text-9xl text-white mt-4"/></p> </div>
          <div className="py-14 pl-56 text-xl text-white  col-span-full flex items-center justify-center"><p className="text-center">wallet<FaGoogleWallet className="text-9xl text-white mt-4"/></p></div>

        </div>
      </div>
    </main>
  );
}
