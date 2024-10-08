import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"

const TableBody = () => {
    return (
        <tbody>
            {
                [1,2,3,].map((item, index) => (
                    <tr
                        key={index}
                        className={`${index % 2 === 1 ? 'bg-gradient-container-md' : ''}`}
                    >
                        <td className="py-3 pl-4">
                            <div className="flex gap-2">
                                <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-sm">
                                    <Image
                                        src={require('@/assets/dev/image1.png')} 
                                        alt="test-bg"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                                    /> 
                                </div>
                                <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-sm">
                                    <Image
                                        src={require('@/assets/dev/image1.png')} 
                                        alt="test-bg"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                                    /> 
                                </div>
                            </div>
                        </td>
                        <td className="py-3">
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
                        <td className="py-3">
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
                        <td className="py-3">
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