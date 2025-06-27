import { Category } from './Category'

export const Catalog = () => {
  return (
    <div className='flex flex-col flex-1 items-center p-1'>
        <div className="overflow-y-auto h-full w-full flex-1 flex items-center justify-center">
          <div className="flex flex-col gap-4 items-center w-full max-w-2xl">
            {[1, 2, 3, 4, 5].map((category) => (
              <Category key={category} />
            ))}
          </div>
        </div>
    </div>
  )
}
