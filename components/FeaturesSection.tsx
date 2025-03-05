import { LuBrain } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { AiOutlineBarChart } from "react-icons/ai";

const FeaturesSection = () => {
  return (
    <div className="py-20 px-10 mt-10 bg-white w-[80vw] mx-auto rounded-lg hero-gradient shadow-xl text-white" id="features">
        <div className="container mx-auto px-6">
        <h2 className="text-6xl font-bold text-center mb-16">
            Why Choose Kanjify?
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuBrain className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Card Creation</h3>
            <p className="">
                AI generates unique kanji cards based on your input to enhance your memory.
            </p>
            </div>
            <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuBookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Library</h3>
            <p className="">
                Over 2,000 kanji characters with detailed meanings and readings.
            </p>
            </div>
            <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AiOutlineBarChart className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="">
                Detailed analytics and progress tracking to keep you motivated.
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FeaturesSection