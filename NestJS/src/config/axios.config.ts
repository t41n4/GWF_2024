import { AxiosRequestConfig } from "axios";

export const httpGetConfig: AxiosRequestConfig = {
    headers: {
        //   Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    },
}
