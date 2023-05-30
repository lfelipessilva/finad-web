import React, { ChangeEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowCircleUp as ArrowCircleUpIcon,
  X as CloseIcon
} from 'phosphor-react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateIncome } from '../../types/Income';
import IncomeService from '../../services/incomeService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MaskMoney } from '../../utils/masks';
import { FormInput } from '../form/FormInput';
import { FormToggle } from '../form/FormToggle';
import { FormSelect } from '../form/FormSelect';
import { FormDate } from '../form/FormDate';
import CategoryService from '../../services/categoryService';
import PrimaryButton from '../buttons/PrimaryButton';

const defaultValues = {
  value: 'R$00,00',
  date: new Date()
}

const validationSchema = z
  .object({
    value: z
      // @ts-ignore
      .custom<string>(string => string.match(/^R\$.+\d{2}$/) && Number(string.replace(/\D/g, '')) > 0, "O valor deve ser maior que 0!") // this regex tests for R$*,00
      .transform(value => Number(value.replace(/\D/g, ''))),
    status: z
      .boolean({
        required_error: 'O status deve ser marcado!',
        invalid_type_error: 'Algo deu errado :/'
      })
      .transform(value => value ? 'received' : 'unreceived'),
    description: z
      .string({
        required_error: 'A descrição deve ser preenchida!',
        invalid_type_error: 'Algo deu errado :/'
      })
      .min(1, { message: "Deve informar a descrição!" }),
    date: z.date({
      required_error: 'A data deve ser preenchida!',
      invalid_type_error: 'Algo deu errado :/'
    }),
    category: z.string({
      required_error: 'A categoria deve ser preenchida!',
      invalid_type_error: 'Algo deu errado :/'
    })
  })

type FormValues = z.input<typeof validationSchema>
type SubmitValues = z.output<typeof validationSchema>

export const CreateIncomeModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors }, reset: resetForm } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(validationSchema)
  });

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      return CategoryService.findAll()
    }
  })

  const createIncome = useMutation(
    async (income: ICreateIncome) => await IncomeService.createIncome(income),
    {
      onSuccess: (data) => {
        toast.success('Receita criada com sucesso', {
          position: 'top-center',
        })

        queryClient.invalidateQueries({ queryKey: 'transactions' })
        queryClient.invalidateQueries({ queryKey: 'transactions_balances' })

        resetForm()

        setOpen(false)
      },
      onError: (error: any) => {
        toast.error('Houve um problema ao criar receita :/', {
          position: 'top-center',
        })
      },
    }
  );

  const onSubmit: SubmitHandler<SubmitValues> = (data) => createIncome.mutate(data)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild className="hover:cursor-pointer hover:opacity-30 opacity-100 transition-all duration-100">
        <ArrowCircleUpIcon size={32} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-primary p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium pb-6">
            Nova Receita
          </Dialog.Title>
          <Dialog.Close asChild>
            <div
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon />
            </div>
          </Dialog.Close>
          {/* @ts-ignore */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-100">
            <FormInput
              register={register}
              name="value"
              type="text"
              placeholder="Valor"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue('value', MaskMoney(event.target.value))
              }}
              error={errors.value}
            />
            <FormToggle
              name="status"
              register={register}
              label="Já recebeu?"
              error={errors.status}
            />
            <FormDate
              register={register}
              name="date"
              placeholder="Data"
              error={errors.date}
            />
            <FormInput
              name="description"
              register={register}
              type="text"
              placeholder="Descrição"
              error={errors.description}
            />
            <FormSelect
              name="category"
              register={register}
              options={categories}
              error={errors.category}
            />
            <Dialog.Close asChild>
              <button className="flex flex-row justify-center items-center selection:items-center rounded-xl bg-blue-500 p-3 text-2xl text-white bg-gray-700 font-semibold hover:opacity-80 transition-all duration-200">
                Cancelar
              </button>
            </Dialog.Close>
            <PrimaryButton isLoading={createIncome.isLoading}>
              <span>Criar Receita!</span>
            </PrimaryButton>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
};
