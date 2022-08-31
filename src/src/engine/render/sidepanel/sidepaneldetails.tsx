export default class SidePanelDetails {
    icon: JSX.Element;
    name: string;
    propType: Object;
    component: React.FunctionComponent<Object>;

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
