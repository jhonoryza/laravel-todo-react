import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import { Row } from '@tanstack/react-table';
import { CheckCircle2, Edit2, Trash2, Undo2 } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { TodoNote } from './columns';

type Props = {
    row: Row<TodoNote>;
};

const Actions = ({ row }: Props) => {
    const origin = row.original;

    const deleteLink = () => {
        router.delete(route('todonotes.destroy', origin.id));
        toast(`note ${data.name} deleted successfully`);
    };

    const { data, setData, patch, reset, errors, processing, recentlySuccessful } = useForm({
        name: origin.name,
        notes: origin.notes,
        status: origin.status,
    });

    useEffect(() => {
        setData({
            name: origin.name,
            notes: origin.notes,
            status: origin.status,
        });
    }, [origin, setData]);

    const updateNote: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('todonotes.update', origin.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast(`note ${data.name} updated successfully`);
            },
        });
    };

    const setNoteDone = () => {
        router.patch(
            route('todonotes.update', origin.id),
            {
                name: origin.name,
                notes: origin.notes,
                status: 'done',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast(`note ${data.name} updated successfully`);
                },
            },
        );
    };

    const setNoteUndone = () => {
        router.patch(
            route('todonotes.update', origin.id),
            {
                name: origin.name,
                notes: origin.notes,
                status: 'todo',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast(`note ${data.name} updated successfully`);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-2">
            {data.status == 'todo' && (
                <Button className="cursor-pointer" variant="success" onClick={() => setNoteDone()}>
                    <CheckCircle2></CheckCircle2>
                </Button>
            )}
            {data.status == 'done' && (
                <Button className="cursor-pointer" variant="info" onClick={() => setNoteUndone()}>
                    <Undo2></Undo2>
                </Button>
            )}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                        <Edit2></Edit2>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="font-bold">Edit Note {origin.id}</DialogTitle>
                        <DialogDescription>Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={updateNote} className="space-y-4">
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
                                <Textarea
                                    id="notes"
                                    className="mt-1 block w-full"
                                    rows={20}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    required
                                    autoComplete="notes"
                                    placeholder="Notes"
                                />
                                <InputError className="mt-2" message={errors.notes} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button disabled={processing}>Save</Button>
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
