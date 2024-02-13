/*import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

export default function Register() {
    const [inputFields, setInputFields] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("")

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.username.length < 5 && inputValues.username.length >20) {
            errors.username = "Please provide username greater than 5 characters and less than 20 characters";
        }
        if (inputValues.email.length < 15) {
            errors.email = "Email is too short";
        }
        if (inputValues.password.length < 5) {
            errors.password = "Password is too short";
        }

        return errors;
    };
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
        AuthService.register(inputFields.username,
            inputFields.email,
            inputFields.password)
            .then(response => {
                console.log(response)
                setMessage(response.data)
            }
            )
            .catch(error => console.log(error))
    };

    const finishSubmit = () => {
        console.log(inputFields);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);

    return (
        <div className="App">

            {message && Object.keys(errors).length === 0 && submitting ? (
                <span className="success">Successfully submitted ✓</span>
            ) : null}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={inputFields.username}
                        onChange={handleChange}
                        style={{ border: errors.email ? "1px solid red" : null }}
                    ></input>
                    {errors.username ? (
                        <p className="error">Please provide username greater than 5 characters and less than 20 characters</p>
                    ) : null}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={inputFields.email}
                        onChange={handleChange}
                        style={{ border: errors.email ? "1px solid red" : null }}
                    ></input>
                    {errors.email ? (
                        <p className="error">Email should be at least 15 characters long</p>
                    ) : null}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={inputFields.password}
                        onChange={handleChange}
                        style={{ border: errors.password ? "1px solid red" : null }}
                    ></input>
                    {errors.password ? (
                        <p className="error">
                            Password should be at least 5 characters long
                        </p>
                    ) : null}

                </div>
                <button type="submit">Submit Information</button>
            </form>
        </div>
    );
}
*/