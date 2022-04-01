import React from 'react'

const ActiveFilters = ({ activeFilters, categories, onEntryChange }: any) => {
  return (
    <div className="bg-skin-primary-muted">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-skin-secondary-muted">
          Filters
          <span className="sr-only">, active</span>
        </h3>

        <div
          aria-hidden="true"
          className="hidden w-px h-5 bg-skin-primary-muted sm:block sm:ml-4"
        />

        <div className="mt-2 sm:mt-0 sm:ml-4">
          <div className="-m-1 flex flex-wrap items-center">
            {activeFilters.map((activeFilter: string) => (
              <span
                key={activeFilter}
                className="m-1 inline-flex rounded-full border border-skin-secondary items-center py-1.5 pl-3 pr-2 text-sm font-medium text-skin-secondary"
              >
                <span>
                  {categories.find((f: any) => f.id === activeFilter).name}
                </span>
                <button
                  type="button"
                  onClick={() => onEntryChange(activeFilter)}
                  className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-skin-secondary hover:text-skin-secondary-muted"
                >
                  <span className="sr-only">
                    Remove filter for{' '}
                    {categories.find((f: any) => f.id === activeFilter).name}
                  </span>
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveFilters
