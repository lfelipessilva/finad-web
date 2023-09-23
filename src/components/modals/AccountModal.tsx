import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X as CloseIcon, Vault as VaultIcon } from "phosphor-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import PrimaryButton from "../buttons/PrimaryButton";
import { ICreateAccount } from "../../types/Account";
import AccountService from "../../services/accountService";

const validationSchema = z.object({
  name: z
    .string({
      required_error: "O nome deve ser preenchido!",
      invalid_type_error: "Algo deu errado :/",
    })
    .min(1, { message: "Deve informar o nome!" }),
  description: z
    .string({
      required_error: "A descrição deve ser preenchida!",
      invalid_type_error: "Algo deu errado :/",
    })
    .min(1, { message: "Deve informar a descrição!" }),
});

type FormValues = z.input<typeof validationSchema>;
type SubmitValues = z.output<typeof validationSchema>;

export const AccountModal = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const { data: accounts } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return AccountService.findAll();
    },
  });

  const createAccount = useMutation(
    async (account: ICreateAccount) =>
      await AccountService.createAccount(account),
    {
      onSuccess: (data) => {
        toast.success("Conta Criada com sucesso", {
          position: "top-center",
        });

        resetForm();

        setOpen(false);
      },
      onError: (error: any) => {
        toast.error("Houve um problema ao criar conta", {
          position: "top-center",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<SubmitValues> = (data) =>
    createAccount.mutate(data);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        asChild
        className="transition-all duration-100 opacity-100 hover:cursor-pointer hover:opacity-30"
      >
        <div className="flex items-center justify-center h-12 gap-2 p-2 rounded-full bg-secondary">
          <VaultIcon size={32} />
          <span className="font-semibold">Conta</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-primary p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium pb-6">
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
          <section className="flex flex-col gap-4">
            {accounts?.map((account, index) => (
              <div
                key={account.id}
                className="flex flex-col gap-2 p-2 rounded bg-secondary"
              >
                <h4>{account.name}</h4>
                <p className="text-gray-400">{account.description}</p>
              </div>
            ))}
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-100"
          >
            <FormInput
              name="name"
              register={register}
              type="text"
              placeholder="Nome da conta"
              error={errors.name}
            />
            <FormInput
              name="description"
              register={register}
              type="text"
              placeholder="Descrição"
              error={errors.description}
            />
            <Dialog.Close asChild>
              <button className="flex flex-row items-center justify-center p-3 text-2xl font-semibold text-white transition-all duration-200 bg-gray-700 bg-blue-500 selection:items-center rounded-xl hover:opacity-80">
                Cancelar
              </button>
            </Dialog.Close>
            <PrimaryButton isLoading={createAccount.isLoading}>
              <span>Criar Conta!</span>
            </PrimaryButton>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
