# sweep-spaces
sweep dom spaces text nodes

# Install
```
npm install sweep-spaces
```

# Usage & Apis
```javascript

var sweep_spaces = require("sweep-spaces");

var el = document.getElementById('divResult3');

el.innerHTML = `
	<span>aaa</span>	<span>bbb<span>ccc</span>   </span><!--a comment--><!CDATA[a cdata]><br>
	<span id="sp_end">end</span> `;

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
sweep_spaces(el.firstChild, document.getElementById('sp_end'), { sweepComment: true, sweepCdata: true });

done(!(
	el.innerHTML === '<span>aaa</span><span>bbb<span>ccc</span></span><br><span id="sp_end">end</span> '
));

```
