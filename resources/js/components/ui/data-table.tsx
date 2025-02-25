'use client';

import { ColumnDef, flexRender, getCoreRowModel, PaginationState, Updater, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './pagination';
import { router } from '@inertiajs/react';
import { PaginationLinks } from '@/pages/links/columns';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: PaginationLinks
}

export function DataTable<TData, TValue>({ columns, data, pagination }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        rowCount: pagination.total,
        pageCount: pagination.last_page,
        onPaginationChange: (updater: Updater<PaginationState>) => {
            const newPageIndex =
                typeof updater === "function"
                ? updater(table.getState().pagination).pageIndex
                : updater.pageIndex;
            const newPageSize =
                typeof updater === "function"
                ? updater(table.getState().pagination).pageSize
                : updater.pageSize;
            router.get(pagination.baseurl, { page: newPageIndex + 1, size: newPageSize }, { preserveState: true });
        },
        state: {
            pagination: {
                pageIndex: pagination.current_page - 1,
                pageSize: pagination.per_page,
            },
        },
    });

    return (
        <div className='flex flex-col gap-4'>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
