import { useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../../supabase/supabase-client";
import {
    FormSchemaLogin,
    ConfirmSchemaLogin,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";
import "./style.css";

export default function LoginPage() {

    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            console.log(data);
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (error) {
                alert("C'è un errore 👎🏻!");
            } else {
                alert("Login effettuato con successo 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value
        }));
    };

    return (
        <div className="container-fluid vh-100 main-custom ">
            <div>
                <h1 className="display-1 d-flex justify-content-center py-4 text-white">Login</h1>

            </div>
            <div className="container-fluid col-11 col-md-4 d-flex justify-content-center container-form-custom">
                <form onSubmit={onSubmit} noValidate className="d-flex flex-column justify-content-center align-items-center ">
                    <label htmlFor="email" className="text-white mt-3 mb-2">Email:</label>
                    <input
                        className="rounded-3"
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                        aria-invalid={isInvalid("email")}
                        required
                    />
                    {formErrors.email &&
                        <small className="error">{formErrors.email}</small>
                    }

                    <label htmlFor="password" className="text-white mt-3 mb-2">Password:</label>
                    <input
                        className="rounded-3"
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                        aria-invalid={isInvalid("password")}
                        required
                    />
                    {formErrors.password &&
                        <small className="error">{formErrors.password}</small>
                    }

                    <button type="submit" className="mt-3 mb-3 rounded-3 button-custom-login-register">Login</button>
                </form>
            </div>
        </div>

    );
}   