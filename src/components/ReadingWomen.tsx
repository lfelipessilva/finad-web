import readingWomen from "../../public/reading_women.png"
import Image from "next/image"

export function ReadingWomen() {
  return (
    <div className="flex max-w-md sm:max-w-xl md:max-w-xl lg:max-w-2xl">
      <Image
        src={readingWomen}
        alt="reading women"
      />
    </div>
  )
}
