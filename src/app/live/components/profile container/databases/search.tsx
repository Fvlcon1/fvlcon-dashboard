import Searchbar from '@components/search/search';
import Flex from '@styles/components/flex';
import { AnimatePresence, motion } from 'framer-motion';

const Search = ({
    showSearch
} : {
    showSearch? : boolean
}) => {
    return (
        <AnimatePresence>
            {
                showSearch &&
                <motion.div 
                    initial={{
                        opacity : 0,
                        y : 5
                    }}
                    animate={{
                        opacity : 1,
                        y : 0
                    }}
                >
                    <Flex>
                        <Searchbar
                            inputStyle="!bg-bg-tetiary"
                        />
                    </Flex>
                </motion.div>
            }
        </AnimatePresence>
    )
}
export default Search