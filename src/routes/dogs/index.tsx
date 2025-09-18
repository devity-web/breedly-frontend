import {createFileRoute} from '@tanstack/react-router';
import {Dogs} from '@/pages/dogs/dogs';

export const Route = createFileRoute('/dogs/')({
  component: Dogs,
});
