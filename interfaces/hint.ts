import IMeasure from "./measures";
import IFood from "./food";

interface IHint {
    food: IFood;
    measures: IMeasure[];
}

export default IHint;