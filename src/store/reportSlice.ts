// Redux Slice (reportSlice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Report {
  id: number;
  title: string;
  status: number;
  date: number;
  description: string;
}

export interface ReportState {
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
    deleteReport: (state, action: PayloadAction<number>) => {
      state.reports = state.reports.filter((report) => report.id !== action.payload);
    },
    setStatus: (state, action: PayloadAction<{ id: number, status: number }>) => {
      const report = state.reports.find((r) => r.id === action.payload.id);
      if (report) {
          report.status = action.payload.status;
      }
    },
  },
});

export const { addReport, deleteReport, setStatus } = reportSlice.actions;

export default reportSlice.reducer;
