const { __ } = wp.i18n;

(function(element, blockEditor, blocks, i18n) {
    const el = element.createElement;
    const BlockControls = blockEditor.BlockControls;
    const useBlockProps = blockEditor.useBlockProps;
    const AlignmentToolbar = blockEditor.AlignmentToolbar;
    const InspectorControls = blockEditor.InspectorControls;
    const FontSizePicker = blockEditor.FontSizePicker;

    blocks.registerBlockType(
        "rf-blocks/init-button-block",
        {
            title: __( 'Subscription', 'richflyer' ),
            icon: function() {
                return el(
                    "svg",
                    { viewBox: "0 0 24 24" },
                    el(
                        "polygon",
                        { points: "2,4 12,4 15,6 19,2 22,6 19,6 19,10 8,20 8,13 2,4" } 
                    )
                )
            },
            description: __('Display a button to subscribe to push notifications.If you want to subscribe to push notifications in Safari, you must place a button.', 'richflyer' ),
            category: "widgets",
            attributes: {
                alignment: {
                    type: "string",
                    default: "left"
                },
                iconSize: {
                    type: "string",
                    default: "8rem"
                }
            },
            example: {
                attributes: {
                    alignment: "right",
                    bellIcon: "fa-solid fa-bell fa-3x"
                },
                
            },
            edit: function(props) {
                const alignment = props.attributes.alignment;
                const bellIcon = props.attributes.bellIcon;
                const iconSize = props.attributes.iconSize;

                function onChangeAlignment (newAlignment) {
                    props.setAttributes({
                        alignment:
                            newAlignment === undefined ? "none" : newAlignment
                    })
                }

                function onChangeIconSize (newSize) {
                    props.setAttributes({
                        iconSize: newSize
                    })
                }

                const blockStyle = {
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '20px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                };

                return el(
                    "div",
                    useBlockProps(),
                    el(
                        BlockControls,
                        { key: "controls" },
                        [
                            el(
                                AlignmentToolbar,
                                { value: alignment, onChange: onChangeAlignment }
                            ),
                        ]
                    ),
                    el(
                        InspectorControls,
                        {key: "setting"},
                        el(
                            "div",
                            { id: "gutenpride-controls" },
                            el(
                                "fieldset",
                                {},
                                el(
                                    "legend",
                                    { className: "blocks-base-control__label" },
                                    i18n.__( "Button size", "gutenpride" )
                                ),
                                el(
                                    FontSizePicker,
                                    { onChange: onChangeIconSize, __nextHasNoMarginBottom: true }
                                )
                            )
                        )
                    ),
                    el(
                        "div",
                        {style: {textAlign: alignment}},
                        el(
                            "button",
                            { style: blockStyle, type: "button" },
                            el(
                                "img",
                                { src: window.richflyerLogoPath ,style: {width: iconSize}}
                            )
                        )
                    )
                )
            },
            save: function ( props ) {
                const blockProps = useBlockProps.save();
     
                return el(
                    "div",
                    blockProps,
                    el( "div",
                        { className: `icon-align-${props.attributes.alignment}` },
                        el(
                            "button",
                            { id: "rf-init-button", className: "bell-icon-btn", type: "button"},
                            el(
                                "img",
                                { src: window.richflyerLogoPath, style: {width: props.attributes.iconSize, height: props.attributes.iconSize} }
                            )
                        )
                    )
                );
            },
        }
    )
})(window.wp.element, window.wp.blockEditor, window.wp.blocks, window.wp.i18n);