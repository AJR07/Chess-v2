export default class SidePanelDetails {
    private propType: Object;
    component: React.FunctionComponent<Object>;
    icon: JSX.Element;
    name: string;
    constructor(
        icon: JSX.Element,
        name: string,
        propType: Object,
        component: React.FunctionComponent<Object>
    ) {
        this.icon = icon;
        this.name = name;
        this.propType = propType;
        this.component = component;
    }
}
