'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '@/components/services/userServices';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../loading';

function RegisterUs() {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required!'),
        email: Yup.string().email().required('Required!'),
        password: Yup.string().min(4, "Minimun 4 letters").max(20, "Maximun 20 letters").required('Required!'),
        confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Password don't match").required('Required!')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const handleRegister = async (d) => {
        let formDataSend = new FormData();
        formDataSend.append("name", d.name);
        formDataSend.append("email", d.email);
        formDataSend.append("password", d.password);

        setLoading(true);
        const result = await RegisterUser(formDataSend);
        const { total, count, message, status } = result
        if (status === 201) {
            setLoading(false);
            router.push("/");
            router.refresh();
        } else {
            setLoading(false);
            alert(message)
        }


    }

    return (
        <>
            {loading ? <Loading /> :
                <div className='w-full h-full flex justify-center'>
                    <div>
                        <form className="w-96 bg-white p-5 rounded-md" onSubmit={handleSubmit(handleRegister)}>
                            <h1 className="font-bold text-3xl text-gray-800 mb-10">
                                Log In
                            </h1>
                            <div className="flex flex-col mt-8 relative">
                                <input id="name" {...register('name')} className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                                    type="name" name="name"
                                />
                                <p className="text-xs text-red-600 text-left">{errors.name?.message}</p>
                                <label htmlFor="name" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="flex flex-col mt-8 relative">
                                <input id="email" {...register('email')} className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                                    type="email" name="email"
                                />
                                <p className="text-xs text-red-600 text-left">{errors.email?.message}</p>
                                <label htmlFor="email" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="flex flex-col mt-8 relative">
                                <input id="password" {...register('password')}
                                    className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                                    type="password" name="password"
                                />
                                <p className="text-xs text-red-600 text-left">{errors.password?.message}</p>
                                <label htmlFor="password" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="flex flex-col mt-8 relative">
                                <input id="confirmpassword" {...register('confirmpassword')}
                                    className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                                    type="password" name="confirmpassword"
                                />
                                <p className="text-xs text-red-600 text-left">{errors.confirmpassword?.message}</p>
                                <label htmlFor="confirmpassword" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="pt-3 flex justify-end items-center space-x-2">
                                <button type="submit" className="flex space-x-1 bg-gray-400 focus:outline-none hover:bg-gray-500 hover:scale-105 text-gray-800 hover:text-gray-100 transition-all ease-in-out font-semibold rounded-xl px-3 py-2">
                                    <span>
                                        Register
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default RegisterUs
