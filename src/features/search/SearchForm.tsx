import {useState} from "react";
import type React from "react"

export default function SearchForm() {
    const [input, setInput] = useState('');
    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setInput(target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
            <input className="rounded-pill form-control me-2" type="search" placeholder="What's trending?"
                   aria-label="Search" value={input} onChange={handleChange}/>
            <button
                className="w-25 justify-content-center btn rounded-pill btn-outline-success d-flex align-items-center"
                type="submit">
                <span className="d-none d-sm-inline mx-1">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </button>
        </form>
    );
}