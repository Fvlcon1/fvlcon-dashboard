import Button from '@components/button/button';
import Text from '@styles/components/text';
import { TypographySize } from '@styles/style.types';
import theme from '@styles/theme';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsFileEarmarkLock2Fill } from "react-icons/bs";

const Agreement = () => {
    const handleAgree = () => {
        window.location.href = '/dashboard/home';
    };

    return (
        <div className='bg-bg-secondary w-full h-screen flex items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[500px] flex flex-col gap-2 items-center"
            >
                <div className='w-full flex justify-center items-center mb-2 flex-col gap-1'>
                    <BsFileEarmarkLock2Fill 
                        color={theme.colors.text.secondary}
                        size={40}
                    />
                    <Text
                        size={TypographySize.HM}
                        textColor={theme.colors.text.secondary}
                    >
                        Agreement
                    </Text>
                </div>
                <div className="bg-bg-quantinary shadow-xl rounded-[14px] px-6 py-4 border-solid border-[1px] border-bg-alt1 flex justify-center">
                    <Text
                        size={TypographySize.HM}
                        textAlign='center'
                    >
                        This is a secure system for access by authorized individuals only. The right to use this system is restricted to authorized individuals only and is not transferable to any other person or entity. By clicking Agree you acknowledge, understand, and further agree that you are authorized and you will observe and be bound by the {' '}
                        <Link href={'#'}>
                            <Text
                                textColor={theme.colors.main.primary}
                            >
                                Access and Terms of Use Agreement.
                            </Text>
                        </Link>
                    </Text>
                </div>
                <Button
                    text='Agree'
                    type='submit'
                    className='!w-full !bg-bg-tetiary hover:!bg-bg-quantinary !rounded-[12px]'
                    onClick={handleAgree}
                    size={{
                        height : '45px'
                    }}
                />
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    &copy;2024 Blvck Sapphire. All rights reserved.
                </Text>
            </motion.div>
        </div>
    )
}
export default Agreement