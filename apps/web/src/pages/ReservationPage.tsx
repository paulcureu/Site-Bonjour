import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Toaster, toast } from 'react-hot-toast';
import ReactConfetti from 'react-confetti';
import { isAxiosError } from 'axios';

import { useMakeReservation } from '@/hooks/api/useMakeReservation';
// --- CORECTAT: Import din pachetul workspace ---
import { createReservationSchema } from '@/validation';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type ReservationInput = z.infer<typeof createReservationSchema>;

export function ReservationPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationInput>({
    resolver: zodResolver(createReservationSchema),
  });

  const mutation = useMakeReservation();

  const onSubmit = (data: ReservationInput) => {
    // --- CORECTAT: Folosim `isPending` în loc de `isLoading` ---
    if (mutation.isPending) return;

    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Rezervare confirmată! Veți primi un email în curând.');
        setShowConfetti(true);
        reset();
        setTimeout(() => setShowConfetti(false), 6000);
      },
      onError: error => {
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || 'A apărut o eroare de la server.');
        } else {
          toast.error('A apărut o eroare. Vă rugăm să reîncercați.');
        }
      },
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      {showConfetti && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="container mx-auto max-w-lg py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Fă o Rezervare</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-muted p-6 md:p-8 rounded-lg shadow-md"
        >
          {/* Fields for the form */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Nume
            </label>
            <Input id="name" placeholder="Numele tău" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <Input id="email" type="email" placeholder="email@exemplu.com" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Telefon
            </label>
            <Input id="phone" type="tel" placeholder="07xx xxx xxx" {...register('phone')} />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                Data
              </label>
              <Input id="date" type="date" {...register('date')} />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-foreground mb-1">
                Ora
              </label>
              <Input id="time" type="time" {...register('time')} />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">
              Număr persoane
            </label>
            <Input
              id="guests"
              type="number"
              placeholder="2"
              {...register('guests', { valueAsNumber: true })}
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">
              Notițe (opțional)
            </label>
            <Input id="notes" placeholder="Preferințe, alergii, etc." {...register('notes')} />
          </div>

          {/* --- CORECTAT: Folosim `isPending` --- */}
          <Button type="submit" disabled={mutation.isPending} className="w-full !mt-6">
            {mutation.isPending ? 'Se procesează...' : 'Rezervă Masă'}
          </Button>
        </form>
      </div>
    </>
  );
}
