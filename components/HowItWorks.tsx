import Image from "next/image"

const HowItWorks = () => {
    const images = [
        // { url: "/images/kanjify-howitworks-2.png", message: "Generate your own flashcards" },
        // { url: "/images/kanjify-howitworks-6.png", message: "Share with the community" },
        // { url: "/images/kanjify-howitworks-4.png", message: "Start revising!" },
        { url: "/images/creating-cards.webp", message: "Generate your own flashcards" },
        { url: "/images/community-sharing.webp", message: "Share with the community" },
        { url: "/images/revising-cards.webp", message: "Start revising!" },
    ];

  return (
    <section className="pt-10 px-8 rounded-lg w-[80vw] mx-auto hero-gradient my-10">
        <h2 className="text-white text-6xl font-bold text-center mb-20">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-10">
            {images.map((image, index) => (
                <div className="relative flex flex-col items-center justify-between pt-10 pb-10 lg:pb-0 gap-6 h-auto rounded-lg lg:rounded-t-lg lg:rounded-b-0 flex-shrink-0 flex-1 bg-white shadow-xl" key={index}>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 flex items-center justify-center w-16 h-16 text-blue-500 font-semibold rounded-full bg-white">
                        <div className="text-3xl border-2 border-blue-500 rounded-full w-12 h-12 flex items-center justify-center font-bold">{index + 1}</div>
                    </div>
                    <h2 className="text-3xl text-center font-semibold text-blue-500 w-3/4">{image.message}</h2>
                    <div className="w-3/4 aspect-square shadow-lg flex rounded-t-lg overflow-hidden">
                        <Image
                        src={image.url}
                        alt={image.message}
                        className="object-cover h-full object-center"
                        width={500}
                        height={500}
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>

  )
}

export default HowItWorks