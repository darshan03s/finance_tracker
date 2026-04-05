import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

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

export const ConfirmDialog = ({
  children,
  title,
  description,
  cancelButtonText = 'Cancel',
  successButtonText = 'Continue',
  onCancel = () => {},
  onSuccess = () => {}
}: {
  children: ReactNode;
  title: string;
  description: string;
  cancelButtonText?: string;
  successButtonText?: string;
  onCancel?: (...params: unknown[]) => unknown;
  onSuccess?: (...params: unknown[]) => unknown;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction onClick={onSuccess}>{successButtonText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
