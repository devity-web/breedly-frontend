import {createFileRoute} from '@tanstack/react-router';
import {EditDog} from '@/pages/dogs/edit-dog';

export const Route = createFileRoute('/_authenticated/dogs/$dogId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {dogId} = Route.useParams();
  return <EditDog dogId={dogId} />;
}
