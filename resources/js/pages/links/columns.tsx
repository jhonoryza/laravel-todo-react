'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TodoLink = {
    id: number;
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
    },
];
