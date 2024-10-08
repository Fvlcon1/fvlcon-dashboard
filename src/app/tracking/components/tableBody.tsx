import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import MatchContainer from "./matchContainer"

const TableBody = () => {
    return (
        <tbody>
            {
                [1,2,3,].map((item, index) => (
                    <tr
                        key={index}
                        className={`${index % 2 === 1 ? 'bg-gradient-container-md' : ''} hover:scale-[0.98] cursor-pointer duration-200`}
                    >
                        <td className="py-4 pl-4">
                            <MatchContainer />
                        </td>
                        <td className="py-4">
                            <div className="flex flex-col gap-0">
                                <Text
                                    textColor={theme.colors.text.primary}
                                >
                                    Chris Souad
                                </Text>
                                <Text>
                                    Shanghai, China
                                </Text>
                            </div>
                        </td>
                        <td className="py-4">
                            <div className="flex flex-col gap-0">
                                <Text
                                    textColor={theme.colors.text.primary}
                                >
                                    28th july 2024
                                </Text>
                                <Text>
                                    2 days ago | 12:00 pm
                                </Text>
                            </div>
                        </td>
                        <td className="py-4">
                            <Text>
                                Male
                            </Text>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}
export default TableBody