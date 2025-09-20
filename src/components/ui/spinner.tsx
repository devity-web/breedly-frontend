import {LoaderCircle, type LucideProps} from 'lucide-react';
import {cn} from '@/lib/utils';

const sizes = {
  sm: 8,
  md: 16,
  lg: 32,
  xl: 64,
};

interface SpinnerProps extends LucideProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = ({size = 'lg', ...props}: SpinnerProps) => {
  const iconSize = sizes[size];

  return (
    <LoaderCircle
      width={iconSize}
      height={iconSize}
      {...props}
      className={cn('animate-spin', props.className)}
    />
  );
};
