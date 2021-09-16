import {useEffect, useState} from "react";
import styles from "../../styles/components/ui/select.module.sass";
import IMeasure from "../../interfaces/measures";

type Props = {
    items: IMeasure[];
    param: string
}
export default function Select({items, param}: Props) {
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setSelectedItem(items[0][param])
    }, [])

    return <div className={styles.dropdownContainer}>
        <div className={styles.dropdownHeader} onClick={() => setIsOpenSelect(!isOpenSelect)}>{selectedItem}</div>
        {isOpenSelect && items.length > 1 && <ul className={styles.dropdownList}>
            {items.map((item, index) => {
                const name = item[param];
                return <li onClick={() => {
                    setSelectedItem(name);
                    setIsOpenSelect(!isOpenSelect)
                }} key={index}>{name}</li>
            })}
        </ul>
        }
    </div>
}