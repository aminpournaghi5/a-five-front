import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalInfoState {
    name: string;
    perweek: number;
    permonth: number;
    date: string;
}

const initialState: PersonalInfoState = {
    name: "",
    perweek: 0,
    permonth: 0,
    date: "", // مقدار پیش‌فرض تاریخ
};

export const personalInfoSlice = createSlice({
    name: "personalInfo",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPerWeek: (state, action: PayloadAction<number>) => {
            state.perweek = action.payload;
        },
        setPerMonth: (state, action: PayloadAction<number>) => {
            state.permonth = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => { // افزودن setDate
            state.date = action.payload;
        }
    }
});

export const { setName, setPerWeek, setPerMonth, setDate } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
