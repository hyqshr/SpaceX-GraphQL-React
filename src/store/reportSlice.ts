// Redux Slice (reportSlice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Report {
  id: number;
  title: string;
  description: string;
}

interface ReportState {
  reports: Report[];
}

const initialState: ReportState = {
  reports: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
  },
});

export const { addReport } = reportSlice.actions;

export default reportSlice.reducer;
