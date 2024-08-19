import AppTypography from '@styles/components/appTypography';
import Flex from '@styles/components/flex';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
const Loading = ({
    title,
    spinSize
} : {
    title? : string,
    spinSize? : "small" | "default" | "large"
}) => {
    return (
        <motion.div 
            className='w-full min-h-[200px] animate-pulse flex justify-center items-center'
            initial = {{
                y : 0,
                opacity : 0,
            }}
            animate = {{
                y : 0,
                opacity : 1
            }}
            transition={{
                duration : 1
            }}
        >
            <Flex
                width="fit-content"
                direction="column"
                align="center"
            >
                <Spin size={spinSize ?? 'small'}></Spin>
                <AppTypography>
                    {title}
                </AppTypography>
            </Flex>
        </motion.div>
    )
}

export default Loading