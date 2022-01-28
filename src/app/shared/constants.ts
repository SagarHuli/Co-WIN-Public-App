export class States{
    states:{state_id:number,state_name:string};
    ttl:number;
}

export class Districts{
    districts:{district_id:number,district_name:string};
    ttl:number;
}
export class Session{
    center_id: number;
            name: string;
            address: string;
            state_name: string;
            district_name: string;
            block_name: string;
            pincode: number;
            from: string;
            to: string;
            lat: number;
            long: number;
            fee_type: string;
            session_id: string;
            date: string;
            available_capacity: number;
            available_capacity_dose1: number;
            available_capacity_dose2: number;
            fee: string;
            min_age_limit: number;
            allow_all_age: boolean;
            vaccine: string;
            slots: [string];
}

export class Sessions{
    sessions:Session[];
}