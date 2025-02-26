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
        title: 'Links',
        href: '/todolinks',
    },
];

export default function Page({ todos, pagination }: PaginationProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* meta section */}
            <Head title="Links" />

            <div className="px-4 py-2">
                <div className="flex-1">
                    <section className="space-y-2">
                        <div className="flex items-center justify-between">
                            {/* heading section */}
                            <Heading title="Links" description="Manage your learning todo links" />
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
