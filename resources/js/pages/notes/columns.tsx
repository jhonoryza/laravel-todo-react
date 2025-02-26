'use client';

import { ColumnDef } from '@tanstack/react-table';
import Actions from './actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TodoNote = {
    id: string;
    name: string;
    status: 'todo' | 'done';
    notes: string;
};

export type PaginationLinks = {
    baseurl: string;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
};

export type PaginationProps = {
    todos: TodoNote[];
    pagination: PaginationLinks;
};

export const columns: ColumnDef<TodoNote>[] = [
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
        accessorKey: 'note',
        header: 'Note',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return <Actions row={row} />;
        },
    },
];
