
//global variable, for html page, refer tpsvr @ npm.
sweep_spaces = require("../sweep-spaces.js");

module.exports = {

	"sweep_spaces": function (done) {
		var el = document.getElementById('divResult3');

		el.innerHTML = `
			<span>aaa</span>	<span>bbb<span>ccc</span>   </span><br>
			<span id="sp_end">end</span> `;

		sweep_spaces(el.firstChild);

		//console.log("[" + el.innerHTML + "]");
		done(!(
			el.innerHTML === '<span>aaa</span><span>bbb<span>ccc</span></span><br><span id="sp_end">end</span>'
		));
	},

	"nodeEnd": function (done) {
		var el = document.getElementById('divResult3');

		el.innerHTML = `
			<span>aaa</span>	<span>bbb<span>ccc</span>   </span><br>
			<span id="sp_end">end</span> `;

		sweep_spaces(el.firstChild, document.getElementById('sp_end'));

		done(!(
			el.innerHTML === '<span>aaa</span><span>bbb<span>ccc</span></span><br><span id="sp_end">end</span> '
		));
	},

	"comment & cdata": function (done) {
		var el = document.getElementById('divResult3');

		el.innerHTML = `
			<span>aaa</span>	<span>bbb<span>ccc</span>   </span><!--a comment--><!CDATA[a cdata]><br>
			<span id="sp_end">end</span> `;

		sweep_spaces(el.firstChild, document.getElementById('sp_end'), { sweepComment: true, sweepCdata: true });

		done(!(
			el.innerHTML === '<span>aaa</span><span>bbb<span>ccc</span></span><br><span id="sp_end">end</span> '
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('sweep_spaces', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
