import Image from "next/image";
import ListGroup from "./components/ListGroup";

export default function Home() {
    return (
        <div className="flex flex-col mx-auto">
            <ListGroup />
        </div>
    );
}
