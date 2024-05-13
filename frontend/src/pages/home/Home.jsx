import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
    <div className="flex flex-col h-full  md:flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-y-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 overflow-x-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
