import { useState } from "react";
import axios from "axios";

export default function () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        console.log("submiting...");

        try {

            const data = await axios.post("http://localhost:3000/api/signup", { params: { email: email, password: password } });
            console.log(data.data);

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <h2>Signup form</h2>

            <form onSubmit={onFormSubmit}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="email"
                />

                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                />

                <button type="submit">
                    submit
                </button>
            </form>
        </>
    )
}