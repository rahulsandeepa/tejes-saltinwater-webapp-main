import Image from 'next/image'

const VitaminFeature = ({ product }: any) => {
  return (
    <div className="relative py-16">
      <div
        className="hidden absolute top-0 inset-x-0 h-1/2 text-skin-primary lg:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div
              className="absolute inset-x-0 h-1/2 text-skin-primary lg:hidden"
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="relative w-64 sm:w-96 h-64 sm:h-96 rounded-3xl overflow-hidden">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/vitaminc.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="relative bg-banner from-skin-accent to-skin-accent-thick lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
            <div
              className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-skin-accent-thick"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
              <svg
                className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-skin-accent-thick"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              <div>
                <p
                  className="text-lg font-bold text-skin-light"
                  id="join-heading"
                >
                  {product.sectionSubTitle}
                </p>
                <h2
                  className="text-3xl font-extrabold text-skin-primary"
                  id="join-heading"
                >
                  {product.sectionTitle}
                </h2>
              </div>
              <p className="text-lg text-skin-primary">
                Vitamin C is a super immune booster because vitamin C is vital
                for many aspects of the body and helps form and maintain bones,
                skin, and blood vessels.
              </p>
              <p className="text-lg text-skin-primary">
                Only about 18% of the vitamin C we consume orally is absorbed by
                our bodies. However, when it’s delivered by IV, vitamin C is
                100% bioavailable.
              </p>
              <a
                className="block w-full py-3 px-5 text-center bg-skin-white rounded-md shadow-md text-base font-medium text-skin-accent-thick hover:text-skin-primary sm:inline-block sm:w-auto"
                href="#"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VitaminFeature
