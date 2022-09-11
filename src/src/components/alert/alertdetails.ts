import { AlertColor } from '@mui/material';

export default class AlertDetails {
    title: string;
    severity: AlertColor;
    constructor(title: string, severity: AlertColor = 'success') {
        this.title = title;
        this.severity = severity;
    }
}
