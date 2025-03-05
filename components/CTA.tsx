import Link from "next/link";
import { FaBoltLightning } from "react-icons/fa6";

const CTA = () => {
  return (
    <div className="rounded-lg shadow-xl flex h-96 w-[80vw] mb-10 hero-gradient mx-auto overflow-hidden">
      <div className="flex-[2] text-white items-center flex flex-col gap-8 justify-center cta-background p-2">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-center">
          Ready to Start Your Kanji Journey?
        </h2>
        <Link
          href={"/pages/authPage"}
          className="btn-white text-2xl shadow-md bg-blue-500 flex justify-center items-center gap-2"
        >
          Get Started Now{" "}
          <span className="text-xl">
            <FaBoltLightning />
          </span>
        </Link>
      </div>
      {/* <div className="flex-1 cta-background overflow-hidden hidden lg:block"></div> */}
    </div>
  );
};

export default CTA;
