'use client';

import { ColumnDef } from '@tanstack/react-table';
import Actions from './actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TodoLink = {
    id: string;
    name: string;
    status: 'todo' | 'done';
    url: string;
};

export type PaginationLinks = {
    baseurl: string;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
};

export type PaginationProps = {
    todos: TodoLink[];
    pagination: PaginationLinks;
};

export const columns: ColumnDef<TodoLink>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => {
            return (
                <a href={row.getValue('url')} className="text-sky-600 underline" target="_blank">
                    Link
                </a>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return <Actions row={row} />;
        },
    },
];
