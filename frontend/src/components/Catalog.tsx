import { SearchBar } from './SearchBar'
import { CategorySlider } from './CategorySlider'
import { Category } from './Category'

export const Catalog = () => {
  return (
    <div className='flex flex-col flex-1 items-center p-1 bg-gray-100'>
        <CategorySlider />
        <SearchBar />
        {/* { array of category blocks which should scroll and not push the navbar down} */}

        <div className="overflow-y-auto h-full w-full flex-1">
          {[1, 2, 3, 4, 5].map((category) => (
            <Category key={category} />
          ))}
        </div>
    </div>
  )
}
