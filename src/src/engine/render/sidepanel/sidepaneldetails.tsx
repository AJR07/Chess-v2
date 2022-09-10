/**
 * Class Managing the details required for one side panel in order for it to successfully render with the information
 *
 * @export
 * @class SidePanelDetails
 * @typedef {SidePanelDetails}
 */
export default class SidePanelDetails {
    /**
     * the props that the side panel requires.
     *
     * @private
     * @type {Object}
     */
    private propType: Object;
    /**
     * the component that is to be rendered when the panel is selected.
     *
     * @type {React.FunctionComponent<Object>}
     */
    component: React.FunctionComponent<Object>;
    /**
     * the icon that is supposed to represent the panel.
     *
     * @type {JSX.Element}
     */
    icon: JSX.Element;
    /**
     * the name of the side panel.
     *
     * @type {string}
     */
    name: string;
    /**
     * Creates an instance of SidePanelDetails.
     *
     * @constructor
     * @param {JSX.Element} icon
     * @param {string} name
     * @param {Object} propType
     * @param {React.FunctionComponent<Object>} component
     */
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
