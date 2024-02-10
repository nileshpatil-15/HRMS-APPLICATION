// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Button, Link, Checkbox } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// interface formFieldTypes {
//   username: string;
//   password: string;
// }

// const Login = () => {
//   const [loginError, setLoginError] = useState<string>("");
//   const navigate = useNavigate();
//   const {
//     control,
//     handleSubmit, 
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data:formFieldTypes) => {
//     console.log("f");
//     try {
//       const res = await fetch("http://104.237.6.253:4000/api/v1/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           officialEmail: data.username,
//           password: data.password,
//         }),
//       });
//       const result = await res.json();
//       if (result.statusCode === 201) {
//         const token = result.data.accessToken;

//         console.log(token);
//         localStorage.setItem("token", token);
//         //  const storedToken=localStorage.getItem('token')
//         navigate("./dashboard");
//       } else {
//         setLoginError(result.message);
//       }
//     } catch (error) {
//       console.log("err", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover"
//       style={{
//         backgroundImage: `url("https://images.jdmagicbox.com/comp/kolhapur/e3/0231px231.x231.230401022424.m9e3/catalogue/onpoint-software-services-deokar-panand-kolhapur-software-companies-hc5t322k8r.jpg?clr=")`,
//       }}
//     >
//       <div className="w-full max-w-md bg-white p-12 rounded-3xl shadow-lg">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <a className="mb-4 flex items-center justify-center" href="#!">
//               <img
//                 id="OPS-logo"
//                 className="w-16"
//                 src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANDw8QDQ8QDw0QDg0NDg8PEA8QEA0NFhIWFhcRFRUZICggGBolHRUWITEhJSkrLi8vFx80OTQ5OCgtMSsBCgoKDg0OGBAQGi0dHSUrKy0tLS0rLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIGBAUHA//EAD8QAAIBAQMGCggGAQUBAAAAAAABAgMEBREGITFBUWESExYiUlNxgZHRIzJCcpKTscEHFDNiofAVgqKywuFD/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAMCBAUGAQf/xAA3EQACAQICBQkIAgIDAAAAAAAAAQIDEQQFEiExUVITFDJBYXGBkaEGFSIjsdHh8FPBYqIWQkP/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAgAw7fedGzLGrNR2LTJ9i1nqTepEZzjBXk7LtMwCmW7LR6LPTS/dU8kaC135aavr1p4bItRX8FqGDqS26jJrZ1h4ao3l3HTatohD15xj2ySMSV9WVabRS+OLOWTk3nbbe9sgywsvXF6FKWfTb+GC8zqav+ydfDvbR6wvezS9WvSf8Arh5nJhEvd0eJnsc7qdcUdmjJNZmmt2ckcao2idN4wnKD/bJo29iyqtdHDGaqRWqol9dIuWXTXRd/Qt085py6cbeNzp4irXZlpRqYRrxdGW31oY9q0Flo1o1IqUJKUXocWmmilUpTpu01Y06VenVV4O56gACxwAAAAAAAAAAAAAAAAAAAAjyrVo04uU5KMVnbbwSR4Xjb6dmg51HgtSWmT2JHP74vipa5c54U0+bBaEtu9jqNCVR9hmZhmdPCK22fUvv+6zcXzlZKWMLKuCs6dR6X2LV3lVq1JTblOTlJ6XJttsTEalOlGCtFHH4jGVsTLSqO/ZsQmRJMTHiURYiTEyQ1EWJjYiaGpiZFjYmTTGJiMu7b1rWWXCozcdsdMZdqMViBxUlZq42EnF3i7PedHuHKqlacIVcKVZ5km+bN/te3cWQ4iW/JnK103Gja5cKGZRqv1obpbUZWJy+3xUtfYb2EzLSehV8/v9zoAEIyTSaeKaxTWtEzLNgAAAAAAAAAAAARi2+1xs9N1JvCKXe3sRkPNizn+Ul6u01MIv0UG1D9z6Q2lTc5W6jNzPHxwlHS2yez97DCvW8Z2qo5z0Z1COqMfMwWSImrFKKsjgZ1JVJuc3dsiwYwJnqIMRJkSaGoTAGJk0MREBsiySGITIskxMmORFgyREkmTRFkWSYmTQ1FryPykdGUbPaH6JtKnNv9NvU930Oh4nDzomRF+cfD8vVeNWmuY3pnT80ZOYYS3zYeP3NvLsW38qfh9i2gAGQbIAAAAAIjOWCb2LEAK/ldePF01Sg+fUTx3Q/90eJR2bC9bY69ac3obajuitHn3mAzTow0Y2PnOaY3nWIlNdFal3fkQmhqLbSWdtpJLW9heMn8n40EqlZcKtpS1U+zeSqVVTV2GAwNTFz0YbFte4r93ZMV6+Epeig9cvWa24G9oZH0EufKc32uK8Cy4AUZYmo+ux2OHybC0lrjpPtNHHJWyL/5t9s6n2ZLktY+rfzKnmboZDlqnE/Mt8xw38cfJGk5K2Pq38yp5i5KWPq38yp5m8AOWqcTPeZYf+OPkjR8lLH1b+ZU8xck7H1T+ZU8zege8vV4n5hzPD/xx8kaHklY+rfx1PMOSVj6t/MqeZvQDl6vE/MOZ0OBeRouSFi6uXzKnmLkhYuql8yr5m+AOcVeJ+Z7zShwLyNDyPsXVS+ZU8weR9i6qXzJ+ZvgPecVeJ+Yc1ocC8jjF40lCtVhHNGNSpGK3KWghYrVKhUhVpvCcJKS8n/dY7bU4dWpLpVJy7nI8GdPFXik9er+jl72ldb/AOzst2WyNpowqw9Wccex60ZhQ/w7vHB1LPJ5njVp/wDZfR+JezmcRR5Ko4ftjqcNV5WmpDAAEDxGpymtPFWeeGmfBgu95/4xNsVPLWvi6VNalOT/AIS+5OlG8kjOzWvyOEqSW21vPUVRiZJi4LbSWltJdrNNHzhFlyPuzhSdeazRfBp49LXIuRiXZZVQo04L2Y5970sxLwv+z2fFOXCmvZhi3j9jOm3UnqPouDp0sBhoxm1Hrd95tgKlUyzXs0MV+6eH2Z5vLWWqgvmPyJc2qbiPvrBL/v6P7FyEUvlpU6mPxvyFy1qdTD42e81q7g99YPifky7AUjlrV6mHxMXLar1MPiZ7zSru9T33zhOL0ZeAKLy3q9TD4pBy3q9TD4pHvM624998YTi9GXoCicuKvUw+KQuXNXqYfFIOZVtx772wvF6MvYGsyevGVroKrOKi3KSSTxWCzYm0K0ouLaZfpzU4qUdjEYl6VuKoVp9GlOXhFmWV3Lm1cXY5RWmpKMO7HF/QlShp1Ix3sjXnoU5S3JnM2JjYmdWjkUZdy2x2e0Uqq0RmuF7reDXgzscXisVoec4ezr2TVo46yUJvO+LUX2x5r+hk5rT6M/A2sqqdKHibQAAxzZEUXKypwrTJdGMY/wC3H7l6OfZRSxtVX3orwgh9DpHPe0s7YSK3yX0Zq2Zlz01K0UuFoUnJ47FHH7GGwxw0ZtKzbHqLr1qxxdGahOM2r2aZvb+yilVbp0G40lmclmc+zYiuMkxMlCKirIficXVxM3Oo7v0XYiLIs9IU3J4RTk9SSbZsKNwWqeii170ox/h5xjmltfmFKjUq9CLfcjVMRv1knanqgv8AUvsj05H2nbT+J+R4q9PeXY5di3/5vyK2wLHyOtPSpfFLyFyNtPSpfFLyDnFLiGrLcV/GytsCycjLT0qXjLyBZF2jXOlh2y8ifOaXEMWXYrgZWGelms8q04wppylJpJL6vYi3WfId4+lr5tkI6u1ljuu5qNkXoo85rBzlnk+8XUx1OK+HWy7h8orzfzPhR63TYlZ6FOks/Bik3tlrZmDEZDbbuzqYRUUorYgOeZf27jK8aSfNpR53vy/8S8S8XpbY2ajOrPRFZl0pal4nIrRWlUnKc3jKUnKT3s0MupXm5vqMrNq+jBUltf0PFiJMizcTMJCZ0j8Pa3Csjj0Ks0tyaUvuzm7L/wDhvL0NdalVi+9xw+xSzJXoeKNLLX89dxcgADnzogOfZSRwtVb3oP8A2I6AUbKylhaW+lGL78MPsOodI572khfCJ7pL+0aRkWTZBl44ZETd3FcErTz6mMKOrbPs2LeeFw3b+ZrKL/TjhKb3bO/zOgRgopJLBJJJITXrOPwx2nSZLlUcR86qvhWxb39jxsVhpUFwaUFHxxfazKACje+07SMIwWjFWQwAAJAAAAAAAAAAAACBnnVqKCcpNKKWLbeCSKNlPlO6uNGzNqnonU0Oa2LYt/8AW2jQlVlaJWxOKhQhpS29SMTK++/zNTi6b9DTenpz0Y9hW2SYM6GlTVOKjE5OrWlVm5y2sgJkyDHHiYmdB/DiPoKz21sPCKOfM6XkDR4NjTft1Jy+kf8AqUsyfyPE08sV6/gWUAAwDoxFWy0o/pT96D78Gvoy0muv2y8dZ5pLGSSlHtTxwJ05WkmUM0oOvhKkFttdd61nPWRZ6HpY6HG1YQ6U4ru1mhe2s+awi5yUVteoueS1i4mgpP1qnPfZqN0iMIpJJaEsCRnSd3c+pYehGhSjTjsSsAaDTXzftOy81c+rhmin6u+TKdeF9V7Q3w5tR6EObHDY9o2nQlPXsRQxucUMM9DpS3Lq72dArXhRp+vVhF75JM8f81Zuvp/EjmTEWFg49bMd+0dVvVTS8Tprvyy9fT+JC/z1l6+BzITJcyhvPf8AkNbgXqdO/wA9Zevh4sTv+ydfA5ixMlzGG9kln9bgXqdJq5T2OK/Vx92E39jU2zLWCxVCm5PbPBJdy0lKYmNjgaS23ZGec4iS1Wj3fkzrzvivan6WeMdUI5oru1mvY2RZchFRVkZ7qSm9KTu+0GQZJgxqJIiRY2JkhkRYHXrisvE2WhTemNOOPvPO/wCWczyesP5i1UoYYx4SnP3I535d51wyszqdGHibuU09Up+AwADJNoBYDAAOfX7YuIryXsyxmux6j2yUpcK0xfRjKXfhh9yxZR3fx9LGK9JDnR3rWjVZFUufVlsUF/yLWnemzi3l3IZrTil8LekvDXbwLaafKK9fy1PCP6s80V0V0mbStVUIylLMorFvcc3vO2StFWVSWhvCK2R1L+7RdCnpvXsNvOsweFo6MOnLZ2b2Yc25NuTbbbbb0tkSTItGmjgr3IMTJsiSGIixEmRZNDUJiGxEkMQMgyTEyaGoiIYiaGITExiZIYhMQ2ZV0XfK1VoUoa3jJ9GGuX92nrkopt6kNpxcmora9hb/AMP7s4MJ2iSzz5lP3E878foXE8rNQjShGEFhGEVGK2JHqc3WqOrUc31nYYeiqVOMF1DAAFDwAAABGFYrBGjOrKGZVHGWGx6zOEwuQlTjJqTWtbPoV3K+28Ckqaeeo3juisCls2l/2vjrRN+zF8CPYkatmhRjoxSPnmbYvnGKnJbFqXgRZFk2RLCM0iRJkCaGoQhsRJDIiZEmRZJDURYmTIMncYhCY2JkkNQpCYxYExiFGLbSSxbaSS1t6lvOlZKXL+UpcKa9PUwc/wBi1QTNfklk7xeFotC9JgnTg/Y/c9/0LeZONxSn8uGzr7fwdJleCcFys1r6u77jAAM42QAAAAAAABGBfNp4mhUljzsEo+83gjYFYy0qc2lBa5N+GHmTpq8kUcyxDoYWpUW2311Hhkpd8ZxqzqR4UZYU0nszt/bwMK+rhlQbnTxnS074du1by23TZeJo04a0m37zeLMzAnyzU20Z8MlpVMHClNWkle/Wm9fiv3UcpYmXe9cmYVcZUfRz04exJ9moqNusFWzvCrBx2PTF9jLtOrGRy2NyvEYR/Grx3rZ+DEZFkmIeiiiImMRIZEixE5ESaGoiJkiLJIamBBkzb3Tk3XtODw4ulm581pW5awnUjBXkyxRpTqy0YK7NPRpSnJRhFyk2kkk229hesnMlVRwq2lKVXM4w0xp73tZt7ouajZI+jjjPDnVJZ5PyNmZlfGua0Yal9TpsDlUaVp1Pil6IYABRNkAAAAAAAAAAAARXrzo8dbaMPZhFzlu/uYsJg0aHp6tR6cKcI+6li/5f8EouxTxlHlowh1aSb7lr/ozwACJcEedWlGaakk09KaTTPQAPGk9TK/bslaNTF026Ut2ePgaO1ZJ2iHqcGotzUX/OYvgDo15x67mXXyXCVndx0X2avwcur3XaKfrUanao4rxRizpyWmLW5pnWxcFbByxj60Z0vZuF/hqNd6v9jkWD2EoUJy9WEpdkWzrPFR6K8CWBPn3+P75HkfZ222r/AK/k5jZ7gtVT1aMlvm1H65zb2PIuo8HWqRgtagnJ9mLLwAuWMqPZqL1LI8NDXK8u/wDBqLvyes9nwcYcKa9qfOeO7Z3G3BDKspOTu3c1adKFNaMEkuwAADwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
//                 alt="OPS Logo"
//                 draggable="false"
//               />
//             </a>
//           </div>
//           <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
//           <div className="mb-4">
//             <Controller
//               name="username"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   size="small"
//                   label="Email"
//                   type="text"
//                   fullWidth
//                   error={!!errors.username}
//                   InputProps={{ style: { borderRadius: 10 } }}
//                   helperText={errors.username ? errors.username.message : null}
//                 />
//               )}
//             />
//           </div>

//           <div className="mb-2">
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Password is required",
//                 pattern: {
//                   value:
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})/,
//                   message: "Invalid password",
//                 },
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   size="small"
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   error={!!errors.password}
//                   InputProps={{ style: { borderRadius: 10 } }}
//                   helperText={errors.password ?String (errors.password.message) : null}
//                 />
//               )}
//             />
//           </div>

//           <div className="mb-6 flex items-center justify-between">
//             <label>
//               <Controller
//                 name="rememberMe"
//                 control={control}
//                 defaultValue={false}
//                 render={({ field }) => <Checkbox {...field} color="primary" />}
//               />
//               Remember Me
//             </label>

//             <Link href="/forgot-password" color="#33C1FF" >
//               Forgot Password?
//             </Link>
//           </div>
//           <p className="text-red-600 pb-4">{loginError}</p>
//           <Button style= {{ borderRadius: 12,backgroundColor:"#33C1FF"  }}  variant="contained" type="submit" fullWidth>
//             Login
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



