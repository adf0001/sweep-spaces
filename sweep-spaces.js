
// sweep-spaces @ npm, sweep dom spaces text nodes.

var ELEMENT_NODE_TYPE = Node.ELEMENT_NODE;
var TEXT_NODE_TYPE = Node.TEXT_NODE;
var COMMENT_NODE_TYPE = Node.COMMENT_NODE;
var CDATA_SECTION_NODE_TYPE = Node.CDATA_SECTION_NODE;

var regSpaces = /^\s+$/;

/*
sweepSpaces(nodeStart [, nodeEnd [, options]])
sweep dom spaces text nodes.
	options:
		.sweepComment
			sweep all comment nodes
		.sweepCdata
			sweep all CDATA sections

return the first existed node
*/
function sweepSpaces(nodeStart, nodeEnd, options) {
	var elFirst, type;

	while (nodeStart && nodeStart !== nodeEnd) {
		var nodeNext = nodeStart.nextSibling;	//preserve next

		type = nodeStart.nodeType;
		if (type === TEXT_NODE_TYPE) {
			if (regSpaces.test(nodeStart.nodeValue))
				nodeStart.parentNode?.removeChild(nodeStart);
		}
		else if (
			(options?.sweepComment && type === COMMENT_NODE_TYPE) ||
			(options?.sweepCdata && type === CDATA_SECTION_NODE_TYPE)
		) {
			nodeStart.parentNode?.removeChild(nodeStart);
		}
		else {
			if (type === ELEMENT_NODE_TYPE) {
				if (nodeStart.firstChild) sweepSpaces(nodeStart.firstChild);
			}
			if (!elFirst) elFirst = nodeStart;
		}

		nodeStart = nodeNext;
	}

	return elFirst || nodeEnd;
}

//module exports

module.exports = sweepSpaces;
