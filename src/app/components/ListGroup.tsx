"use client";

import artistList from "../data/artists";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { log } from "console";

const ListGroup = () => {
    useEffect(() => {
        for (const artist of artistList) {
            fetch("/api/spotify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ artist: artist.id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        }
    }, []);

    return (
        <>
            <h1>PHONK CZ/SK Monthly Listeners Table</h1>
            <ul className="list-group">
                {artistList.map((item) => (
                    <li key={item.id} className="list-group-item">
                        <strong className="">{item.name}: </strong>
                        <span>{ (item.listeners == 0) ? "Too Many Requests" : item.listeners }</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListGroup;
