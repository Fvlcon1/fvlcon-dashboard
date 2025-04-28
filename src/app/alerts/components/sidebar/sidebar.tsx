import AlertCategories from "./alert-category"
import DateRange from "./date-range"
import Filter from "./filter"

const Sidebar = () => {
    return (
        <div className="w-[250px] flex flex-col gap-4 h-full bg-bg-tetiary border-r-[1px] border-bg-quantinary py-4 px-3">
            <AlertCategories />
            <Filter />
            <DateRange />
        </div>
    )
}
export default Sidebar