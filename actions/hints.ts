import axios, {Method} from "axios";
import IHint from "../interfaces/hint"
import IFood from "../interfaces/food";

type Options = { method: Method | undefined, url: string, params: { ingr: string }, headers: { "x-rapidapi-host": string, "x-rapidapi-key": string } }

type ServerResponse = {
    data: ServerData
}

type ServerData = {
    text: string,
    parsed: { food: IFood }[],
    hints: IHint[],
}

export const getHints = async (hintQuery: string) => {
    const options = {
        method: 'GET',
        url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
        params: {ingr: `${hintQuery}`},
        headers: {
            'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
            'x-rapidapi-key': '45bbcda4bamsh6ad6f8a4d4bcadcp15c868jsn147017e74101'
        }
    } as Options;
    if (!options) return
    const {data} = await axios.request<ServerData>(options) as ServerResponse
    return (data.hints.filter(({food}) => food.category === "Generic foods"))
}