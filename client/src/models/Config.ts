import { AxiosRequestConfig } from "axios";

type HttpMethod =
    | "GET"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "POST"
    | "PUT"
    | "PATCH"
    | "LINK"
    | "UNLINK";

interface IConfig {
    apiUrls: {
        [desc: string]: AxiosRequestConfig & { url: string };
    };
    theme: {
        [desc: string]: any;
    };
    [tag: string]: any;
}

const noCache = { "Cache-Control": "no-cache" };

const Config: IConfig = {
    apiUrls: {
        "get account info": {
            url: "/api/account",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "logout user": {
            url: "/api/account/logout",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "login user": {
            url: "/api/account",
            method: "POST",
            headers: {
                ...noCache,
            },
        },
        "signup user": {
            url: "/api/account",
            method: "PUT",
            headers: {
                ...noCache,
            },
        },
    },
    theme: {
        palette: {
            primary: {
                main: "#E7A1AF",
            },
        },
        typography: {
            htmlFontSize: 10,
        },
    },
};

export default Config;
