import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from './searchinput.module.css'

interface SearchInputProps<T> {
    popular: T[]
    onSearch: (filtrar: Object) => void
    keys: (keyof T)[],
    search?: Function | any
}

const SearchInput = <T extends Record<string, any>>({ onSearch, popular, keys, search }: SearchInputProps<T>) => {

    const router = useRouter()

    const [opcoesFiltradas, setOpcoesFiltradas] = useState<T[]>([]);
    const [page, setPage] = useState(Number)

    useEffect(() => {
    }, [page])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        const data = popular.filter((item) =>
            keys.some((key) =>
                String(item[key]).toLowerCase().includes(term)
            ))

        setOpcoesFiltradas(data)
        onSearch(data);
        if (term === '') {
            setPage(search)
        }

    };


    return (
        <>
            <div className={`${styles.container}`}>
                <input className={`focus:outline-none ${styles.searchInput}`} placeholder="buscar..." onChange={handleSearch} />
            </div>
        </>
    )
}

export default SearchInput;