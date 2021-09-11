import Model from "./model";

interface IUser extends Model {
    email: string;
    firstName: string;
    lastName: string;
}

export default IUser;