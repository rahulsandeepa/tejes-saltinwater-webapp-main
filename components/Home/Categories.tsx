import Image from 'next/image'
import Link from 'next/link'

export default function Categories({ categories }: any) {
  return (
    <div className="py-16 sm:py-24">
      <div className="px-4 sm:px-6 xl:max-w-6xl xl:mx-auto sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
        <h2 className="text-2xl font-extrabold tracking-tight text-skin-secondary">
          Shop by Category
        </h2>
        <Link href="/catalog">
          <a className="hidden text-sm font-semibold hover:underline text-skin-accent hover:text-skin-accent sm:block">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>

      <div className="mt-8 flow-root">
        <div className="-my-2">
          <div className="relative h-80 overflow-hidden">
            <div className="relative m-auto px-4 flex space-x-8 md:space-x-16 sm:px-6 lg:px-8 slide-track w-slide-sm md:w-slide-lg">
              {categories
                .concat(categories)
                .map((category: any, index: number) => (
                  <Link href={category.path} key={`${category.name}_${index}`}>
                    <a className="relative w-64 h-80 rounded-2xl shadow p-6 flex flex-col overflow-hidden hover:opacity-75">
                      <span aria-hidden="true" className="absolute inset-0">
                        <div className="relative w-full h-full object-center">
                          <Image
                            layout="fill"
                            objectFit="cover"
                            src="/product-img-placeholder.png"
                            alt="Image"
                          />
                        </div>
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-skin-black opacity-50 rounded-lg overflow-hidden"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-skin-white">
                        {category.name}
                      </span>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Link href="/catalog">
          <a className="block text-sm font-semibold text-skin-accent hover:text-skin-accent">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </div>
  )
}
