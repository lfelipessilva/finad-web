import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowCircleUp as ArrowCircleUpIcon,
  X as CloseIcon
} from 'phosphor-react'
import Input from '../Input';
import { Form } from '@unform/web'
import Toggle from '../Toggle';

export const CreateIncomeModal = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (data: any) => {
    console.log(data);
    // setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild className="hover:cursor-pointer hover:opacity-30 opacity-100 transition-all duration-100">
        <ArrowCircleUpIcon size={32} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
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
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-100">
            <Input
              name="price"
              type="text"
              placeholder="Valor"
            />
            <Toggle name="received" placeholder="Foi recebido?"/>
            <Input
              name="date"
              type="date"
              placeholder="Data"
            />
            <Input
              name="description"
              type="text"
              placeholder="Descrição"
            />
            <Input
              name="category"
              type="text"
              placeholder="Categoria"
            />

            <Dialog.Close asChild>
              <button className="flex flex-row justify-center items-center selection:items-center rounded-xl bg-blue-500 p-3 text-2xl text-white bg-secondary font-semibold hover:opacity-80 transition-all duration-200">
                Cancelar
              </button>
            </Dialog.Close>
            <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-primary font-semibold hover:opacity-80 transition-all duration-200" type="submit">
              Criar Receita!
            </button>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
};
