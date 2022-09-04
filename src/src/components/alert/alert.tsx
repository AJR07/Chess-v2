import { Alert, Grid, Snackbar } from '@mui/material';
import { Component, createContext } from 'react';
import AlertDetails from './alertdetails';

interface AlertManagerProps {
    children: JSX.Element;
}

interface AlertManagerState {
    alerts: AlertDetails[];
}

export let AlertContext: React.Context<(alert: AlertDetails) => void> =
    createContext((alert: AlertDetails) => {});

export class AlertManager extends Component<
    AlertManagerProps,
    AlertManagerState
> {
    locked: boolean = false;
    constructor(props: AlertManagerProps) {
        super(props);
        this.state = {
            alerts: [],
        };
        this.addAlert = this.addAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    addAlert(alert: AlertDetails) {
        let newAlerts = [...this.state.alerts];
        newAlerts.push(alert);
        this.setState({ alerts: newAlerts });
        setTimeout(() => {
            this.dismissAlert();
        }, 3000);
    }

    dismissAlert() {
        let newAlerts = [...this.state.alerts];
        newAlerts.pop();
        this.setState({ alerts: newAlerts });
    }

    render() {
        return (
            <Grid
                id="alert-manager"
                container
                direction="row"
                sx={{ height: '100vh' }}
            >
                <AlertContext.Provider value={this.addAlert}>
                    {this.props.children}
                </AlertContext.Provider>
                <Snackbar open={this.state.alerts.length > 0 ? true : false}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {this.state.alerts[0] ? this.state.alerts[0].title : ''}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}
