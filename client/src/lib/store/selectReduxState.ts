import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const sidebarState = (state: RootState) => state.global.isSidebarCollapsed;

export const selectReduxState = createSelector(
    [sidebarState],
    (isSidebarCollapsed) => ({
        isSidebarCollapsed,
    })
);
