import { createContext, useState, useEffect } from "react";
import { AirlineReq, AirportReq, TagoServerReq } from "../util/tagoAPI";
import _ from "lodash";
export const LookupClassContext = createContext();


export class TagoData {

    #rawdata;
    #flightData;

    constructor(rawdata) {
        this.#rawdata = rawdata;
        this.#flightData = [];
    }

    get rawdata() {
        return _.cloneDeep(this.#rawdata);
    }

    get flightData() {

    }

    set flightData(data){
        return ;
    }
}

export function LookupClassContextProvider({ children }) {
   
    const handleSearch = async (data) => {

        // if (data) {
        //     let result = await TagoServerReq(data);

        //     if (result.status === 200) {
        //         let json = await result.json();
        //         let data = json.response.body.items;
        //         let tago;
        //         if (data) {
        //            tago = new TagoData(data.item);}
        //     }
        // }
    }


    return (<LookupClassContext.Provider value={{ handleSearch }}>
        {children}
    </LookupClassContext.Provider>)
}