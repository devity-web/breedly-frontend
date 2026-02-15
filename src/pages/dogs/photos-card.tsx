import {IconPlus, IconTrash} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {useRef, useState} from 'react';
import {toast} from 'sonner';
import type z from 'zod';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {dogsClient, dogsKeys} from '@/server/dogs/dogs.client';
import type {photoSchema} from '@/server/dogs/dogs.schemas';

interface PhotosCardProps {
  photos: z.infer<typeof photoSchema>[];
  dogId: string;
}

export default function PhotosCard({photos, dogId}: PhotosCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<string>();

  const {mutate: deletePhoto, isPending: isDeleting} =
    dogsClient.deletePhoto.useMutation({
      onSuccess: () => {
        toast.success('Photo successfully deleted');
        queryClient.invalidateQueries({
          queryKey: dogsKeys.getById(dogId).queryKey,
        });
      },
      onError: () => {
        toast.error('Failed to delete photo');
      },
    });

  const {mutate, isPending} = dogsClient.addPhoto.useMutation({
    onSuccess: () => {
      toast.success('Photo successfully uploaded');
      queryClient.invalidateQueries({
        queryKey: dogsKeys.getById(dogId).queryKey,
      });
    },
    onError: () => {
      toast.error('Failed to upload photo');
    },
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const [file] = e.target.files;

    mutate({body: {file}, params: {id: dogId}});
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map(photo => (
        <Card
          className="relative mx-auto w-full max-w-sm p-0 h-72 min-h-72 cursor-pointer"
          key={photo.id}
        >
          <Button
            isLoading={isDeleting && photo.id === deleting}
            variant="destructive"
            size={isDeleting && photo.id === deleting ? 'default' : 'icon'}
            onClick={() => {
              setDeleting(photo.id);
              deletePhoto({params: {id: dogId, photoId: photo.id}});
            }}
            className="absolute right-2 top-2 z-30"
          >
            <IconTrash />
          </Button>
          <Link
            to={photo.url}
            target="_blank"
            className="relative w-full h-full"
          >
            <img
              src={photo.url}
              alt="Event cover"
              className="rounded-2xl relative z-20 aspect-video w-full h-full object-cover hover:brightness-50 transition"
            />
          </Link>
        </Card>
      ))}
      <Card className="flex items-center justify-center min-h-72">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          style={{display: 'none'}}
        />
        <Button
          isLoading={isPending}
          variant="outline"
          size={isPending ? 'default' : 'icon'}
          onClick={handleClick}
        >
          <IconPlus />
        </Button>
      </Card>
    </div>
  );
}
