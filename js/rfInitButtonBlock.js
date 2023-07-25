const { __ } = wp.i18n;

(function (element, blockEditor, blocks, i18n) {
	const el = element.createElement;
	const BlockControls = blockEditor.BlockControls;
	const useBlockProps = blockEditor.useBlockProps;
	const AlignmentToolbar = blockEditor.AlignmentToolbar;
	const InspectorControls = blockEditor.InspectorControls;
	const FontSizePicker = blockEditor.FontSizePicker;

	blocks.registerBlockType("rf-blocks/init-button-block", {
		title: __("Subscription", "richflyer"),
		icon: function () {
			return el(
				"svg",
				{ viewBox: "0 0 24 24" },
				el("polygon", {
					points: "2,4 12,4 15,6 19,2 22,6 19,6 19,10 8,20 8,13 2,4",
				})
			);
		},
		description: __(
			"Display a button to subscribe to push notifications.If you want to subscribe to push notifications in Safari, you must place a button.",
			"richflyer"
		),
		category: "widgets",
		attributes: {
			alignment: {
				type: "string",
				default: "left",
			},
			iconSize: {
				type: "string",
				default: "8rem",
			},
			buttonNum: {
				type: "string",
				default: "button01",
			},
		},
		example: {
			attributes: {
				alignment: "right",
				bellIcon: "fa-solid fa-bell fa-3x",
			},
		},
		edit: function (props) {
			const alignment = props.attributes.alignment;
			const bellIcon = props.attributes.bellIcon;
			const iconSize = props.attributes.iconSize;
			const buttonNum = props.attributes.buttonNum;

			function onChangeAlignment(newAlignment) {
				props.setAttributes({
					alignment:
						newAlignment === undefined ? "none" : newAlignment,
				});
			}

			function onChangeIconSize(newSize) {
				props.setAttributes({
					iconSize: newSize,
				});
			}

			function onChangeIconImg(e) {
				props.setAttributes({
					buttonNum: e.target.value,
				});
			}

			const blockStyle = {
				backgroundColor: "transparent",
				border: "none",
				padding: "20px",
				cursor: "pointer",
				borderRadius: "50%",
			};

			return el(
				"div",
				useBlockProps(),
				el(BlockControls, { key: "controls" }, [
					el(AlignmentToolbar, {
						value: alignment,
						onChange: onChangeAlignment,
					}),
				]),
				el(
					InspectorControls,
					{ key: "setting" },
					el(
						"div",
						{
							id: "gutenpride-controls",
							style: { margin: "15px" },
						},
						el(
							"fieldset",
							{},
							el(
								"legend",
								{ className: "blocks-base-control__label" },
								__("Button Size", "richflyer")
							),
							el(FontSizePicker, {
								onChange: onChangeIconSize,
								__nextHasNoMarginBottom: true,
							})
						),
						el(
							"fieldset",
							{ style: { marginTop: "10px" } },
							el(
								"legend",
								{
									className: "blocks-base-control__label",
									style: { marginBottom: "5px" },
								},
								__("Button Icon", "richflyer")
							),
							el(
								"div",
								{ id: "button-icon-select" },
								el(
									"div",
									{
										style: {
											display: "flex",
											alignItems: "center",
										},
									},
									el("input", {
										type: "radio",
										name: "button-icon",
										value: "button01",
										id: "rfButton01",
										style: { margin: "0 4px 0 0" },
										onChange: onChangeIconImg,
										checked: buttonNum === "button01",
									}),
									el(
										"label",
										{
											for: "rfButton01",
											style: {
												display: "flex",
												alignItems: "center",
											},
										},
										__("Bell(color)", "richflyer"),
										el("img", {
											src: `${window.richflyerLogoPath}/button01.png`,
											style: { width: "25px" },
										})
									)
								),
								el(
									"div",
									{
										style: {
											display: "flex",
											alignItems: "center",
										},
									},
									el("input", {
										type: "radio",
										name: "button-icon",
										value: "button02",
										id: "rfButton02",
										style: { margin: "0 4px 0 0" },
										onChange: onChangeIconImg,
										checked: buttonNum === "button02",
									}),
									el(
										"label",
										{
											for: "rfButton02",
											style: {
												display: "flex",
												alignItems: "center",
											},
										},
										__("Bell(mono)", "richflyer"),
										el("img", {
											src: `${window.richflyerLogoPath}/button02.png`,
											style: { width: "25px" },
										})
									)
								),
								el(
									"div",
									{
										style: {
											display: "flex",
											alignItems: "center",
										},
									},
									el("input", {
										type: "radio",
										name: "button-icon",
										value: "button03",
										id: "rfButton03",
										style: { margin: "0 4px 0 0" },
										onChange: onChangeIconImg,
										checked: buttonNum === "button03",
									}),
									el(
										"label",
										{
											for: "rfButton03",
											style: {
												display: "flex",
												alignItems: "center",
											},
										},
										__("RichFlyer", "richflyer"),
										el("img", {
											src: `${window.richflyerLogoPath}/button03.png`,
											style: { width: "25px" },
										})
									)
								)
							)
						)
					)
				),
				el(
					"div",
					{ style: { textAlign: alignment } },
					el(
						"button",
						{ style: blockStyle, type: "button" },
						el("img", {
							src: `${window.richflyerLogoPath}/${props.attributes.buttonNum}.png`,
							style: { width: iconSize },
						})
					)
				)
			);
		},
		save: function (props) {
			const blockProps = useBlockProps.save();

			return el(
				"div",
				blockProps,
				el(
					"div",
					{ className: `icon-align-${props.attributes.alignment}` },
					el(
						"button",
						{
							id: "rf-init-button",
							className: "bell-icon-btn",
							type: "button",
						},
						el("img", {
							src: `${window.richflyerLogoPath}/${props.attributes.buttonNum}.png`,
							style: {
								width: props.attributes.iconSize,
								height: props.attributes.iconSize,
							},
						})
					)
				)
			);
		},
	});
})(window.wp.element, window.wp.blockEditor, window.wp.blocks, window.wp.i18n);
