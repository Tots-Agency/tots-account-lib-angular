import { TotsUser } from "@tots/auth";
import { TotsAccount } from "./tots-account";

export class TotsAccountPermission {
    public id?: number;
    public account_id: number = 0;
    public user_id: number = 0;
    public role: number = 0;
    
    public account?: TotsAccount;
    public user?: TotsUser;
}