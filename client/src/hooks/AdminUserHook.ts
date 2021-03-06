import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUsersList,
    resetQuery,
    deleteUser,
    updateUser,
    getUserInfo,
} from "../actions/_adminUserSettingsActions";
import User from "../models/User";
import { ReduxState } from "../reducers";
import { AdminUserSettingsState } from "../reducers/_adminUserSettingsReducer";

export const useAdminUserSettings = (): AdminUserHook => {
    const dispatch = useDispatch();
    const adminUserState = useSelector<ReduxState, AdminUserSettingsState>(
        (x) => x.adminUserSettings
    );
    const [ret, setRet] = React.useState<AdminUserHook>({
        ...adminUserState,

        getUserList: (options = {}, page = 0) => {
            const { filter, search } = options;

            return new Promise((resolve, reject) => {
                dispatch(
                    getUsersList(search, page, filter, {
                        then: resolve,
                        catch: reject,
                    })
                );
            });
        },

        getUserInfo: (uid) =>
            new Promise((resolve, reject) => {
                dispatch(
                    getUserInfo(uid, {
                        then: resolve,
                        catch: reject,
                    })
                );
            }),

        updateUser: (uid, data) =>
            new Promise((resolve, reject) => {
                dispatch(
                    updateUser(uid, data, {
                        then: resolve,
                        catch: reject,
                    })
                );
            }),

        deleteUser: (uid) =>
            new Promise((resolve, reject) => {
                dispatch(
                    deleteUser(uid, {
                        then: resolve,
                        catch: reject,
                    })
                );
            }),

        resetQuery: (newState) => {
            return new Promise((resolve, reject) => {
                dispatch(
                    resetQuery(newState, { then: resolve, catch: reject })
                );
            });
        },
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...adminUserState,
        });
        // eslint-disable-next-line
    }, [adminUserState]);

    return ret;
};

export interface AdminUserHook extends AdminUserSettingsState {
    // Get list of users
    getUserList(
        options?: { search?: string; filter?: any },
        page?: number
    ): Promise<undefined>;

    // Read/Update/Delete
    getUserInfo(uid: string): Promise<undefined>;
    updateUser(uid: string, data: User): Promise<undefined>;
    deleteUser(uid: string): Promise<undefined>;

    // Helpers
    resetQuery(newState?: any): Promise<undefined>;
}
