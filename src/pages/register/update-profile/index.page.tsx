import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { FormAnotation, ProfileBox } from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { UpdateProfileFormSchema } from './validators/update-profile-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import type { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '@/src/lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

type UpdateProfileFormData = z.input<typeof UpdateProfileFormSchema>

export default function UpdateProfile() {
  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })

      router.push(`schedule/${session.data?.user.username}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user?.name || 'usuário'}
            />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnotation size="sm">
              <Text>
                Fale um pouco sobre você. Isso será exibido em sua página
                pessoal.
              </Text>
            </FormAnotation>
          </label>
          <Button disabled={isSubmitting} type="submit">
            Próximo passo
            <ArrowRight weight="bold" />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
