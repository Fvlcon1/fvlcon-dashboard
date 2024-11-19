'use client'

import Searchbar from '@components/search/search';
import Flex from '@styles/components/flex';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Search = ({
    showSearch
} : {
    showSearch? : boolean
}) => {
    const [searchValue, setSearchValue] = useState<string>('')

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
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                        />
                    </Flex>
                </motion.div>
            }
        </AnimatePresence>
    )
}
export default Search