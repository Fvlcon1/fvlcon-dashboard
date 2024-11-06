'use client';

import Button from "@components/button/button";
import Searchbar from "@components/search/search";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaCaretDown, FaSort } from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { IoImage } from "react-icons/io5";
import { MdDoneAll } from "react-icons/md";
import { trackingContext } from "../context/trackingContext";
import { PersonResultContainerType } from "./PersonResultContainer";
import { ITrackingDataType } from "./types";

const RightControls = ({
    newPersonTrackingData,
    setFilteredPersonTrackingData
}: {
    newPersonTrackingData: {
        status: "loading" | null;
        data: PersonResultContainerType[];
    };
    setFilteredPersonTrackingData: React.Dispatch<React.SetStateAction<{
        status: "loading" | null;
        data: PersonResultContainerType[];
    }>>;
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { imageUrl, setImageUrl } = useContext(trackingContext);
    const [dataType, setDataType] = useState<'all' | 'plate' | 'person'>('all');

    const inputClicked = () => {
        inputRef.current?.click();
    };

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
        setFilteredPersonTrackingData({ data: [], status: null });
        for (let person of newPersonTrackingData.data) {
            setFilteredPersonTrackingData(prev => ({
                ...prev,
                data: [
                    ...prev.data,
                    ...(dataType === 'all' ? [person] : (dataType === person.type ? [person] : []))
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
    }, [dataType]);

    useEffect(() => {
        if (inputRef.current?.value?.length && inputRef.current?.value?.length > 0) {
            inputRef.current.value = '';
        }
    }, [imageUrl]);

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
                />
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaSort
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        Sort
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default RightControls;