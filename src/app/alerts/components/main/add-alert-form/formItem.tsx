import AppTypography from '@styles/components/appTypography';
import Flex from '@styles/components/flex';
import theme from '@styles/theme';
import Required from '@/app/live/components/add cam/required';
import FormInput from './form-input';
import { Dispatch, SetStateAction } from 'react';

const FormItem = ({
    title,
    description,
    value,
    setValue,
    placeholder,
    required
} : {
    title : string
    description? : string
    value : string
    setValue : Dispatch<SetStateAction<string>>,
    placeholder? : string,
    required? : boolean
}) => {
    return (
        <div className='flex justify-between gap-6 pl-1'>
            <Flex
                direction="column"
                flex={0.7}
                width="fit-content"
                gap={4}
            >
                <Flex
                    width="fit-content"
                    align="center"
                >
                    <AppTypography textColor={theme.colors.text.primary}>
                        {title}
                    </AppTypography>
                    { required && <Required /> }
                </Flex>
                <AppTypography>
                    {description}
                </AppTypography>
            </Flex>
            <FormInput
                content={value}
                setContent={setValue}
                placeholder={placeholder}
            />
        </div>
    )
}
export default FormItem