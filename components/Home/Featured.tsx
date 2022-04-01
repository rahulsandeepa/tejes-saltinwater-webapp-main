import Image from 'next/image'

const Featured = () => {
  return (
    <section
      aria-labelledby="social-impact-heading"
      className="max-w-7xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full object-center">
            <Image
              layout="fill"
              objectFit="cover"
              src="https://images.unsplash.com/photo-1516575901726-efcb7a9895a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="relative bg-skin-black bg-opacity-50 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2
              id="social-impact-heading"
              className="text-3xl font-black uppercase font-exo tracking-tight text-skin-white sm:text-4xl"
            >
              <span className="block sm:inline">
              Why choose Salt in Water Mobile IV?
              </span>
              {/* <span className="block sm:inline">your desk</span> */}
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-skin-white">
              
When it comes to your health there is no way you can compromise on it and that is the reason why we take pride in saying that we are one of the most trusted mobile IV solutions you will ever come across. Salt In Water Mobile IV is a team of experts with professional paramedics and registered nurses having years of experience. Whether it is drawing blood, offering high quality services, thoughtful care for the patients, administering IV infusions and so on, our team is extremely qualified and experienced to do every job in the best way possible.

We want you to feel absolutely safe and secure while knowing that your paramedic is extremely experienced and we also consider proper personal protection equipment so that they can administer the IV infusion in a safe manner.

            </p>
            <a
              href="#"
              className="mt-8 w-full block bg-skin-primary border border-skin-primary-muted rounded-md py-3 px-8 text-base font-medium text-skin-secondary hover:bg-skin-primary-muted sm:w-auto"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured
