import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O nome de usuário deve conter apenas letras e hífens",
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterSchemaType) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">
          Bem-vindo ao Ignite Call!
          <Text>
            Precisamos de algumas informações para criar o seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Heading>
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder={"seu-usuario"}
            {...register("username")}
          />
          {errors.username && (
            <FormError size="sm" color="error">
              {errors.username.message}
            </FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder={"Seu nome"} {...register("name")} />
          {errors.name && (
            <FormError size="sm" color="error">
              {errors.name.message}
            </FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
