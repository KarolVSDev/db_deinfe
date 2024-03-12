[1mdiff --git a/src/components/SignForms/SignUpForm.tsx b/src/components/SignForms/SignUpForm.tsx[m
[1mindex 85aa161..2082894 100644[m
[1m--- a/src/components/SignForms/SignUpForm.tsx[m
[1m+++ b/src/components/SignForms/SignUpForm.tsx[m
[36m@@ -12,10 +12,15 @@[m [mimport Typography from '@mui/material/Typography';[m
 import Container from '@mui/material/Container';[m
 import FormLabel from '@mui/material/FormLabel/FormLabel';[m
 import RadioGroup from '@mui/material/RadioGroup/RadioGroup';[m
[32m+[m[32mimport InputAdornment from '@mui/material/InputAdornment';[m
 import Radio from '@mui/material/Radio/Radio';[m
 import validator, { isEmail } from 'validator'[m
 import { useForm } from 'react-hook-form';[m
[31m-import yup from 'yup'[m
[32m+[m[32mimport IconButton from '@mui/material/IconButton/IconButton';[m
[32m+[m[32mimport { Visibility, VisibilityOff } from '@mui/icons-material';[m
[32m+[m[32mimport FormControl from '@mui/material/FormControl/FormControl';[m
[32m+[m[32mimport InputLabel from '@mui/material/InputLabel/InputLabel';[m
[32m+[m[32mimport OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';[m
 [m
 [m
 interface FormData{[m
[36m@@ -44,10 +49,15 @@[m [mfunction Copyright(props: any) {[m
 [m
 [m
 export default function SignUp() {[m
[31m-  [m
[32m+[m[32m  const [showPassword, setShowPassword] = React.useState(false);[m
   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({});[m
   [m
 [m
[32m+[m[32m  const handleClickShowPassword = () => setShowPassword((show) => !show);[m
[32m+[m[32m  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {[m
[32m+[m[32m    event.preventDefault();[m
[32m+[m[32m  };[m
[32m+[m
   const onSubmit = (data:FormData) => {[m
     console.log(data)[m
   }[m
[36m@@ -121,10 +131,10 @@[m [mexport default function SignUp() {[m
                   {errors.cargo.message}[m
                 </Typography>[m
                 )}[m
[31m-              <Grid >[m
[32m+[m[32m              <Grid sx={{width:'100%'}}>[m
                 <Grid sx={{display:'flex', flexDirection:'row', ml:"10px"}}>[m
                   <FormLabel id="demo-radio-buttons-group-label" sx={{mt:"8px"}}>Ativo:</FormLabel>[m
[31m-                  <RadioGroup[m
[32m+[m[32m                  <RadioGroup[m[41m [m
                       aria-labelledby="radio-buttons-ativo-inativo"[m
                       defaultValue="S"[m
                       aria-required[m
[36m@@ -137,20 +147,36 @@[m [mexport default function SignUp() {[m
                     </RadioGroup>[m
                 </Grid>[m
               </Grid>[m
[31m-              <Grid item xs={12}>[m
[31m-                <TextField  [m
[32m+[m[32m              <FormControl  sx={{ml:1, width: '100%' }} variant="outlined" error={!!errors?.senha}>[m
[32m+[m[32m                <InputLabel sx={{p:'px'}} htmlFor="senha">Password</InputLabel>[m
[32m+[m[32m                <OutlinedInput[m
                   required[m
[32m+[m[32m                  id="senha"[m
[32m+[m[32m                  type={showPassword ? 'text' : 'password'}[m
                   fullWidth[m
                   label="senha"[m
[31m-                  type="password"[m
[31m-                  id="senha"[m
                   error={!!errors?.senha}[m
                   {...register('senha',{required:'Campo obrigatório',[m
                   minLength: 8 || 'A senha deve ter 8 caracteres no mínimo', [m
[31m-                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ || 'A senha deve conter letras maiúsculas, minúsculas números e um carcter especial #$%'})}[m
[31m-                  autoComplete="new-password"[m
[32m+[m[32m                  pattern: {[m
[32m+[m[32m                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,[m
[32m+[m[32m                    message: 'A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial #$%'[m
[32m+[m[32m                  }[m
[32m+[m[32m                  })}[m
[32m+[m[32m                  endAdornment={[m
[32m+[m[32m                    <InputAdornment position="end">[m
[32m+[m[32m                      <IconButton[m
[32m+[m[32m                        aria-label="toggle password visibility"[m
[32m+[m[32m                        onClick={handleClickShowPassword}[m
[32m+[m[32m                        onMouseDown={handleMouseDownPassword}[m
[32m+[m[32m                        edge="end"[m
[32m+[m[32m                      >[m
[32m+[m[32m                        {showPassword ? <VisibilityOff /> : <Visibility />}[m
[32m+[m[32m                      </IconButton>[m
[32m+[m[32m                    </InputAdornment>[m
[32m+[m[32m                  }[m
                 />[m
[31m-              </Grid>[m
[32m+[m[32m              </FormControl>[m
               {errors?.senha && ([m
                 <Typography variant="caption" sx={{ color: 'red', ml:'10px'}}>[m
                 {errors.senha.message}[m
[36m@@ -189,6 +215,4 @@[m [mexport default function SignUp() {[m
   )[m
 }[m
 [m
[31m-function yupResolver(schema: yup.ObjectSchema<{ nome: string; email: string | undefined; }, yup.AnyObject, { nome: undefined; email: undefined; }, "">): import("react-hook-form").Resolver<import("react-hook-form").FieldValues, any> | undefined {[m
[31m-  throw new Error('Function not implemented.');[m
[31m-}[m
[41m+[m
