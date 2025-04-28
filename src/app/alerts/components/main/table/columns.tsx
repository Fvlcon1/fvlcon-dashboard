import { type ColumnDef } from '@tanstack/react-table'
import { AlertTableData } from "@/app/alerts/utils/types"
import Input from '@components/input/input'
import { Checkbox } from 'antd'

export const columns: ColumnDef<AlertTableData>[] = [
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllRowsSelected()}
    //             indeterminate={table.getIsSomeRowsSelected()}
    //             onChange={table.getToggleAllRowsSelectedHandler()}
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             disabled={!row.getCanSelect()}
    //             onChange={row.getToggleSelectedHandler()}
    //         />
    //     ),
    // },
    {
        accessorKey: "left",
        header: "Details",
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: "recipients",
        header: "Recipients",
        cell: ({ getValue }) => getValue(),
        meta: {
            filterComponent: (props: any) => (
                <Input
                    placeholder="Filter recipients..."
                    content={props.columnFilterValue}
                    onChange={(e) => props.setFilterValue(e.target.value)}
                />
            )
        }
    },
    {
        accessorKey: "dateCreated",
        header: "Date Created",
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        meta: {
            filterComponent: (props: any) => (
                <Input
                    //   type="date"
                    content={props.columnFilterValue}
                    onChange={(e) => props.setFilterValue(e.target.value)}
                />
            )
        }
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => getValue(),
        enableSorting: true,
        meta: {
            filterComponent: (props: any) => (
                <select
                    value={props.columnFilterValue}
                    onChange={(e) => props.setFilterValue(e.target.value)}
                    className="p-1 border rounded w-full"
                >
                    <option value="">All</option>
                    <option value="high priority">High</option>
                    <option value="medium priority">Medium</option>
                    <option value="low priority">Low</option>
                </select>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ getValue }) => getValue(),
    }
]