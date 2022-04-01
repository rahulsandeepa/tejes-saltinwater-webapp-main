// import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'

const Carousel: React.FunctionComponent<CarouselProps> = ({
  images,
  slidesToShow,
  slidesToScroll,
}) => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'linear',
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToScroll || 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: Math.min(2, slidesToShow || 1),
          slidesToScroll: slidesToScroll || 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: slidesToScroll || 1,
        },
      },
    ],
  }
  return (
    <div className="-mx-2">
      <Slider {...settings}>
        {images &&
          images.map(
            ({ image, title, description }: CarouselImageProps, index) => (
              <div key={index} className="px-2">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="relative w-full h-144">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={image}
                        alt="Image"
                      />
                    </div>
                  </div>
                  <div className="relative bg-skin-black bg-opacity-60 h-144 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                    <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                      <h2
                        id="social-impact-heading"
                        className="text-3xl font-black uppercase font-exo tracking-tight text-skin-white sm:text-4xl"
                      >
                        <span className="block sm:inline font-exo">
                          {title}
                        </span>
                      </h2>
                      <p className="mt-3 text-lg text-skin-white font-quattro">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </Slider>
    </div>
  )
}

interface CarouselImageProps {
  title: string
  description: string
  href: string
  image: string
}

interface CarouselProps {
  images?: CarouselImageProps[]
  slidesToShow?: number
  slidesToScroll?: number
}

Carousel.defaultProps = {
  slidesToShow: 1,
}

export default Carousel
