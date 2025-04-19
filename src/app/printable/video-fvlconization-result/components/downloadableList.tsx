import Text from "@styles/components/text"
import theme from "@styles/theme"

const DownloadableList = ({
    data,
    evenBg, 
    oddBg,
    first,
    last
} : {
    data : string[][],
    evenBg? : string,
    oddBg? : string,
    first? : number,
    last? : number
}) => {
    let filteredData : string[][] = []
    if(first){
        for(let i in data){
            if(i < (first).toString()){
                filteredData.push(data[i])
            }
        }
    } else if (last){
        for(let i in data){
            if(i > (last-1).toString()){
                filteredData.push(data[i])
            }
        }
    } else {
        filteredData = data
    }
    return (
        <div className="flex-1 flex flex-col">
            {
                filteredData.map((item, index) => (
                    item.length ?
                    <div 
                        key={index}
                        className={`w-full py-1 rounded-md flex gap-1`}
                    >
                        <Text>
                            {item[0]}:
                        </Text>
                        <Text
                            textColor={theme.colors.textLight.secondary}
                        >
                            {item[1]}
                        </Text>
                    </div>
                    :
                    <></>
                ))
            }
        </div>
    )
}
export default DownloadableList