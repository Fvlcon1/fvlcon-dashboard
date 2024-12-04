import Text from "@styles/components/text"
import theme from "@styles/theme"

const List = ({
    data,
    evenBg, 
    oddBg
} : {
    data : string[][],
    evenBg? : string,
    oddBg? : string
}) => {
    return (
        <div className="flex-1 flex flex-col">
            {
                data.map((item, index) => (
                    <div 
                        key={index}
                        className={`w-full py-3 px-4 rounded-md flex gap-1`}
                        style={{
                            backgroundColor : index % 2 === 0 ? evenBg ?? theme.colors.bg.tetiary : oddBg ??  ''
                        }}    
                    >
                        <Text>
                            {item[0]}:
                        </Text>
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {item[1]}
                        </Text>
                    </div>
                ))
            }
        </div>
    )
}
export default List