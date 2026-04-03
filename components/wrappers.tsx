import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const HoverTooltip = ({
  message,
  side = 'top',
  children
}: {
  message: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children: ReactNode;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
};
