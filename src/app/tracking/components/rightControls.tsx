'use client';

import Button from "@components/button/button";
import Searchbar from "@components/search/search";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaCaretDown, FaSort } from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { IoImage } from "react-icons/io5";
import { MdDoneAll } from "react-icons/md";
import { trackingContext } from "../context/trackingContext";
import { IPersonTrackingType, IPlateOrPerson, IPlateTrackingType, ITrackingDataType, ITrackingDataTypes } from "./types";
import { protectedAPI } from "@/utils/api/api";
import { parseCoordinates } from "@/utils/parseCoordinate";

const privateApi = new protectedAPI()
const RightControls = ({
    newPersonTrackingData,
    setFilteredSearchResults,
    setSearchResults,
    searchResults,
    searchValue,
    setSearchValue
}: {
    newPersonTrackingData: {
        status: "loading" | null;
        data: IPersonTrackingType[];
    };
    setFilteredSearchResults: Dispatch<SetStateAction<{
        status: "loading" | null;
        data: IPlateOrPerson[];
    }>>
    setSearchResults: Dispatch<SetStateAction<{status: 'loading' | null, data: IPlateOrPerson[]}>>
    searchResults: {status: 'loading' | null, data: IPlateOrPerson[]}
    setSearchValue: Dispatch<SetStateAction<string>>
    searchValue: string
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { imageUrl, setImageUrl } = useContext(trackingContext);
    const [dataType, setDataType] = useState<'all' | 'plate' | 'person'>('all');

    const inputClicked = () => {
        inputRef.current?.click();
    };

    const handleSearchValueChange = async () => {
        setSearchResults({status : 'loading', data : []})
        const getSearchResults = await privateApi.get("/tracking/searchNumberPlatePartial", {numberPlate : searchValue})
        const numberPlates = getSearchResults?.data
        const plateArray : IPlateOrPerson[] = []
        if(numberPlates?.length > 0){
            for(let plate of numberPlates){
                const plateObject : IPlateTrackingType = {
                    id: plate?.Id.S,
                    plateNumber: plate.plateNumber.S,
                    timestamp: plate.Timestamp.S,
                    coordinates: parseCoordinates(plate.coordinates.S),
                    locationName: plate.locationName.S,
                    imageUrl: plate.imageUrl,
                    userId: plate.UserId.S,
                    S3Key : plate.S3Key.S,
                    type: ITrackingDataTypes.plate,
                }
                plateArray.push(plateObject)
            }
            setSearchResults({status : null, data : plateArray})
            console.log({plateArray})
        } else {
            setSearchResults({status : null, data : newPersonTrackingData.data ?? []})
        }
    }

    const onFileSelected = (e: FileList | null) => {
        if (e) {
            for (let file of e) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result as string;
                    setImageUrl(base64String);
                };
                reader.readAsDataURL(file);
                setImageUrl('');
            }
        }
    };

    const delay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const updatePersonTrackingData = async () => {
        setFilteredSearchResults({ data: [], status: null });
        for (let item of searchResults.data) {
            setFilteredSearchResults(prev => ({
                ...prev,
                data: [
                    ...searchResults.data,
                    ...(dataType === 'all' ? [item] : (dataType === item.type ? [item] : []))
                ]
            }));

            await delay(100);
        }
    };

    const filterByType = () => {
        updatePersonTrackingData();
    };

    useEffect(() => {
        filterByType();
    }, [dataType, searchResults]);

    useEffect(() => {
        if (inputRef.current?.value?.length && inputRef.current?.value?.length > 0) {
            inputRef.current.value = '';
        }
    }, [imageUrl]);

    useEffect(()=>{
        handleSearchValueChange()
    }, [searchValue])

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
                <input
                    ref={inputRef}
                    type="file"
                    onChange={e => onFileSelected(e.target.files)}
                    className="hidden"
                />
                <Button
                    text=""
                    onClick={inputClicked}
                    className="border-dashed border-[1px] border-bg-alt1"
                    icon={
                        <IoImage
                            color={theme.colors.text.secondary}
                            size={15}
                        />
                    }
                />
                <div
                    className={`flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary duration-200 cursor-pointer ${dataType === 'all' ? 'bg-bg-quantinary' : 'bg-bg-tetiary'} items-center`}
                    onClick={() => setDataType("all")}
                >
                    <MdDoneAll
                        color={dataType === 'all' ? theme.colors.text.primary : theme.colors.text.secondary}
                        className="duration-200"
                        size={12}
                    />
                    <Text textColor={dataType === 'all' ? theme.colors.text.primary : theme.colors.text.secondary}>
                        All
                    </Text>
                </div>
                <div
                    className={`flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary duration-200 cursor-pointer ${dataType === 'person' ? 'bg-bg-quantinary' : 'bg-bg-tetiary'} items-center`}
                    onClick={() => setDataType("person")}
                >
                    <FaUserAlt
                        color={dataType === 'person' ? theme.colors.text.primary : theme.colors.text.secondary}
                        className="duration-200"
                        size={12}
                    />
                    <Text textColor={dataType === 'person' ? theme.colors.text.primary : theme.colors.text.secondary}>
                        People
                    </Text>
                </div>
                <div
                    className={`flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary duration-200 cursor-pointer ${dataType === 'plate' ? 'bg-bg-quantinary' : 'bg-bg-tetiary'} items-center`}
                    onClick={() => setDataType("plate")}
                >
                    <HiTemplate
                        color={dataType === 'plate' ? theme.colors.text.primary : theme.colors.text.secondary}
                        className="duration-200"
                        size={12}
                    />
                    <Text
                        whiteSpace="nowrap"
                        textColor={dataType === 'plate' ? theme.colors.text.primary : theme.colors.text.secondary}
                    >
                        Number plates
                    </Text>
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <Searchbar
                    className="bg-bg-secondary rounded-lg flex-1"
                    inputStyle="bg-bg-secondary rounded-lg"
                    placeholder="Search number plates"
                    searchValue={searchValue}
                    setSearchValue={(setSearchValue)}
                    
                />
                {/* <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaSort
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        Sort
                    </Text>
                </div> */}
            </div>
        </div>
    );
};

export default RightControls;