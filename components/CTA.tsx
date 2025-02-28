import Link from "next/link"

const CTA = () => {
  return (
    <div className="rounded-lg shadow-xl flex h-96 w-[80vw] mb-10 hero-gradient mx-auto overflow-hidden">
        <div className="flex-[2] text-white items-center flex flex-col gap-6 justify-center cta-background p-2">
            <h2 className="text-3xl sm:text-5xl lg:text-[5rem] font-semibold text-center">
                Sign in to get started!
            </h2>
            <Link href={"/pages/authPage"} className="btn-white text-2xl shadow-md bg-blue-500">Sign in</Link>
        </div>
        {/* <div className="flex-1 cta-background overflow-hidden hidden lg:block"></div> */}
    </div>
  )
}

export default CTA