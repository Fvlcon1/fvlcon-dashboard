'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Text from '@styles/components/text'
import Input from '@components/input/input'
import Button from '@components/button/button'
import SecretAgentIcon from '@/assets/FVLCON3.png'
import theme from '@styles/theme'
import validationSchema from './utils/validationSchema'
import { TypographySize } from '@styles/style.types'
import { message } from 'antd'

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            companyCode: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setErrorMessage('') // Reset any previous error message
            
            const data = { 
              companyCode: values.companyCode, 
              firstName: values.firstname, 
              lastName: values.lastname, 
              email: values.email, 
              password: values.password 
            }
            
            try {
                setLoading(true)
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })

                if (response.ok) {
                    message.success('Signup successful')
                    router.push('/auth/login')
                } else {
                    const result = await response.json()
                    setErrorMessage(result.error || 'Signup failed')
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Error signing up:', error)
                message.error("An error occurred. Please try again.")
                setErrorMessage('An error occurred. Please try again.')
            }
        }
    })

    useEffect(() => {
        errorMessage && message.error(errorMessage)
    }, [errorMessage])

    return (
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4 flex-col gap-2">
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
                        Create An Account
                    </Text>
                </div>
                <form onSubmit={formik.handleSubmit} className="bg-bg-quantinary shadow-xl rounded-[14px] p-6 mb-4 border-solid border-[1px] border-bg-alt1">
                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="companyCode">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Company Code
                            </Text>
                        </label>
                        <Input
                            name="companyCode"
                            PreIcon={<FaBuilding color={theme.colors.text.secondary}/>}
                            type="text"
                            placeholder="Enter Company code here"
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
                        <label className="pl-1" htmlFor="firstname">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                First Name
                            </Text>
                        </label>
                        <Input
                            name="firstname"
                            PreIcon={<FaUser color={theme.colors.text.secondary}/>}
                            type="text"
                            placeholder="Enter your first name"
                            content={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.firstname && formik.touched.firstname ? '!border-[#d44848]' : ''} !rounded-lg`}
                        />
                        {
                            formik.errors.firstname && formik.touched.firstname && (
                                <Text
                                    textColor='#d44848'
                                >
                                    {formik.errors.firstname}
                                </Text>
                            )
                        }
                    </div>

                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="lastname">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Last Name
                            </Text>
                        </label>
                        <Input
                            name="lastname"
                            PreIcon={<FaUser color={theme.colors.text.secondary}/>}
                            type="text"
                            placeholder="Enter your last name"
                            content={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.lastname && formik.touched.lastname ? '!border-[#d44848]' : ''} !rounded-lg`}
                        />
                        {
                            formik.errors.lastname && formik.touched.lastname && (
                                <Text
                                    textColor='#d44848'
                                >
                                    {formik.errors.lastname}
                                </Text>
                            )
                        }
                    </div>

                    <div className="mb-2 flex flex-col gap-[2px]">
                        <label className="pl-1" htmlFor="email">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Email
                            </Text>
                        </label>
                        <Input
                            name="email"
                            PreIcon={<MdEmail color={theme.colors.text.secondary}/>}
                            type="text"
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
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Password
                            </Text>
                        </label>
                        <Input
                            name="password"
                            PreIcon={<RiLockPasswordFill color={theme.colors.text.secondary}/>}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password must be at least 8 characters"
                            content={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.errors.password && formik.touched.password ? '!border-[#d44848]' : ''} !rounded-lg`}
                            PostIcon={
                                showPassword ?
                                    <FaEyeSlash
                                        color={theme.colors.text.secondary}
                                        onClick={() => setShowPassword(false)}
                                        className='cursor-pointer'
                                    />
                                    :
                                    <FaEye
                                        color={theme.colors.text.secondary}
                                        onClick={() => setShowPassword(true)}
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
                        text='Sign Up'
                        type='submit'
                        className='!w-full !bg-bg-secondary hover:!bg-bg-tetiary'
                        loading={loading}
                    />
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
