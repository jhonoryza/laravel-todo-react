import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { CheckCircle2, Edit2, Trash2, Undo2 } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { TodoLink } from './columns';

type Props = {
    row: Row<TodoLink>;
};

const Actions = ({ row }: Props) => {
    const origin = row.original;

    const deleteLink = () => {
        router.delete(route('todolinks.destroy', origin.id));
        toast(`link ${data.name} deleted successfully`);
    };

    const { data, setData, patch, reset, errors, processing, recentlySuccessful } = useForm({
        name: origin.name,
        url: origin.url,
        status: origin.status,
    });

    useEffect(() => {
        setData({
            name: origin.name,
            url: origin.url,
            status: origin.status,
        });
    }, [origin, setData]);

    const updateLink: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('todolinks.update', origin.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast(`link ${data.name} updated successfully`);
            },
        });
    };

    const setLinkDone = () => {
        router.patch(
            route('todolinks.update', origin.id),
            {
                name: origin.name,
                url: origin.url,
                status: 'done',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast(`link ${data.name} updated successfully`);
                },
            },
        );
    };

    const setLinkUndone = () => {
        router.patch(
            route('todolinks.update', origin.id),
            {
                name: origin.name,
                url: origin.url,
                status: 'todo',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast(`link ${data.name} updated successfully`);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-2">
            {data.status == 'todo' && (
                <Button className="cursor-pointer" variant="success" onClick={() => setLinkDone()}>
                    <CheckCircle2></CheckCircle2>
                </Button>
            )}
            {data.status == 'done' && (
                <Button className="cursor-pointer" variant="info" onClick={() => setLinkUndone()}>
                    <Undo2></Undo2>
                </Button>
            )}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                        <Edit2></Edit2>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-bold">Edit Link {origin.id}</DialogTitle>
                        <DialogDescription>Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={updateLink} className="space-y-4">
                        <div className="grid gap-4 py-4">
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
                        </div>
                        <DialogFooter>
                            <Button disabled={processing}>Save changes</Button>
                            {recentlySuccessful && <p className="animate-in text-sm text-neutral-600 ease-in">Saved</p>}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Button className="cursor-pointer" variant="destructive" onClick={() => deleteLink()}>
                <Trash2></Trash2>
            </Button>
        </div>
    );
};

export default Actions;
