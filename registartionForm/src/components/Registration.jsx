
import { useState } from 'react'

export default function Registration(){
    const[form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const errors = validation(form);
    const[touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event){
        event.preventDefault();

        const validationErrors = validation(form);
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true
        });

        if(Object.keys(validationErrors).length > 0){
            setSubmitted(false);
                return;
        }

        setSubmitted(true);
    }

    function handleBlur(event){
        const {name} = event.target;
        setTouched(prevToched => ({
            ...prevToched,
            [name]: true
        }))
    }

    function handleCheckValidation() {
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true
        });
        }

    function handleChange(event){
        const {name, value} = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
        setSubmitted(false);
    }

    function validation(values){
        const errors = {};

        if(values.name.trim() === ''){
            errors.name = 'Name is Required';
        }

        //email Pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(values.email.trim())){
            errors.email = 'Enter a Valid email address'
        }

        if(values.password.length < 8){
            errors.password = "Password must be atleast 8 characters"
        }

        //validate confirm password
        if(values.confirmPassword === ''){
            errors.confirmPassword = "Please Confirm Your password";
        }else if(values.password != values.confirmPassword){
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    }

    return(
       <section className="mx-auto min-h-screen w-full max-w-lg px-4 py-10 text-left sm:px-6">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Registration Form</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="name">Full Name</label>

            <input
              id='name' name='name' type='text'
              placeholder='Enter your Name'
              value={form.name} onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
             {touched.name && errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email</label>

            <input id='email' name='email' type='email'
               placeholder='Enter your email'
               value={form.email} onChange={handleChange}
               onBlur={handleBlur}
               className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              
               {touched.email && errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>

            <input type="password" id='password' name='password'
               placeholder='Enter Your Password'
               value={form.password} onChange={handleChange}
               onBlur={handleBlur}
               className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />

              {touched.password && errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="confirm-password">Confirm Password</label>

            <input type="password" id='confirm-password' name='confirmPassword'
               placeholder='Confirm Password'
               value={form.confirmPassword} onChange={handleChange}
               onBlur={handleBlur}
               className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />

             {touched.confirmPassword && errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button type="button" onClick={handleCheckValidation}
                className="rounded-lg border border-indigo-600 px-4 py-2.5 font-medium text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                Check validation
            </button>
        <button type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                Submit registration
            </button>
        </div>

        {submitted && (
            <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                Registration submitted successfully!
            </p>
        )}
        </form>
       </section>
    )
}