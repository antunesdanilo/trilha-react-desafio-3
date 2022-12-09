import { useForm } from "react-hook-form";
import { MdAccountCircle, MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { Container, Column, Title, Wrapper, TitleRegister, SubtitleRegister, Row, LoginText, TenhoContaText, AoClicar } from "./styles";

const Register = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors  } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
});

  const onSubmit = async (formData) => {
    try{
        const {data} = await api.post(`/users?name=${formData.name}email=${formData.email}&senha=${formData.senha}`);
        
        if(data.length && data[0].id){
            navigate('/feed') 
            return
        }

        alert('Usuário ou senha inválido')
    }catch(e){
        //TODO: HOUVE UM ERRO
    }
};

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleRegister>Comece agora grátis</TitleRegister>
            <SubtitleRegister>Crie sua conta e make the change._</SubtitleRegister>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Nome completo" leftIcon={<MdAccountCircle />} name="name"  control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button title="Criar minha conta" variant="secondary" type="submit"/>
            </form>
            <AoClicar>
              Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
            </AoClicar>
            <Row>
              <TenhoContaText>
                Já tenho conta. 
              </TenhoContaText>
              <Link to='/login'>
                  <LoginText>Fazer Login</LoginText>
              </Link>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  )
}

export { Register };
