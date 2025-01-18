'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import SecretAgentIcon from '@/assets/FVLCON3.png';
import Text from '@styles/components/text';
import { TypographySize } from '@styles/style.types';
import theme from '@styles/theme';
import Input from '@components/input/input';
import { FaEye, FaEyeSlash, FaRegEye, FaUser } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import Button from '@components/button/button';
import { RiLockPasswordFill } from 'react-icons/ri';
import Link from 'next/link';

const Form = ({
    handleSubmit,
    loading,
    formik
} : {
    handleSubmit : (e?: React.FormEvent<HTMLFormElement>) => void
    formik : any,
    loading : boolean
    errorMessage? : string
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4 flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px]"
            >
                <div className='w-full flex justify-center items-center mb-2 flex-col gap-1'>
                    <Image
                        src={SecretAgentIcon.src}
                        alt='secret agent icon'
                        width={50}
                        height={50}
                    />
                    <Text
                        size={TypographySize.HM}
                        textColor={theme.colors.text.secondary}
                    >
                        Login
                    </Text>
                </div>
                <form onSubmit={handleSubmit} className="bg-bg-quantinary shadow-xl rounded-[14px] p-6 border-solid border-[1px] border-bg-alt1">
                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="companyCode">
                            <Text textColor={theme.colors.text.primary}>
                                Comopany Code
                            </Text>
                        </label>
                        <Input
                            PreIcon={<FaUser color={theme.colors.text.secondary}/>}
                            type="text"
                            name='companyCode'
                            placeholder="Enter Company Code"
                            autofocus
                            content={formik.values.companyCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.companyCode && formik.touched.companyCode ? '!border-[#d44848]' : ''} !rounded-lg`}
                        />
                        {
                            formik.errors.companyCode && formik.touched.companyCode && (
                                <Text
                                    textColor='#d44848'
                                >
                                    {formik.errors.companyCode}
                                </Text>
                            )
                        }
                    </div>
                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="email">
                            <Text textColor={theme.colors.text.primary}>
                                Email
                            </Text>
                        </label>
                        <Input
                            PreIcon={<MdEmail color={theme.colors.text.secondary}/>}
                            type="text"
                            name='email'
                            placeholder="Eg: johndoe@gmail.com"
                            content={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.email && formik.touched.email ? '!border-[#d44848]' : ''} !rounded-lg`}
                        />
                        {
                            formik.errors.email && formik.touched.email && (
                                <Text
                                    textColor='#d44848'
                                >
                                    {formik.errors.email}
                                </Text>
                            )
                        }
                    </div>
                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="password">
                            <Text textColor={theme.colors.text.primary}>
                                Password
                            </Text>
                        </label>
                        <Input
                            PreIcon={<RiLockPasswordFill color={theme.colors.text.secondary}/>}
                            type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder="Enter your Password"
                            content={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.password && formik.touched.password ? '!border-[#d44848]' : ''} !rounded-lg`}
                            PostIcon={
                                showPassword ? 
                                <FaEyeSlash 
                                    color={theme.colors.text.secondary}
                                    onClick={()=>setShowPassword(false)}
                                    className='cursor-pointer'
                                /> 
                                : 
                                <FaEye 
                                    color={theme.colors.text.secondary}
                                    onClick={()=>setShowPassword(true)}
                                    className='cursor-pointer'
                                />
                            }
                        />
                        {
                            formik.errors.password && formik.touched.password && (
                                <Text
                                    textColor='#d44848'
                                >
                                    {formik.errors.password}
                                </Text>
                            )
                        }
                    </div>
                    <Button
                        text='Login'
                        type='submit'
                        className='!w-full !bg-bg-secondary hover:!bg-bg-tetiary'
                        loading={loading}
                    />
                    <div className='flex w-full justify-end mt-1'>
                        <Link href={'/forgot-password'}>
                            <Text
                                className='w-full hover:!text-main-primary duration-200'
                            >
                                Forgot Password?
                            </Text>
                        </Link>
                    </div>
                </form>
            </motion.div>
            <Text
                textColor={theme.colors.text.tetiary}
            >
                &copy;2024 Blvck Sapphire. All rights reserved.
            </Text>
        </div>
    )
}
export default Form