import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowCircleDown as ArrowCircleDownIcon,
  X as CloseIcon
} from 'phosphor-react'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { ICreateExpense } from '../../types/Expense';
import ExpenseService from '../../services/expenseService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MaskMoney } from '../../utils/masks';
import { FormInput } from '../FormInput';
import { FormToggle } from '../FormToggle';
import { FormSelect } from '../FormSelect';

type FormValues = {
  value: string;
  date: Date;
  paid: boolean;
  description: string;
  category: string;
};

export const CreateExpenseModal = () => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, formState, watch, setValue } = useForm<FormValues>({ defaultValues: { value: 'R$00,00', date: new Date() } });
  const createExpense = useMutation(
    async (expense: ICreateExpense) => await ExpenseService.createExpense(expense),
    {
      onSuccess: (data) => {
        toast.success('Despesa Criada com sucesso', {
          position: 'top-center',
        })
        setOpen(false)
      },
      onError: (error: any) => {
        toast.error('Houve um problema ao criar despesa', {
          position: 'top-center',
        })
      },
    }
  );


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // data.value = Number(data.value)
    // data.status ? data.status = 'paid' : data.status = 'unpaid'

    // const schema = z
    //   .object({
    //     value: z.number().nonnegative({ message: 'Deve informar o preço' }),
    //     status: z.string().nonempty(),
    //     description: z.string().nonempty({ message: 'Deve informar a descrição' }),
    //     date: z.string(),
    //   })
    //   .safeParse(data)

    // if (!schema.success) {
    //   console.log(schema);
    // }
    createExpense.mutate(data)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild className="hover:cursor-pointer hover:opacity-30 opacity-100 transition-all duration-100">
        <ArrowCircleDownIcon size={32} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Nova Despesa
          </Dialog.Title>
          <Dialog.Close asChild>
            <div
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon />
            </div>
          </Dialog.Close>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-100">
            <FormInput
              register={register}
              name="value"
              type="text"
              placeholder="Valor"
              onChange={(event: any) => {
                setValue('value', MaskMoney(event.target.value))
              }}
            />
            <FormToggle
              name="paid"
              register={register}
              label="Foi pago?"
            />
            <FormInput
              register={register}
              name="date"
              type="date"
              placeholder="Data"
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <FormInput
              name="description"
              register={register}
              type="text"
              placeholder="Descrição"
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <FormSelect
              name="category"
              register={register}
              options={[
                {
                  value: "12",
                  label: "categoria 12"
                },
                {
                  value: "15",
                  label: "categoria 15"
                },
                {
                  value: "4",
                  label: "categoria 4"
                },
              ]
              }
            />
            <Dialog.Close asChild>
              <button className="flex flex-row justify-center items-center selection:items-center rounded-xl bg-blue-500 p-3 text-2xl text-white bg-secondary font-semibold hover:opacity-80 transition-all duration-200">
                Cancelar
              </button>
            </Dialog.Close>
            <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-primary font-semibold hover:opacity-80 transition-all duration-200" type="submit">
              Criar Despesa!
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
};
