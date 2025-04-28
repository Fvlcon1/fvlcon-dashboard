import { AlertTableData } from "@/app/alerts/utils/types";
import { data } from "./data";
import { personData } from "./person-data";
import { vehicleData } from "./vehicle-data";

export const tableData: AlertTableData[] = data
    .map((item) => {
        if (item.type === "person") {
            return personData(item);
        } 
        if (item.type === "vehicle") {
            return vehicleData(item);
        }
        return null;
    })
    .filter((item): item is AlertTableData => item !== null);