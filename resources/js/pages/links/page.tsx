import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
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
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('todolinks.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    name: '',
                    url: '',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* meta section */}
            <Head title="Links" />

            <div className="px-4 py-6">
                {/* heading section */}
                <Heading title="Links" description="Manage your learning todo links" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {/* add new link section */}
                        <Card>
                            <CardHeader>
                                <CardContent>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="grid gap-2">
                                            <Input
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                autoComplete="name"
                                                placeholder="name"
                                            />

                                            <InputError className="mt-2" message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Input
                                                id="url"
                                                className="mt-1 block w-full"
                                                value={data.url}
                                                onChange={(e) => setData('url', e.target.value)}
                                                required
                                                autoComplete="url"
                                                placeholder="URL"
                                            />

                                            <InputError className="mt-2" message={errors.url} />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button disabled={processing}>Save</Button>

                                            {recentlySuccessful && <p className="animate-in text-sm text-neutral-600 ease-in">Saved</p>}
                                        </div>
                                    </form>
                                </CardContent>
                            </CardHeader>
                        </Card>
                        {/* table section */}
                        <DataTable columns={columns} data={todos} pagination={pagination} />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
