function ParseJSONtoHTML(props) {
	const { data } = props;
	const ELEMENTS = [];
	console.log(data);
	for (let block of data.blocks) {
		switch (block.type) {
			case "heading":
				if (block.data.level === 3) {
					ELEMENTS.push(
						<h3 className="text-3xl text-gray-800" key={block.id}>
							{block.data.text}
						</h3>
					);
				} else if (block.data.level === 4) {
					ELEMENTS.push(
						<h4 className="text-2xl text-gray-700" key={block.id}>
							{block.data.text}
						</h4>
					);
				} else if (block.data.level === 5) {
					ELEMENTS.push(
						<h5 className="text-xl text-gray-600" key={block.id}>
							{block.data.text}
						</h5>
					);
				} else {
					ELEMENTS.push(
						<h6 className="text-lg text-gray-500" key={block.id}>
							{block.data.text}
						</h6>
					);
				}
				break;
			case "paragraph":
				ELEMENTS.push(
					<p className="text-sm text-gray-400" key={block.id}>
						{block.data.text}
					</p>
				);
				break;
			default:
				break;
		}
	}
	return ELEMENTS;
}

export default ParseJSONtoHTML;
