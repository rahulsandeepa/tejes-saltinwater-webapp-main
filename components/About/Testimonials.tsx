const testimonials = [
  {
    id: 1,
    quote:
      'Salt In Water was the saviour of the day for me! I was feeling somewhat nauseated right from the time I woke up and I was supposed to fly that very night. Their IV drip solution helped me feel hydrated again and literally got rid of that nausea feeling. I felt much better and could travel comfortably. Thanks to the team for helping me out.',
    attribution: 'Customer Name, Location',
  },
  {
    id: 2,
    quote:
      'After a night of drinking, I was in desperate need of a fast IV. I called up Salt In Water and the team promptly answered my call and they reached my house in just 45 minutes! Kudos to the team for their fast and friendly service.',
    attribution: 'Customer Name, Location',
  },
  {
    id: 3,
    quote:
      'I had surgery recently and I have been finding it really hard to keep myself hydrated. I turned to Salt In Water to team for support and I am so glad that I did! They are extremely professional and their customer service is absolutely brilliant. They have exceeded my expectations, 10/10 would recommend.',
    attribution: 'Customer Name, Location',
  },
]

const Testimonials = () => {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h2
          id="testimonial-heading"
          className="text-2xl font-extrabold tracking-tight text-skin-secondary"
        >
          What are people saying?
        </h2>

        <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="sm:flex lg:block">
              <svg
                width={24}
                height={18}
                viewBox="0 0 24 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 text-skin-primary-muted"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                <p className="text-lg text-skin-secondary-muted">
                  {testimonial.quote}
                </p>
                <cite className="mt-4 block font-semibold not-italic text-skin-secondary">
                  {testimonial.attribution}
                </cite>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
