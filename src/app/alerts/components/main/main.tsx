'use client'

import Controls from "./controls";
import Table from "./table/table";
import { tableData } from "./table/table-data";
import Title from "./title";
import TopStats from "./top-stats";


const Main = () => {
    return (
        <>
            <div className="flex flex-col gap-4 flex-1 h-[calc(100vh-10px)] pt-[20px] overflow-y-auto pr-[80px]">
                <Title />
                <TopStats />
                <Controls />
                <Table
                    data={tableData}
                    isLoading={false}
                />
            </div>
        </>
    )
}
export default Main