'use client'

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type RowSelectionState
} from '@tanstack/react-table'
import { useState } from 'react'
import { AlertTableData } from "@/app/alerts/utils/types"
import NoData from "@components/NoData/noData"
import { columns } from "./columns"

const Table = ({
    data,
    isLoading,
}: {
    data: AlertTableData[],
    isLoading: boolean
}) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // enableRowSelection: true,
    })

    return (
        <div className="flex flex-col gap-4">

            {/* Table */}
            <div className="overflow-hidden rounded-lg flex w-full">
                <table className="w-full">

                    <tbody className="divide-y divide-bg-quantinary">
                        {table.getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`hover:bg-bg-secondary cursor-pointer transition-colors duration-200 ${row.getIsSelected() ? 'bg-blue-50' : ''} ${index % 2 === 1 ? "bg-[#11111194]" : ""}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Loading/Empty States */}
                {isLoading ? (
                    <div className="h-[100px] w-full flex justify-center items-center">
                        <div className="normal-loader"></div>
                    </div>
                ) : !data.length && <NoData />}
            </div>

        </div>
    )
}

export default Table