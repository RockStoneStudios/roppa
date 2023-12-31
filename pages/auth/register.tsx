
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { useContext, useState } from 'react';

import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { getSession, signIn } from 'next-auth/react';

type FormData = {
    name : string;
    email : string;
    password : string;
}

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();
    const [showError,setShowError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const router = useRouter();
    const {registerUser} = useContext(AuthContext)

    const onRegisterForm = async ({name,email,password} : FormData) => {
        setShowError(false);
        const {hasError,message} = await registerUser(name,email,password);
        if(hasError){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(()=> setShowError(false),3010);
            return;
        }
        // const destination = router.query.p?.toString() || '/';
        // router.replace
        // router.replace('/');
        await signIn('credentials',{email,password});
      
    }
  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)}>

        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                    <Chip
                     label= "No puede usar ese correo"
                     color = "error"
                     icon={<ErrorOutline/>}
                     className='fadeIn'
                     sx = {{display:showError ? 'flex' : 'none'}}
                    
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                    {...register('name',{
                        required : 'Este campo es requerido',
                        minLength : {value : 3, message : 'Tu nombre debe tener minimo 3 caracteres'}
                    })}
                    error = {!!errors.email}
                    helperText= {errors.name?.message}
                    label="Nombre completo" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    type='email'
                    {...register('email',{
                        required : 'Este campo es requerido',
                        validate : validations.isEmail
                    }
                    )}
                    error = {!!errors.email}
                    helperText = {errors.email?.message}
                    label="Correo" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                     {...register('password',{
                        required : 'Este campo es reqerido',
                        minLength : {value : 6, message : 'Minimo 6 caracteres'}
                     })}
                     error = {!!errors.password}
                     helperText= {errors.password?.message}
                    label="Contraseña" type='password' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button 
                    type='submit'
                    color="secondary" className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : "/auth/login"} passHref>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
      const session = await getSession({req});
      const {p= '/'} = query;

       if(session){
        return {
            redirect :{
                destination : p.toString(),
                permanent: false
            }
        }
       }
    return {
        props: {
            
        }
    }
}




export default RegisterPage