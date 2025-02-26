import Image from "next/image"

const HowItWorks = () => {
    const images = [
        { url: "/images/kanjify-howitworks-2.png", message: "Generate your own flashcards" },
        { url: "/images/kanjify-howitworks-3.png", message: "Share with the community" },
        { url: "/images/kanjify-howitworks-4.png", message: "Start revising!" },
    ];

  return (
    <section className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw] mx-auto">
        {images.map((image, index) => (
            <div className="relative h-96 rounded-lg flex-shrink-0 flex-1 hero-gradient shadow-xl" key={index}>
                <div className="absolute left-0 top-0 p-3 text-white w-full font-semibold">
                    <div className="text-4xl">{index}.</div>
                    <h2 className="text-3xl text-center">{image.message}</h2>
                </div>
                <div className="absolute right-0 bottom-0 w-4/5 h-2/3 shadow-lg flex items-end rounded-tl-lg overflow-hidden">
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
    </section>
  )
}

export default HowItWorks