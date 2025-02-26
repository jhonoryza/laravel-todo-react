import Heading from '@/components/heading';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AddForm from './add-form';
import { columns, PaginationProps } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Notes',
        href: '/todonotes',
    },
];

export default function Page({ todos, pagination }: PaginationProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* meta section */}
            <Head title="Notes" />

            <div className="px-4 py-2">
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-2">
                        <div className="flex items-center justify-between">
                            {/* heading section */}
                            <Heading title="Notes" description="Manage your learning todo notes" />
                            <AddForm />
                        </div>

                        {/* table section */}
                        <DataTable columns={columns} data={todos} pagination={pagination} />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
