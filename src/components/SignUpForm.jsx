import { useState } from 'react'
export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if(username.length < 9 ) {
            setError("Username is too short");
            return
        }
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                "Content-Type": "applicaton/json", body: {
                    username, password
                }
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token);
        } catch (error) {
            setError(error.message);

        }
    }

    return (<>
    {error}
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button>Submit</button>
        </form>
    </>)
}