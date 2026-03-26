import { useForm } from 'react-hook-form';
import { createOrderSchema, type CreateOrderInput } from '@/lib/orders/create-order.schema';
import { useCallback } from 'react';

export type UseCreateOrderFormProps = {
  onCreated?: () => void;
  onError?: (error: unknown) => void;
  onClose: () => void;
};

export function useCreateOrderForm({ onCreated, onError, onClose }: UseCreateOrderFormProps) {
  const {
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrderInput>({
    defaultValues: {
      instrument: '',
      side: 'Compra',
      price: 0,
      quantity: 0,
    },
  });

  const closeModal = useCallback(() => {
    reset({
      instrument: '',
      side: 'Compra',
      price: 0,
      quantity: 0,
    });
    onClose();
  }, [reset, onClose]);

  const onSubmit = handleSubmit(async (values) => {
    clearErrors();
    const parsed = createOrderSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (
          fieldName === 'instrument' ||
          fieldName === 'side' ||
          fieldName === 'price' ||
          fieldName === 'quantity'
        ) {
          setError(fieldName, { message: issue.message });
        }
      });
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        setError('root', {
          message: 'Não foi possível criar a ordem. Tente novamente.',
        });
        return;
      }
      closeModal();
      onCreated?.();
    } catch (err) {
      setError('root', {
        message: 'Erro inesperado. Tente novamente.',
      });
      onError?.(err);
    }
  });

  return {
    watch,
    setValue,
    errors,
    isSubmitting,
    closeModal,
    onSubmit,
  };
}
