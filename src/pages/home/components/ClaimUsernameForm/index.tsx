import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Form, Error } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O nome de usuário deve conter apenas letras e hífens",
    })
    .transform((value) => value.toLowerCase()),
});

type ClaimUserNameFormSchemaType = z.infer<typeof claimUserNameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUserNameFormSchemaType>({
    resolver: zodResolver(claimUserNameFormSchema),
  });

  const router = useRouter();

  async function handlePreRegister(data: ClaimUserNameFormSchemaType) {
    const { username } = data;
    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <Error>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : "Digite um nome de usuário para reservar"}
        </Text>
      </Error>
    </>
  );
}
