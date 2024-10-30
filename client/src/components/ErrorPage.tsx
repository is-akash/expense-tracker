import { useRouteError } from "react-router-dom";

interface ErrorType {
    data: string;
    error: {
        message: string;
        stack: string;
    };
    internal: boolean;
    status: number;
    statusText: string;
}

export default function ErrorPage() {
    const error = useRouteError() as ErrorType;

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.error.message}</i>
            </p>
        </div>
    );
}
