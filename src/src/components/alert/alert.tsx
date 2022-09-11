import { Alert, Grid, Snackbar } from '@mui/material';
import { Component, createContext } from 'react';
import AlertDetails from './alertdetails';

/**
 * Props for the Alert Manager
 *
 * @interface AlertManagerProps
 * @typedef {AlertManagerProps}
 */
interface AlertManagerProps {
    children: JSX.Element;
}

/**
 * State for Alert Manager
 *
 * @interface AlertManagerState
 * @typedef {AlertManagerState}
 */
interface AlertManagerState {
    alerts: AlertDetails[];
}

/**
 * Alert Context - a function that can be accessed through useContext by any component under the tree. This allows every component to add an alert to the alert manager.
 *
 * @type {React.Context<(alert: AlertDetails) => void>}
 */
export let AlertContext: React.Context<(alert: AlertDetails) => void> =
    createContext((alert: AlertDetails) => {});

/**
 * Alert Manager class that displays the alerts in a snackbar.
 *
 * @export
 * @class AlertManager
 * @typedef {AlertManager}
 * @extends {Component<AlertManagerProps, AlertManagerState>}
 */
export class AlertManager extends Component<
    AlertManagerProps,
    AlertManagerState
> {
    /**
     * Creates an instance of AlertManager.
     *
     * @constructor
     * @param {AlertManagerProps} props
     */
    constructor(props: AlertManagerProps) {
        super(props);
        this.state = {
            alerts: [],
        };
        this.addAlert = this.addAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    /**
     * For the alert context to use when adding an alert.
     * Calls the dismiss alert function after 3s so each alert lasts for 3s.
     *
     * @private
     * @param {AlertDetails} alert
     */
    private addAlert(alert: AlertDetails) {
        let newAlerts = [...this.state.alerts];
        newAlerts.push(alert);
        this.setState({ alerts: newAlerts });
        setTimeout(() => {
            this.dismissAlert();
        }, 3000);
    }

    /**
     * Called once the 3s timer runs out.
     *
     * @private
     */
    private dismissAlert() {
        let newAlerts = [...this.state.alerts];
        newAlerts.pop();
        this.setState({ alerts: newAlerts });
    }

    /**
     * Renders the alerts one by one :D
     *
     * @returns {*}
     */
    render() {
        return (
            <Grid
                id='alert-manager'
                container
                direction='row'
                sx={{ height: '100vh' }}
            >
                <AlertContext.Provider value={this.addAlert}>
                    {this.props.children}
                </AlertContext.Provider>
                <Snackbar open={this.state.alerts.length > 0 ? true : false}>
                    {this.state.alerts[0] ? (
                        <Alert
                            severity={this.state.alerts[0].severity}
                            sx={{ width: '100%' }}
                        >
                            {this.state.alerts[0].title}
                        </Alert>
                    ) : (
                        <div></div>
                    )}
                </Snackbar>
            </Grid>
        );
    }
}
