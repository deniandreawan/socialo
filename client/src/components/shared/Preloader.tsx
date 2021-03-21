import { LoadingOutlined } from "@ant-design/icons";
import logo from "~/images/anjay100.png";

const Preloader = () => (
  <div className="w-full h-screen z-9999 flex flex-col justify-center items-center animate-fade">
    <img src={logo} alt="Socialo Logo" className="w-40" />
    <p className="text-sm mt-4 text-gray-600">
      Connect with people around the world
    </p>
    <LoadingOutlined className="text-xl mt-4" />
  </div>
);

export default Preloader;
