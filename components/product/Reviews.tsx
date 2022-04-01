import { classNames } from '@lib/util'
import { StarIcon } from '@heroicons/react/solid'
import { reviews } from '@utils/constants'

const Reviews = () => {
  return (
    <div className="w-full text-skin-primary max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold tracking-tight text-skin-secondary sm:text-4xl">
        Customer Reviews
      </h2>

      <div className="mt-8 divide-y divide-skin-primary-muted">
        {reviews.slice(0, 10).map((review: any) => (
          <div key={review.id} className="py-12 flex flex-col sm:flex-row">
            <div className="order-2 sm:ml-16">
              <h3 className="text-sm font-semibold text-skin-secondary">
                {review.title}
              </h3>
              <p className="sr-only">{review.rating} out of 5 stars</p>

              <div
                className="mt-3 space-y-6 text-sm text-skin-secondary-muted"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />
            </div>

            <div className="order-1 flex items-center sm:flex-col sm:items-start">
              <div className="relative h-10 w-10 bg-skin-accent uppercase text-xl font-medium flex items-center justify-center rounded-full overflow-hidden">
                {review.author.substr(0, 1)}
              </div>

              <div className="ml-4 sm:ml-0 sm:mt-4">
                <p className="text-sm font-medium text-skin-secondary">
                  {review.author}
                </p>
                <div className="mt-2 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating
                          ? 'text-skin-secondary'
                          : 'text-skin-light',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
