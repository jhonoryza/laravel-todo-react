import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FilePlus } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

const AddForm = () => {
    const { data, setData, post, reset, errors, processing, recentlySuccessful } = useForm({
        name: '',
        notes: '',
    });

    const nameInput = useRef<HTMLInputElement>(null);
    const notesInput = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('todonotes.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast(`link ${data.name} added successfully`);
            },
            onError: (errors) => {
                if (errors.name) {
                    nameInput.current?.focus();
                }

                if (errors.url) {
                    notesInput.current?.focus();
                }
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <FilePlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-bold">Add Note</DialogTitle>
                    <DialogDescription>Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Input
                            id="name"
                            ref={nameInput}
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
                            ref={notesInput}
                            className="mt-1 block w-full"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            required
                            autoComplete="notes"
                            placeholder="Note"
                        />

                        <InputError className="mt-2" message={errors.notes} />
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            {recentlySuccessful && <p className="animate-in text-sm text-neutral-600 ease-in">Saved</p>}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddForm;
