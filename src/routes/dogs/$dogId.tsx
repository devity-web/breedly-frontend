import {createFileRoute} from '@tanstack/react-router';
import {EditDog} from '@/pages/dogs/edit-dog';

export const Route = createFileRoute('/dogs/$dogId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {dogId} = Route.useParams();
  return <EditDog dogId={dogId} />;
}
