/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*! lightslider - v1.1.6 - 2016-10-25
* https://github.com/sachinchoolur/lightslider
* Copyright (c) 2016 Sachin N; Licensed MIT */
(function ($, undefined) {
    'use strict';
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        addClass: '',
        mode: 'slide',
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',
        easing: 'linear', //'for jquery animation',//
        speed: 400, //ms'
        auto: false,
        pauseOnHover: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,
        keyPress: false,
        controls: true,
        prevHtml: '',
        nextHtml: '',
        rtl: false,
        adaptiveHeight: false,
        vertical: false,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',
        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        /* jshint ignore:start */
        onBeforeStart: function ($el) {},
        onSliderLoad: function ($el) {},
        onBeforeSlide: function ($el, scene) {},
        onAfterSlide: function ($el, scene) {},
        onBeforeNextSlide: function ($el, scene) {},
        onBeforePrevSlide: function ($el, scene) {}
        /* jshint ignore:end */
    };
    $.fn.lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).lightSlider(options);
            });
            return this;
        }

        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;

        if (settings.mode === 'fade') {
            settings.vertical = false;
        }
        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = (settings.vertical === true) ? 'height' : 'width',
            gutter = (settings.vertical === true) ? 'margin-bottom' : 'margin-right',
            slideValue = 0,
            pagerWidth = 0,
            slideWidth = 0,
            thumbWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};

        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };

        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };

        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            keyPress: function () {
                if (settings.keyPress) {
                    $(document).on('keyup.lightslider', function (e) {
                        if (!$(':focus').is('input, textarea')) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            if (e.keyCode === 37) {
                                $el.goToPrevSlide();
                            } else if (e.keyCode === 39) {
                                $el.goToNextSlide();
                            }
                        }
                    });
                }
            },
            controls: function () {
                if (settings.controls) {
                    $el.after('<div class="lSAction"><a class="lSPrev">' + settings.prevHtml + '</a><a class="lSNext">' + settings.nextHtml + '</a></div>');
                    if (!settings.autoWidth) {
                        if (length <= settings.item) {
                            $slide.find('.lSAction').hide();
                        }
                    } else {
                        if (refresh.calWidth(false) < elSize) {
                            $slide.find('.lSAction').hide();
                        }
                    }
                    $slide.find('.lSAction a').on('click', function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        if ($(this).attr('class') === 'lSPrev') {
                            $el.goToPrevSlide();
                        } else {
                            $el.goToNextSlide();
                        }
                        return false;
                    });
                }
            },
            initialStyle: function () {
                var $this = this;
                if (settings.mode === 'fade') {
                    settings.autoWidth = false;
                    settings.slideEndAnimation = false;
                }
                if (settings.auto) {
                    settings.slideEndAnimation = false;
                }
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                settings.onBeforeStart.call(this, $el);
                refresh.chbreakpoint();
                $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
                $slide = $el.parent('.lSSlideWrapper');
                if (settings.rtl === true) {
                    $slide.parent().addClass('lSrtl');
                }
                if (settings.vertical) {
                    $slide.parent().addClass('vertical');
                    elSize = settings.verticalHeight;
                    $slide.css('height', elSize + 'px');
                } else {
                    elSize = $el.outerWidth();
                }
                $children.addClass('lslide');
                if (settings.loop === true && settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.clone.left').length) {
                                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.clone.right').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.clone.right').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > ($el.find('.lslide').length - tItem); m--) {
                                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('clone')) {
                                $el.find('.clone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.rtl === true && settings.vertical === false) {
                        gutter = 'margin-left';
                    }
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true && settings.mode === 'slide') {
                        if (on === false) {
                            scene = $el.find('.clone.left').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('usingCss');
                }
                refresh.calL();
                if (settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.sSW();
                    if (settings.loop === true) {
                        slideValue = $this.slideValue();
                        this.move($el, slideValue);
                    }
                    if (settings.vertical === false) {
                        this.setHeight($el, false);
                    }

                } else {
                    this.setHeight($el, true);
                    $el.addClass('lSFade');
                    if (!this.doCss()) {
                        $children.fadeOut(0);
                        $children.eq(scene).fadeIn(0);
                    }
                }
                if (settings.loop === true && settings.mode === 'slide') {
                    $children.eq(scene).addClass('active');
                } else {
                    $children.first().addClass('active');
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    thumbWidth = (elSize - ((settings.thumbItem * (settings.thumbMargin)) - settings.thumbMargin)) / settings.thumbItem;
                    var $children = $slide.find('.lslide');
                    var length = $slide.find('.lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (settings.mode === 'slide') {
                            // calculate scene * slide value
                            if (!settings.autoWidth) {
                                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                            } else {
                                v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                            }
                        }
                        var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');
                        if (settings.gallery === true) {
                            pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
                        } else {
                            pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                        }
                        if (settings.mode === 'slide') {
                            if ((v) >= w - elSize - settings.slideMargin) {
                                i = i + 1;
                                var minPgr = 2;
                                if (settings.autoWidth) {
                                    pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                                    minPgr = 1;
                                }
                                if (i < minPgr) {
                                    pagers = null;
                                    $slide.parent().addClass('noPager');
                                } else {
                                    $slide.parent().removeClass('noPager');
                                }
                                break;
                            }
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.lSPager').html(pagers); 
                    if (settings.gallery === true) {
                        if (settings.vertical === true) {
                            // set Gallery thumbnail width
                            $cSouter.find('.lSPager').css('width', settings.vThumbWidth + 'px');
                        }
                        pagerWidth = (i * (settings.thumbMargin + thumbWidth)) + 0.5;
                        $cSouter.find('.lSPager').css({
                            property: pagerWidth + 'px',
                            'transition-duration': settings.speed + 'ms'
                        });
                        if (settings.vertical === true) {
                            $slide.parent().css('padding-right', (settings.vThumbWidth + settings.galleryMargin) + 'px');
                        }
                        $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
                    }
                    var $pager = $cSouter.find('.lSPager').find('li');
                    $pager.first().addClass('active');
                    $pager.on('click', function () {
                        if (settings.loop === true && settings.mode === 'slide') {
                            scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        if (settings.gallery === true) {
                            $this.slideThumb();
                        }
                        return false;
                    });
                };
                if (settings.pager) {
                    var cl = 'lSpg';
                    if (settings.gallery) {
                        cl = 'lSGallery';
                    }
                    $slide.after('<ul class="lSPager ' + cl + '"></ul>');
                    var gMargin = (settings.vertical) ? 'margin-left' : 'margin-top';
                    $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob, fade) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    if (fade) {
                        tH = 0;
                        tP = ((tHT) * 100) / elSize;
                    }
                    ob.css({
                        'height': tH + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.find('img').length) {
                    if ( obj.find('img')[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }   
                    }else{
                        obj.find('img').on('load', function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                if (this.doCss() && settings.mode === 'fade') {
                    $slide.addClass('on');
                }
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                    }
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true && settings.mode === 'slide') {
                        //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
                        if (t === true) {
                            sc = scene - $el.find('.clone.left').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }

                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                    ob.eq(sc).addClass('active');
                } else {
                    ob.removeClass('active');
                    ob.eq(ob.length - 1).addClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                }
            },
            move: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }
                if (this.doCss()) {
                    if (settings.vertical === true) {
                        ob.css({
                            'transform': 'translate3d(0px, ' + (-v) + 'px, 0px)',
                            '-webkit-transform': 'translate3d(0px, ' + (-v) + 'px, 0px)'
                        });
                    } else {
                        ob.css({
                            'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                            '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        });
                    }
                } else {
                    if (settings.vertical === true) {
                        ob.css('position', 'relative').animate({
                            top: -v + 'px'
                        }, settings.speed, settings.easing);
                    } else {
                        ob.css('position', 'relative').animate({
                            left: -v + 'px'
                        }, settings.speed, settings.easing);
                    }
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            fade: function () {
                this.active($children, false);
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        $this.active($children, false);
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true && settings.mode === 'slide') {
                            if (scene >= (length - ($el.find('.clone.left').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.clone.left').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                $slide.find('.lSAction a').addClass('disabled');
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    $this.active($children, false);
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                        $slide.find('.lSAction a').removeClass('disabled');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            slideThumb: function () {
                var position;
                switch (settings.currentPagerPosition) {
                case 'left':
                    position = 0;
                    break;
                case 'middle':
                    position = (elSize / 2) - (thumbWidth / 2);
                    break;
                case 'right':
                    position = elSize - thumbWidth;
                }
                var sc = scene - $el.find('.clone.left').length;
                var $pager = $slide.parent().find('.lSPager');
                if (settings.mode === 'slide' && settings.loop === true) {
                    if (sc >= $pager.children().length) {
                        sc = 0;
                    } else if (sc < 0) {
                        sc = $pager.children().length;
                    }
                }
                var thumbSlide = sc * ((thumbWidth + settings.thumbMargin)) - (position);
                if ((thumbSlide + elSize) > pagerWidth) {
                    thumbSlide = pagerWidth - elSize - settings.thumbMargin;
                }
                if (thumbSlide < 0) {
                    thumbSlide = 0;
                }
                this.move($pager, thumbSlide);
            },
            auto: function () {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },
            pauseOnHover: function(){
                var $this = this;
                if (settings.auto && settings.pauseOnHover) {
                    $slide.on('mouseenter', function(){
                        $(this).addClass('ls-hover');
                        $el.pause();
                        settings.auto = true;
                    });
                    $slide.on('mouseleave',function(){
                        $(this).removeClass('ls-hover');
                        if (!$slide.find('.lightSlider').hasClass('lsGrabbing')) {
                            $this.auto();
                        }
                    });
                }
            },
            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                if (settings.mode === 'slide') {
                    var distance = endCoords - startCoords;
                    var swipeVal = slideValue - distance;
                    if ((swipeVal) >= w - elSize - settings.slideMargin) {
                        if (settings.freeMove === false) {
                            swipeVal = w - elSize - settings.slideMargin;
                        } else {
                            var swipeValT = w - elSize - settings.slideMargin;
                            swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                        }
                    } else if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0;
                        } else {
                            swipeVal = swipeVal / 5;
                        }
                    }
                    this.move($el, swipeVal);
                }
            },

            touchEnd: function (distance) {
                $slide.css('transition-duration', settings.speed + 'ms');
                if (settings.mode === 'slide') {
                    var mxVal = false;
                    var _next = true;
                    slideValue = slideValue - distance;
                    if ((slideValue) > w - elSize - settings.slideMargin) {
                        slideValue = w - elSize - settings.slideMargin;
                        if (settings.autoWidth === false) {
                            mxVal = true;
                        }
                    } else if (slideValue < 0) {
                        slideValue = 0;
                    }
                    var gC = function (next) {
                        var ad = 0;
                        if (!mxVal) {
                            if (next) {
                                ad = 1;
                            }
                        }
                        if (!settings.autoWidth) {
                            var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                            scene = parseInt(num) + ad;
                            if (slideValue >= (w - elSize - settings.slideMargin)) {
                                if (num % 1 !== 0) {
                                    scene++;
                                }
                            }
                        } else {
                            var tW = 0;
                            for (var i = 0; i < $children.length; i++) {
                                tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                                scene = i + ad;
                                if (tW >= slideValue) {
                                    break;
                                }
                            }
                        }
                    };
                    if (distance >= settings.swipeThreshold) {
                        gC(false);
                        _next = false;
                    } else if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false;
                    }
                    $el.mode(_next);
                    this.slideThumb();
                } else {
                    if (distance >= settings.swipeThreshold) {
                        $el.goToPrevSlide();
                    } else if (distance <= -settings.swipeThreshold) {
                        $el.goToNextSlide();
                    }
                }
            },



            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.find('.lightSlider').addClass('lsGrab');
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('lSPrev') && $(e.target).attr('class') !== ('lSNext')) {
                            startCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
                            isDraging = false;
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }

                            $this.touchEnd(distance);

                        }
                    });
                }
            },




            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (settings.vertical === true) {
                            if ((yMovement * 3) > xMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageY, startCoords.pageY);
                        } else {
                            if ((xMovement * 3) > yMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageX, startCoords.pageX);
                        }

                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var distance;
                        if (settings.vertical === true) {
                            distance = endCoords.pageY - startCoords.pageY;
                        } else {
                            distance = endCoords.pageX - startCoords.pageX;
                        }
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {

                    if (settings.enableTouch === true) {
                        $this.enableTouch();
                    }
                    if (settings.enableDrag === true) {
                        $this.enableDrag();
                    }
                }

                $(window).on('focus', function(){
                    $this.auto();
                });
                
                $(window).on('blur', function(){
                    clearInterval(interval);
                });

                $this.pager();
                $this.pauseOnHover();
                $this.controls();
                $this.keyPress();
            }
        };
        plugin.build();
        refresh.init = function () {
            refresh.chbreakpoint();
            if (settings.vertical === true) {
                if (settings.item > 1) {
                    elSize = settings.verticalHeight;
                } else {
                    elSize = $children.outerHeight();
                }
                $slide.css('height', elSize + 'px');
            } else {
                elSize = $slide.outerWidth();
            }
            if (settings.loop === true && settings.mode === 'slide') {
                refresh.clone();
            }
            refresh.calL();
            if (settings.mode === 'slide') {
                $el.removeClass('lSSlide');
            }
            if (settings.mode === 'slide') {
                refresh.calSW();
                refresh.sSW();
            }
            setTimeout(function () {
                if (settings.mode === 'slide') {
                    $el.addClass('lSSlide');
                }
            }, 1000);
            if (settings.pager) {
                refresh.createPager();
            }
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (settings.adaptiveHeight === false) {
                if (settings.mode === 'slide') {
                    if (settings.vertical === false) {
                        plugin.setHeight($el, false);
                    }else{
                        plugin.auto();
                    }
                } else {
                    plugin.setHeight($el, true);
                }
            }
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            }
            if (settings.autoWidth === false) {
                if ($children.length <= settings.item) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            } else {
                if ((refresh.calWidth(false) < elSize) && (w !== 0)) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            }
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                settings.onBeforePrevSlide.call(this, $el, scene);
                scene--;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforePrevSlide.call(this, $el, scene);
                    if (settings.mode === 'fade') {
                        var l = (length - 1);
                        scene = parseInt(l / settings.slideMove);
                    }
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('leftEnd');
                    setTimeout(function () {
                        $el.removeClass('leftEnd');
                    }, 400);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            if (settings.mode === 'slide') {
                var _slideValue = plugin.slideValue();
                nextI = _slideValue < w - elSize - settings.slideMargin;
            }
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                settings.onBeforeNextSlide.call(this, $el, scene);
                scene++;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforeNextSlide.call(this, $el, scene);
                    scene = 0;
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('rightEnd');
                    setTimeout(function () {
                        $el.removeClass('rightEnd');
                    }, 400);
                }
            }
        };
        $el.mode = function (_touch) {
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (on === false) {
                if (settings.mode === 'slide') {
                    if (plugin.doCss()) {
                        $el.addClass('lSSlide');
                        if (settings.speed !== '') {
                            $slide.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $slide.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                } else {
                    if (plugin.doCss()) {
                        if (settings.speed !== '') {
                            $el.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $el.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                }
            }
            if (!_touch) {
                settings.onBeforeSlide.call(this, $el, scene);
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            } else {
                plugin.fade();
            }
            if (!$slide.hasClass('ls-hover')) {
                plugin.auto();
            }
            setTimeout(function () {
                if (!_touch) {
                    settings.onAfterSlide.call(this, $el, scene);
                }
            }, settings.speed);
            on = true;
        };
        $el.play = function () {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto();
        };
        $el.pause = function () {
            settings.auto = false;
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.lslide').length,
                    cl = $el.find('.clone.left').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        }; 
        $el.getTotalSlideCount = function () {
            return $slide.find('.lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.clone.left').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
        };
        $el.destroy = function () {
            if ($el.lightSlider) {
                $el.goToPrevSlide = function(){};
                $el.goToNextSlide = function(){};
                $el.mode = function(){};
                $el.play = function(){};
                $el.pause = function(){};
                $el.refresh = function(){};
                $el.getCurrentSlideCount = function(){};
                $el.getTotalSlideCount = function(){};
                $el.goToSlide = function(){}; 
                $el.lightSlider = null;
                refresh = {
                    init : function(){}
                };
                $el.parent().parent().find('.lSAction, .lSPager').remove();
                $el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();
                $el.children().removeAttr('style');
                $children.removeClass('lslide active');
                $el.find('.clone').remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0;
            }

        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 10);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();
            }, 200);
        });
        return this;
    };
}(jQuery));

/*!
 * jQuery Validation Plugin v1.16.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {

							// Insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null || element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {

				// Set form expando on contenteditable
				if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				if ( obj[ i ] ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			// If a normalizer is defined for this element, then
			// call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( typeof rules.normalizer === "function" ) {
				val = rules.normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating
				// it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}
return $;
}));
/*! nanoScrollerJS - v0.8.7 - 2015
* http://jamesflorentino.github.com/nanoScrollerJS/
* Copyright (c) 2015 James Florentino; Licensed MIT */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    return define(['jquery'], function($) {
      return factory($, window, document);
    });
  } else if (typeof exports === 'object') {
    return module.exports = factory(require('jquery'), window, document);
  } else {
    return factory(jQuery, window, document);
  }
})(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, ENTER, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
  defaults = {

    /**
      a classname for the pane element.
      @property paneClass
      @type String
      @default 'nano-pane'
     */
    paneClass: 'nano-pane',

    /**
      a classname for the slider element.
      @property sliderClass
      @type String
      @default 'nano-slider'
     */
    sliderClass: 'nano-slider',

    /**
      a classname for the content element.
      @property contentClass
      @type String
      @default 'nano-content'
     */
    contentClass: 'nano-content',

    /**
      a setting to enable native scrolling in iOS devices.
      @property iOSNativeScrolling
      @type Boolean
      @default false
     */
    iOSNativeScrolling: false,

    /**
      a setting to prevent the rest of the page being
      scrolled when user scrolls the `.content` element.
      @property preventPageScrolling
      @type Boolean
      @default false
     */
    preventPageScrolling: false,

    /**
      a setting to disable binding to the resize event.
      @property disableResize
      @type Boolean
      @default false
     */
    disableResize: false,

    /**
      a setting to make the scrollbar always visible.
      @property alwaysVisible
      @type Boolean
      @default false
     */
    alwaysVisible: false,

    /**
      a default timeout for the `flash()` method.
      @property flashDelay
      @type Number
      @default 1500
     */
    flashDelay: 1500,

    /**
      a minimum height for the `.slider` element.
      @property sliderMinHeight
      @type Number
      @default 20
     */
    sliderMinHeight: 20,

    /**
      a maximum height for the `.slider` element.
      @property sliderMaxHeight
      @type Number
      @default null
     */
    sliderMaxHeight: null,

    /**
      an alternate document context.
      @property documentContext
      @type Document
      @default null
     */
    documentContext: null,

    /**
      an alternate window context.
      @property windowContext
      @type Window
      @default null
     */
    windowContext: null
  };

  /**
    @property SCROLLBAR
    @type String
    @static
    @final
    @private
   */
  SCROLLBAR = 'scrollbar';

  /**
    @property SCROLL
    @type String
    @static
    @final
    @private
   */
  SCROLL = 'scroll';

  /**
    @property MOUSEDOWN
    @type String
    @final
    @private
   */
  MOUSEDOWN = 'mousedown';

  /**
    @property MOUSEENTER
    @type String
    @final
    @private
   */
  MOUSEENTER = 'mouseenter';

  /**
    @property MOUSEMOVE
    @type String
    @static
    @final
    @private
   */
  MOUSEMOVE = 'mousemove';

  /**
    @property MOUSEWHEEL
    @type String
    @final
    @private
   */
  MOUSEWHEEL = 'mousewheel';

  /**
    @property MOUSEUP
    @type String
    @static
    @final
    @private
   */
  MOUSEUP = 'mouseup';

  /**
    @property RESIZE
    @type String
    @final
    @private
   */
  RESIZE = 'resize';

  /**
    @property DRAG
    @type String
    @static
    @final
    @private
   */
  DRAG = 'drag';

  /**
    @property ENTER
    @type String
    @static
    @final
    @private
   */
  ENTER = 'enter';

  /**
    @property UP
    @type String
    @static
    @final
    @private
   */
  UP = 'up';

  /**
    @property PANEDOWN
    @type String
    @static
    @final
    @private
   */
  PANEDOWN = 'panedown';

  /**
    @property DOMSCROLL
    @type String
    @static
    @final
    @private
   */
  DOMSCROLL = 'DOMMouseScroll';

  /**
    @property DOWN
    @type String
    @static
    @final
    @private
   */
  DOWN = 'down';

  /**
    @property WHEEL
    @type String
    @static
    @final
    @private
   */
  WHEEL = 'wheel';

  /**
    @property KEYDOWN
    @type String
    @static
    @final
    @private
   */
  KEYDOWN = 'keydown';

  /**
    @property KEYUP
    @type String
    @static
    @final
    @private
   */
  KEYUP = 'keyup';

  /**
    @property TOUCHMOVE
    @type String
    @static
    @final
    @private
   */
  TOUCHMOVE = 'touchmove';

  /**
    @property BROWSER_IS_IE7
    @type Boolean
    @static
    @final
    @private
   */
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;

  /**
    @property BROWSER_SCROLLBAR_WIDTH
    @type Number
    @static
    @default null
    @private
   */
  BROWSER_SCROLLBAR_WIDTH = null;
  rAF = window.requestAnimationFrame;
  cAF = window.cancelAnimationFrame;
  _elementStyle = document.createElement('div').style;
  _vendor = (function() {
    var i, transform, vendor, vendors, _i, _len;
    vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
      vendor = vendors[i];
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) {
        return vendors[i].substr(0, vendors[i].length - 1);
      }
    }
    return false;
  })();
  _prefixStyle = function(style) {
    if (_vendor === false) {
      return false;
    }
    if (_vendor === '') {
      return style;
    }
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  };
  transform = _prefixStyle('transform');
  hasTransform = transform !== false;

  /**
    Returns browser's native scrollbar width
    @method getBrowserScrollbarWidth
    @return {Number} the scrollbar width in pixels
    @static
    @private
   */
  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;
    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  isFFWithBuggyScrollbar = function() {
    var isOSXFF, ua, version;
    ua = window.navigator.userAgent;
    isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
    if (!isOSXFF) {
      return false;
    }
    version = /Firefox\/\d{2}\./.exec(ua);
    if (version) {
      version = version[0].replace(/\D+/g, '');
    }
    return isOSXFF && +version > 23;
  };

  /**
    @class NanoScroll
    @param element {HTMLElement|Node} the main element
    @param options {Object} nanoScroller's options
    @constructor
   */
  NanoScroll = (function() {
    function NanoScroll(el, options) {
      this.el = el;
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.$el = $(this.el);
      this.doc = $(this.options.documentContext || document);
      this.win = $(this.options.windowContext || window);
      this.body = this.doc.find('body');
      this.$content = this.$el.children("." + this.options.contentClass);
      this.$content.attr('tabindex', this.options.tabIndex || 0);
      this.content = this.$content[0];
      this.previousPosition = 0;
      if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
        this.nativeScrolling();
      } else {
        this.generate();
      }
      this.createEvents();
      this.addEvents();
      this.reset();
    }


    /**
      Prevents the rest of the page being scrolled
      when user scrolls the `.nano-content` element.
      @method preventScrolling
      @param event {Event}
      @param direction {String} Scroll direction (up or down)
      @private
     */

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      if (!this.isActive) {
        return;
      }
      if (e.type === DOMSCROLL) {
        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
          e.preventDefault();
        }
      } else if (e.type === MOUSEWHEEL) {
        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
          return;
        }
        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
          e.preventDefault();
        }
      }
    };


    /**
      Enable iOS native scrolling
      @method nativeScrolling
      @private
     */

    NanoScroll.prototype.nativeScrolling = function() {
      this.$content.css({
        WebkitOverflowScrolling: 'touch'
      });
      this.iOSNativeScrolling = true;
      this.isActive = true;
    };


    /**
      Updates those nanoScroller properties that
      are related to current scrollbar position.
      @method updateScrollValues
      @private
     */

    NanoScroll.prototype.updateScrollValues = function() {
      var content, direction;
      content = this.content;
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.prevScrollTop = this.contentScrollTop || 0;
      this.contentScrollTop = content.scrollTop;
      direction = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same";
      this.previousPosition = this.contentScrollTop;
      if (direction !== "same") {
        this.$el.trigger('update', {
          position: this.contentScrollTop,
          maximum: this.maxScrollTop,
          direction: direction
        });
      }
      if (!this.iOSNativeScrolling) {
        this.maxSliderTop = this.paneHeight - this.sliderHeight;
        this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
      }
    };


    /**
      Updates CSS styles for current scroll position.
      Uses CSS 2d transfroms and `window.requestAnimationFrame` if available.
      @method setOnScrollStyles
      @private
     */

    NanoScroll.prototype.setOnScrollStyles = function() {
      var cssValue;
      if (hasTransform) {
        cssValue = {};
        cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
      } else {
        cssValue = {
          top: this.sliderTop
        };
      }
      if (rAF) {
        if (cAF && this.scrollRAF) {
          cAF(this.scrollRAF);
        }
        this.scrollRAF = rAF((function(_this) {
          return function() {
            _this.scrollRAF = null;
            return _this.slider.css(cssValue);
          };
        })(this));
      } else {
        this.slider.css(cssValue);
      }
    };


    /**
      Creates event related methods
      @method createEvents
      @private
     */

    NanoScroll.prototype.createEvents = function() {
      this.events = {
        down: (function(_this) {
          return function(e) {
            _this.isBeingDragged = true;
            _this.offsetY = e.pageY - _this.slider.offset().top;
            if (!_this.slider.is(e.target)) {
              _this.offsetY = 0;
            }
            _this.pane.addClass('active');
            _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
            _this.body.bind(MOUSEENTER, _this.events[ENTER]);
            return false;
          };
        })(this),
        drag: (function(_this) {
          return function(e) {
            _this.sliderY = e.pageY - _this.$el.offset().top - _this.paneTop - (_this.offsetY || _this.sliderHeight * 0.5);
            _this.scroll();
            if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
              _this.$el.trigger('scrollend');
            } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
              _this.$el.trigger('scrolltop');
            }
            return false;
          };
        })(this),
        up: (function(_this) {
          return function(e) {
            _this.isBeingDragged = false;
            _this.pane.removeClass('active');
            _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
            _this.body.unbind(MOUSEENTER, _this.events[ENTER]);
            return false;
          };
        })(this),
        resize: (function(_this) {
          return function(e) {
            _this.reset();
          };
        })(this),
        panedown: (function(_this) {
          return function(e) {
            _this.sliderY = (e.offsetY || e.originalEvent.layerY) - (_this.sliderHeight * 0.5);
            _this.scroll();
            _this.events.down(e);
            return false;
          };
        })(this),
        scroll: (function(_this) {
          return function(e) {
            _this.updateScrollValues();
            if (_this.isBeingDragged) {
              return;
            }
            if (!_this.iOSNativeScrolling) {
              _this.sliderY = _this.sliderTop;
              _this.setOnScrollStyles();
            }
            if (e == null) {
              return;
            }
            if (_this.contentScrollTop >= _this.maxScrollTop) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, DOWN);
              }
              if (_this.prevScrollTop !== _this.maxScrollTop) {
                _this.$el.trigger('scrollend');
              }
            } else if (_this.contentScrollTop === 0) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, UP);
              }
              if (_this.prevScrollTop !== 0) {
                _this.$el.trigger('scrolltop');
              }
            }
          };
        })(this),
        wheel: (function(_this) {
          return function(e) {
            var delta;
            if (e == null) {
              return;
            }
            delta = e.delta || e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail || (e.originalEvent && -e.originalEvent.detail);
            if (delta) {
              _this.sliderY += -delta / 3;
            }
            _this.scroll();
            return false;
          };
        })(this),
        enter: (function(_this) {
          return function(e) {
            var _ref;
            if (!_this.isBeingDragged) {
              return;
            }
            if ((e.buttons || e.which) !== 1) {
              return (_ref = _this.events)[UP].apply(_ref, arguments);
            }
          };
        })(this)
      };
    };


    /**
      Adds event listeners with jQuery.
      @method addEvents
      @private
     */

    NanoScroll.prototype.addEvents = function() {
      var events;
      this.removeEvents();
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      if (!this.iOSNativeScrolling) {
        this.slider.bind(MOUSEDOWN, events[DOWN]);
        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      }
      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Removes event listeners with jQuery.
      @method removeEvents
      @private
     */

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      this.win.unbind(RESIZE, events[RESIZE]);
      if (!this.iOSNativeScrolling) {
        this.slider.unbind();
        this.pane.unbind();
      }
      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Generates nanoScroller's scrollbar and elements for it.
      @method generate
      @chainable
      @private
     */

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, currentPadding, options, pane, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (!(pane = this.$el.children("." + paneClass)).length && !pane.children("." + sliderClass).length) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.pane = this.$el.children("." + paneClass);
      this.slider = this.pane.find("." + sliderClass);
      if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
        currentPadding = window.getComputedStyle(this.content, null).getPropertyValue('padding-right').replace(/[^0-9.]+/g, '');
        cssRule = {
          right: -14,
          paddingRight: +currentPadding + 14
        };
      } else if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (cssRule != null) {
        this.$content.css(cssRule);
      }
      return this;
    };


    /**
      @method restore
      @private
     */

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      if (!this.iOSNativeScrolling) {
        this.pane.show();
      }
      this.addEvents();
    };


    /**
      Resets nanoScroller's scrollbar.
      @method reset
      @chainable
      @example
          $(".nano").nanoScroller();
     */

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
      if (this.iOSNativeScrolling) {
        this.contentHeight = this.content.scrollHeight;
        return;
      }
      if (!this.$el.find("." + this.options.paneClass).length) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content;
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.$content.css({
          height: this.$content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
      if (parentMaxHeight > 0) {
        this.$el.height("");
        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
      }
      paneHeight = this.pane.outerHeight(false);
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneHeight);
      if (sliderHeight < this.options.sliderMinHeight) {
        sliderHeight = this.options.sliderMinHeight;
      } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
        sliderHeight = this.options.sliderMaxHeight;
      }
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      this.maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.paneTop = paneTop;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      this.isActive = true;
      if ((content.scrollHeight === content.clientHeight) || (this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
        this.pane.hide();
        this.isActive = false;
      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      this.pane.css({
        opacity: (this.options.alwaysVisible ? 1 : ''),
        visibility: (this.options.alwaysVisible ? 'visible' : '')
      });
      contentPosition = this.$content.css('position');
      if (contentPosition === 'static' || contentPosition === 'relative') {
        right = parseInt(this.$content.css('right'), 10);
        if (right) {
          this.$content.css({
            right: '',
            marginRight: right
          });
        }
      }
      return this;
    };


    /**
      @method scroll
      @private
      @example
          $(".nano").nanoScroller({ scroll: 'top' });
     */

    NanoScroll.prototype.scroll = function() {
      if (!this.isActive) {
        return;
      }
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop);
      if (!this.iOSNativeScrolling) {
        this.updateScrollValues();
        this.setOnScrollStyles();
      }
      return this;
    };


    /**
      Scroll at the bottom with an offset value
      @method scrollBottom
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollBottom: value });
     */

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll at the top with an offset value
      @method scrollTop
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTop: value });
     */

    NanoScroll.prototype.scrollTop = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll to an element
      @method scrollTo
      @param node {Node} A node to scroll to.
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTo: $('#a_node') });
     */

    NanoScroll.prototype.scrollTo = function(node) {
      if (!this.isActive) {
        return;
      }
      this.scrollTop(this.$el.find(node).get(0).offsetTop);
      return this;
    };


    /**
      To stop the operation.
      This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
      @method stop
      @chainable
      @example
          $(".nano").nanoScroller({ stop: true });
     */

    NanoScroll.prototype.stop = function() {
      if (cAF && this.scrollRAF) {
        cAF(this.scrollRAF);
        this.scrollRAF = null;
      }
      this.stopped = true;
      this.removeEvents();
      if (!this.iOSNativeScrolling) {
        this.pane.hide();
      }
      return this;
    };


    /**
      Destroys nanoScroller and restores browser's native scrollbar.
      @method destroy
      @chainable
      @example
          $(".nano").nanoScroller({ destroy: true });
     */

    NanoScroll.prototype.destroy = function() {
      if (!this.stopped) {
        this.stop();
      }
      if (!this.iOSNativeScrolling && this.pane.length) {
        this.pane.remove();
      }
      if (BROWSER_IS_IE7) {
        this.$content.height('');
      }
      this.$content.removeAttr('tabindex');
      if (this.$el.hasClass('has-scrollbar')) {
        this.$el.removeClass('has-scrollbar');
        this.$content.css({
          right: ''
        });
      }
      return this;
    };


    /**
      To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
      Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
      @method flash
      @chainable
      @example
          $(".nano").nanoScroller({ flash: true });
     */

    NanoScroll.prototype.flash = function() {
      if (this.iOSNativeScrolling) {
        return;
      }
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.pane.addClass('flashed');
      setTimeout((function(_this) {
        return function() {
          _this.pane.removeClass('flashed');
        };
      })(this), this.options.flashDelay);
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    return this.each(function() {
      var options, scrollbar;
      if (!(scrollbar = this.nanoscroller)) {
        options = $.extend({}, defaults, settings);
        this.nanoscroller = scrollbar = new NanoScroll(this, options);
      }
      if (settings && typeof settings === "object") {
        $.extend(scrollbar.options, settings);
        if (settings.scrollBottom != null) {
          return scrollbar.scrollBottom(settings.scrollBottom);
        }
        if (settings.scrollTop != null) {
          return scrollbar.scrollTop(settings.scrollTop);
        }
        if (settings.scrollTo) {
          return scrollbar.scrollTo(settings.scrollTo);
        }
        if (settings.scroll === 'bottom') {
          return scrollbar.scrollBottom(0);
        }
        if (settings.scroll === 'top') {
          return scrollbar.scrollTop(0);
        }
        if (settings.scroll && settings.scroll instanceof $) {
          return scrollbar.scrollTo(settings.scroll);
        }
        if (settings.stop) {
          return scrollbar.stop();
        }
        if (settings.destroy) {
          return scrollbar.destroy();
        }
        if (settings.flash) {
          return scrollbar.flash();
        }
      }
      return scrollbar.reset();
    });
  };
  $.fn.nanoScroller.Constructor = NanoScroll;
});

//# sourceMappingURL=jquery.nanoscroller.js.map

(function ($) {
  'use strict';

  //<editor-fold desc="Shims">
  if (!String.prototype.includes) {
    (function () {
      'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
      var toString = {}.toString;
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }());
      var indexOf = ''.indexOf;
      var includes = function (search) {
        if (this == null) {
          throw new TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw new TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        return indexOf.call(string, searchString, pos) != -1;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'includes', {
          'value': includes,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.includes = includes;
      }
    }());
  }

  if (!String.prototype.startsWith) {
    (function () {
      'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }());
      var toString = {}.toString;
      var startsWith = function (search) {
        if (this == null) {
          throw new TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw new TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        var index = -1;
        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }
        return true;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    }());
  }

  if (!Object.keys) {
    Object.keys = function (
      o, // object
      k, // key
      r  // result array
      ){
      // initialize object and result
      r=[];
      // iterate over object keys
      for (k in o)
          // fill result array with non-prototypical keys
        r.hasOwnProperty.call(o, k) && r.push(k);
      // return result
      return r;
    };
  }

  // set data-selected on select element if the value has been programmatically selected
  // prior to initialization of bootstrap-select
  // * consider removing or replacing an alternative method *
  var valHooks = {
    useDefault: false,
    _set: $.valHooks.select.set
  };

  $.valHooks.select.set = function(elem, value) {
    if (value && !valHooks.useDefault) $(elem).data('selected', true);

    return valHooks._set.apply(this, arguments);
  };

  var changed_arguments = null;
  $.fn.triggerNative = function (eventName) {
    var el = this[0],
        event;

    if (el.dispatchEvent) { // for modern browsers & IE9+
      if (typeof Event === 'function') {
        // For modern browsers
        event = new Event(eventName, {
          bubbles: true
        });
      } else {
        // For IE since it doesn't support Event constructor
        event = document.createEvent('Event');
        event.initEvent(eventName, true, false);
      }

      el.dispatchEvent(event);
    } else if (el.fireEvent) { // for IE8
      event = document.createEventObject();
      event.eventType = eventName;
      el.fireEvent('on' + eventName, event);
    } else {
      // fall back to jQuery.trigger
      this.trigger(eventName);
    }
  };
  //</editor-fold>

  // Case insensitive contains search
  $.expr.pseudos.icontains = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
    return haystack.includes(meta[3].toUpperCase());
  };

  // Case insensitive begins search
  $.expr.pseudos.ibegins = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
    return haystack.startsWith(meta[3].toUpperCase());
  };

  // Case and accent insensitive contains search
  $.expr.pseudos.aicontains = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
    return haystack.includes(meta[3].toUpperCase());
  };

  // Case and accent insensitive begins search
  $.expr.pseudos.aibegins = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
    return haystack.startsWith(meta[3].toUpperCase());
  };

  /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
  function normalizeToBase(text) {
    var rExps = [
      {re: /[\xC0-\xC6]/g, ch: "A"},
      {re: /[\xE0-\xE6]/g, ch: "a"},
      {re: /[\xC8-\xCB]/g, ch: "E"},
      {re: /[\xE8-\xEB]/g, ch: "e"},
      {re: /[\xCC-\xCF]/g, ch: "I"},
      {re: /[\xEC-\xEF]/g, ch: "i"},
      {re: /[\xD2-\xD6]/g, ch: "O"},
      {re: /[\xF2-\xF6]/g, ch: "o"},
      {re: /[\xD9-\xDC]/g, ch: "U"},
      {re: /[\xF9-\xFC]/g, ch: "u"},
      {re: /[\xC7-\xE7]/g, ch: "c"},
      {re: /[\xD1]/g, ch: "N"},
      {re: /[\xF1]/g, ch: "n"}
    ];
    $.each(rExps, function () {
      text = text ? text.replace(this.re, this.ch) : '';
    });
    return text;
  }


  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  
  var unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x60;': '`'
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  var htmlEscape = createEscaper(escapeMap);
  var htmlUnescape = createEscaper(unescapeMap);

  var Selectpicker = function (element, options) {
    // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
    if (!valHooks.useDefault) {
      $.valHooks.select.set = valHooks._set;
      valHooks.useDefault = true;
    }

    this.$element = $(element);
    this.$newElement = null;
    this.$button = null;
    this.$menu = null;
    this.$lis = null;
    this.options = options;

    // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
    // data-attribute)
    if (this.options.title === null) {
      this.options.title = this.$element.attr('title');
    }

    // Format window padding
    var winPad = this.options.windowPadding;
    if (typeof winPad === 'number') {
      this.options.windowPadding = [winPad, winPad, winPad, winPad];
    }

    //Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.refresh = Selectpicker.prototype.refresh;
    this.setStyle = Selectpicker.prototype.setStyle;
    this.selectAll = Selectpicker.prototype.selectAll;
    this.deselectAll = Selectpicker.prototype.deselectAll;
    this.destroy = Selectpicker.prototype.destroy;
    this.remove = Selectpicker.prototype.remove;
    this.show = Selectpicker.prototype.show;
    this.hide = Selectpicker.prototype.hide;

    this.init();
  };

  Selectpicker.VERSION = '1.12.2';

  // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
  Selectpicker.DEFAULTS = {
    noneSelectedText: 'Nothing selected',
    noneResultsText: 'No results matched {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
        (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
      ];
    },
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    doneButton: false,
    doneButtonText: 'Close',
    multipleSeparator: ', ',
    styleBase: 'btn',
    style: 'btn-default',
    size: 'auto',
    title: null,
    selectedTextFormat: 'values',
    width: false,
    container: false,
    hideDisabled: false,
    showSubtext: false,
    showIcon: true,
    showContent: true,
    dropupAuto: true,
    header: false,
    liveSearch: false,
    liveSearchPlaceholder: null,
    liveSearchNormalize: false,
    liveSearchStyle: 'contains',
    actionsBox: false,
    iconBase: 'glyphicon',
    tickIcon: 'glyphicon-ok',
    showTick: false,
    template: {
      caret: '<span class="caret"></span>'
    },
    maxOptions: false,
    mobile: false,
    selectOnTab: false,
    dropdownAlignRight: false,
    windowPadding: 0
  };

  Selectpicker.prototype = {

    constructor: Selectpicker,

    init: function () {
      var that = this,
          id = this.$element.attr('id');

      this.$element.addClass('bs-select-hidden');

      // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
      // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
      this.liObj = {};
      this.multiple = this.$element.prop('multiple');
      this.autofocus = this.$element.prop('autofocus');
      this.$newElement = this.createView();
      this.$element
        .after(this.$newElement)
        .appendTo(this.$newElement);
      this.$button = this.$newElement.children('button');
      this.$menu = this.$newElement.children('.dropdown-menu');
      this.$menuInner = this.$menu.children('.inner');
      this.$searchbox = this.$menu.find('input');

      this.$element.removeClass('bs-select-hidden');

      if (this.options.dropdownAlignRight === true) this.$menu.addClass('dropdown-menu-right');

      if (typeof id !== 'undefined') {
        this.$button.attr('data-id', id);
        $('label[for="' + id + '"]').click(function (e) {
          e.preventDefault();
          that.$button.focus();
        });
      }

      this.checkDisabled();
      this.clickListener();
      if (this.options.liveSearch) this.liveSearchListener();
      this.render();
      this.setStyle();
      this.setWidth();
      if (this.options.container) this.selectPosition();
      this.$menu.data('this', this);
      this.$newElement.data('this', this);
      if (this.options.mobile) this.mobile();

      this.$newElement.on({
        'hide.bs.dropdown': function (e) {
          that.$menuInner.attr('aria-expanded', false);
          that.$element.trigger('hide.bs.select', e);
        },
        'hidden.bs.dropdown': function (e) {
          that.$element.trigger('hidden.bs.select', e);
        },
        'show.bs.dropdown': function (e) {
          that.$menuInner.attr('aria-expanded', true);
          that.$element.trigger('show.bs.select', e);
        },
        'shown.bs.dropdown': function (e) {
          that.$element.trigger('shown.bs.select', e);
        }
      });

      if (that.$element[0].hasAttribute('required')) {
        this.$element.on('invalid', function () {
          that.$button
            .addClass('bs-invalid')
            .focus();

          that.$element.on({
            'focus.bs.select': function () {
              that.$button.focus();
              that.$element.off('focus.bs.select');
            },
            'shown.bs.select': function () {
              that.$element
                .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                .off('shown.bs.select');
            },
            'rendered.bs.select': function () {
              // if select is no longer invalid, remove the bs-invalid class
              if (this.validity.valid) that.$button.removeClass('bs-invalid');
              that.$element.off('rendered.bs.select');
            }
          });
        });
      }

      setTimeout(function () {
        that.$element.trigger('loaded.bs.select');
      });
    },

    createDropdown: function () {
      // Options
      // If we are multiple or showTick option is set, then add the show-tick class
      var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
          inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
          autofocus = this.autofocus ? ' autofocus' : '';
      // Elements
      var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
      var searchbox = this.options.liveSearch ?
      '<div class="bs-searchbox">' +
      '<input type="text" class="form-control" autocomplete="off"' +
      (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' +
      '</div>'
          : '';
      var actionsbox = this.multiple && this.options.actionsBox ?
      '<div class="bs-actionsbox">' +
      '<div class="btn-group btn-group-sm btn-block">' +
      '<button type="button" class="actions-btn bs-select-all btn btn-default">' +
      this.options.selectAllText +
      '</button>' +
      '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
      this.options.deselectAllText +
      '</button>' +
      '</div>' +
      '</div>'
          : '';
      var donebutton = this.multiple && this.options.doneButton ?
      '<div class="bs-donebutton">' +
      '<div class="btn-group btn-block">' +
      '<button type="button" class="btn btn-sm btn-default">' +
      this.options.doneButtonText +
      '</button>' +
      '</div>' +
      '</div>'
          : '';
      var drop =
          '<div class="btn-group bootstrap-select' + showTick + inputGroup + '">' +
          '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button">' +
          '<span class="filter-option pull-left"></span>&nbsp;' +
          '<span class="bs-caret">' +
          this.options.template.caret +
          '</span>' +
          '</button>' +
          '<div class="dropdown-menu open" role="combobox">' +
          header +
          searchbox +
          actionsbox +
          '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false">' +
          '</ul>' +
          donebutton +
          '</div>' +
          '</div>';

      return $(drop);
    },

    createView: function () {
      var $drop = this.createDropdown(),
          li = this.createLi();

      $drop.find('ul')[0].innerHTML = li;
      return $drop;
    },

    reloadLi: function () {
      // rebuild
      var li = this.createLi();
      this.$menuInner[0].innerHTML = li;
    },

    createLi: function () {
      var that = this,
          _li = [],
          optID = 0,
          titleOption = document.createElement('option'),
          liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

      // Helper functions
      /**
       * @param content
       * @param [index]
       * @param [classes]
       * @param [optgroup]
       * @returns {string}
       */
      var generateLI = function (content, index, classes, optgroup) {
        return '<li' +
            ((typeof classes !== 'undefined' & '' !== classes) ? ' class="' + classes + '"' : '') +
            ((typeof index !== 'undefined' & null !== index) ? ' data-original-index="' + index + '"' : '') +
            ((typeof optgroup !== 'undefined' & null !== optgroup) ? 'data-optgroup="' + optgroup + '"' : '') +
            '>' + content + '</li>';
      };

      /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [tokens]
       * @returns {string}
       */
      var generateA = function (text, classes, inline, tokens) {
        return '<a tabindex="0"' +
            (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
            (inline ? ' style="' + inline + '"' : '') +
            (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : '') +
            (typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') +
            ' role="option">' + text +
            '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
            '</a>';
      };

      if (this.options.title && !this.multiple) {
        // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
        // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
        liIndex--;

        if (!this.$element.find('.bs-title-option').length) {
          // Use native JS to prepend option (faster)
          var element = this.$element[0];
          titleOption.className = 'bs-title-option';
          titleOption.innerHTML = this.options.title;
          titleOption.value = '';
          element.insertBefore(titleOption, element.firstChild);
          // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
          // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
          // if so, the select will have the data-selected attribute
          var $opt = $(element.options[element.selectedIndex]);
          if ($opt.attr('selected') === undefined && this.$element.data('selected') === undefined) {
            titleOption.selected = true;
          }
        }
      }

      this.$element.find('option').each(function (index) {
        var $this = $(this);

        liIndex++;

        if ($this.hasClass('bs-title-option')) return;

        // Get the class and text for the option
        var optionClass = this.className || '',
            inline = this.style.cssText,
            text = $this.data('content') ? $this.data('content') : $this.html(),
            tokens = $this.data('tokens') ? $this.data('tokens') : null,
            subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
            icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
            $parent = $this.parent(),
            isOptgroup = $parent[0].tagName === 'OPTGROUP',
            isOptgroupDisabled = isOptgroup && $parent[0].disabled,
            isDisabled = this.disabled || isOptgroupDisabled;

        if (icon !== '' && isDisabled) {
          icon = '<span>' + icon + '</span>';
        }

        if (that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) {
          liIndex--;
          return;
        }

        if (!$this.data('content')) {
          // Prepend any icon and append any subtext to the main text.
          text = icon + '<span class="text">' + text + subtext + '</span>';
        }

        if (isOptgroup && $this.data('divider') !== true) {
          if (that.options.hideDisabled && isDisabled) {
            if ($parent.data('allOptionsDisabled') === undefined) {
              var $options = $parent.children();
              $parent.data('allOptionsDisabled', $options.filter(':disabled').length === $options.length);
            }

            if ($parent.data('allOptionsDisabled')) {
              liIndex--;
              return;
            }
          }

          var optGroupClass = ' ' + $parent[0].className || '';

          if ($this.index() === 0) { // Is it the first option of the optgroup?
            optID += 1;

            // Get the opt group label
            var label = $parent[0].label,
                labelSubtext = typeof $parent.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $parent.data('subtext') + '</small>' : '',
                labelIcon = $parent.data('icon') ? '<span class="' + that.options.iconBase + ' ' + $parent.data('icon') + '"></span> ' : '';

            label = labelIcon + '<span class="text">' + htmlEscape(label) + labelSubtext + '</span>';

            if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
              liIndex++;
              _li.push(generateLI('', null, 'divider', optID + 'div'));
            }
            liIndex++;
            _li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
          }

          if (that.options.hideDisabled && isDisabled) {
            liIndex--;
            return;
          }

          _li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
        } else if ($this.data('divider') === true) {
          _li.push(generateLI('', index, 'divider'));
        } else if ($this.data('hidden') === true) {
          _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
        } else {
          var showDivider = this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP';

          // if previous element is not an optgroup and hideDisabled is true
          if (!showDivider && that.options.hideDisabled) {
            // get previous elements
            var $prev = $(this).prevAll();

            for (var i = 0; i < $prev.length; i++) {
              // find the first element in the previous elements that is an optgroup
              if ($prev[i].tagName === 'OPTGROUP') {
                var optGroupDistance = 0;

                // loop through the options in between the current option and the optgroup
                // and check if they are hidden or disabled
                for (var d = 0; d < i; d++) {
                  var prevOption = $prev[d];
                  if (prevOption.disabled || $(prevOption).data('hidden') === true) optGroupDistance++;
                }

                // if all of the options between the current option and the optgroup are hidden or disabled, show the divider
                if (optGroupDistance === i) showDivider = true;

                break;
              }
            }
          }

          if (showDivider) {
            liIndex++;
            _li.push(generateLI('', null, 'divider', optID + 'div'));
          }
          _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
        }

        that.liObj[index] = liIndex;
      });

      //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
      if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
        this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
      }

      return _li.join('');
    },

    findLis: function () {
      if (this.$lis == null) this.$lis = this.$menu.find('li');
      return this.$lis;
    },

    /**
     * @param [updateLi] defaults to true
     */
    render: function (updateLi) {
      var that = this,
          notDisabled;

      //Update the LI to match the SELECT
      if (updateLi !== false) {
        this.$element.find('option').each(function (index) {
          var $lis = that.findLis().eq(that.liObj[index]);

          that.setDisabled(index, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, $lis);
          that.setSelected(index, this.selected, $lis);
        });
      }

      this.togglePlaceholder();

      this.tabIndex();

      var selectedItems = this.$element.find('option').map(function () {
        if (this.selected) {
          if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;

          var $this = $(this),
              icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
              subtext;

          if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
            subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
          } else {
            subtext = '';
          }
          if (typeof $this.attr('title') !== 'undefined') {
            return $this.attr('title');
          } else if ($this.data('content') && that.options.showContent) {
            return $this.data('content').toString();
          } else {
            return icon + $this.html() + subtext;
          }
        }
      }).toArray();

      //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
      //Convert all the values into a comma delimited string
      var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

      //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
      if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
        var max = this.options.selectedTextFormat.split('>');
        if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
          notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
          var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
          title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
        }
      }

      if (this.options.title == undefined) {
        this.options.title = this.$element.attr('title');
      }

      if (this.options.selectedTextFormat == 'static') {
        title = this.options.title;
      }

      //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
      if (!title) {
        title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
      }

      //strip all HTML tags and trim the result, then unescape any escaped tags
      this.$button.attr('title', htmlUnescape($.trim(title.replace(/<[^>]*>?/g, ''))));
      this.$button.children('.filter-option').html(title);

      this.$element.trigger('rendered.bs.select');
    },

    /**
     * @param [style]
     * @param [status]
     */
    setStyle: function (style, status) {
      if (this.$element.attr('class')) {
        this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
      }

      var buttonClass = style ? style : this.options.style;

      if (status == 'add') {
        this.$button.addClass(buttonClass);
      } else if (status == 'remove') {
        this.$button.removeClass(buttonClass);
      } else {
        this.$button.removeClass(this.options.style);
        this.$button.addClass(buttonClass);
      }
    },

    liHeight: function (refresh) {
      if (!refresh && (this.options.size === false || this.sizeInfo)) return;

      var newElement = document.createElement('div'),
          menu = document.createElement('div'),
          menuInner = document.createElement('ul'),
          divider = document.createElement('li'),
          li = document.createElement('li'),
          a = document.createElement('a'),
          text = document.createElement('span'),
          header = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
          search = this.options.liveSearch ? document.createElement('div') : null,
          actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
          doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

      text.className = 'text';
      newElement.className = this.$menu[0].parentNode.className + ' open';
      menu.className = 'dropdown-menu open';
      menuInner.className = 'dropdown-menu inner';
      divider.className = 'divider';

      text.appendChild(document.createTextNode('Inner text'));
      a.appendChild(text);
      li.appendChild(a);
      menuInner.appendChild(li);
      menuInner.appendChild(divider);
      if (header) menu.appendChild(header);
      if (search) {
        var input = document.createElement('input');
        search.className = 'bs-searchbox';
        input.className = 'form-control';
        search.appendChild(input);
        menu.appendChild(search);
      }
      if (actions) menu.appendChild(actions);
      menu.appendChild(menuInner);
      if (doneButton) menu.appendChild(doneButton);
      newElement.appendChild(menu);

      document.body.appendChild(newElement);

      var liHeight = a.offsetHeight,
          headerHeight = header ? header.offsetHeight : 0,
          searchHeight = search ? search.offsetHeight : 0,
          actionsHeight = actions ? actions.offsetHeight : 0,
          doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
          dividerHeight = $(divider).outerHeight(true),
          // fall back to jQuery if getComputedStyle is not supported
          menuStyle = typeof getComputedStyle === 'function' ? getComputedStyle(menu) : false,
          $menu = menuStyle ? null : $(menu),
          menuPadding = {
            vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                  parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                  parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                  parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
            horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
                  parseInt(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
                  parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
                  parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
          },
          menuExtras =  {
            vert: menuPadding.vert +
                  parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
                  parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
            horiz: menuPadding.horiz +
                  parseInt(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
                  parseInt(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
          }

      document.body.removeChild(newElement);

      this.sizeInfo = {
        liHeight: liHeight,
        headerHeight: headerHeight,
        searchHeight: searchHeight,
        actionsHeight: actionsHeight,
        doneButtonHeight: doneButtonHeight,
        dividerHeight: dividerHeight,
        menuPadding: menuPadding,
        menuExtras: menuExtras
      };
    },

    setSize: function () {
      this.findLis();
      this.liHeight();

      if (this.options.header) this.$menu.css('padding-top', 0);
      if (this.options.size === false) return;

      var that = this,
          $menu = this.$menu,
          $menuInner = this.$menuInner,
          $window = $(window),
          selectHeight = this.$newElement[0].offsetHeight,
          selectWidth = this.$newElement[0].offsetWidth,
          liHeight = this.sizeInfo['liHeight'],
          headerHeight = this.sizeInfo['headerHeight'],
          searchHeight = this.sizeInfo['searchHeight'],
          actionsHeight = this.sizeInfo['actionsHeight'],
          doneButtonHeight = this.sizeInfo['doneButtonHeight'],
          divHeight = this.sizeInfo['dividerHeight'],
          menuPadding = this.sizeInfo['menuPadding'],
          menuExtras = this.sizeInfo['menuExtras'],
          notDisabled = this.options.hideDisabled ? '.disabled' : '',
          menuHeight,
          menuWidth,
          getHeight,
          getWidth,
          selectOffsetTop,
          selectOffsetBot,
          selectOffsetLeft,
          selectOffsetRight,
          getPos = function() {
            var pos = that.$newElement.offset(),
                $container = $(that.options.container),
                containerPos;

            if (that.options.container && !$container.is('body')) {
              containerPos = $container.offset();
              containerPos.top += parseInt($container.css('borderTopWidth'));
              containerPos.left += parseInt($container.css('borderLeftWidth'));
            } else {
              containerPos = { top: 0, left: 0 };
            }

            var winPad = that.options.windowPadding;
            selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
            selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2];
            selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
            selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1];
            selectOffsetTop -= winPad[0];
            selectOffsetLeft -= winPad[3];
          };

      getPos();

      if (this.options.size === 'auto') {
        var getSize = function () {
          var minHeight,
              hasClass = function (className, include) {
                return function (element) {
                    if (include) {
                        return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                    } else {
                        return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                    }
                };
              },
              lis = that.$menuInner[0].getElementsByTagName('li'),
              lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
              optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

          getPos();
          menuHeight = selectOffsetBot - menuExtras.vert;
          menuWidth = selectOffsetRight - menuExtras.horiz;

          if (that.options.container) {
            if (!$menu.data('height')) $menu.data('height', $menu.height());
            getHeight = $menu.data('height');

            if (!$menu.data('width')) $menu.data('width', $menu.width());
            getWidth = $menu.data('width');
          } else {
            getHeight = $menu.height();
            getWidth = $menu.width();
          }

          if (that.options.dropupAuto) {
            that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
          }

          if (that.$newElement.hasClass('dropup')) {
            menuHeight = selectOffsetTop - menuExtras.vert;
          }

          if (that.options.dropdownAlignRight === 'auto') {
            $menu.toggleClass('dropdown-menu-right', selectOffsetLeft > selectOffsetRight && (menuWidth - menuExtras.horiz) < (getWidth - selectWidth));
          }

          if ((lisVisible.length + optGroup.length) > 3) {
            minHeight = liHeight * 3 + menuExtras.vert - 2;
          } else {
            minHeight = 0;
          }

          $menu.css({
            'max-height': menuHeight + 'px',
            'overflow': 'hidden',
            'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
          });
          $menuInner.css({
            'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + 'px',
            'overflow-y': 'auto',
            'min-height': Math.max(minHeight - menuPadding.vert, 0) + 'px'
          });
        };
        getSize();
        this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
        $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
      } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
        var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
            divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;

        if (that.options.container) {
          if (!$menu.data('height')) $menu.data('height', $menu.height());
          getHeight = $menu.data('height');
        } else {
          getHeight = $menu.height();
        }

        if (that.options.dropupAuto) {
          //noinspection JSUnusedAssignment
          this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
        }
        $menu.css({
          'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
          'overflow': 'hidden',
          'min-height': ''
        });
        $menuInner.css({
          'max-height': menuHeight - menuPadding.vert + 'px',
          'overflow-y': 'auto',
          'min-height': ''
        });
      }
    },

    setWidth: function () {
      if (this.options.width === 'auto') {
        this.$menu.css('min-width', '0');

        // Get correct width if element is hidden
        var $selectClone = this.$menu.parent().clone().appendTo('body'),
            $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
            ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
            btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

        $selectClone.remove();
        $selectClone2.remove();

        // Set width to whatever's larger, button title or longest option
        this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
      } else if (this.options.width === 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '').addClass('fit-width');
      } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', this.options.width);
      } else {
        // Remove inline min-width/width so width can be changed
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '');
      }
      // Remove fit-width class if width is changed programmatically
      if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
        this.$newElement.removeClass('fit-width');
      }
    },

    selectPosition: function () {
      this.$bsContainer = $('<div class="bs-container" />');

      var that = this,
          $container = $(this.options.container),
          pos,
          containerPos,
          actualHeight,
          getPlacement = function ($element) {
            that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
            pos = $element.offset();

            if (!$container.is('body')) {
              containerPos = $container.offset();
              containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
              containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
            } else {
              containerPos = { top: 0, left: 0 };
            }

            actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;

            that.$bsContainer.css({
              'top': pos.top - containerPos.top + actualHeight,
              'left': pos.left - containerPos.left,
              'width': $element[0].offsetWidth
            });
          };

      this.$button.on('click', function () {
        var $this = $(this);

        if (that.isDisabled()) {
          return;
        }

        getPlacement(that.$newElement);

        that.$bsContainer
          .appendTo(that.options.container)
          .toggleClass('open', !$this.hasClass('open'))
          .append(that.$menu);
      });

      $(window).on('resize scroll', function () {
        getPlacement(that.$newElement);
      });

      this.$element.on('hide.bs.select', function () {
        that.$menu.data('height', that.$menu.height());
        that.$bsContainer.detach();
      });
    },

    /**
     * @param {number} index - the index of the option that is being changed
     * @param {boolean} selected - true if the option is being selected, false if being deselected
     * @param {JQuery} $lis - the 'li' element that is being modified
     */
    setSelected: function (index, selected, $lis) {
      if (!$lis) {
        this.togglePlaceholder(); // check if setSelected is being called by changing the value of the select
        $lis = this.findLis().eq(this.liObj[index]);
      }

      $lis.toggleClass('selected', selected).find('a').attr('aria-selected', selected);
    },

    /**
     * @param {number} index - the index of the option that is being disabled
     * @param {boolean} disabled - true if the option is being disabled, false if being enabled
     * @param {JQuery} $lis - the 'li' element that is being modified
     */
    setDisabled: function (index, disabled, $lis) {
      if (!$lis) {
        $lis = this.findLis().eq(this.liObj[index]);
      }

      if (disabled) {
        $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1).attr('aria-disabled', true);
      } else {
        $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0).attr('aria-disabled', false);
      }
    },

    isDisabled: function () {
      return this.$element[0].disabled;
    },

    checkDisabled: function () {
      var that = this;

      if (this.isDisabled()) {
        this.$newElement.addClass('disabled');
        this.$button.addClass('disabled').attr('tabindex', -1).attr('aria-disabled', true);
      } else {
        if (this.$button.hasClass('disabled')) {
          this.$newElement.removeClass('disabled');
          this.$button.removeClass('disabled').attr('aria-disabled', false);
        }

        if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
          this.$button.removeAttr('tabindex');
        }
      }

      this.$button.click(function () {
        return !that.isDisabled();
      });
    },

    togglePlaceholder: function () {
      var value = this.$element.val();
      this.$button.toggleClass('bs-placeholder', value === null || value === '' || (value.constructor === Array && value.length === 0));
    },

    tabIndex: function () {
      if (this.$element.data('tabindex') !== this.$element.attr('tabindex') && 
        (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
        this.$element.data('tabindex', this.$element.attr('tabindex'));
        this.$button.attr('tabindex', this.$element.data('tabindex'));
      }

      this.$element.attr('tabindex', -98);
    },

    clickListener: function () {
      var that = this,
          $document = $(document);

      $document.data('spaceSelect', false);

      this.$button.on('keyup', function (e) {
        if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
        }
      });

      this.$button.on('click', function () {
        that.setSize();
      });

      this.$element.on('shown.bs.select', function () {
        if (!that.options.liveSearch && !that.multiple) {
          that.$menuInner.find('.selected a').focus();
        } else if (!that.multiple) {
          var selectedIndex = that.liObj[that.$element[0].selectedIndex];

          if (typeof selectedIndex !== 'number' || that.options.size === false) return;

          // scroll to selected option
          var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
          offset = offset - that.$menuInner[0].offsetHeight/2 + that.sizeInfo.liHeight/2;
          that.$menuInner[0].scrollTop = offset;
        }
      });

      this.$menuInner.on('click', 'li a', function (e) {
        var $this = $(this),
            clickedIndex = $this.parent().data('originalIndex'),
            prevValue = that.$element.val(),
            prevIndex = that.$element.prop('selectedIndex'),
            triggerChange = true;

        // Don't close on multi choice menu
        if (that.multiple && that.options.maxOptions !== 1) {
          e.stopPropagation();
        }

        e.preventDefault();

        //Don't run if we have been disabled
        if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
          var $options = that.$element.find('option'),
              $option = $options.eq(clickedIndex),
              state = $option.prop('selected'),
              $optgroup = $option.parent('optgroup'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

          if (!that.multiple) { // Deselect all others if not multi select box
            $options.prop('selected', false);
            $option.prop('selected', true);
            that.$menuInner.find('.selected').removeClass('selected').find('a').attr('aria-selected', false);
            that.setSelected(clickedIndex, true);
          } else { // Toggle the one we have chosen if we are multi select.
            $option.prop('selected', !state);
            that.setSelected(clickedIndex, !state);
            $this.blur();

            if (maxOptions !== false || maxOptionsGrp !== false) {
              var maxReached = maxOptions < $options.filter(':selected').length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

              if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                if (maxOptions && maxOptions == 1) {
                  $options.prop('selected', false);
                  $option.prop('selected', true);
                  that.$menuInner.find('.selected').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                  $optgroup.find('option:selected').prop('selected', false);
                  $option.prop('selected', true);
                  var optgroupID = $this.parent().data('optgroup');
                  that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else {
                  var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                      maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                  // If {var} is set in array, replace it
                  /** @deprecated */
                  if (maxOptionsArr[2]) {
                    maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                    maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                  }

                  $option.prop('selected', false);

                  that.$menu.append($notify);

                  if (maxOptions && maxReached) {
                    $notify.append($('<div>' + maxTxt + '</div>'));
                    triggerChange = false;
                    that.$element.trigger('maxReached.bs.select');
                  }

                  if (maxOptionsGrp && maxReachedGrp) {
                    $notify.append($('<div>' + maxTxtGrp + '</div>'));
                    triggerChange = false;
                    that.$element.trigger('maxReachedGrp.bs.select');
                  }

                  setTimeout(function () {
                    that.setSelected(clickedIndex, false);
                  }, 10);

                  $notify.delay(750).fadeOut(300, function () {
                    $(this).remove();
                  });
                }
              }
            }
          }

          if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
            that.$button.focus();
          } else if (that.options.liveSearch) {
            that.$searchbox.focus();
          }

          // Trigger select 'change'
          if (triggerChange) {
            if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
              // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
              changed_arguments = [clickedIndex, $option.prop('selected'), state];
              that.$element
                .triggerNative('change');
            }
          }
        }
      });

      this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
        if (e.currentTarget == this) {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch && !$(e.target).hasClass('close')) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }
        }
      });

      this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }
      });

      this.$menu.on('click', '.popover-title .close', function () {
        that.$button.click();
      });

      this.$searchbox.on('click', function (e) {
        e.stopPropagation();
      });

      this.$menu.on('click', '.actions-btn', function (e) {
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('bs-select-all')) {
          that.selectAll();
        } else {
          that.deselectAll();
        }
      });

      this.$element.change(function () {
        that.render(false);
        that.$element.trigger('changed.bs.select', changed_arguments);
        changed_arguments = null;
      });
    },

    liveSearchListener: function () {
      var that = this,
          $no_results = $('<li class="no-results"></li>');

      this.$button.on('click.dropdown.data-api', function () {
        that.$menuInner.find('.active').removeClass('active');
        if (!!that.$searchbox.val()) {
          that.$searchbox.val('');
          that.$lis.not('.is-hidden').removeClass('hidden');
          if (!!$no_results.parent().length) $no_results.remove();
        }
        if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
        setTimeout(function () {
          that.$searchbox.focus();
        }, 10);
      });

      this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
        e.stopPropagation();
      });

      this.$searchbox.on('input propertychange', function () {
        that.$lis.not('.is-hidden').removeClass('hidden');
        that.$lis.filter('.active').removeClass('active');
        $no_results.remove();

        if (that.$searchbox.val()) {
          var $searchBase = that.$lis.not('.is-hidden, .divider, .dropdown-header'),
              $hideItems;
          if (that.options.liveSearchNormalize) {
            $hideItems = $searchBase.find('a').not(':a' + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
          } else {
            $hideItems = $searchBase.find('a').not(':' + that._searchStyle() + '("' + that.$searchbox.val() + '")');
          }

          if ($hideItems.length === $searchBase.length) {
            $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"'));
            that.$menuInner.append($no_results);
            that.$lis.addClass('hidden');
          } else {
            $hideItems.parent().addClass('hidden');

            var $lisVisible = that.$lis.not('.hidden'),
                $foundDiv;

            // hide divider if first or last visible, or if followed by another divider
            $lisVisible.each(function (index) {
              var $this = $(this);

              if ($this.hasClass('divider')) {
                if ($foundDiv === undefined) {
                  $this.addClass('hidden');
                } else {
                  if ($foundDiv) $foundDiv.addClass('hidden');
                  $foundDiv = $this;
                }
              } else if ($this.hasClass('dropdown-header') && $lisVisible.eq(index + 1).data('optgroup') !== $this.data('optgroup')) {
                $this.addClass('hidden');
              } else {
                $foundDiv = null;
              }
            });
            if ($foundDiv) $foundDiv.addClass('hidden');

            $searchBase.not('.hidden').first().addClass('active');
          }
        }
      });
    },

    _searchStyle: function () {
      var styles = {
        begins: 'ibegins',
        startsWith: 'ibegins'
      };

      return styles[this.options.liveSearchStyle] || 'icontains';
    },

    val: function (value) {
      if (typeof value !== 'undefined') {
        this.$element.val(value);
        this.render();

        return this.$element;
      } else {
        return this.$element.val();
      }
    },

    changeAll: function (status) {
      if (!this.multiple) return;
      if (typeof status === 'undefined') status = true;

      this.findLis();

      var $options = this.$element.find('option'),
          $lisVisible = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden'),
          lisVisLen = $lisVisible.length,
          selectedOptions = [];
          
      if (status) {
        if ($lisVisible.filter('.selected').length === $lisVisible.length) return;
      } else {
        if ($lisVisible.filter('.selected').length === 0) return;
      }
          
      $lisVisible.toggleClass('selected', status);

      for (var i = 0; i < lisVisLen; i++) {
        var origIndex = $lisVisible[i].getAttribute('data-original-index');
        selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
      }

      $(selectedOptions).prop('selected', status);

      this.render(false);

      this.togglePlaceholder();

      this.$element
        .triggerNative('change');
    },

    selectAll: function () {
      return this.changeAll(true);
    },

    deselectAll: function () {
      return this.changeAll(false);
    },

    toggle: function (e) {
      e = e || window.event;

      if (e) e.stopPropagation();

      this.$button.trigger('click');
    },

    keydown: function (e) {
      var $this = $(this),
          $parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
          $items,
          that = $parent.data('this'),
          index,
          next,
          first,
          last,
          prev,
          nextPrev,
          prevIndex,
          isActive,
          selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
          keyCodeMap = {
            32: ' ',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
          };

      if (that.options.liveSearch) $parent = $this.parent().parent();

      if (that.options.container) $parent = that.$menu;

      $items = $('[role="listbox"] li', $parent);

      isActive = that.$newElement.hasClass('open');

      if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
        if (!that.options.container) {
          that.setSize();
          that.$menu.parent().addClass('open');
          isActive = true;
        } else {
          that.$button.trigger('click');
        }
        that.$searchbox.focus();
        return;
      }

      if (that.options.liveSearch) {
        if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive) {
          e.preventDefault();
          e.stopPropagation();
          that.$menuInner.click();
          that.$button.focus();
        }
        // $items contains li elements when liveSearch is enabled
        $items = $('[role="listbox"] li' + selector, $parent);
        if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
          if ($items.filter('.active').length === 0) {
            $items = that.$menuInner.find('li');
            if (that.options.liveSearchNormalize) {
              $items = $items.filter(':a' + that._searchStyle() + '(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
            } else {
              $items = $items.filter(':' + that._searchStyle() + '(' + keyCodeMap[e.keyCode] + ')');
            }
          }
        }
      }

      if (!$items.length) return;

      if (/(38|40)/.test(e.keyCode.toString(10))) {
        index = $items.index($items.find('a').filter(':focus').parent());
        first = $items.filter(selector).first().index();
        last = $items.filter(selector).last().index();
        next = $items.eq(index).nextAll(selector).eq(0).index();
        prev = $items.eq(index).prevAll(selector).eq(0).index();
        nextPrev = $items.eq(next).prevAll(selector).eq(0).index();

        if (that.options.liveSearch) {
          $items.each(function (i) {
            if (!$(this).hasClass('disabled')) {
              $(this).data('index', i);
            }
          });
          index = $items.index($items.filter('.active'));
          first = $items.first().data('index');
          last = $items.last().data('index');
          next = $items.eq(index).nextAll().eq(0).data('index');
          prev = $items.eq(index).prevAll().eq(0).data('index');
          nextPrev = $items.eq(next).prevAll().eq(0).data('index');
        }

        prevIndex = $this.data('prevIndex');

        if (e.keyCode == 38) {
          if (that.options.liveSearch) index--;
          if (index != nextPrev && index > prev) index = prev;
          if (index < first) index = first;
          if (index == prevIndex) index = last;
        } else if (e.keyCode == 40) {
          if (that.options.liveSearch) index++;
          if (index == -1) index = 0;
          if (index != nextPrev && index < next) index = next;
          if (index > last) index = last;
          if (index == prevIndex) index = first;
        }

        $this.data('prevIndex', index);

        if (!that.options.liveSearch) {
          $items.eq(index).children('a').focus();
        } else {
          e.preventDefault();
          if (!$this.hasClass('dropdown-toggle')) {
            $items.removeClass('active').eq(index).addClass('active').children('a').focus();
            $this.focus();
          }
        }

      } else if (!$this.is('input')) {
        var keyIndex = [],
            count,
            prevKey;

        $items.each(function () {
          if (!$(this).hasClass('disabled')) {
            if ($.trim($(this).children('a').text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
              keyIndex.push($(this).index());
            }
          }
        });

        count = $(document).data('keycount');
        count++;
        $(document).data('keycount', count);

        prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

        if (prevKey != keyCodeMap[e.keyCode]) {
          count = 1;
          $(document).data('keycount', count);
        } else if (count >= keyIndex.length) {
          $(document).data('keycount', 0);
          if (count > keyIndex.length) count = 1;
        }

        $items.eq(keyIndex[count - 1]).children('a').focus();
      }

      // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
      if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
        if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
        if (!that.options.liveSearch) {
          var elem = $(':focus');
          elem.click();
          // Bring back focus for multiselects
          elem.focus();
          // Prevent screen from scrolling if the user hit the spacebar
          e.preventDefault();
          // Fixes spacebar selection of dropdown items in FF & IE
          $(document).data('spaceSelect', true);
        } else if (!/(32)/.test(e.keyCode.toString(10))) {
          that.$menuInner.find('.active a').click();
          $this.focus();
        }
        $(document).data('keycount', 0);
      }

      if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
        that.$menu.parent().removeClass('open');
        if (that.options.container) that.$newElement.removeClass('open');
        that.$button.focus();
      }
    },

    mobile: function () {
      this.$element.addClass('mobile-device');
    },

    refresh: function () {
      this.$lis = null;
      this.liObj = {};
      this.reloadLi();
      this.render();
      this.checkDisabled();
      this.liHeight(true);
      this.setStyle();
      this.setWidth();
      if (this.$lis) this.$searchbox.trigger('propertychange');

      this.$element.trigger('refreshed.bs.select');
    },

    hide: function () {
      this.$newElement.hide();
    },

    show: function () {
      this.$newElement.show();
    },

    remove: function () {
      this.$newElement.remove();
      this.$element.remove();
    },

    destroy: function () {
      this.$newElement.before(this.$element).remove();

      if (this.$bsContainer) {
        this.$bsContainer.remove();
      } else {
        this.$menu.remove();
      }

      this.$element
        .off('.bs.select')
        .removeData('selectpicker')
        .removeClass('bs-select-hidden selectpicker');
    }
  };

  // SELECTPICKER PLUGIN DEFINITION
  // ==============================
  function Plugin(option) {
    // get the args of the outer function..
    var args = arguments;
    // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
    // to get lost/corrupted in android 2.3 and IE9 #715 #775
    var _option = option;

    [].shift.apply(args);

    var value;
    var chain = this.each(function () {
      var $this = $(this);
      if ($this.is('select')) {
        var data = $this.data('selectpicker'),
            options = typeof _option == 'object' && _option;

        if (!data) {
          var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
          config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), $this.data().template, options.template);
          $this.data('selectpicker', (data = new Selectpicker(this, config)));
        } else if (options) {
          for (var i in options) {
            if (options.hasOwnProperty(i)) {
              data.options[i] = options[i];
            }
          }
        }

        if (typeof _option == 'string') {
          if (data[_option] instanceof Function) {
            value = data[_option].apply(data, args);
          } else {
            value = data.options[_option];
          }
        }
      }
    });

    if (typeof value !== 'undefined') {
      //noinspection JSUnusedAssignment
      return value;
    } else {
      return chain;
    }
  }

  var old = $.fn.selectpicker;
  $.fn.selectpicker = Plugin;
  $.fn.selectpicker.Constructor = Selectpicker;

  // SELECTPICKER NO CONFLICT
  // ========================
  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old;
    return this;
  };

  $(document)
      .data('keycount', 0)
      .on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (e) {
        e.stopPropagation();
      });

  // SELECTPICKER DATA-API
  // =====================
  $(window).on('load.bs.select.data-api', function () {
    $('.selectpicker').each(function () {
      var $selectpicker = $(this);
      Plugin.call($selectpicker, $selectpicker.data());
    })
  });
})(jQuery);


// jQuery Plugin: jKit
// A very easy to use, cross platform jQuery UI toolkit that's still small in size, has the features you need and doesn't get in your way.
// Version 1.1.21 - 20. 2. 2013
// http://jquery-jkit.com/
//
// by Fredi Bach
// http://fredibach.ch/jquery-plugins/

(function($, undefined) {
	
	$.jKit = function(element, options, moreoptions) {
		
		var defaults = {
			prefix: 'jkit',
			dataAttribute: 'data-jkit',
			activeClass: 'active',
			errorClass: 'error',
			successClass: 'success',
			ignoreFocus: false,
			ignoreViewport: false,
			keyNavigation: true,
			touchNavigation: true,
			plugins: {},
			replacements: {},
			delimiter: ',',
			macros: {
				'hide-if-empty': 'binding:selector=this;source=text;mode=css.display',
				'smooth-blink': 'loop:speed1=2000;duration1=250;speed2=250;duration2=2000'
			},
			commands: {
				'template': {
					'action': 			'set',
					'name':				'template',
					'dynamic': 			'no',
					'addhtml': 			'+'
				},
				'lightbox': {
					'speed': 			500,
					'opacity': 			0.7,
					'clearance': 		200,
					'closer': 			'x',
					'next': 			'>',
					'prev': 			'<',
					'modal': 			'no',
					'width': 			'',
					'height': 			'',
					'titleHeight': 		20,
					'group': 			''
				},
				'scroll': {
					'speed': 			500,
					'dynamic': 			'yes',
					'easing': 			'linear'
				},
				'hide': {
					'delay': 			0,
					'speed': 			500,
					'animation': 		'fade',
					'easing': 			'linear'
				},
				'remove': {
					'delay':			0
				},
				'show': {
					'delay':			0,
					'speed':			500,
					'animation':		'fade',
					'easing':			'linear'
				},
				'showandhide': {
					'delay':			0,
					'speed':			500,
					'duration':			10000,
					'animation':		'fade',
					'easing':			'linear'
				},
				'loop': {
					'speed1':			500,
					'speed2':			500,
					'duration1':		2000,
					'duration2':		2000,
					'easing1':			'linear',
					'easing2':			'linear',
					'animation':		'fade'
				},
				'random': {
					'count': 			1,
					'remove': 			'yes'
				},
				'partially': {
					'height':			200,
					'text':				'more ...',
					'speed':			250,
					'easing':			'linear'
				},
				'slideshow': {
					'shuffle':			'no',
					'interval':			3000,
					'speed':			250,
					'animation':		'fade',
					'easing':			'linear',
					'on': 				''
				},
				'animation': {
					'fps':				25,
					'loop':				'no',
					'from': 			'',
					'to': 				'',
					'speed': 			'500',
					'easing': 			'linear',
					'delay':			0,
					'on': 				''
				},
				'gallery': {
					'active':			1,
					'event':			'click',
					'showcaptions':		'yes',
					'animation':		'none',
					'speed':			500,
					'easing':			'linear',
					'lightbox': 		'no'
				},
				'tabs': {
					'active':			1,
					'animation':		'none',
					'speed':			250,
					'easing':			'linear'
				},
				'accordion': {
					'active':			1,
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear'
				},
				'carousel': {
					'autoplay': 		"yes",
					'limit': 			5,
					'animation':		'grow',
					'speed':			250,
					'easing':			'linear',
					'interval':			5000,
					'prevhtml':			'&lt;',
					'nexthtml':			'&gt;'
				},
				'parallax': {
					'strength':			5,
					'axis':				'x',
					'scope':			'global'
				},
				'form': {
					'validateonly':		'no'
				},
				'plugin': {
					'script': 			''
				},
				'tooltip': {
					'text':				'',
					'color':			'#fff',
					'background':		'#000',
					'classname':		''
				},
				'background': {
					'distort':			'no'
				},
				'lorem': {
					'paragraphs':		0,
					'length':			'',
					'random':			'no'
				},
				'binding': {
					'selector':			'',
					'source':			'val',
					'variable':			'',
					'mode':				'text',
					'interval':			100,
					'math':				'',
					'condition': 		'',
					'if':				'',
					'else':				'',
					'speed':			0,
					'easing':			'linear',
					'search': 			''
				},
				'limit': {
					'elements':			'children',
					'count':			5,
					'animation':		'none',
					'speed':			250,
					'easing':			'linear',
					'endstring':		'...'
				},
				'chart': {
					'max':				0,
					'delaysteps':		100,
					'speed':			500,
					'easing':			'linear'
				},
				'encode': {
					'format':			'code',
					'fix': 				'yes'
				},
				'split': {
					'separator': 		'',
					'container': 		'span',
					'before':			'',
					'after':			''
				},
				'live': {
					'interval': 		60
				},
				'key': {},
				'ajax': {
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear',
					'when': 			'click'
				},
				'replace': {
					'modifier': 		'g',
					'search': 			'',
					'replacement': 		''
				},
				'cycle': {
					'what': 			'class',
					'where': 			'li',
					'scope': 			'children',
					'sequence': 		'odd,even'
				},
				'fontsize': {
					'steps': 			2,
					'min': 				6,
					'max': 				72,
					'affected':			'p'
				},
				'swap': {
					'versions': 		'_off,_on'
				},
				'ticker': {
					'speed': 			100,
					'delay': 			2000
				},
				'sort': {
					'what': 			'text',
					'by': 				'',
					'start':			0,
					'end':				0
				},
				'zoom': {
					'scale': 			2,
					'speed': 			150,
					'lightbox':			'no'
				},
				'api': {
					'format': 			'json',
					'value': 			'',
					'url': 				'',
					'interval': 		-1,
					'template': 		''
				},
				'filter': {
					'by': 				'class',
					'affected': 		'',
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear',
					'logic': 			'and'
				},
				'summary': {
					'what': 			'',
					'linked': 			'yes',
					'from': 			'',
					'scope': 			'children'
				},
				'paginate': {
					'limit': 			'25',
					'by': 				'node',
					'container': 		'',
					'animation':		'none',
					'speed':			250,
					'easing':			'linear',
					'pos': 				'after'
				}
			}
		};
		
		var plugin = this;
		
		plugin.settings = {};
		
		var $element = $(element),
			element = element;
		
		if (typeof options == 'string'){
			var singlecommand = options;
			if (moreoptions == undefined){
				moreoptions = {};
			}
			options = moreoptions;
		}
		
		var startX, startY;
		var windowhasfocus = true;
		var uid = 0;
		var lightboxes = {};
		var templates = {};
		var commandkeys = {};
		
		if ($.support.htmlSerialize || $.support.opacity){
			$(window).focus(function() {
				windowhasfocus = true;
			}).blur(function() {
				windowhasfocus = false;
			});
		}
		
		plugin.applyMacro = function($el, macro){
			
			var s = plugin.settings;
			
			if (s.macros[macro] != undefined){
				var value = s.macros[macro];
				var options = plugin.parseOptions(value);
				
				if (s.replacements[options.type] != undefined && typeof(s.replacements[options.type]) === "function"){
					s.replacements[options.type].call(plugin, $el, options.type, options);
				} else {
					plugin.executeCommand($el, options.type, options);
				}
			}
		
		};
		
		plugin.init = function($el) {
			
			if ($el == undefined) $el = $element;
			
			plugin.settings = $.extend({}, defaults, options);
			var s = plugin.settings;
			
			if (singlecommand != undefined){
				
				plugin.executeCommand($el, singlecommand, options);
			
			} else {
				
				$el.find("*[rel^=jKit], *["+s.dataAttribute+"]").each( function(){
					
					var that = this;
					
					var rel = $(this).attr('rel');
					var data = $(this).attr(s.dataAttribute);
					
					if (data != undefined){
						rel = $.trim(data).substring(1);
					} else {
						rel = $.trim(rel).substring(5);
					}
					rel = rel.substring(0, rel.length-1);
					rel = rel.replace(/\]\s+\[/g, "][");
					relsplit = rel.split('][');
					
					$.each( relsplit, function(index, value){
						
						value = value
									.replace(/\\=/g,'|jkit-eq|')
									.replace(/\\:/g,'|jkit-dp|')
									.replace(/\\;/g,'|jkit-sc|')
									.replace(/\\\[/g,'|jkit-sbo|')
									.replace(/\\\]/g,'|jkit-sbc|')
									.replace(/\\\*/g,'|jkit-st|')
									.replace(/\\ /g,'|jkit-sp|');
						
						value = $.trim(value);
						
						if (s.macros[value] != undefined) value = s.macros[value];
						
						var options = plugin.parseOptions(value);
						
						if (s.macros[options.type] != undefined){
							var macrooptions = plugin.parseOptions(s.macros[options.type]);
							options.type = macrooptions.type;
							options = $.extend({}, macrooptions, options);
						}
						
						if (options.type == 'macro' && relsplit[index-1] != undefined){
							
							plugin.settings.macros[options.name] = relsplit[index-1];
						
						} else if (options.type == 'repeat' && relsplit[index-1] != undefined){
							
							var prevoptions = plugin.parseOptions(relsplit[index-1]);
							
							$el.on( options.onevent, function(){
								if (options.delay == undefined) options.delay = 0;
								setTimeout( function(){
									plugin.executeCommand($(that), prevoptions.type, prevoptions);
								}, options.delay);
							});
						
						} else {
							
							var targets = [];
							if (options.target != undefined){
								
								var targetsplit = options.target.split('.');
								targetsplit = [targetsplit.shift(), targetsplit.join('.')]
								if (targetsplit[1] == undefined){
									targetsplit[1] = '*';
								}
								
								switch(targetsplit[0]){
									case 'children':
										$(that).children(targetsplit[1]).each( function(){
											targets.push(this);
										});
										break;
									case 'each':
										$(that).find(targetsplit[1]).each( function(){
											targets.push(this);
										});
										break;
									default:
										targets.push(that);
								}
							} else {
								targets.push(that);
							}
							
							$.each( targets, function(i,v){
								
								var thisoptions = plugin.parseDynamicOptions(options);
								
								if (thisoptions.commandkey == undefined){
									var id = $(v).attr("id");
									if (id != undefined){
										thisoptions.commandkey = id;
									} else {
										thisoptions.commandkey = s.prefix+'-uid-'+(++uid);
									}
								}
								
								if (thisoptions.commandkey != undefined){
									commandkeys[thisoptions.commandkey] = {
										'el': v,
										'options': thisoptions,
										'execs': 0
									};
								}
								
								if (thisoptions.onevent !== undefined || thisoptions.andonevent !== undefined){
									
									var events = [];
									if (thisoptions.onevent !== undefined) events.push(thisoptions.onevent);
									if (thisoptions.andonevent !== undefined) events.push(thisoptions.andonevent);
									var e = events.join(' ');
									
									$el.on( e, function(){
										if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function"){
											s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
										} else {
											plugin.executeCommand(v, thisoptions.type, thisoptions);
										}
									});
								
								}
								
								if (thisoptions.onevent === undefined){
									
									if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function"){
										s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
									} else {
										plugin.executeCommand(v, thisoptions.type, thisoptions);
									}
								
								}
							
							});
						
						}
					
					});
				
				});
			
			}
		
		};
		
		plugin.parseOptions = function(string){
			
			var relsplit = string.split(':');
			var commandsplit = relsplit[0].split('.');
			
			var options = { 'type': $.trim(commandsplit[0]) };
			
			if (commandsplit[1] !== undefined){
				options['commandkey'] = commandsplit[1];
			}
			
			if (options.execute == undefined){
				options.execute = 'always';
			}
			
			if (relsplit.length > 1){
				var optionssplit = relsplit[1].split(';');
				
				$.each( optionssplit, function(key, value){
					var optionssplit2 = value.split('=');
					options[$.trim(optionssplit2[0])] = $.trim(optionssplit2[1]);
				});
			}
			
			return options;
		
		};
		
		plugin.parseDynamicOptions = function(options){
			
			var parsedoptions = {};
			
			for (index in options){
				var v = options[index];
				
				if (v !== undefined && v.indexOf("{") > -1 && v.indexOf("|") > 0 && v.indexOf("}") > 1){
					
					var option = '';
					var dyn = false;
					var dynstr = '';
					var parse = false;
					
					for (var i=0; i<=(v.length-1);i++){
						
						if (!dyn && v.charAt(i) == '{'){
							dyn = true;
						} else if (dyn && v.charAt(i) == '}'){
							dyn = false;
							parse = true;
						}
						
						if (dyn || parse){
							dynstr += v.charAt(i);
							if (parse){
								dynstr = dynstr.slice(1, -1);
								var dynsplit = dynstr.split('|');
								
								if (dynsplit[0] == 'rand'){
									var valsplit = dynsplit[1].split('-');
									option += plugin.getRandom(Number(valsplit[0]), Number(valsplit[1]));
								}
								
								parse = false;
								dynstr = '';
							}
						} else {
							option += v.charAt(i);
						}
						
					}
					
					parsedoptions[index] = option;
					
				} else {
					parsedoptions[index] = v;
				}
			}
			
			return parsedoptions;
		}
		
		plugin.getRandom = function(min, max) {
			if(min > max) {
				return -1;
			}
			
			if(min == max) {
				return min;
			}
			
			var r;
			do {
				r = Math.random();
			}
			while(r == 1.0);
			
			return min + parseInt(r * (max-min+1));
		}
		
		plugin.findElementTag = function($container, selector, pos, defaultval){
			
			var output = '';
			
			if ( pos !== undefined && !isNaN(pos) && parseInt(pos) == pos ){
				if ($container.find(selector).length > pos){
					output = $($container.find(selector).get(pos)).prop('tagName');
				}
			} else { 
				
				var tags = {};
				
				$container.find(selector).each( function(i){
					if (i < 25){
						var tag = $(this).prop('tagName');
						if (tag[0] != ''){
							if (tags[tag] !== undefined){
								tags[tag]++;
							} else {
								tags[tag] = 1;
							}
						}
					} else {
						return false;
					}
				});
				
				var max = 0;
				var maxkey = '';
				for (var key in tags){
					if (tags[key] > max){
						max = tags[key];
						maxkey = key;
					}
				}
				output = maxkey;
			}
			
			if (output !== undefined && output != ''){
				return output;
			} else {
				return defaultval;
			}
			
		};
		
		plugin.addDefaults = function(command, options){
			
			if (plugin.settings.commands[command] != undefined){
				var c = plugin.settings.commands[command];
				
				$.each(c, function(i, v){
					if (options[i] == undefined) options[i] = v;
					if (i.indexOf('speed') > -1) options[i] = plugin.fixSpeed(options[i]);
				});
			}
			
			return options;
		};
		
		plugin.executeCommand = function(that, type, options){
			
			var s = plugin.settings;
			var $that = $(that);
			
			$element.trigger('jkit-commandinit', { 'element': $that, 'type': type, 'options': options });
			
			if (options.commandkey !== undefined){
				commandkeys[options.commandkey]['execs']++;
				if ((options.execute == 'once' && commandkeys[options.commandkey]['execs'] > 1) || (!isNaN(options.execute) && commandkeys[options.commandkey]['execs'] > options.execute)){
					return $that;
				}
			}
			
			options = plugin.addDefaults(type, options);
			
			$.each( options, function(i,v){
				
				if (typeof v == 'string'){
					options[i] = v = v
						.replace(/\|jkit\-eq\|/g,'=')
						.replace(/\|jkit\-dp\|/g,':')
						.replace(/\|jkit\-sc\|/g,';')
						.replace(/\|jkit\-sbo\|/g,'[')
						.replace(/\|jkit\-sbc\|/g,']')
						.replace(/\|jkit\-st\|/g,'*')
						.replace(/\|jkit\-sp\|/g,' ');
				}
				
				if (typeof v == 'string' && v.slice(-1) == '*'){
					options[i] = window[v.slice(0, -1)];
					if (typeof options[i] == 'function'){
						options[i] = options[i].call(that);
					}
				}
			});
			
			switch(type){
				case 'paginate':
					
					if (options.container != ''){
						var $container = $that.find(options.container);
					} else {
						var $container = $that;
					}
					
					if ($that.attr('id') !== undefined){
						var paginateid = s.prefix+'-'+type+'-'+$that.attr('id');
					} else {
						var paginateid = s.prefix+'-'+type+'-uid-'+(++uid);
					}
					
					var pages = [];
					var page = [];
					
					if (options.by == 'node'){
						
						var cnt = 1;
						
						$container.children().each( function(){
							
							cnt++;
							page.push($(this).detach());
							
							if (cnt > Number(options.limit)){
								cnt = 1;
								pages.push(page);
								page = [];
							}
							
						});
						
					} else {
						
						var height = 0;
						
						$container.children().each( function(){
							
							height += $(this).outerHeight();
							
							if (height > Number(options.limit)){
								height = $(this).outerHeight();
								if (page.length > 0){
									pages.push(page);
								}
								page = [];
							}
							
							page.push($(this).detach());
							
						});
						
					}
					
					if (page.length > 0){
						pages.push(page);
					}
					
					if (pages.length > 1){
						
						var $pagination = $('<ul/>', { 'id': paginateid, 'class': s.prefix+'-pagination' });
						
						$.each( pages, function(i,v){
							
							var $pnav = $('<li/>').html(i+1).on( 'click', function(){
								
								plugin.triggerEvent('showpage showpage'+(i+1), $that, options);
								
								$pagination.find('li').removeClass(s.activeClass);
								$(this).addClass(s.activeClass);
								
								$container.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
									$container.html('');
									$.each(v, function(index, value){
										value.clone().appendTo($container);
									});
									$container.jKit_effect(true, options.animation, options.speed, options.easing, 0);
								});
								
							});
							
							if (i == 0){
								$pnav.addClass(s.activeClass);
							}
							$pnav.appendTo($pagination);
							
						});
						
						if (options.pos == 'after'){
							$pagination.insertAfter($that);
						} else {
							$pagination.insertBefore($that);
						}
						
						$container.html('');
						$.each(pages[0], function(index, value){
							value.clone().appendTo($container);
						});
						
					}
					
					break;
					
				case 'filter':
					
					plugin.filterElements($that, options);
					
					$that.find('.jkit-filter').on( 'change click', function(){
						plugin.triggerEvent('clicked', $that, options);
						plugin.filterElements($that, options);
					});
					
					break;
					
				case 'summary':
					
					var output = '';
					
					var pre = ''
					if (options.scope == 'children'){
						pre = '> ';
					}
					
					$(options.from).find(pre+options.what).each( function(){
						
						var $current = $(this);
						
						if (options.linked == 'yes'){
							
							if ($current.attr('id') !== undefined){
								var id = $current.attr('id');
							} else {
								var id = s.prefix+'-uid-'+(++uid);
								$current.attr('id', id);
							}
							
							output += '<li><a href="#'+id+'">'+$(this).text()+'</a></li>';
						
						} else {
							output += '<li>'+$(this).text()+'</li>';
						}
					});
					
					if (output != ''){
						$that.html('<ul>'+output+'</ul>');
					}
					
					break;
					
				case 'api':
					
					if (options.url != ''){
						plugin.readAPI($that, options);
					}
					
					break;
					
				case 'zoom':
					
					$that.parent().css('position', 'relative');
					
					$that.on( 'mouseover', function(){
						
						var pos = $that.position();
						var height = $that.height();
						var width = $that.width();
						
						$zoom = $('<div/>', {
							'class': s.prefix+'-'+type+'-overlay'
						}).css( {
							'position': 'absolute',
							'height': height+'px',
							'width': width+'px',
							'left': pos.left + 'px',
							'top': pos.top + 'px',
							'overflow': 'hidden',
							'background-image': 'url('+$that.attr('src')+')',
							'background-repeat': 'no-repeat',
							'background-color': '#000',
							'opacity': 0
						}).on( 'mouseout', function(){
							$zoom.fadeTo(options.speed, 0, function(){
								$zoom.remove();
								plugin.triggerEvent('zoomout', $that, options);
							});
						}).mousemove(function(e){
							
							var offset = $(this).offset();
							
							var x = (e.pageX - offset.left) * (options.scale-1);
							var y = (e.pageY - offset.top) * (options.scale-1);
							
							$zoom.css('background-position', '-'+x+'px -'+y+'px');
						
						}).fadeTo(options.speed, 1, function(){
							plugin.triggerEvent('zoomin', $that, options);
						}).insertAfter($that);
						
						if (options.lightbox == 'yes'){
							plugin.executeCommand($zoom, 'lightbox', {});
						}
					
					});
					
					break;
					
				case 'sort':
					
					var text = $that.text();
					var index = $that.parent().children().index($that);
					
					$that.on('click', function(){
						
						plugin.triggerEvent('clicked', $that, options);
						
						var rows = [];
						$that.parent().parent().parent().find('tbody > tr').each( function(){
							
							var $td = $(this).find('td:nth-child('+(index+1)+')');
							
							switch(options.what){
								case 'html':
									var str = $td.html();
									break;
								case 'class':
									var str = $td.attr('class');
									break;
								default:
									var str = $td.text();
									break;
							}
							
							if (options.start > 0 || options.end > 0){
								if (options.end > options.start){
									str = str.substring(options.start, options.end);
								} else {
									str = str.substring(options.start);
								}
							}
							
							rows.push({ 'content': $(this).html(), 'search': str });
						
						});
						
						if ($that.hasClass(s.prefix+'-'+type+'-down')){
							$that.parent().find('th').removeClass(s.prefix+'-'+type+'-down').removeClass(s.prefix+'-'+type+'-up');
							$that.addClass(s.prefix+'-'+type+'-up');
							rows.sort( function(a,b){
								if (options.by == 'num'){
									a.search = Number(a.search);
									b.search = Number(b.search);
								}
								if (options.by == 'date'){
									var a = new Date(a.search);
									var b = new Date(b.search);
									return (a.getTime() - b.getTime());
								} else {
									if (a.search > b.search) return -1;
									if (a.search < b.search) return 1;
									return 0;
								}
							});
						} else {
							$that.parent().find('th').removeClass(s.prefix+'-'+type+'-down').removeClass(s.prefix+'-'+type+'-up');
							$that.addClass(s.prefix+'-'+type+'-down');
							rows.sort( function(a,b){
								if (options.by == 'num'){
									a.search = Number(a.search);
									b.search = Number(b.search);
								}
								if (options.by == 'date'){
									var a = new Date(a.search);
									var b = new Date(b.search);
									return (b.getTime() - a.getTime());
								} else {
									if (a.search < b.search) return -1;
									if (a.search > b.search) return 1;
									return 0;
								}
							});
						}
						
						var $body = $that.parent().parent().parent().find('tbody');
						$body.html('');
						
						var tbody = '';
						$.each( rows, function(i,v){
							tbody += '<tr>'+v.content+'</tr>';
						});
						
						$body.html(tbody);
						
						plugin.triggerEvent('complete', $that, options);
					
					});
					
					break;
					
				case 'ticker':
					
					var messages = [];
					
					var containerTag = plugin.findElementTag($that, '>', 'max', 'li');
					
					$that.find(containerTag).each( function(){
						messages.push({
							'href': $(this).find('a').attr('href'),
							'target': $(this).find('a').attr('target'),
							'text': $(this).text()
						});
					});
					
					if (messages.length > 0){
						var $newThat = $('<div/>');
						$that.replaceWith($newThat);
						window.setTimeout( function() { plugin.ticker($newThat, options, messages, 0, 0); }, 0);
					}
					
					break;
					
				case 'swap':
					
					var atribute = 'src';
					
					var versions = options.versions.split(s.delimiter);
					
					var original = $that.attr(atribute);
					var replacement = $that.attr(atribute).replace(versions[0],versions[1]);
					
					$('<img/>')[0].src = replacement;
					
					$that.mouseenter(function(){
						$that.attr(atribute, replacement );
						plugin.triggerEvent('active', $that, options);
					}).mouseleave(function(){
						$that.attr(atribute, original );
						plugin.triggerEvent('inactive', $that, options);
					});
					
					break;
					
				case 'fontsize':
					
					var cssoption = 'font-size';
					
					$that.on( 'click', function(){
						
						$element.find(options.affected).each( function(){
							
							var newsize = parseInt($(this).css(cssoption)) + parseInt(options.steps);
							
							if (newsize >= parseInt(options.min) && newsize <= parseInt(options.max) ){
								$(this).css(cssoption, newsize );
							}
						
						});
						
						plugin.triggerEvent('changed', $that, options);
						
						return false;
					});
					
					break;
					
				case 'cycle':
					
					var seq = options.sequence.split(s.delimiter);
					var pos = 0;
					
					var sel = options.where;
					if (options.scope == 'children'){
						sel = '> '+sel;
					}
					
					$that.find(sel).each( function(){
						if (seq[pos] != undefined && seq[pos] != ''){
							switch(options.what){
								case 'class':
									$(this).addClass(seq[pos]);
									break;
								case 'html':
									$(this).html(seq[pos]);
									break;
								default:
									var what = options.what.split('.');
									if (what[0] == 'attr'){
										$(this).attr(what[1], seq[pos]);
									} else if (what[0] == 'css'){
										$(this).css(what[1], seq[pos]);
									}
							}
						}
						pos++;
						if (pos > seq.length-1) pos = 0;
					});
					
					break;
					
				case 'replace':
					
					var str = new RegExp(options.search, options.modifier);
					$that.html($that.html().replace(str,options.replacement));
					
					break;
					
				case 'ajax':
					
					if (options.href != undefined && options.href != ''){
						var href = options.href;
					} else {
						var href = $that.attr('href');
					}
					
					if (options.when == 'load' || options.when == 'viewport'){
						if (options.when == 'load'){
							$that.load(href, function(){
								plugin.triggerEvent('complete', $that, options);
							});
						} else {
							var myInterval = setInterval(function(){
								if ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport){
									if (options.src != undefined){
										$that.attr('src', options.src);
										plugin.triggerEvent('complete', $that, options);
									} else {
										$that.load(href, function(){
											plugin.triggerEvent('complete', $that, options);
										});
									}
									window.clearInterval(myInterval);
								}
							},100);
						}
					} else {
						$that.on('click', function(){
							plugin.loadAndReplace(href, options, $that);
							return false;
						});
					}
					
					break;
					
				case 'key':
					
					if (options.code != undefined){
						
						plugin.addKeypressEvents($that, options.code);
						$that.on( options.code, function(){
							if ($that.attr('onclick') !== undefined){
								$that.click();
							} else {
								if ($that.attr('target') !== undefined && $that.attr('target') == '_blank'){
									window.open($that.attr('href'), '_blank', false);
								} else {
									window.location.href = $that.attr('href');
								}
							}
							if (options.macro != undefined) plugin.applyMacro($that, options.macro);
							plugin.triggerEvent('pressed', $that, options);
						});
					
					}
					
					break;
					
				case 'live':
					
					if ($that.attr('src') !== undefined) {
						window.setInterval( function() {
							plugin.updateSrc($that, options);
							plugin.triggerEvent('reloaded', $that, options);
						}, options.interval*1000);
					}
					
					break;
					
				case 'split':
					
					var parts = $that.text().split(options.separator);
					$that.html('');
					
					$.each( parts, function(i,v){
						$('<'+options.container+'/>').text(v).appendTo($that);
					});
					
					$that.html(options.before+$that.html()+options.after);
					
					break;
					
				case 'encode':
					
					switch(options.format) {
						case 'code':
							var src = $that.html();
							if (options.fix == 'yes'){
								src = plugin.preFix(src);
							}
							$that.html(src.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
							break;
						case 'text':
							$that.html($that.text());
							break;
						case 'esc':
							$that.html(escape($that.html()));
							break;
						case 'uri':
							$that.html(encodeURI($that.html()));
							break;
					}
					
					break;
					
				case 'chart':
					
					var label = $that.find('thead > tr > th.label').text();
					var id = $that.attr('id');
					
					var datalabels = [];
					
					$that.find('thead > tr > th').each( function(){
						if (!$(this).hasClass('label')){
							datalabels.push( $(this).text() );
						}
					});
					
					var max = 0;
					
					var plots = [];
					$that.find('tbody tr').each( function(){
						var plot = { 'label': $(this).find('th.label').text(), 'data': [] };
						$(this).find('th').each( function(){
							if (!$(this).hasClass('label')){
								var val = Number($(this).text());
								max = Math.max(val, max);
								plot.data.push(val);
							}
						});
						plots.push(plot);
					});
					
					if (options.max > 0 && max < options.max){
						max = options.max;
					}
					
					var $chart = $('<div/>', {
						id: id,
						'class': s.prefix+'-'+type
					});
					
					var steps = 0;
					
					var delay = 0;
					$.each(datalabels, function(i,v){
						
						steps++;
						var $step = $('<div/>', { 'class': s.prefix+'-'+type+'-step' }).html('<label>'+v+'</label>').appendTo($chart);
						
						$.each( plots, function(i2,v2){
							
							if (plots[i2].data[i] > 0){
								
								var $plot = $('<div/>', { 'class': s.prefix+'-'+type+'-plot '+s.prefix+'-'+type+'-plot'+i2 }).appendTo($step);
								
								$('<div/>')
									.text(plots[i2].label)
									.delay(delay)
									.animate({ 'width': (plots[i2].data[i]/max*100)+'%' }, options.speed, options.easing)
									.appendTo($plot);
								
								$('<span/>', { 'class': s.prefix+'-'+type+'-info' })
									.text(label+' '+plots[i2].label+': '+plots[i2].data[i]+' '+options.units)
									.appendTo($plot);
							
							}
						
						});
						
						if (steps == datalabels.length){
							setTimeout( function(){
								plugin.triggerEvent('complete', $that, options);
							}, options.speed+delay);
						}
						
						delay += Number(options.delaysteps);
					});
					
					$that.replaceWith($chart);
					
					break;
					
				case 'lightbox':
					
					var src = '';
					if ($that.attr('href') !== undefined) src = $that.attr('href');
					if (src == '' && $that.attr('src') !== undefined) src = $that.attr('src');
					if (src == '' && $that.css('background-image') !== undefined){
						src = $that.css('background-image').replace('"','').replace('"','').replace('url(','').replace(')','');
					}
					
					if (src != ''){
					
						if (options.group != ''){
							if (lightboxes[options.group] == undefined){
								lightboxes[options.group] = [];
							}
							lightboxes[options.group].push(that);
						}
					
						$that.click(function() {
							
							plugin.triggerEvent('clicked', $that, options);
						
							if (options.modal == 'no'){
								var $overlay = $('<div/>', {
									id: s.prefix+'-'+type+'-bg',
									'class': s.prefix+'-'+type+'-closer '+s.prefix+'-'+type+'-el'
								}).fadeTo(options.speed, options.opacity).appendTo('body');
							}
						
							var $content = $('<div/>', {
								id: s.prefix+'-'+type+'-content',
								'class': s.prefix+'-'+type+'-el'
							}).fadeTo(0,0.01).appendTo('body');
						
							if ($.fn.jKit_iOS()) $content.css('top', $(window).scrollTop()+'px');
						
							if (options.width != ''){
								$content.css({ 'width': options.width });
								$content.css({ 'left': (($(window).width() - $content.outerWidth()) / 2) + 'px' });
							}
							if (options.height != ''){
								$content.css({ 'height': options.height });
								$content.css({ 'top': (($(window).height() - $content.outerHeight()) / 2) + 'px' });
							}
						
							var $nav = $('<div/>', {
								id: s.prefix+'-'+type+'-nav',
								'class': s.prefix+'-'+type+'-el'
							}).hide().fadeTo(options.speed, 1).appendTo('body');
						
							var $closer = $('<span/>', {
								'class': s.prefix+'-'+type+'-closer'
							}).html(options.closer).prependTo($nav);
						
							var offset = $content.offset();
						
							$nav.css({
								'top': (offset.top-options.titleHeight-$(window).scrollTop())+'px',
								'left': (offset.left+$content.outerWidth()-$nav.width())+'px'
							});
						
							if (options.group != ''){
								var $next = $('<span/>', {
									id: s.prefix+'-'+type+'-nav-next'
								}).prependTo($nav);
							
								var $prev = $('<span/>', {
									id: s.prefix+'-'+type+'-nav-prev'
								}).prependTo($nav);
							
								plugin.addKeypressEvents($next, 'right');
								plugin.addKeypressEvents($prev, 'left');
							
								if (lightboxes[options.group][lightboxes[options.group].length-1] != that){
									$next.html(options.next).on( 'click right', function(){
										$.each(lightboxes[options.group], function(i,v){
											if (v == that){
												$('.'+plugin.settings.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
													$(this).remove();
												});
												lightboxes[options.group][i+1].click();
											}
										});
									});
								}
								if (lightboxes[options.group][0] != that){
									$prev.html(options.prev).on( 'click left', function(){
										$.each(lightboxes[options.group], function(i,v){
											if (v == that){
												$('.'+plugin.settings.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
													$(this).remove();
												});
												lightboxes[options.group][i-1].click();
											}
										});
									});
								}
							}
						
							$title = $('<div/>', {
								id: s.prefix+'-'+type+'-title',
								'class': s.prefix+'-'+type+'-el'
							}).css({
								'top': (offset.top-options.titleHeight-$(window).scrollTop())+'px',
								'left': (offset.left)+'px',
								'width': $content.width()+'px'
							}).hide().text($that.attr('title')).fadeTo(options.speed, 1).appendTo('body');
							
							if (!$.support.leadingWhitespace){
								src = src+ "?" + new Date().getTime();
							}
							
							var img = new Image();
							$(img)
								.load(function () {
								
									var scalex = ($(this).outerWidth() + options.clearance) / $(window).width();
									var scaley = ($(this).outerHeight() + options.clearance) / $(window).height();
									var scale = Math.max(scalex,scaley);
									if (scale > 1){
										var oh = $(this).height();
										$(this).width($(this).width() / scale);
										$(this).height(oh / scale);
									}
									
									var xmargin = ( $(window).width() - $(this).outerWidth() ) / 2;
									var ymargin = ( $(window).height() - $(this).outerHeight() ) / 2;
									
									$content
										.width($(this).width())
										.height($(this).height())
										.css({ 'left': xmargin+'px', 'top': ymargin+'px' })
										.fadeTo(options.speed, 1);
									$(this).hide().fadeTo(options.speed, 1);
									
									if ($that.attr('title') != ''){
										$title.css({
											'top': (ymargin-options.titleHeight)+'px',
											'left': xmargin+'px',
											'width': $(this).width()+'px'
										});
									}
								
									$nav.css({
										'top': (ymargin-options.titleHeight)+'px',
										'left': (xmargin+$content.outerWidth()-$nav.width())+'px'
									});
							
								})
								.attr('src', src)
								.appendTo($content)
								.error(function(){
									$content.html('<iframe id="'+s.prefix+'-'+type+'-iframe" src="'+src+'" style="border:none;width:100%;height:100%"></iframe>').fadeTo(options.speed, 1);
								});
						
							$('.'+s.prefix+'-'+type+'-closer').click(function(){
								$('.'+s.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
									$(this).remove();
								});
							});
						
							return false;
					
						});
						
					}
					
					break;
					
				case 'scroll':
					
					$that.click(function() {
						
						plugin.triggerEvent('clicked', $that, options);
						
						if ($(this).attr("href") == ''){
							var ypos = 0;
						} else {
							var ypos = $($that.attr("href")).offset().top;
						}
						
						if (options.dynamic == 'yes'){
							options.speed = Math.abs($(document).scrollTop() - ypos) / 1000 * options.speed;
						}
						
						$('html, body').animate({ scrollTop: ypos+'px' }, options.speed, options.easing, function(){
							plugin.triggerEvent('complete', $that, options);
						});
						
						return false;
						
					});
					
					break;
					
				case 'hide':
					
					$that.jKit_effect(false, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('complete', $that, options);
					});
					
					break;
					
				case 'remove':
					
					$that.delay(options.delay).hide(0, function(){
						$that.remove();
						plugin.triggerEvent('complete', $that, options);
					});
					
					break;
					
				case 'show':
					
					$that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('complete', $that, options);
					});
					
					break;
					
				case 'showandhide':
					
					$that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('shown', $that, options);
						$that.jKit_effect(false, options.animation, options.speed, options.easing, options.duration, function(){
							plugin.triggerEvent('complete', $that, options);
						});
					});
					
					break;
					
				case 'loop':
					
					plugin.loop($that.hide(), options);
					
					break;
					
				case 'random':
					
					var childs = $that.children().size();
					var shownrs = [];
					
					while(shownrs.length < options.count){
						var shownr = Math.floor(Math.random() * childs);
						if ($.inArray(shownr, shownrs) == -1){
							shownrs.push(shownr);
						}
					}
					
					var i = 0;
					$that.children().each( function(){
						if ($.inArray(i, shownrs) == -1){
							if (options.remove == 'yes'){
								$(this).remove();
							} else {
								$(this).hide();
							}
						} else {
							$(this).show();
						}
						i++;
					});
					
					break;
					
				case 'partially':
					
					var originalHeight = $that.height();
					
					if (originalHeight > options.height){
					
						$that.css('position', 'relative');
					
						var $morediv = $('<div/>').addClass(s.prefix+'-morediv').appendTo(that).html(options.text).css( { width: $that.outerWidth()+'px', opacity: 0.9 });
					
						plugin.addKeypressEvents($that, 'down');
					
						$that.css({ 'height': options.height+'px', 'overflow': 'hidden' }).on( 'mouseenter down', function() {
							$morediv.fadeTo(options.speed, 0);
							$that.animate({ 'height': originalHeight+'px' }, options.speed, options.easing, function(){
								plugin.triggerEvent('open', $that, options);
							});
						}).on( 'mouseleave up',  function(){
							$morediv.fadeTo(options.speed, 0.9);
							$that.animate({ 'height': options.height+'px' }, options.speed, options.easing, function(){
								plugin.triggerEvent('closed', $that, options);
							});
						});
					
						$morediv.on('click', function(){
							$that.animate({ 'height': originalHeight+'px' }, options.speed, options.easing, function(){
								plugin.triggerEvent('closed', $that, options);
							});
						});
						
					}
					
					break;
					
				case 'slideshow':
					
					var slides = $that.children();
					
					if (options.shuffle == 'yes'){
						var tmp, rand;
						var slidecount = slides.length;
						for(var i =0; i < slidecount; i++){
							rand = Math.floor(Math.random() * slidecount);
							tmp = slides[i];
							slides[i] = slides[rand];
							slides[rand] = tmp;
						}
					}
					
					$that.css( { 'position': 'relative' } );
					
					$that.html(slides[0]);
					$.data($that, 'animating', false);
					
					if (options.on != ''){
						
						if (options.on == 'mouseover'){
							$that.on( 'mouseleave', function(){
								$.data($that, 'anim', false);
							});
						}
						
						$that.on( options.on, function(){
							if (options.on == 'click'){
								if ($.data($that, 'anim')){
									$.data($that, 'anim', false);
								} else {
									$.data($that, 'anim', true);
									window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, 0);
								}
							} else if (options.on == 'mouseover'){
								if (!$.data($that, 'anim')){
									$.data($that, 'anim', true);
									window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, 0);
								}
							}
						});
					
					} else {
						$.data($that, 'anim', true);
						window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, options.interval);
					}
					
					break;
					
				case 'carousel':
					
					var cnt = 0;
					
					$that.children().each( function(){
						cnt++;
						if (cnt > options.limit){
							$(this).hide();
						}
					});
					
					var $prevdiv = $('<a/>', {
						'class': s.prefix+'-'+type+'-prev'
					}).html(options.prevhtml).on( 'click left', function(){
						plugin.carousel($that, options, 'prev');
					}).insertAfter(that);
					
					var $nextdiv = $('<a/>', {
						'class': s.prefix+'-'+type+'-next'
					}).html(options.nexthtml).on( 'click right', function(){
						plugin.carousel($that, options, 'next');
					}).insertAfter(that);
					
					plugin.addKeypressEvents($prevdiv, 'left');
					plugin.addKeypressEvents($nextdiv, 'right');
					
					if (options.autoplay == 'yes'){
						window.setTimeout( function() { plugin.carousel($that, options); }, options.interval);
					}
					
					break;
					
				case 'animation':
					
					if (options.to != ''){
						
						if (options.from != ''){
							$that.css( plugin.cssFromString(options.from) );
						}
						
						setTimeout(function() {
							if (options.on != ''){
								$that.on( options.on, function(){
									$that.animate( plugin.cssFromString(options.to), options.speed, options.easing, function(){
										if (options.macro != undefined) plugin.applyMacro($that, options.macro);
										plugin.triggerEvent('complete', $that, options);
									});
								});
							} else {
								$that.animate( plugin.cssFromString(options.to), options.speed, options.easing, function(){
									if (options.macro != undefined) plugin.applyMacro($el, options.macro);
									plugin.triggerEvent('complete', $that, options);
								});
							}
						}, options.delay);
					
					} else {
						
						options.interval = 1000 / options.fps;
						
						var frames = [];
						
						var pos = 0;
						var lastframe = 0;
						
						$that.children().each( function(){
							var rel = $(this).attr('rel');
							var data = $(this).attr(s.dataAttribute);
							
							if (data != undefined){
								var start = data.indexOf('[');
								var end = data.indexOf(']');
								var optionstring = data.substring(start+1, end);
							} else {
								var start = rel.indexOf('[');
								var end = rel.indexOf(']');
								var optionstring = rel.substring(start+1, end);
							}
							
							var frame = plugin.parseOptions(optionstring);
							
							frame.el = $(this);
							if (frame.easing == undefined) frame.easing = 'linear';
							
							frame.start = pos;
							pos += parseInt(frame.steps);
							frame.end = pos;
							lastframe = pos;
							pos++;
							
							frames.push(frame);
						});
						
						options.lastframe = lastframe;
						
						$that.css('overflow', 'hidden');
						
						$that.html(frames[0].el);
						
						window.setTimeout( function() { plugin.animation(frames, -1, $that, options); }, 0);
					
					}
					
					break;
					
				case 'gallery':
					
					var images = $that.children();
					
					$that.html($that.children(':nth-child('+options.active+')').clone());
					
					if (options.lightbox == 'yes'){
						plugin.executeCommand($that.find('img'), 'lightbox', {});
					}
					
					var $thumbdiv = $('<div/>', {
						id: s.prefix+'-'+$that.attr('id')+'-'+type+'-thumbs'
					}).addClass(s.prefix+'-'+type+'-thumbs').insertAfter(that);
					
					if (options.showcaptions == 'yes'){
						var $captiondiv = $('<div/>', {
							id: s.prefix+'-'+$that.attr('id')+'-'+type+'-captions'
						}).addClass(s.prefix+'-'+type+'-captions').text($(images[options.active-1]).attr('title')).insertAfter(that);
					}
					
					$.each( images, function(index, value){
						
						if (options.event != 'click' && options.lightbox == 'yes'){
							plugin.executeCommand($(value), 'lightbox', { 'group': s.prefix+'-'+$that.attr('id')+'-'+type });
						}
						
						if (options.active-1 == index){
							$(value).addClass(s.activeClass);
						}
						
						$(value)
							.on( options.event, function() {
								
								plugin.triggerEvent('hideentry', $that, options);
								
								$that.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
									$that.find('img').attr('src', $(value).attr('src'));
									
									if (options.lightbox == 'yes'){
										plugin.executeCommand($that.find('img').unbind('click'), 'lightbox', {});
									}
									
									plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
									
									$that.jKit_effect(true, options.animation, options.speed, options.easing, 0);
									$thumbdiv.find('img').removeClass(s.activeClass);
									$(value).addClass(s.activeClass);
									
									if (options.showcaptions == 'yes'){
										$captiondiv.text($(value).attr('title'));
									}
								});
									
							})
							.css({ 'cursor': 'pointer' })
							.appendTo($thumbdiv);
					});
					
					break;
					
				case 'tabs':
				
					var containerTag = plugin.findElementTag($that, '>', 'max', 'div');
					var titleTag = plugin.findElementTag($that, '> '+containerTag+' >', 0, 'h3');
					var contentTag = plugin.findElementTag($that, '> '+containerTag+' >', 1, 'div');
					
					var tabs = [];
					$that.children(containerTag).each( function(){
						tabs.push({ 'title': $(this).children(titleTag).html(), 'content': $(this).children(contentTag).detach() });
					});
					
					$that.html('');
					var $tabnav = $('<ul/>', { }).appendTo(that);
					
					var $tabcontent = $;
					
					$.each( tabs, function(index, value){
						var $litemp = $('<li/>', { }).html(value.title).css('cursor', 'pointer').appendTo($tabnav);
						if (options.active-1 == index){
							$litemp.addClass(s.activeClass);
						}
						$litemp.on( 'click', function(){
							plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
							
							$tabcontent.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
								$(this).remove();
								$tabcontent = tabs[index].content.appendTo($that).hide();
								$tabcontent.jKit_effect(true, options.animation, options.speed, options.easing);
							});
							
							$tabnav.find('li').removeClass(s.activeClass);
							$tabnav.find('li:nth-child('+(index+1)+')').addClass(s.activeClass);
						});
					});
					
					if (tabs[options.active-1] != undefined){
						$tabcontent = tabs[options.active-1].content.appendTo($that);
					}
					
					break;
					
				case 'accordion':
				
					var containerTag = plugin.findElementTag($that, '>', 'max', 'div');
					var titleTag = plugin.findElementTag($that, '> '+containerTag+' >', 0, 'h3');
					var contentTag = plugin.findElementTag($that, '> '+containerTag+' >', 1, 'div');
					
					var tabs = [];
					$that.children(containerTag).each( function(){
						tabs.push({
							'title': $(this).children(titleTag).detach(),
							'content': $(this).children(contentTag).detach()
						});
					});
					
					$that.html('');
					var $tabnav = $('<ul/>', { }).appendTo(that);
					
					var $tabcontent = $;
					var current = 1;
					if (options.active == 0) current = -1;
					
					$.each( tabs, function(index, value){
						
						var $litemp = $('<li/>', { }).append(value.title).css('cursor', 'pointer').appendTo($tabnav);
						
						if (options.active-1 == index){
							$litemp.append(value.content).children(titleTag).addClass(s.activeClass);
							current = index;
						} else {
							$litemp.append(value.content.hide());
						}
						
						$litemp.find('> '+titleTag).on( 'click', function(e){
							if (index != current){
								plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
								$tabnav.find('> li > '+titleTag).removeClass(s.activeClass);
								$(this).addClass(s.activeClass);
								if (options.animation == 'slide'){
									$tabnav.find('> li:nth-child('+(current+1)+') > '+contentTag).slideUp(options.speed, options.easing);
									$tabnav.find('> li:nth-child('+(index+1)+') > '+contentTag).slideDown(options.speed, options.easing);
								} else {
									$tabnav.find('> li:nth-child('+(current+1)+') > '+contentTag).hide();
									$tabnav.find('> li:nth-child('+(index+1)+') > '+contentTag).show();
								}
								current = index;
							} else {
								plugin.triggerEvent('hideentry hideentry'+(index+1), $that, options);
								$(this).removeClass(s.activeClass).next().slideUp(options.speed, options.easing);
								current = -1;
							}
						});
					
					});
					
					break;
					
				case 'parallax':
					
					var strength = options.strength / 10;
					
					if (options.scope == 'global'){
						var $capture = $(document);
					} else {
						var $capture = $that;
					}
					
					$capture.mousemove( function(event) {
						
						if ((windowhasfocus || !windowhasfocus && s.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport)){
							var cnt = 1;
							
							$that.children().each( function(){
								
								var box = $that.offset();
								
								if (options.axis == 'x' || options.axis == 'both'){
									var offsetx = (event.pageX-box.left-($that.width()/2))*strength*cnt*-1 - $(this).width()/2 + $that.width()/2;
									$(this).css({ 'left': offsetx+'px' });
								}
								if (options.axis == 'y' || options.axis == 'both'){
									var offsety = (event.pageY-box.top-($that.height()/2))*strength*cnt*-1 - $(this).height()/2 + $that.height()/2;
									$(this).css({ 'top': offsety+'px' });
								}
								
								cnt++;
							
							});
						}
					
					});
					
					break;
					
				case 'menu':
					
					$that.find("li").hover(function(){
						
						$(this).addClass("hover");
						$('ul:first',this).css('visibility', 'visible');
					
					}, function(){
						
						$(this).removeClass("hover");
						$('ul:first',this).css('visibility', 'hidden');
					
					}).on( 'click', function(){
						
						$(this).addClass("hover");
						$('ul:first',this).css('visibility', 'visible');
					
					});
					
					break;
					
				case 'form':
					
					$that.append('<input type="hidden" name="'+s.prefix+'-requireds" id="'+s.prefix+'-requireds">');
					
					if (options.error != undefined) options.formerror = options.error;
					
					var requireds = [];
					
					$that.on('submit', function() {
						
						var errors = [];
						
						$(this).find('span.'+s.errorClass).remove();
						
						$(this).find("*[rel^=jKit], *["+s.dataAttribute+"]").each( function(){
							
							var rel = $(this).attr('rel');
							var data = $(this).attr(s.dataAttribute);
							
							if (data != undefined){
								var start = data.indexOf('[');
								var end = data.indexOf(']');
								var optionstring = data.substring(start+1, end);
							} else {
								var start = rel.indexOf('[');
								var end = rel.indexOf(']');
								var optionstring = rel.substring(start+1, end);
							}
							
							var options = plugin.parseOptions(optionstring);
							
							var type = options.type;
							var elerror = false;
							var required = false;
							
							if (options.required == undefined) options.required = false;
							
							// required?
							if (options.required == 'true'){
								if ($(this).val() == ''){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'required' } );
								}
								required = true;
								if ($.inArray($(this).attr('name'), requireds) == -1){
									requireds.push($(this).attr('name'));
								}
							}
							
							if ((required || $(this).val() != '') || options.type == 'group'){
								
								// email?
								if (options.type == 'email' && !$.fn.jKit_emailCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'email' } );
								}
								
								// url (http:// or https://)?
								if (options.type == 'url' && !$.fn.jKit_urlCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'url' } );
								}
								
								// date?
								if (options.type == 'date' && !$.fn.jKit_dateCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'date' } );
								}
								
								// older?
								if (options.type == 'date' &&  (new Date($(this).val()).getTime() <= new Date($(options.older).val()).getTime()) ){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'older' } );
								}
								
								// younger?
								if (options.type == 'date' &&  (new Date($(this).val()).getTime() >= new Date($(options.younger).val()).getTime()) ){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'younger' } );
								}
								
								// time?
								if (options.type == 'time' && !$.fn.jKit_timeCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'time' } );
								}
								
								// phone number?
								if (options.type == 'phone' && !$.fn.jKit_phoneCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'phone' } );
								}
								
								// float?
								if (options.type == 'float' && isNaN($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'float' } );
								}
								
								// int?
								if (options.type == 'int' && parseInt($(this).val()) != $(this).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'int' } );
								}
								
								// min (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.min != undefined && $(this).val() < options.min && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'min' } );
								}
								
								// max (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.max != undefined && $(this).val() > options.max && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'max' } );
								}
								
								// bigger than (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.bigger != undefined && $(this).val() > $(options.bigger).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'bigger' } );
								}
								
								// smaller than (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.smaller != undefined && $(this).val() < $(options.smaller).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'smaller' } );
								}
								
								// min (length)?
								if ((options.type != 'int' && options.type != 'float') && options.min != undefined && $(this).val().length < options.min && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'minlength' } );
								}
								
								// max (length)?
								if ((options.type != 'int' && options.type != 'float') && options.max != undefined && $(this).val().length > options.max && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'maxlength' } );
								}
								
								// length (string)?
								if (options.length != undefined && $(this).val().length != options.length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'length' } );
								}
								
								// longer than (length)?
								if ((options.type != 'int' && options.type != 'float') && options.longer != undefined && $(this).val().length > $(options.longer).val().length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'longer' } );
								}
								
								// shorter than (length)?
								if ((options.type != 'int' && options.type != 'float') && options.shorter != undefined && $(this).val().length < $(options.shorter).val().length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'shorter' } );
								}
								
								// strength (password, 0=bad, 100=perfect)?
								if (options.strength != undefined && $.fn.jKit_passwordStrength($(this).val()) < options.strength){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'strength' } );
								}
								
								// same (as other field)?
								if (options.same != undefined && $(this).val() != $(options.same).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'same' } );
								}
								
								// different (as other field)?
								if (options.different != undefined && $(this).val() != $(options.different).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'different' } );
								}
								
								// extension (file)?
								if (options.type == 'extension'){
									var opts = options.options.split(s.delimiter);
									var filesplit = $(this).val().split('.');
									var ext = filesplit[filesplit.length-1];
									if ($.inArray(ext,opts) == -1) {
										elerror = true;
										errors.push( { 'element': $(this), 'error': 'ext' } );
									}
								}
								
								// group (is one checked)?
								if (options.type == 'group'){
									if (options.min != undefined || options.max != undefined){
										var checked = 0;
										$(this).children('input[type=checkbox][checked]').each( function(){
											checked++;
										});
										if ((options.min != undefined && options.min > checked) || (options.max != undefined && checked > options.max)){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'group' } );
										}
									} else {
										if ($(this).find("input[name='"+options.name+"']:checked").val() == undefined){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'group' } );
										}
									}
								}
								
								// custom (function call)?
								if (options.type == 'custom' && options.checkfunction != undefined){
									var fn = window[options.checkfunction];
									if(typeof fn === 'function') {
										if ( !fn( $(this).val() ) ){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'custom' } );
										}
									}
								}
							
							}
							
							if (elerror){
								if (options.error != undefined){
									$(this).after('<span class="'+s.errorClass+'">'+options.error+'</span>');
								}
								$(this).addClass(s.errorClass);
							} else {
								$(this).removeClass(s.errorClass);
							}
						
						});
						
						if (errors.length == 0){
							
							if (options.validateonly == "yes"){
								
								plugin.triggerEvent('complete', $that, options);
								
								return true;
							
							} else {
								var action = $(this).attr('action');
								
								$that.removeClass(s.errorClass);
								
								if (options.success == undefined) options.success = 'Your form has been sent.';
								
								$that.find('input#'+s.prefix+'-requireds').val(requireds.join(s.delimiter));
								
								$.post(action, $that.serialize(), function(data, textStatus, jqXHR) {
									$that.find('.'+s.errorClass).hide();
									if (data.sent != undefined && data.sent == true){
										if (options.success.charAt(0) == '#'){
											$that.html($(options.success).show());
										} else {
											$that.html('<p class="'+s.successClass+'">'+options.success+'</p>');
										}
										plugin.triggerEvent('complete', $that, options);
										if (options.macro != undefined) plugin.applyMacro($that, options.macro);
									} else {
										for (x in data.error){
											var field = data.error[x];
											$that.find('*[name='+field+']').addClass(s.errorClass).after('<span class="'+s.errorClass+'">'+options.error+'</span>');
										}
										plugin.triggerEvent('error', $that, options);
									}
								}).error(function(xhr, ajaxOptions, thrownError){
									alert(thrownError);
									$that.append('<span class="'+s.errorClass+'">There was an error submitting the form: Error Code '+xhr.status+'</span>');
								});
								
								return false;
							
							}
						
						} else {
							$that.addClass(s.errorClass);
							if (options.formerror != undefined){
								$that.append('<span class="'+s.errorClass+'">'+options.formerror+'</span>');
							}
							plugin.triggerEvent('error', $that, options);
							return false;
						}
					
					});
					
					break;
					
				case 'plugin':
					
					if (s.plugins[options.script] != undefined){
						
						options.functioncall = s.plugins[options.script]['fn'];
						if (s.plugins[options.script]['option'] != undefined){
							options.option = s.plugins[options.script]['option'];
						}
						
						options.script = s.plugins[options.script]['path'];
					}
					
					$.ajaxSetup({ cache: true });
					if (options.script != undefined){
						$.getScript(options.script, function() {
							
							if (options.option != undefined){
								$that[ options.functioncall ]( options[options.option] );
							} else {
								delete(options.type);
								delete(options.script);
								$that[ options.functioncall ]( options );
							}
							
							plugin.triggerEvent('complete', $that, options);
						
						});
					}
					$.ajaxSetup({ cache: false });
					
					break;
					
				case 'tooltip':
					
					if ($('div#'+s.prefix+'-tooltip').length == 0){
						$('<div/>', {
							id: s.prefix+'-'+type
						}).hide().appendTo('body');
					}
					
					$tip = $('div#'+s.prefix+'-'+type);
					
					$that.on('mouseenter', function(e){
						
						if (options.classname != ''){
							$tip.html(options.text).removeClass().css({ 'background': '', 'color': '' }).addClass(options.classname);
						} else {
							$tip.html(options.text).removeClass().css({ 'background': options.background, 'color': options.color });
						}
						
						$tip.css('top', (e.pageY+15-$(window).scrollTop())).css('left', e.pageX).stop(true, true).fadeIn(200);
						
						plugin.triggerEvent('open', $that, options);
					
					}).on('mouseleave click', function(e){
						
						var speed = 200;
						if ($tip.is(':animated')){
							speed = 0;
						}
						
						$tip.stop(true, true).fadeOut(speed);
						
						plugin.triggerEvent('closed', $that, options);
					
					});
					
					break;
					
				case 'background':
					
					var $bg = $('<div/>', {
						id: s.prefix+'-'+type
					}).css({
						'position': 'fixed',
						'right': '0px',
						'top': '0px',
						'overflow': 'hidden',
						'z-index': '-1',
						'width': $(window).width(),
						'height': $(window).height()
					}).appendTo('body');
					
					$bg.append($that);
					
					var ow = $that.attr('width');
					var oh = $that.attr('height');
					
					plugin.scaleFit($bg, $that, ow, oh, options.distort);
					
					$(window).resize(function() {
						plugin.scaleFit($bg, $that, ow, oh, options.distort);
						plugin.triggerEvent('resized', $that, options);
					});
					
					break;
					
				case 'lorem':
					
					var lorem = [
						'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
						'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
						'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
						'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
						'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
						'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
					];
					
					var text = '';
					
					if (options.random == "yes"){
						lorem = $.fn.jKit_arrayShuffle(lorem);
					}
					
					if (options.paragraphs > 0){
						for ( var i=1; i<=options.paragraphs; i++ ) {
							text += '<p>'+lorem[(i-1)%7]+'</p>';
						}
					} else {
						if (options.length != undefined && options.length != ''){
							
							var i=1;
							
							while(text.length < options.length-1){
								text += lorem[(i-1)%7]+' ';
								text = text.substring(0, options.length-1);
								i++;
							}
						
						} else {
							text = lorem[0];
						}
					}
					
					$that.html(text);
					
					break;
				
				case 'binding':
					
					window.setTimeout( function() { plugin.binding($that, options); }, 0);
					
					break;
				
				case 'limit':
					
					if (options.elements == 'children'){
						$that.children(':gt('+(options.count-1)+')').each(function(){
							$(this).jKit_effect(false, options.animation, options.speed, options.easing);
						});
						setTimeout( function(){
							plugin.triggerEvent('complete', $that, options);
						}, options.speed);
					} else {
						var newtext = $that.text().substr(0,options.count);
						if (newtext != $that.text()){
							newtext = newtext.substr(0,newtext.length-options.endstring.length)+options.endstring;
							$that.text(newtext);
						}
					}
					
					break;
					
				case 'template':
					
					if (options.action == 'apply'){
						
						$el = $that;
						
						if (options.children != undefined && options.children != ''){
							
							$el = $that.children(options.children);
							
							var cnt = 0;
							$el.each( function(){
								cnt++;
								plugin.applyTemplate($(this), options, cnt, $el.length);
							});
						} else {
							plugin.applyTemplate($that, options);
						}
						
						if (options.dynamic == 'yes'){
							var $addDiv = $('<a/>', {
								'class': s.prefix+'-'+type+'-add'
							}).html(options.addhtml).on( 'click', function(){
								
								$el = $($that.get(0));
								
								var cnt = $el.children(options.children).length + 1;
								
								$el.find('.if-entry-last').hide();
								plugin.applyTemplate($('<'+options.children+'/>').appendTo($el), options, cnt, cnt);
								
								plugin.triggerEvent('added', $that, options);
							
							}).insertAfter($that);
						
						}
					
					} else {
						
						if (templates[options.name] == undefined){
							templates[options.name] = [];
						}
						
						if (options.vars == undefined){
							var vars = [];
						} else {
							var vars = options.vars.split(s.delimiter);
						}
						
						templates[options.name] = { 'template': $that.detach(), 'vars': vars };
					
					}
					
					break;
			
			}
			
			return $that;
		
		};
		
		plugin.filterElements = function($el, options){
			
			var selections = [];
			
			$el.find('.jkit-filter').each( function(){
				var vals = [];
				var valsplit = $(this).val().split(' ');
				$.each( valsplit, function(i,v){
					v = $.trim(v);
					if (v != '') vals.push(v);
				});
				selections = selections.concat(vals);
			});
			
			$el.find(options.affected).each( function(){
				
				var $current = $(this);
				
				if (selections.length > 0){
					
					var found = [];
					
					$.each( selections, function(i,v){
						if (options.by == 'class'){
							if ($current.hasClass(v)){
								found.push(v);
							}
						} else if (options.by == 'text'){
							if ($current.text().toLowerCase().indexOf(v.toLowerCase()) > -1){
								found.push(v);
							}
						}
					});
					
					if ( found.length == selections.length || (found.length > 0 && options.logic == 'or') ){
						$current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
					} else {
						$current.jKit_effect(false, options.animation, options.speed, options.easing, 0);
					}
				
				} else {
					$current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
				}
			
			});
			
			setTimeout( function(){
				plugin.triggerEvent('complete', $el, options);
			}, options.speed);
		
		};
		
		plugin.readAPI = function($el, options){
			
			if (options.format == 'json'){
				
				$.ajax({
					type: "GET",
					url: options.url,
					contentType: "application/json; charset=utf-8",
					dataType: "jsonp",
					error: function(){
						plugin.triggerEvent('error', $el, options);
					},
					success: function(data) {
						
						if (options.template != ''){
							
							$el.html(templates[options.template].template.clone().show());
							$el.find('[data-jkit-api]').each(function(){
								var value = $(this).attr('data-jkit-api');
								try {
									$(this).text(eval('data.'+value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, '')));
								} catch(err) { }
							});
							$el.find('[data-jkit-api-if]').each(function(){
								var value = $(this).attr('data-jkit-api-if');
								var test = undefined;
								try {
									eval('test = data.'+value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, ''));
								} catch(err) { }
								if (test == undefined){
									$(this).remove();
								}
							});
						
						} else {
							
							if (options.value != ''){
								try {
									$el.text(eval('data.'+options.value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, '')));
								} catch(err) { }
							} else {
								$el.text(data);
							}
						
						}
						
						if (options.macro != undefined) plugin.applyMacro($el, options.macro);
						
						plugin.triggerEvent('complete', $el, options);
						
						if (options.interval > -1){
							setTimeout( function(){
								plugin.readAPI($el, options);
							}, options.interval*1000);
						}
					
					}
				});
			}
		
		};
		
		plugin.triggerEvent = function(event, $el, options){
			
			if (options.commandkey !== undefined){
				
				var eventsplit = event.split(' ');
				
				$.each( eventsplit, function(i,v){
					$element.trigger(options.commandkey+'.'+v, { 'element': $el, 'options': options });
				});
			
			}
		
		};
		
		plugin.cssFromString = function(css){
			var partsplit = css.split(',');
			var cssdata = {};
			$.each( partsplit, function(i,v){
				var innersplit = v.split('(');
				if (innersplit.length == 2){
					var property = innersplit[0];
					var value = innersplit[1].slice(0,-1);
					cssdata[property] = value;
				}
			});
			return cssdata;
		};
		
		plugin.preFix = function(str){
			
			var lines = str.split("\n");
			var min = 9999;
			
			$.each( lines, function(i,v){
				if ($.trim(v) != ''){
					
					var cnt = -1;
					
					while(v.charAt(cnt+1) == "\t"){
						cnt++;
					}
					cnt++;
					
					if (cnt < min){
						min = cnt;
					}
				
				}
			});
			
			$.each( lines, function(i,v){
				lines[i] = v.substr(min);
			});
			
			return lines.join("\n");
		};
		
		plugin.ticker = function($el, options, messages, currentmessage, currentchar){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				var timer =  options.speed;
				
				currentchar++;
				if (currentchar > messages[currentmessage].text.length){
					
					timer = options.delay;
					
					currentmessage++;
					if (currentmessage >= messages.length){
						currentmessage = 0;
					}
					
					setTimeout( function(){
						plugin.triggerEvent('showentry showentry'+(currentmessage+1), $el, options);
					}, timer);
					
					currentchar = 0;
				
				} else {
					if (messages[currentmessage].href != undefined){
						$el.html('<a href="'+messages[currentmessage].href+'" target="'+messages[currentmessage].target+'">'+messages[currentmessage].text.substr(0,currentchar)+'</a>');
					} else {
						$el.html(messages[currentmessage].text.substr(0,currentchar));
					}
				}
			}
			
			window.setTimeout( function() { plugin.ticker($el, options, messages, currentmessage, currentchar); }, timer);
		
		};
		
		plugin.loadAndReplace = function(href, options, $el){
			
			var tempid = plugin.settings.prefix+'_ajax_temp_'+$.fn.jKit_getUnixtime();
			
			$(options.element).jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
				
				$(options.element).html('');
				
				jQuery('<div/>', {
					id: tempid
				}).appendTo('body');
				
				$('#'+tempid).load(href+' '+options.element, function() {
					
					plugin.triggerEvent('complete', $el, options);
					
					$(options.element).html( $('#'+tempid+' '+options.element).html() );
					plugin.init($(options.element));
					$(options.element).jKit_effect(true, options.animation, options.speed, options.easing);
					
					if (options.macro != undefined) plugin.applyMacro($(options.element), options.macro);
					
					$('#'+tempid).remove();
				
				});
			
			});
		
		};
		
		plugin.updateSrc = function($el, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				
				var srcSplit = $el.attr('src').split('?');
				
				$el.attr('src', srcSplit[0]+'?t='+$.fn.jKit_getUnixtime());
			
			}
		
		};
		
		plugin.applyTemplate = function($el, options, cnt, entries){
			
			var content = {};
			$.each( templates[options.name].vars, function(i,v){
				var $subEls = $el.find('.'+v);
				plugin.init($subEls);
				if ($subEls.val() != ''){
					content[v] = $subEls.val();
				} else {
					content[v] = $subEls.html();
				}
			});
			
			$el.html(templates[options.name].template.clone().show());
			
			$el.find('[class^="if-entry-"]').hide();
			
			plugin.renameDynamicAttributes($el, cnt);
			
			$.each( templates[options.name].vars, function(i,v){
				
				var $subEl = $el.find('.'+v);
				
				if ($subEl.is("input") || $subEl.is("select") || $subEl.is("textarea")){
					$subEl.val(content[v]);
				} else {
					$subEl.html(content[v]);
				}
				
				if (content[v] == undefined && $el.find('.if-'+v).length > 0){
					$el.find('.if-'+v).remove();
				}
				
				if (cnt == 1) $el.find('.if-entry-first').show();
				if (cnt == entries) $el.find('.if-entry-last').show();
				$el.find('.if-entry-nr-'+cnt).show();
			
			});
		
		};
		
		plugin.renameDynamicAttributes = function($el, cnt){
			$el.find('[class^="dynamic-"]').each( function(){
				
				var $subEl = $(this);
				var classList = $(this).attr('class').split(/\s+/);
				
				$.each( classList, function(i,v){
					
					var attribute = v.substr(8);
					
					if (attribute != '' && $subEl.attr(attribute)){
						
						var currentAttr = $subEl.attr(attribute);
						var pos = currentAttr.lastIndexOf('_');
						if (pos > -1){
							currentAttr = currentAttr.substr(0,pos);
						}
						
						$subEl.attr(attribute, currentAttr+'_'+cnt);
					
					}
				
				});
			
			});
		};
		
		plugin.binding = function(el, options){
			
			if (windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus){
				
				if (options.value == undefined){
					if (options.selector != ''){
						var selsplit = options.selector.split('|');
						var sourcesplit = options.source.split('.');
						
						var values = [];
						$.each(selsplit, function(i, v) {
							
							if (v == 'this'){
								v = el;
							} else if (v == 'parent'){
								v = $(el).parent().get(0);
							}
							
							$(v).each( function(){
								
								switch(sourcesplit[0]){
									case 'event':
										
										$(this).on( sourcesplit[1], function(e){
											options.value = 1;
											plugin.binding(el, options);
											if (options.macro != undefined) plugin.applyMacro($(el), options.macro);
										});
										
										break;
										
									case 'html':
										
										var temp = $(this).html();
										
										break;
									
									case 'text':
										
										var temp = $(this).text();
										
										break;
									
									case 'attr':
										
										var temp = $(this).attr(sourcesplit[1]);
										
										break;
									
									case 'css':
										if (sourcesplit[1] == 'height'){
											var temp = $(this).height();
										} else if (sourcesplit[1] == 'innerHeight'){
											var temp = $(this).innerHeight();
										} else if (sourcesplit[1] == 'outerHeight'){
											var temp = $(this).outerHeight();
										} else if (sourcesplit[1] == 'width'){
											var temp = $(this).width();
										} else if (sourcesplit[1] == 'innerWidth'){
											var temp = $(this).innerWidth();
										} else if (sourcesplit[1] == 'outerWidth'){
											var temp = $(this).outerWidth();
										} else if (sourcesplit[1] == 'scrollTop'){
											var temp = $(this).scrollTop();
										} else if (sourcesplit[1] == 'scrollLeft'){
											var temp = $(this).scrollLeft();
										} else {
											var temp = $(this).css(sourcesplit[1]);
										}
										
										break;
										
									case 'scroll':
										
										switch(sourcesplit[1]){
											case 'top':
												var temp = $(window).scrollTop();
												break;
											case 'left':
												var temp = $(window).scrollLeft();
												break;
										}
										
										break;
										
									case 'clearance':
										
										var cTop = el.offset().top-$(window).scrollTop();
										var cBottom = $(window).scrollTop() + $(window).height() - ( el.offset().top + el.height() );
										
										var cRight = ($(window).width() + $(window).scrollLeft()) - (el.offset().left + el.width());
										var cLeft = el.offset().left - $(window).scrollLeft();
										
										switch(sourcesplit[1]){
											case 'bottom':
												var temp = cBottom;
												break;
											case 'top':
												var temp = cTop;
												break;
											case 'right':
												var temp = cRight;
												break;
											case 'left':
												var temp = cLeft;
												break;
											default:
												var temp = Math.min.apply(Math, [ cBottom, cTop, cRight, cLeft ]);
										}
										
										break;
										
									case 'has':
										
										switch(sourcesplit[1]){
											case 'class':
												var temp = $(this).hasClass(options.search);
												break;
											case 'text':
												var temp = $.fn.jKit_stringOccurrences($(this).text().toLowerCase(), options.search.toLowerCase());
												break;
											case 'attribute':
												var temp = ($(this).attr(options.search) !== undefined);
												break;
											case 'val':
												var temp = $.fn.jKit_stringOccurrences($(this).val().toLowerCase(), options.search.toLowerCase());
												break;
											case 'element':
												var temp = $(this).find(options.search).length;
												break;
											case 'children':
												var temp = $(this).children(options.search).length;
												break;
										}
										
										break;
										
									case 'val':
									default:
										var temp = $(this).val();
								}
								
								values.push(temp);
							
							});
						});
						
						if (sourcesplit[2] != undefined){
							var value = '';
							
							switch(sourcesplit[2]){
								case 'max':
									value = Math.max.apply(Math, values);
									break;
								case 'min':
									value = Math.min.apply(Math, values);
									break;
								case 'sum':
									value = values.reduce(function(a,b){return a+b;});
									break;
								case 'avg':
									value = values.reduce(function(a,b){return a+b;}) / values.length;
									break;
							}
						
						} else {
							var value = values[0];
						}
					
					} else if (options.variable != ''){
						var value = window[options.variable];
					}
				} else {
					value = options.value;
				}
				
				if (options.condition != ''){
					var doit = false;
					eval('if ('+options.condition.replace(/[^a-zA-Z 0-9\<\>\=\.\!]+/g, '')+') doit = true;');
				} else {
					var doit = true;
				}
				
				if (commandkeys[options.commandkey]['condition'] == undefined || commandkeys[options.commandkey]['condition'] != doit){
					
					if (doit){
						plugin.triggerEvent('true', $(el), options);
					} else {
						plugin.triggerEvent('false', $(el), options);
					}
					
					commandkeys[options.commandkey]['condition'] = doit;
					
				}
				
				if (!doit && options['else'] != ''){
					doit = true;
					value = options['else'];
				} else if (doit && options['if'] != ''){
					doit = true;
					value = options['if'];
				}
				
				if (doit){
					if (options.math != ''){
						eval('value = '+options.math.replace(/[^a-zA-Z 0-9\+\-\*\/\.]+/g, '')+';');
					}
					
					var modesplit = options.mode.split('.');
					switch(modesplit[0]){
						case 'text':
							el.text(value);
							break;
						case 'html':
							el.html(value);
							break;
						case 'val':
							el.val(value);
							break;
						case 'attr':
							el.attr(modesplit[1], value);
							break;
						case 'css':
							if (modesplit[1] == 'display' && ($.trim(value) == '' || $.trim(value) == 0)){
								value = 'none';
							}
							if (options.speed > 0){
								var style = {};
								style[modesplit[1]] =  value;
								el.animate(style, options.speed, options.easing);
							} else {
								el.css(modesplit[1], value);
							}
							break;
						default:
							if (modesplit[0] != undefined){
								var fn = window[modesplit[0]];
								if(typeof fn === 'function') {
									fn(value,el);
								}
							}
					}
				}
			
			}
			
			if (options.interval != -1){
				window.setTimeout( function() { plugin.binding(el, options); }, options.interval);
			}
		
		};
		
		plugin.fixSpeed = function(speed){
			
			if (speed != 'fast' && speed != 'slow'){
				speed = parseInt(speed);
			}
			
			return speed;
		};
		
		plugin.loop = function($that, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport && plugin.settings.ignoreViewport)){
				
				plugin.triggerEvent('show', $that, options);
				
				$that.jKit_effect(true, options.animation, options.speed1, options.easing1, options.duration1, function(){
					plugin.triggerEvent('hide', $that, options);
					$that.jKit_effect(false, options.animation, options.speed2, options.easing2, options.duration2, plugin.loop($that, options));
				});
			
			} else {
				window.setTimeout( function() { plugin.loop($that, options); }, 100);
			}
		
		};
		
		plugin.scaleFit = function(bg, element, originalWidth, originalHeight, distort){
			
			var w = $(window).width();
			var h = $(window).height();
			
			bg.css({
				'width': w+'px',
				'height': h+'px'
			});
			
			var top = 0;
			var left = 0;
			
			if (distort == 'no'){
				
				var imgRatio = originalWidth / originalHeight;
				var screenRatio = w / h;
				
				if (imgRatio > screenRatio){
					w = h * imgRatio;
					left = (w - $(window).width()) / 2 * -1;
				} else {
					h = w / imgRatio;
					top = (h - $(window).height()) / 2 * -1;
				}
			
			}
			
			element.css({
				'position': 'fixed',
				'top': top+'px',
				'left': left+'px',
				'width': w+'px',
				'height': h+'px'
			});
		
		};
		
		plugin.carousel = function($el, options, dir){
			
			if (dir != undefined){
				options.autoplay = false;
			}
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				
				var isAnimated = false;
				$el.children().each( function(){
					if ( $(this).is(':animated') ) {
						isAnimated = true;
					}
				});
				
				if (!isAnimated) {

					var pos = Math.min(options.limit, $el.children().length);

					if (dir == 'next' || dir == undefined) {

						plugin.triggerEvent('shownext', $el, options);

						$el.children(':first-child').jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
							$el.append($el.children(':nth-child(1)'));
							$el.children(':nth-child('+pos+')').jKit_effect(true, options.animation, options.speed, options.easing, 0);
						});
						
					} else if (dir == 'prev') {

						plugin.triggerEvent('showprev', $el, options);

						$el.children(':nth-child('+pos+')').jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
							$el.prepend( $el.children(':last-child') );
							$el.children(':first-child').jKit_effect(true, options.animation, options.speed, options.easing, 0);
						});
						     
					}
					
				}
				
				if (options.autoplay == 'yes'){
					window.setTimeout( function() { plugin.carousel($el, options); }, options.interval);
				}
			
			} else {
				window.setTimeout( function() { plugin.carousel($el, options); }, options.interval);
			}
		
		};
		
		plugin.slideshow = function(slides, current, el, options){
			
			if ($.data(el, 'anim')){
				if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)){
					
					if (current < (slides.length-1)){
						current++;
					} else {
						current = 0;
					}
					
					plugin.triggerEvent('hideentry hideentry'+(current+1), el, options);
					
					el.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
						el.html(slides[current]);
						
						plugin.triggerEvent('showentry showentry'+(current+1), el, options);
						
						el.jKit_effect(true, options.animation, options.speed, options.easing, 0, function(){
							window.setTimeout( function() { plugin.slideshow(slides, current, el, options); }, options.interval);
						});
					});
				
				} else {
					window.setTimeout( function() { plugin.slideshow(slides, current, el, options); }, options.interval);
				}
			}
		
		};
		
		plugin.animation = function(frames, current, el, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				
				plugin.triggerEvent('showframe showframe'+(current+1), el, options);
				
				$.each( frames, function(index, value){
					if (value.start == current){
						
						el.html(value.el.clone());
						var duration = (value.end - value.start) * options.interval;
						
						if (value.action == 'fadeout'){
							el.children(":first").show().fadeTo(duration, 0, value.easing);
						} else if (value.action == 'fadein'){
							el.children(":first").hide().fadeTo(duration, 1, value.easing);
						} else if (value.action == 'fadeinout'){
							el.children(":first").hide().fadeTo(duration/2, 1, value.easing).fadeTo(duration/2, 0, value.easing);
						} else if (value.action == 'tween'){
							var next = frames[index+1].el;
							el.children(":first").animate({
								'font-size': next.css('font-size'),
								'letter-spacing': next.css('letter-spacing'),
								'color': next.css('color'),
								'opacity': next.css('opacity'),
								'background-color': next.css('background-color'),
								'padding-top': next.css('padding-top'),
								'padding-bottom': next.css('padding-bottom'),
								'padding-left': next.css('padding-left'),
								'padding-right': next.css('padding-right')
							}, duration, value.easing);
						}
					
					}
				})
				
				current++;
				var nextloop = false;
				if (current > options.lastframe){
					current = 0;
					nextloop = true;
				}
				
				if ((nextloop && options.loop == "yes") || !nextloop){
					window.setTimeout( function() { plugin.animation(frames, current, el, options); }, options.interval);
				}
				
				if (options.loop == "no"){
					if (options.macro != undefined) plugin.applyMacro(el, options.macro);
					plugin.triggerEvent('complete', el, options);
				}
			
			} else {
				window.setTimeout( function() { plugin.animation(frames, current, el, options); }, options.interval);
			}
		
		};
		
		plugin.closeLightbox = function(){
			$('.'+plugin.settings.prefix+'-lightbox-el').fadeTo('fast', 0, function(){
				$(this).remove();
			});
		};
		
		plugin.addKeypressEvents = function($el, code){
			if (plugin.settings.keyNavigation){
				$(document).keydown(function(e){
					
					if ( this !== e.target && (/textarea|select/i.test( e.target.nodeName ) || e.target.type === "text") ) return;
					
					var keys = {
						8: "backspace",
						9: "tab",
						13: "return",
						16: "shift",
						17: "ctrl",
						18: "alt",
						19: "pause",
						20: "capslock",
						27: "esc",
						32: "space",
						33: "pageup",
						34: "pagedown",
						35: "end",
						36: "home",
						37: "left",
						38: "up",
						39: "right",
						40: "down",
						45: "insert",
						46: "del",
						96: "0",
						97: "1",
						98: "2",
						99: "3",
						100: "4",
						101: "5",
						102: "6",
						103: "7",
						104: "8",
						105: "9",
						106: "*",
						107: "+",
						109: "-",
						110: ".",
						111 : "/",
						112: "f1",
						113: "f2",
						114: "f3",
						115: "f4",
						116: "f5",
						117: "f6",
						118: "f7",
						119: "f8",
						120: "f9",
						121: "f10",
						122: "f11",
						123: "f12",
						144: "numlock",
						145: "scroll",
						191: "/",
						224: "meta"
					};
					
					for(var i=48; i<=90; i++){
						keys[i] = String.fromCharCode(i).toLowerCase();
					}
					
					if ($.inArray(e.which, keys)){
						
						var special = '';
						if (e.altKey) special += 'alt+';
						if (e.ctrlKey) special += 'ctrl+';
						if (e.metaKey) special += 'meta+';
						if (e.shiftKey) special += 'shift+';
						
						var keycode = special+keys[e.which];
						
						if (keycode == code){
							$el.trigger(special+keys[e.which]);
							e.preventDefault();
						}
					
					}
				
				});
			}
		}
		
		plugin.init();
	
	};
	
	$.fn.jKit_effect = function(show, type, speed, easing, delay, fn){
		return this.each(function() {
			if (fn == undefined) fn = function(){};
			if (delay == undefined) delay = 0;
			
			if (type == 'fade'){
				if (show){
					$(this).delay(delay).fadeTo(speed, 1.0, easing, fn);
				} else {
					$(this).delay(delay).fadeTo(speed, 0, easing, fn);
				}
			} else if (type == 'slide'){
				if (show){
					$(this).delay(delay).slideDown(speed, easing, fn);
				} else {
					$(this).delay(delay).slideUp(speed, easing, fn);
				}
			} else if (type == 'none'){
				if (show){
					$(this).delay(delay).show();
				} else {
					$(this).delay(delay).hide();
				}
				fn();
			} else {
				if (show){
					$(this).delay(delay).show(speed, easing, fn);
				} else {
					$(this).delay(delay).hide(speed, easing, fn);
				}
			}
		});
	};
	
	$.fn.jKit_getUnixtime = function(){
		var now = new Date;
		var unixtime_ms = now.getTime();
		return parseInt(unixtime_ms / 1000);
	};
	
	$.fn.jKit_arrayShuffle = function(arr){
		var tmp, rand;
		for(var i =0; i < arr.length; i++){
			rand = Math.floor(Math.random() * arr.length);
			tmp = arr[i];
			arr[i] = arr[rand];
			arr[rand] = tmp;
		}
		return arr;
	};
	
	$.fn.jKit_stringOccurrences = function(string, substring){
		
		var n = 0;
		var pos = 0;
		
		while (true){
			pos = string.indexOf(substring, pos);
			if (pos != -1) {
				n++;
				pos += substring.length;
			} else {
				break;
			}
		}
		
		return (n);
	
	};
	
	$.fn.jKit_emailCheck = function(string){
		var filter = /^[a-z0-9\._-]+@([a-z0-9_-]+\.)+[a-z]{2,6}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_urlCheck = function(string){
		var filter = /^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{2,6}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_dateCheck = function(string){
		var filter = /^[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_timeCheck = function(string){
		var filter = /^[0-9]{1,2}\:[0-9]{2}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_phoneCheck = function(string){
		var filter = /^(\+|0)[\d ]+(-\d*)?\d$/;
		return filter.test(string);
	};
	
	$.fn.jKit_passwordStrength = function(passwd){
		var intScore = 0
		
		if (passwd.length < 5){
			intScore = intScore + 5;
		} else if (passwd.length > 4 && passwd.length < 8){
			intScore = intScore + 15;
		} else if (passwd.length >= 8){
			intScore = intScore + 30;
		}
		
		if (passwd.match(/[a-z]/)) intScore = intScore + 5;
		if (passwd.match(/[A-Z]/)) intScore = intScore + 10;
		if (passwd.match(/\d+/)) intScore = intScore + 10;
		if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) intScore = intScore + 10;
		if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) intScore = intScore + 10;
		if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) intScore = intScore + 10;
		if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) intScore = intScore + 5;
		if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) intScore = intScore + 5;
		if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) intScore = intScore + 5;
		
		return intScore;
	};
	
	$.fn.jKit_getAttributes = function(){
		return this.each(function() {
			var map = {};
			var attributes = $(this)[0].attributes;
			var aLength = attributes.length;
			
			for (var a = 0; a < aLength; a++) {
					map[attributes[a].name.toLowerCase()] = attributes[a].value;
			}
			
			return map;
		});
	};
	
	$.fn.jKit_setAttributes = function(attr){
		return this.each(function() {
			$.each( attr, function(i,v){
				try {
					$(this).attr(String(i),String(v));
				} catch(err) {}
			});
		});
	};
	
	$.fn.jKit_iOS = function(){
		return navigator.userAgent.match(/(iPod|iPhone|iPad)/i);
	};
	
	$.fn.jKit_belowTheFold = function(){
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(this).offset().top;
	};
	
	$.fn.jKit_aboveTheTop = function(){
		var top = $(window).scrollTop();
		return top >= $(this).offset().top + $(this).height();
	};
	
	$.fn.jKit_rightOfScreen = function(){
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(this).offset().left;
	};
	
	$.fn.jKit_leftOfScreen = function(){
		var left = $(window).scrollLeft();
		return left >= $(this).offset().left + $(this).width();
	};
	
	$.fn.jKit_inViewport = function(){
		return !$(this).jKit_belowTheFold() && !$(this).jKit_aboveTheTop() && !$(this).jKit_rightOfScreen() && !$(this).jKit_leftOfScreen();
	};
	
	$.fn.jKit = function(options, moreoptions) {
		
		return this.each(function() {
			var plugin = new $.jKit(this, options, moreoptions);
			$(this).data('jKit', plugin);
		});
	
	};

})(jQuery);



/*!


 * classie - class helper functions


 * from bonzo https://github.com/ded/bonzo


 * 


 * classie.has( elem, 'my-class' ) -> true/false


 * classie.add( elem, 'my-new-class' )


 * classie.remove( elem, 'my-unwanted-class' )


 * classie.toggle( elem, 'my-class' )


 */





/*jshint browser: true, strict: true, undef: true */


/*global define: false */





( function( window ) {





'use strict';





// class helper functions from bonzo https://github.com/ded/bonzo





function classReg( className ) {


  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");


}





// classList support for class management


// altho to be fair, the api sucks because it won't accept multiple classes at once


var hasClass, addClass, removeClass;





if ( 'classList' in document.documentElement ) {


  hasClass = function( elem, c ) {


    return elem.classList.contains( c );


  };


  addClass = function( elem, c ) {


    elem.classList.add( c );


  };


  removeClass = function( elem, c ) {


    elem.classList.remove( c );


  };


}


else {


  hasClass = function( elem, c ) {


    return classReg( c ).test( elem.className );


  };


  addClass = function( elem, c ) {


    if ( !hasClass( elem, c ) ) {


      elem.className = elem.className + ' ' + c;


    }


  };


  removeClass = function( elem, c ) {


    elem.className = elem.className.replace( classReg( c ), ' ' );


  };


}





function toggleClass( elem, c ) {


  var fn = hasClass( elem, c ) ? removeClass : addClass;


  fn( elem, c );


}





var classie = {


  // full names


  hasClass: hasClass,


  addClass: addClass,


  removeClass: removeClass,


  toggleClass: toggleClass,


  // short names


  has: hasClass,


  add: addClass,


  remove: removeClass,


  toggle: toggleClass


};





// transport


if ( typeof define === 'function' && define.amd ) {


  // AMD


  define( classie );


} else {


  // browser global


  window.classie = classie;


}





})( window );



/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );
			overlay.addEventListener( 'click', function() {
				$('.md-modal').removeClass('md-show');
				// classie.remove( document.documentElement, 'md-show' );
			} );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) );
			// var close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) );
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md-show' );
				// overlay.removeEventListener( 'click', removeModalHandler );
				// overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});


			// if (close) {
			// 	close.addEventListener( 'click', function( ev ) {
			// 		ev.stopPropagation();
			// 		removeModalHandler();
			// 	});
			// }

		} );

	}

	init();

})();

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   emk <VYV03354@nifty.ne.jp>
 *   Daniel Glazman <glazman@netscape.com>
 *   L. David Baron <dbaron@dbaron.org>
 *   Boris Zbarsky <bzbarsky@mit.edu>
 *   Mats Palmgren <mats.palmgren@bredband.net>
 *   Christian Biesinger <cbiesinger@web.de>
 *   Jeff Walden <jwalden+code@mit.edu>
 *   Jonathon Jongsma <jonathon.jongsma@collabora.co.uk>, Collabora Ltd.
 *   Siraj Razick <siraj.razick@collabora.co.uk>, Collabora Ltd.
 *   Daniel Glazman <daniel.glazman@disruptive-innovations.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

;
var kCHARSET_RULE_MISSING_SEMICOLON = "Missing semicolon at the end of @charset rule";
var kCHARSET_RULE_CHARSET_IS_STRING = "The charset in the @charset rule should be a string";
var kCHARSET_RULE_MISSING_WS = "Missing mandatory whitespace after @charset";
var kIMPORT_RULE_MISSING_URL = "Missing URL in @import rule";
var kURL_EOF = "Unexpected end of stylesheet";
var kURL_WS_INSIDE = "Multiple tokens inside a url() notation";
var kVARIABLES_RULE_POSITION = "@variables rule invalid at this position in the stylesheet";
var kIMPORT_RULE_POSITION = "@import rule invalid at this position in the stylesheet";
var kNAMESPACE_RULE_POSITION = "@namespace rule invalid at this position in the stylesheet";
var kCHARSET_RULE_CHARSET_SOF = "@charset rule invalid at this position in the stylesheet";
var kUNKNOWN_AT_RULE = "Unknow @-rule";

/* FROM http://peter.sh/data/vendor-prefixed-css.php?js=1 */

var kENGINES = [
  "webkit",
  "presto",
  "trident",
  "generic"
];

var kCSS_VENDOR_VALUES = {
  "-moz-box":             {"webkit": "-webkit-box",        "presto": "", "trident": "", "generic": "box" },
  "-moz-inline-box":      {"webkit": "-webkit-inline-box", "presto": "", "trident": "", "generic": "inline-box" },
  "-moz-initial":         {"webkit": "",                   "presto": "", "trident": "", "generic": "initial" },
  "-moz-linear-gradient": {"webkit20110101": FilterLinearGradientForOutput,
                           "webkit": FilterLinearGradientForOutput,
                           "presto": "",
                           "trident": "",
                           "generic": FilterLinearGradientForOutput },
  "-moz-radial-gradient": {"webkit20110101": FilterRadialGradientForOutput,
                           "webkit": FilterRadialGradientForOutput,
                           "presto": "",
                           "trident": "",
                           "generic": FilterRadialGradientForOutput },
  "-moz-repeating-linear-gradient": {"webkit20110101": "",
                           "webkit": FilterRepeatingGradientForOutput,
                           "presto": "",
                           "trident": "",
                           "generic": FilterRepeatingGradientForOutput },
  "-moz-repeating-radial-gradient": {"webkit20110101": "",
                           "webkit": FilterRepeatingGradientForOutput,
                           "presto": "",
                           "trident": "",
                           "generic": FilterRepeatingGradientForOutput }
};

var kCSS_VENDOR_PREFIXES = {"lastUpdate":1304175007,"properties":[{"gecko":"","webkit":"","presto":"","trident":"-ms-accelerator","status":"P"},
{"gecko":"","webkit":"","presto":"-wap-accesskey","trident":"","status":""},
{"gecko":"-moz-animation","webkit":"-webkit-animation","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-delay","webkit":"-webkit-animation-delay","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-direction","webkit":"-webkit-animation-direction","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-duration","webkit":"-webkit-animation-duration","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-fill-mode","webkit":"-webkit-animation-fill-mode","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-animation-iteration-count","webkit":"-webkit-animation-iteration-count","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-name","webkit":"-webkit-animation-name","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-play-state","webkit":"-webkit-animation-play-state","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-animation-timing-function","webkit":"-webkit-animation-timing-function","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-appearance","webkit":"-webkit-appearance","presto":"","trident":"","status":"CR"},
{"gecko":"","webkit":"-webkit-backface-visibility","presto":"","trident":"","status":"WD"},
{"gecko":"background-clip","webkit":"-webkit-background-clip","presto":"background-clip","trident":"background-clip","status":"WD"},
{"gecko":"","webkit":"-webkit-background-composite","presto":"","trident":"","status":""},
{"gecko":"-moz-background-inline-policy","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"background-origin","webkit":"-webkit-background-origin","presto":"background-origin","trident":"background-origin","status":"WD"},
{"gecko":"","webkit":"background-position-x","presto":"","trident":"-ms-background-position-x","status":""},
{"gecko":"","webkit":"background-position-y","presto":"","trident":"-ms-background-position-y","status":""},
{"gecko":"background-size","webkit":"-webkit-background-size","presto":"background-size","trident":"background-size","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-behavior","status":""},
{"gecko":"-moz-binding","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-block-progression","status":""},
{"gecko":"","webkit":"-webkit-border-after","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-after-color","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-after-style","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-after-width","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-before","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-before-color","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-before-style","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-before-width","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-bottom-colors","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"border-bottom-left-radius","webkit":"-webkit-border-bottom-left-radius","presto":"border-bottom-left-radius","trident":"border-bottom-left-radius","status":"WD"},
{"gecko":"","webkit":"-webkit-border-bottom-left-radius = border-bottom-left-radius","presto":"","trident":"","status":""},
{"gecko":"border-bottom-right-radius","webkit":"-webkit-border-bottom-right-radius","presto":"border-bottom-right-radius","trident":"border-bottom-right-radius","status":"WD"},
{"gecko":"","webkit":"-webkit-border-bottom-right-radius = border-bottom-right-radius","presto":"","trident":"","status":""},
{"gecko":"-moz-border-end","webkit":"-webkit-border-end","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-end-color","webkit":"-webkit-border-end-color","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-end-style","webkit":"-webkit-border-end-style","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-end-width","webkit":"-webkit-border-end-width","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-border-fit","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-border-horizontal-spacing","presto":"","trident":"","status":""},
{"gecko":"-moz-border-image","webkit":"-webkit-border-image","presto":"-o-border-image","trident":"","status":"WD"},
{"gecko":"-moz-border-left-colors","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"border-radius","webkit":"-webkit-border-radius","presto":"border-radius","trident":"border-radius","status":"WD"},
{"gecko":"-moz-border-right-colors","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-border-start","webkit":"-webkit-border-start","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-start-color","webkit":"-webkit-border-start-color","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-start-style","webkit":"-webkit-border-start-style","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-start-width","webkit":"-webkit-border-start-width","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-border-top-colors","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"border-top-left-radius","webkit":"-webkit-border-top-left-radius","presto":"border-top-left-radius","trident":"border-top-left-radius","status":"WD"},
{"gecko":"","webkit":"-webkit-border-top-left-radius = border-top-left-radius","presto":"","trident":"","status":""},
{"gecko":"border-top-right-radius","webkit":"-webkit-border-top-right-radius","presto":"border-top-right-radius","trident":"border-top-right-radius","status":"WD"},
{"gecko":"","webkit":"-webkit-border-top-right-radius = border-top-right-radius","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-border-vertical-spacing","presto":"","trident":"","status":""},
{"gecko":"-moz-box-align","webkit":"-webkit-box-align","presto":"","trident":"-ms-box-align","status":"WD"},
{"gecko":"-moz-box-direction","webkit":"-webkit-box-direction","presto":"","trident":"-ms-box-direction","status":"WD"},
{"gecko":"-moz-box-flex","webkit":"-webkit-box-flex","presto":"","trident":"-ms-box-flex","status":"WD"},
{"gecko":"","webkit":"-webkit-box-flex-group","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-box-line-progression","status":""},
{"gecko":"","webkit":"-webkit-box-lines","presto":"","trident":"-ms-box-lines","status":"WD"},
{"gecko":"-moz-box-ordinal-group","webkit":"-webkit-box-ordinal-group","presto":"","trident":"-ms-box-ordinal-group","status":"WD"},
{"gecko":"-moz-box-orient","webkit":"-webkit-box-orient","presto":"","trident":"-ms-box-orient","status":"WD"},
{"gecko":"-moz-box-pack","webkit":"-webkit-box-pack","presto":"","trident":"-ms-box-pack","status":"WD"},
{"gecko":"","webkit":"-webkit-box-reflect","presto":"","trident":"","status":""},
{"gecko":"box-shadow","webkit":"-webkit-box-shadow","presto":"box-shadow","trident":"box-shadow","status":"WD"},
{"gecko":"-moz-box-sizing","webkit":"box-sizing","presto":"box-sizing","trident":"","status":"CR"},
{"gecko":"","webkit":"-webkit-box-sizing = box-sizing","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-caption-side = caption-side","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-color-correction","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-column-break-after","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-column-break-before","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-column-break-inside","presto":"","trident":"","status":""},
{"gecko":"-moz-column-count","webkit":"-webkit-column-count","presto":"column-count","trident":"column-count","status":"CR"},
{"gecko":"-moz-column-gap","webkit":"-webkit-column-gap","presto":"column-gap","trident":"column-gap","status":"CR"},
{"gecko":"-moz-column-rule","webkit":"-webkit-column-rule","presto":"column-rule","trident":"column-rule","status":"CR"},
{"gecko":"-moz-column-rule-color","webkit":"-webkit-column-rule-color","presto":"column-rule-color","trident":"column-rule-color","status":"CR"},
{"gecko":"-moz-column-rule-style","webkit":"-webkit-column-rule-style","presto":"column-rule-style","trident":"column-rule-style","status":"CR"},
{"gecko":"-moz-column-rule-width","webkit":"-webkit-column-rule-width","presto":"column-rule-width","trident":"column-rule-width","status":"CR"},
{"gecko":"","webkit":"-webkit-column-span","presto":"column-span","trident":"column-span","status":"CR"},
{"gecko":"-moz-column-width","webkit":"-webkit-column-width","presto":"column-width","trident":"column-width","status":"CR"},
{"gecko":"","webkit":"-webkit-columns","presto":"columns","trident":"columns","status":"CR"},
{"gecko":"","webkit":"-webkit-dashboard-region","presto":"-apple-dashboard-region","trident":"","status":""},
{"gecko":"filter","webkit":"","presto":"filter","trident":"-ms-filter","status":""},
{"gecko":"-moz-float-edge","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"-o-focus-opacity","trident":"","status":""},
{"gecko":"-moz-font-feature-settings","webkit":"","presto":"","trident":"","status":""},
{"gecko":"-moz-font-language-override","webkit":"","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-font-size-delta","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-font-smoothing","presto":"","trident":"","status":""},
{"gecko":"-moz-force-broken-image-icon","webkit":"","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-column","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-column-align","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-column-span","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-columns","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-layer","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-row","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-row-align","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-row-span","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-grid-rows","status":"WD"},
{"gecko":"","webkit":"-webkit-highlight","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-hyphenate-character","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-hyphenate-limit-after","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-hyphenate-limit-before","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-hyphens","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"-epub-hyphens = -webkit-hyphens","presto":"","trident":"","status":""},
{"gecko":"-moz-image-region","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"ime-mode","webkit":"","presto":"","trident":"-ms-ime-mode","status":""},
{"gecko":"","webkit":"","presto":"-wap-input-format","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-wap-input-required","trident":"","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-interpolation-mode","status":""},
{"gecko":"","webkit":"","presto":"-xv-interpret-as","trident":"","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-flow","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-grid","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-grid-char","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-grid-line","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-grid-mode","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-layout-grid-type","status":""},
{"gecko":"","webkit":"-webkit-line-box-contain","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-line-break","presto":"","trident":"-ms-line-break","status":""},
{"gecko":"","webkit":"-webkit-line-clamp","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-line-grid-mode","status":""},
{"gecko":"","webkit":"","presto":"-o-link","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-o-link-source","trident":"","status":""},
{"gecko":"","webkit":"-webkit-locale","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-logical-height","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-logical-width","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-margin-after","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-margin-after-collapse","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-margin-before","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-margin-before-collapse","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-margin-bottom-collapse","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-margin-collapse","presto":"","trident":"","status":""},
{"gecko":"-moz-margin-end","webkit":"-webkit-margin-end","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-margin-start","webkit":"-webkit-margin-start","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-margin-top-collapse","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-marquee","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-wap-marquee-dir","trident":"","status":""},
{"gecko":"","webkit":"-webkit-marquee-direction","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-marquee-increment","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-wap-marquee-loop","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-marquee-repetition","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-marquee-speed","presto":"-wap-marquee-speed","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-marquee-style","presto":"-wap-marquee-style","trident":"","status":"WD"},
{"gecko":"mask","webkit":"-webkit-mask","presto":"mask","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-attachment","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-box-image","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-clip","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-composite","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-image","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-origin","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-position","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-position-x","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-position-y","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-repeat","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-repeat-x","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-repeat-y","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-mask-size","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-match-nearest-mail-blockquote-color","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-max-logical-height","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-max-logical-width","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-min-logical-height","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-min-logical-width","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"","presto":"-o-mini-fold","trident":"","status":""},
{"gecko":"","webkit":"-webkit-nbsp-mode","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"-o-object-fit","trident":"","status":"ED"},
{"gecko":"","webkit":"","presto":"-o-object-position","trident":"","status":"ED"},
{"gecko":"opacity","webkit":"-webkit-opacity","presto":"opacity","trident":"opacity","status":"WD"},
{"gecko":"","webkit":"-webkit-opacity = opacity","presto":"","trident":"","status":""},
{"gecko":"-moz-outline-radius","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-outline-radius-bottomleft","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-outline-radius-bottomright","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-outline-radius-topleft","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-outline-radius-topright","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"overflow-x","webkit":"overflow-x","presto":"overflow-x","trident":"-ms-overflow-x","status":"WD"},
{"gecko":"overflow-y","webkit":"overflow-y","presto":"overflow-y","trident":"-ms-overflow-y","status":"WD"},
{"gecko":"","webkit":"-webkit-padding-after","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-padding-before","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-padding-end","webkit":"-webkit-padding-end","presto":"","trident":"","status":"ED"},
{"gecko":"-moz-padding-start","webkit":"-webkit-padding-start","presto":"","trident":"","status":"ED"},
{"gecko":"","webkit":"-webkit-perspective","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-perspective-origin","presto":"","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-perspective-origin-x","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-perspective-origin-y","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-phonemes","trident":"","status":""},
{"gecko":"","webkit":"-webkit-rtl-ordering","presto":"","trident":"","status":"P"},
{"gecko":"-moz-script-level","webkit":"","presto":"","trident":"","status":""},
{"gecko":"-moz-script-min-size","webkit":"","presto":"","trident":"","status":""},
{"gecko":"-moz-script-size-multiplier","webkit":"","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"scrollbar-3dlight-color","trident":"-ms-scrollbar-3dlight-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-arrow-color","trident":"-ms-scrollbar-arrow-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-base-color","trident":"-ms-scrollbar-base-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-darkshadow-color","trident":"-ms-scrollbar-darkshadow-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-face-color","trident":"-ms-scrollbar-face-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-highlight-color","trident":"-ms-scrollbar-highlight-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-shadow-color","trident":"-ms-scrollbar-shadow-color","status":"P"},
{"gecko":"","webkit":"","presto":"scrollbar-track-color","trident":"-ms-scrollbar-track-color","status":"P"},
{"gecko":"-moz-stack-sizing","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-svg-shadow","presto":"","trident":"","status":""},
{"gecko":"-moz-tab-size","webkit":"","presto":"-o-tab-size","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-o-table-baseline","trident":"","status":""},
{"gecko":"","webkit":"-webkit-tap-highlight-color","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-text-align-last","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-text-autospace","status":"WD"},
{"gecko":"-moz-text-blink","webkit":"","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-combine","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-text-combine = -webkit-text-combine","presto":"","trident":"","status":""},
{"gecko":"-moz-text-decoration-color","webkit":"","presto":"","trident":"","status":""},
{"gecko":"-moz-text-decoration-line","webkit":"","presto":"","trident":"","status":""},
{"gecko":"-moz-text-decoration-style","webkit":"","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-decorations-in-effect","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-emphasis","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-text-emphasis = -webkit-text-emphasis","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-emphasis-color","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-text-emphasis-color = -webkit-text-emphasis-color","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-emphasis-position","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-emphasis-style","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-text-emphasis-style = -webkit-text-emphasis-style","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-webkit-text-fill-color","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-text-justify","status":"WD"},
{"gecko":"","webkit":"","presto":"","trident":"-ms-text-kashida-space","status":"P"},
{"gecko":"","webkit":"-webkit-text-orientation","presto":"","trident":"","status":""},
{"gecko":"","webkit":"-epub-text-orientation = -webkit-text-orientation","presto":"","trident":"","status":""},
{"gecko":"","webkit":"text-overflow","presto":"text-overflow","trident":"-ms-text-overflow","status":"WD"},
{"gecko":"","webkit":"-webkit-text-security","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-text-size-adjust","presto":"","trident":"-ms-text-size-adjust","status":""},
{"gecko":"","webkit":"-webkit-text-stroke","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-text-stroke-color","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-text-stroke-width","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-epub-text-transform = text-transform","presto":"","trident":"","status":""},
{"gecko":"","webkit":"","presto":"","trident":"-ms-text-underline-position","status":"P"},
{"gecko":"","webkit":"-webkit-touch-callout","presto":"","trident":"","status":"P"},
{"gecko":"-moz-transform","webkit":"-webkit-transform","presto":"-o-transform","trident":"-ms-transform","status":"WD"},
{"gecko":"-moz-transform-origin","webkit":"-webkit-transform-origin","presto":"-o-transform-origin","trident":"-ms-transform-origin","status":"WD"},
{"gecko":"","webkit":"-webkit-transform-origin-x","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-transform-origin-y","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-transform-origin-z","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"-webkit-transform-style","presto":"","trident":"","status":"WD"},
{"gecko":"-moz-transition","webkit":"-webkit-transition","presto":"-o-transition","trident":"","status":"WD"},
{"gecko":"-moz-transition-delay","webkit":"-webkit-transition-delay","presto":"-o-transition-delay","trident":"","status":"WD"},
{"gecko":"-moz-transition-duration","webkit":"-webkit-transition-duration","presto":"-o-transition-duration","trident":"","status":"WD"},
{"gecko":"-moz-transition-property","webkit":"-webkit-transition-property","presto":"-o-transition-property","trident":"","status":"WD"},
{"gecko":"-moz-transition-timing-function","webkit":"-webkit-transition-timing-function","presto":"-o-transition-timing-function","trident":"","status":"WD"},
{"gecko":"","webkit":"-webkit-user-drag","presto":"","trident":"","status":"P"},
{"gecko":"-moz-user-focus","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-user-input","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"-moz-user-modify","webkit":"-webkit-user-modify","presto":"","trident":"","status":"P"},
{"gecko":"-moz-user-select","webkit":"-webkit-user-select","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"","presto":"-xv-voice-balance","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-duration","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-pitch","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-pitch-range","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-rate","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-stress","trident":"","status":""},
{"gecko":"","webkit":"","presto":"-xv-voice-volume","trident":"","status":""},
{"gecko":"-moz-window-shadow","webkit":"","presto":"","trident":"","status":"P"},
{"gecko":"","webkit":"word-break","presto":"","trident":"-ms-word-break","status":"WD"},
{"gecko":"","webkit":"-epub-word-break = word-break","presto":"","trident":"","status":""},
{"gecko":"word-wrap","webkit":"word-wrap","presto":"word-wrap","trident":"-ms-word-wrap","status":"WD"},
{"gecko":"","webkit":"-webkit-writing-mode","presto":"writing-mode","trident":"-ms-writing-mode","status":"ED"},
{"gecko":"","webkit":"-epub-writing-mode = -webkit-writing-mode","presto":"","trident":"","status":""},
{"gecko":"","webkit":"zoom","presto":"","trident":"-ms-zoom","status":""}]};

var kCSS_PREFIXED_VALUE = [
  {"gecko": "-moz-box", "webkit": "-moz-box", "presto": "", "trident": "", "generic": "box"}
];

var CssInspector = {

  mVENDOR_PREFIXES: null,

  kEXPORTS_FOR_GECKO:   true,
  kEXPORTS_FOR_WEBKIT:  true,
  kEXPORTS_FOR_PRESTO:  true,
  kEXPORTS_FOR_TRIDENT: true,

  cleanPrefixes: function()
  {
    this.mVENDOR_PREFIXES = null;
  },

  prefixesForProperty: function(aProperty)
  {
    if (!this.mVENDOR_PREFIXES) {

      this.mVENDOR_PREFIXES = {};
      for (var i = 0; i < kCSS_VENDOR_PREFIXES.properties.length; i++) {
        var p = kCSS_VENDOR_PREFIXES.properties[i];
        if (p.gecko && (p.webkit || p.presto || p.trident)) {
          var o = {};
          if (this.kEXPORTS_FOR_GECKO) o[p.gecko] = true;
          if (this.kEXPORTS_FOR_WEBKIT && p.webkit)  o[p.webkit] = true;
          if (this.kEXPORTS_FOR_PRESTO && p.presto)  o[p.presto] = true;
          if (this.kEXPORTS_FOR_TRIDENT && p.trident) o[p.trident] = true;
          this.mVENDOR_PREFIXES[p.gecko] = [];
          for (var j in o)
            this.mVENDOR_PREFIXES[p.gecko].push(j)
        }
      }
    }
    if (aProperty in this.mVENDOR_PREFIXES)
      return this.mVENDOR_PREFIXES[aProperty].sort();
    return null;
  },

  parseColorStop: function(parser, token)
  {
    var color = parser.parseColor(token);
    var position = "";
    if (!color)
      return null;
    token = parser.getToken(true, true);
    if (token.isPercentage() ||
        token.isDimensionOfUnit("cm") ||
        token.isDimensionOfUnit("mm") ||
        token.isDimensionOfUnit("in") ||
        token.isDimensionOfUnit("pc") ||
        token.isDimensionOfUnit("px") ||
        token.isDimensionOfUnit("em") ||
        token.isDimensionOfUnit("ex") ||
        token.isDimensionOfUnit("pt")) {
      position = token.value;
      token = parser.getToken(true, true);
    }
    return { color: color, position: position }
  },

  parseGradient: function (parser, token)
  {
    var isRadial = false;
    var gradient = { isRepeating: false };
    if (token.isNotNull()) {
      if (token.isFunction("-moz-linear-gradient(") ||
          token.isFunction("-moz-radial-gradient(") ||
          token.isFunction("-moz-repeating-linear-gradient(") ||
          token.isFunction("-moz-repeating-radial-gradient(")) {
        if (token.isFunction("-moz-radial-gradient(") ||
            token.isFunction("-moz-repeating-radial-gradient(")) {
          gradient.isRadial = true;
        }
        if (token.isFunction("-moz-repeating-linear-gradient(") ||
            token.isFunction("-moz-repeating-radial-gradient(")) {
          gradient.isRepeating = true;
        }
        

        token = parser.getToken(true, true);
        var haveGradientLine = false;
        var foundHorizPosition = false;
        var haveAngle = false;

        if (token.isAngle()) {
          gradient.angle = token.value;
          haveGradientLine = true;
          haveAngle = true;
          token = parser.getToken(true, true);
        }

        if (token.isLength()
            || token.isIdent("top")
            || token.isIdent("center")
            || token.isIdent("bottom")
            || token.isIdent("left")
            || token.isIdent("right")) {
          haveGradientLine = true;
          if (token.isLength()
            || token.isIdent("left")
            || token.isIdent("right")) {
            foundHorizPosition = true;
          }
          gradient.position = token.value;
          token = parser.getToken(true, true);
        }

        if (haveGradientLine) {
          if (!haveAngle && token.isAngle()) { // we have an angle here
            gradient.angle = token.value;
            haveAngle = true;
            token = parser.getToken(true, true);
          }

          else if (token.isLength()
                  || (foundHorizPosition && (token.isIdent("top")
                                             || token.isIdent("center")
                                             || token.isIdent("bottom")))
                  || (!foundHorizPosition && (token.isLength()
                                              || token.isIdent("top")
                                              || token.isIdent("center")
                                              || token.isIdent("bottom")
                                              || token.isIdent("left")
                                              || token.isIdent("right")))) {
            gradient.position = ("position" in gradient) ? gradient.position + " ": "";
            gradient.position += token.value;
            token = parser.getToken(true, true);
          }

          if (!haveAngle && token.isAngle()) { // we have an angle here
            gradient.angle = token.value;
            haveAngle = true;
            token = parser.getToken(true, true);
          }

          // we must find a comma here
          if (!token.isSymbol(","))
            return null;
          token = parser.getToken(true, true);
        }

        // ok... Let's deal with the rest now
        if (gradient.isRadial) {
          if (token.isIdent("circle") ||
              token.isIdent("ellipse")) {
            gradient.shape = token.value;
            token = parser.getToken(true, true);
          }
          if (token.isIdent("closest-side") ||
                   token.isIdent("closest-corner") ||
                   token.isIdent("farthest-side") ||
                   token.isIdent("farthest-corner") ||
                   token.isIdent("contain") ||
                   token.isIdent("cover")) {
            gradient.size = token.value;
            token = parser.getToken(true, true);
          }
          if (!("shape" in gradient) &&
              (token.isIdent("circle") ||
               token.isIdent("ellipse"))) {
            // we can still have the second value...
            gradient.shape = token.value;
            token = parser.getToken(true, true);
          }
          if ((("shape" in gradient) || ("size" in gradient)) && !token.isSymbol(","))
            return null;
          else if (("shape" in gradient) || ("size" in gradient))
            token = parser.getToken(true, true);
        }

        // now color stops...
        var stop1 = this.parseColorStop(parser, token);
        if (!stop1)
          return null;
        token = parser.currentToken();
        if (!token.isSymbol(","))
          return null;
        token = parser.getToken(true, true);
        var stop2 = this.parseColorStop(parser, token);
        if (!stop2)
          return null;
        token = parser.currentToken();
        if (token.isSymbol(",")) {
          token = parser.getToken(true, true);
        }
        // ok we have at least two color stops
        gradient.stops = [stop1, stop2];
        while (!token.isSymbol(")")) {
          var colorstop = this.parseColorStop(parser, token);
          if (!colorstop)
            return null;
          token = parser.currentToken();
          if (!token.isSymbol(")") && !token.isSymbol(","))
            return null;
          if (token.isSymbol(","))
            token = parser.getToken(true, true);
          gradient.stops.push(colorstop);
        }
        return gradient;
      }
    }
    return null;
  },

  parseBoxShadows: function(aString)
  {
    var parser = new CSSParser();
    parser._init();
    parser.mPreserveWS       = false;
    parser.mPreserveComments = false;
    parser.mPreservedTokens = [];
    parser.mScanner.init(aString);

    var shadows = [];
    var token = parser.getToken(true, true);
    var color = "", blurRadius = "0px", offsetX = "0px", offsetY = "0px", spreadRadius = "0px";
    var inset = false;
    while (token.isNotNull()) {
      if (token.isIdent("none")) {
        shadows.push( { none: true } );
        token = parser.getToken(true, true);
      }
      else {
        if (token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var offsetX = token.value;
          token = parser.getToken(true, true);
        }
        else
          return [];

        if (!inset && token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var offsetX = token.value;
          token = parser.getToken(true, true);
        }
        else
          return [];

        if (!inset && token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var blurRadius = token.value;
          token = parser.getToken(true, true);
        }

        if (!inset && token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var spreadRadius = token.value;
          token = parser.getToken(true, true);
        }

        if (!inset && token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        if (token.isFunction("rgb(") ||
            token.isFunction("rgba(") ||
            token.isFunction("hsl(") ||
            token.isFunction("hsla(") ||
            token.isSymbol("#") ||
            token.isIdent()) {
          var color = parser.parseColor(token);
          token = parser.getToken(true, true);
        }

        if (!inset && token.isIdent('inset')) {
          inset = true;
          token = parser.getToken(true, true);
        }

        shadows.push( { none: false,
                        color: color,
                        offsetX: offsetX, offsetY: offsetY,
                        blurRadius: blurRadius,
                        spreadRadius: spreadRadius } );

        if (token.isSymbol(",")) {
          inset = false;
          color = "";
          blurRadius = "0px";
          spreadRadius = "0px"
          offsetX = "0px";
          offsetY = "0px"; 
          token = parser.getToken(true, true);
        }
        else if (!token.isNotNull())
          return shadows;
        else
          return [];
      }
    }
    return shadows;
  },

  parseTextShadows: function(aString)
  {
    var parser = new CSSParser();
    parser._init();
    parser.mPreserveWS       = false;
    parser.mPreserveComments = false;
    parser.mPreservedTokens = [];
    parser.mScanner.init(aString);

    var shadows = [];
    var token = parser.getToken(true, true);
    var color = "", blurRadius = "0px", offsetX = "0px", offsetY = "0px"; 
    while (token.isNotNull()) {
      if (token.isIdent("none")) {
        shadows.push( { none: true } );
        token = parser.getToken(true, true);
      }
      else {
        if (token.isFunction("rgb(") ||
            token.isFunction("rgba(") ||
            token.isFunction("hsl(") ||
            token.isFunction("hsla(") ||
            token.isSymbol("#") ||
            token.isIdent()) {
          var color = parser.parseColor(token);
          token = parser.getToken(true, true);
        }
        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var offsetX = token.value;
          token = parser.getToken(true, true);
        }
        else
          return [];
        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var offsetY = token.value;
          token = parser.getToken(true, true);
        }
        else
          return [];
        if (token.isPercentage() ||
            token.isDimensionOfUnit("cm") ||
            token.isDimensionOfUnit("mm") ||
            token.isDimensionOfUnit("in") ||
            token.isDimensionOfUnit("pc") ||
            token.isDimensionOfUnit("px") ||
            token.isDimensionOfUnit("em") ||
            token.isDimensionOfUnit("ex") ||
            token.isDimensionOfUnit("pt")) {
          var blurRadius = token.value;
          token = parser.getToken(true, true);
        }
        if (!color &&
            (token.isFunction("rgb(") ||
             token.isFunction("rgba(") ||
             token.isFunction("hsl(") ||
             token.isFunction("hsla(") ||
             token.isSymbol("#") ||
             token.isIdent())) {
          var color = parser.parseColor(token);
          token = parser.getToken(true, true);
        }

        shadows.push( { none: false,
                        color: color,
                        offsetX: offsetX, offsetY: offsetY,
                        blurRadius: blurRadius } );

        if (token.isSymbol(",")) {
          color = "";
          blurRadius = "0px";
          offsetX = "0px";
          offsetY = "0px"; 
          token = parser.getToken(true, true);
        }
        else if (!token.isNotNull())
          return shadows;
        else
          return [];
      }
    }
    return shadows;
  },

  parseBackgroundImages: function(aString)
  {
    var parser = new CSSParser();
    parser._init();
    parser.mPreserveWS       = false;
    parser.mPreserveComments = false;
    parser.mPreservedTokens = [];
    parser.mScanner.init(aString);

    var backgrounds = [];
    var token = parser.getToken(true, true);
    while (token.isNotNull()) {
      /*if (token.isFunction("rgb(") ||
          token.isFunction("rgba(") ||
          token.isFunction("hsl(") ||
          token.isFunction("hsla(") ||
          token.isSymbol("#") ||
          token.isIdent()) {
        var color = parser.parseColor(token);
        backgrounds.push( { type: "color", value: color });
        token = parser.getToken(true, true);
      }
      else */
      if (token.isFunction("url(")) {
        token = parser.getToken(true, true);
        var urlContent = parser.parseURL(token);
        backgrounds.push( { type: "image", value: "url(" + urlContent });
        token = parser.getToken(true, true);
      }
      else if (token.isFunction("-moz-linear-gradient(") ||
               token.isFunction("-moz-radial-gradient(") ||
               token.isFunction("-moz-repeating-linear-gradient(") ||
               token.isFunction("-moz-repeating-radial-gradient(")) {
        var gradient = this.parseGradient(parser, token);
        backgrounds.push( { type: gradient.isRadial ? "radial-gradient" : "linear-gradient", value: gradient });
        token = parser.getToken(true, true);
      }
      else
        return null;
      if (token.isSymbol(",")) {
        token = parser.getToken(true, true);
        if (!token.isNotNull())
          return null;
      }
    }
    return backgrounds;
  },

  serializeGradient: function(gradient)
  {
    var s = gradient.isRadial
              ? (gradient.isRepeating ? "-moz-repeating-radial-gradient(" : "-moz-radial-gradient(" )
              : (gradient.isRepeating ? "-moz-repeating-linear-gradient(" : "-moz-linear-gradient(" );
    if (gradient.angle || gradient.position)
      s += (gradient.angle ? gradient.angle + " ": "") +
           (gradient.position ? gradient.position : "") +
           ", ";
    if (gradient.isRadial && (gradient.shape || gradient.size))
      s += (gradient.shape ? gradient.shape : "") +
           " " +
           (gradient.size ? gradient.size : "") +
           ", ";
    for (var i = 0; i < gradient.stops.length; i++) {
      var colorstop = gradient.stops[i];
      s += colorstop.color + (colorstop.position ? " " + colorstop.position : "");
      if (i != gradient.stops.length -1)
        s += ", ";
    }
    s += ")";
    return s;
  },

  parseBorderImage: function(aString)
  {
    var parser = new CSSParser();
    parser._init();
    parser.mPreserveWS       = false;
    parser.mPreserveComments = false;
    parser.mPreservedTokens = [];
    parser.mScanner.init(aString);

    var borderImage = {url: "", offsets: [], widths: [], sizes: []};
    var token = parser.getToken(true, true);
    if (token.isFunction("url(")) {
      token = parser.getToken(true, true);
      var urlContent = parser.parseURL(token);
      if (urlContent) {
        borderImage.url = urlContent.substr(0, urlContent.length - 1).trim();
        if ((borderImage.url[0] == '"' && borderImage.url[borderImage.url.length - 1] == '"') ||
             (borderImage.url[0] == "'" && borderImage.url[borderImage.url.length - 1] == "'"))
        borderImage.url = borderImage.url.substr(1, borderImage.url.length - 2);
      }
      else
        return null;
    }
    else
      return null; 

    token = parser.getToken(true, true);
    if (token.isNumber() || token.isPercentage())
      borderImage.offsets.push(token.value);
    else
      return null;
    var i;
    for (i= 0; i < 3; i++) {
      token = parser.getToken(true, true);
      if (token.isNumber() || token.isPercentage())
        borderImage.offsets.push(token.value);
      else
        break;
    }
    if (i == 3)
      token = parser.getToken(true, true);

    if (token.isSymbol("/")) {
      token = parser.getToken(true, true);
      if (token.isDimension()
          || token.isNumber("0")
          || (token.isIdent() && token.value in parser.kBORDER_WIDTH_NAMES))
        borderImage.widths.push(token.value);
      else
        return null;

      for (var i = 0; i < 3; i++) {
        token = parser.getToken(true, true);
        if (token.isDimension()
            || token.isNumber("0")
            || (token.isIdent() && token.value in parser.kBORDER_WIDTH_NAMES))
          borderImage.widths.push(token.value);
        else
          break;
      }
      if (i == 3)
        token = parser.getToken(true, true);
    }

    for (var i = 0; i < 2; i++) {
      if (token.isIdent("stretch")
          || token.isIdent("repeat")
          || token.isIdent("round"))
        borderImage.sizes.push(token.value);
      else if (!token.isNotNull())
        return borderImage;
      else
        return null;
      token = parser.getToken(true, true);
    }
    if (!token.isNotNull())
      return borderImage;

    return null;
  },

  parseMediaQuery: function(aString)
  {
    var kCONSTRAINTS = {
      "width": true,
      "min-width": true,
      "max-width": true,
      "height": true,
      "min-height": true,
      "max-height": true,
      "device-width": true,
      "min-device-width": true,
      "max-device-width": true,
      "device-height": true,
      "min-device-height": true,
      "max-device-height": true,
      "orientation": true,
      "aspect-ratio": true,
      "min-aspect-ratio": true,
      "max-aspect-ratio": true,
      "device-aspect-ratio": true,
      "min-device-aspect-ratio": true,
      "max-device-aspect-ratio": true,
      "color": true,
      "min-color": true,
      "max-color": true,
      "color-index": true,
      "min-color-index": true,
      "max-color-index": true,
      "monochrome": true,
      "min-monochrome": true,
      "max-monochrome": true,
      "resolution": true,
      "min-resolution": true,
      "max-resolution": true,
      "scan": true,
      "grid": true
    };
    var parser = new CSSParser();
    parser._init();
    parser.mPreserveWS       = false;
    parser.mPreserveComments = false;
    parser.mPreservedTokens = [];
    parser.mScanner.init(aString);

    var m = {amplifier: "", medium: "", constraints: []};
    var token = parser.getToken(true, true);

    if (token.isIdent("all") ||
        token.isIdent("aural") ||
        token.isIdent("braille") ||
        token.isIdent("handheld") ||
        token.isIdent("print") ||
        token.isIdent("projection") ||
        token.isIdent("screen") ||
        token.isIdent("tty") ||
        token.isIdent("tv")) {
       m.medium = token.value;
       token = parser.getToken(true, true);
    }
    else if (token.isIdent("not") || token.isIdent("only")) {
      m.amplifier = token.value;
      token = parser.getToken(true, true);
      if (token.isIdent("all") ||
          token.isIdent("aural") ||
          token.isIdent("braille") ||
          token.isIdent("handheld") ||
          token.isIdent("print") ||
          token.isIdent("projection") ||
          token.isIdent("screen") ||
          token.isIdent("tty") ||
          token.isIdent("tv")) {
         m.medium = token.value;
         token = parser.getToken(true, true);
      }
      else
        return null;
    }

    if (m.medium) {
      if (!token.isNotNull())
        return m;
      if (token.isIdent("and")) {
        token = parser.getToken(true, true);
      }
      else
        return null;
    }

    while (token.isSymbol("(")) {
      token = parser.getToken(true, true);
      if (token.isIdent() && (token.value in kCONSTRAINTS)) {
        var constraint = token.value;
        token = parser.getToken(true, true);
        if (token.isSymbol(":")) {
          token = parser.getToken(true, true);
          var values = [];
          while (!token.isSymbol(")")) {
            values.push(token.value);
            token = parser.getToken(true, true);
          }
          if (token.isSymbol(")")) {
            m.constraints.push({constraint: constraint, value: values});
            token = parser.getToken(true, true);
            if (token.isNotNull()) {
              if (token.isIdent("and")) {
                token = parser.getToken(true, true);
              }
              else
                return null;
            }
            else
              return m;
          }
          else
            return null;
        }
        else if (token.isSymbol(")")) {
          m.constraints.push({constraint: constraint, value: null});
          token = parser.getToken(true, true);
          if (token.isNotNull()) {
            if (token.isIdent("and")) {
              token = parser.getToken(true, true);
            }
            else
              return null;
          }
          else
            return m;
        }
        else
          return null;
      }
      else
        return null;
    }
    return m;
  }

};


/************************************************************/
/************************** JSCSSP **************************/
/************************************************************/

var CSS_ESCAPE  = '\\';

var IS_HEX_DIGIT  = 1;
var START_IDENT   = 2;
var IS_IDENT      = 4;
var IS_WHITESPACE = 8;

var W   = IS_WHITESPACE;
var I   = IS_IDENT;
var S   =          START_IDENT;
var SI  = IS_IDENT|START_IDENT;
var XI  = IS_IDENT            |IS_HEX_DIGIT;
var XSI = IS_IDENT|START_IDENT|IS_HEX_DIGIT;

function CSSScanner(aString)
{
  this.init(aString);
}

CSSScanner.prototype = {

  kLexTable: [
  //                                     TAB LF      FF  CR
     0,  0,  0,  0,  0,  0,  0,  0,  0,  W,  W,  0,  W,  W,  0,  0,
  //
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  // SPC !   "   #   $   %   &   '   (   )   *   +   ,   -   .   /
     W,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  I,  0,  0,
  // 0   1   2   3   4   5   6   7   8   9   :   ;   <   =   >   ?
     XI, XI, XI, XI, XI, XI, XI, XI, XI, XI, 0,  0,  0,  0,  0,  0,
  // @   A   B   C   D   E   F   G   H   I   J   K   L   M   N   O
     0,  XSI,XSI,XSI,XSI,XSI,XSI,SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // P   Q   R   S   T   U   V   W   X   Y   Z   [   \   ]   ^   _
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, 0,  S,  0,  0,  SI,
  // `   a   b   c   d   e   f   g   h   i   j   k   l   m   n   o
     0,  XSI,XSI,XSI,XSI,XSI,XSI,SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // p   q   r   s   t   u   v   w   x   y   z   {   |   }   ~
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, 0,  0,  0,  0,  0,
  //
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //     ¡   ¢   £   ¤   ¥   ¦   §   ¨   ©   ª   «   ¬   ­   ®   ¯
     0,  SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // °   ±   ²   ³   ´   µ   ¶   ·   ¸   ¹   º   »   ¼   ½   ¾   ¿
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // À   Á   Â   Ã   Ä   Å   Æ   Ç   È   É   Ê   Ë   Ì   Í   Î   Ï
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // Ð   Ñ   Ò   Ó   Ô   Õ   Ö   ×   Ø   Ù   Ú   Û   Ü   Ý   Þ   ß
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // à   á   â   ã   ä   å   æ   ç   è   é   ê   ë   ì   í   î   ï
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI,
  // ð   ñ   ò   ó   ô   õ   ö   ÷   ø   ù   ú   û   ü   ý   þ   ÿ
     SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI, SI
  ],

  kHexValues: {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15
  },

  mString : "",
  mPos : 0,
  mPreservedPos : [],

  init: function(aString) {
    this.mString = aString;
    this.mPos = 0;
    this.mPreservedPos = [];
  },

  getCurrentPos: function() {
    return this.mPos;
  },

  getAlreadyScanned: function()
  {
    return this.mString.substr(0, this.mPos);
  },

  preserveState: function() {
    this.mPreservedPos.push(this.mPos);
  },

  restoreState: function() {
    if (this.mPreservedPos.length) {
      this.mPos = this.mPreservedPos.pop();
    }
  },

  forgetState: function() {
    if (this.mPreservedPos.length) {
      this.mPreservedPos.pop();
    }
  },

  read: function() {
    if (this.mPos < this.mString.length)
      return this.mString.charAt(this.mPos++);
    return -1;
  },

  peek: function() {
    if (this.mPos < this.mString.length)
      return this.mString.charAt(this.mPos);
    return -1;
  },

  isHexDigit: function(c) {
    var code = c.charCodeAt(0);
    return (code < 256 && (this.kLexTable[code] & IS_HEX_DIGIT) != 0);
  },

  isIdentStart: function(c) {
    var code = c.charCodeAt(0);
    return (code >= 256 || (this.kLexTable[code] & START_IDENT) != 0);
  },

  startsWithIdent: function(aFirstChar, aSecondChar) {
    var code = aFirstChar.charCodeAt(0);
    return this.isIdentStart(aFirstChar) ||
           (aFirstChar == "-" && this.isIdentStart(aSecondChar));
  },

  isIdent: function(c) {
    var code = c.charCodeAt(0);
    return (code >= 256 || (this.kLexTable[code] & IS_IDENT) != 0);
  },

  isSymbol: function(c) {
    var code = c.charCodeAt(0);
    return (this.kLexTable[code] & IS_IDENT) != 1;
  },

  pushback: function() {
    this.mPos--;
  },

  nextHexValue: function() {
    var c = this.read();
    if (c == -1 || !this.isHexDigit(c))
      return new jscsspToken(jscsspToken.NULL_TYPE, null);
    var s = c;
    c = this.read();
    while (c != -1 && this.isHexDigit(c)) {
      s += c;
      c = this.read();
    }
    if (c != -1)
      this.pushback();
    return new jscsspToken(jscsspToken.HEX_TYPE, s);
  },

  gatherEscape: function() {
    var c = this.peek();
    if (c == -1)
      return "";
    if (this.isHexDigit(c)) {
      var code = 0;
      for (var i = 0; i < 6; i++) {
        c = this.read();
        if (this.isHexDigit(c))
          code = code * 16 + this.kHexValues[c.toLowerCase()];
        else if (!this.isHexDigit(c) && !this.isWhiteSpace(c)) {
          this.pushback();
          break;
        }
        else
          break;
      }
      if (i == 6) {
        c = this.peek();
        if (this.isWhiteSpace(c))
          this.read();
      }
      return String.fromCharCode(code);
    }
    c = this.read();
    if (c != "\n")
      return c;
    return "";
  },

  gatherIdent: function(c) {
    var s = "";
    if (c == CSS_ESCAPE)
      s += this.gatherEscape();
    else
      s += c;
    c = this.read();
	if(!this.mMediaQueryMode){
		while (c != -1
			   && (this.isIdent(c) || c == CSS_ESCAPE)) {
		  if (c == CSS_ESCAPE)
			s += this.gatherEscape();
		  else
			s += c;
		  c = this.read();
		}
	}
	else {
		while (c != -1
			   && c != '{' 
			   && c != ',') {
			s += c;
		  c = this.read();
		}
	}
    if (c != -1)
      this.pushback();
	  this.mMediaQueryMode = false;
    return s;
  },

  parseIdent: function(c) {
	var value = this.gatherIdent(c);
    var nextChar = this.peek();
    if (nextChar == "(") {
      value += this.read();
      return new jscsspToken(jscsspToken.FUNCTION_TYPE, value);
    }
    return new jscsspToken(jscsspToken.IDENT_TYPE, value);
  },

  isDigit: function(c) {
    return (c >= '0') && (c <= '9');
  },

  parseComment: function(c) {
    var s = c;
    while ((c = this.read()) != -1) {
      s += c;
      if (c == "*") {
        c = this.read();
        if (c == -1)
          break;
        if (c == "/") {
          s += c;
          break;
        }
        this.pushback();
      }
    }
    return new jscsspToken(jscsspToken.COMMENT_TYPE, s);
  },

  parseNumber: function(c) {
    var s = c;
    var foundDot = false;
    while ((c = this.read()) != -1) {
      if (c == ".") {
        if (foundDot)
          break;
        else {
          s += c;
          foundDot = true;
        }
      } else if (this.isDigit(c))
        s += c;
      else
        break;
    }

    if (c != -1 && this.startsWithIdent(c, this.peek())) { // DIMENSION
      var unit = this.gatherIdent(c);
      s += unit;
      return new jscsspToken(jscsspToken.DIMENSION_TYPE, s, unit);
    }
    else if (c == "%") {
      s += "%";
      return new jscsspToken(jscsspToken.PERCENTAGE_TYPE, s);
    }
    else if (c != -1)
      this.pushback();
    return new jscsspToken(jscsspToken.NUMBER_TYPE, s);
  },

  parseString: function(aStop) {
    var s = aStop;
    var previousChar = aStop;
    var c;
    while ((c = this.read()) != -1) {
      if (c == aStop && previousChar != CSS_ESCAPE) {
        s += c;
        break;
      }
      else if (c == CSS_ESCAPE) {
        c = this.peek();
        if (c == -1)
          break;
        else if (c == "\n" || c == "\r" || c == "\f") {
          d = c;
          c = this.read();
          // special for Opera that preserves \r\n...
          if (d == "\r") {
            c = this.peek();
            if (c == "\n")
              c = this.read();
          }
        }
        else {
          s += this.gatherEscape();
          c = this.peek();
        }
      }
      else if (c == "\n" || c == "\r" || c == "\f") {
        break;
      }
      else
        s += c;

      previousChar = c;
    }
    return new jscsspToken(jscsspToken.STRING_TYPE, s);
  },

  isWhiteSpace: function(c) {
    var code = c.charCodeAt(0);
    return code < 256 && (this.kLexTable[code] & IS_WHITESPACE) != 0;
  },

  eatWhiteSpace: function(c) {
    var s = c;
    while ((c = this.read()) != -1) {
      if (!this.isWhiteSpace(c))
        break;
      s += c;
    }
    if (c != -1)
      this.pushback();
    return s;
  },

  parseAtKeyword: function(c) {
    return new jscsspToken(jscsspToken.ATRULE_TYPE, this.gatherIdent(c));
  },

  nextToken: function() {
    var c = this.read();
    if (c == -1)
      return new jscsspToken(jscsspToken.NULL_TYPE, null);

    if (this.startsWithIdent(c, this.peek()))
      return this.parseIdent(c);

    if (c == '@') {
      var nextChar = this.read();
      if (nextChar != -1) {
        var followingChar = this.peek();
        this.pushback();
        if (this.startsWithIdent(nextChar, followingChar))
          return this.parseAtKeyword(c);
      }
    }

    if (c == "." || c == "+" || c == "-") {
      var nextChar = this.peek();
      if (this.isDigit(nextChar))
        return this.parseNumber(c);
      else if (nextChar == "." && c != ".") {
        firstChar = this.read();
        var secondChar = this.peek();
        this.pushback();
        if (this.isDigit(secondChar))
          return this.parseNumber(c);
      }
    }
    if (this.isDigit(c)) {
      return this.parseNumber(c);
    }

    if (c == "'" || c == '"')
      return this.parseString(c);

    if (this.isWhiteSpace(c)) {
      var s = this.eatWhiteSpace(c);
      
      return new jscsspToken(jscsspToken.WHITESPACE_TYPE, s);
    }

    if (c == "|" || c == "~" || c == "^" || c == "$" || c == "*") {
      var nextChar = this.read();
      if (nextChar == "=") {
        switch (c) {
          case "~" :
            return new jscsspToken(jscsspToken.INCLUDES_TYPE, "~=");
          case "|" :
            return new jscsspToken(jscsspToken.DASHMATCH_TYPE, "|=");
          case "^" :
            return new jscsspToken(jscsspToken.BEGINSMATCH_TYPE, "^=");
          case "$" :
            return new jscsspToken(jscsspToken.ENDSMATCH_TYPE, "$=");
          case "*" :
            return new jscsspToken(jscsspToken.CONTAINSMATCH_TYPE, "*=");
          default :
            break;
        }
      } else if (nextChar != -1)
        this.pushback();
    }

    if (c == "/" && this.peek() == "*")
      return this.parseComment(c);

    return new jscsspToken(jscsspToken.SYMBOL_TYPE, c);
  }
};

function CSSParser(aString)
{
  this.mToken = null;
  this.mLookAhead = null;
  this.mScanner = new CSSScanner(aString);

  this.mPreserveWS = true;
  this.mPreserveComments = true;

  this.mPreservedTokens = [];
  
  this.mError = null;
}

CSSParser.prototype = {

  _init:function() {
    this.mToken = null;
    this.mLookAhead = null;
    this.mMediaQueryMode = false;
  },

  kINHERIT: "inherit",

  kBORDER_WIDTH_NAMES: {
      "thin": true,
      "medium": true,
      "thick": true
  },

  kBORDER_STYLE_NAMES: {
    "none": true,
    "hidden": true,
    "dotted": true,
    "dashed": true,
    "solid": true,
    "double": true,
    "groove": true,
    "ridge": true,
    "inset": true,
    "outset": true
  },

  kCOLOR_NAMES: {
    "transparent": true,
  
    "black": true,
    "silver": true,
    "gray": true,
    "white": true,
    "maroon": true,
    "red": true,
    "purple": true,
    "fuchsia": true,
    "green": true,
    "lime": true,
    "olive": true,
    "yellow": true,
    "navy": true,
    "blue": true,
    "teal": true,
    "aqua": true,
    
    "aliceblue": true,
    "antiquewhite": true,
    "aqua": true,
    "aquamarine": true,
    "azure": true,
    "beige": true,
    "bisque": true,
    "black": true,
    "blanchedalmond": true,
    "blue": true,
    "blueviolet": true,
    "brown": true,
    "burlywood": true,
    "cadetblue": true,
    "chartreuse": true,
    "chocolate": true,
    "coral": true,
    "cornflowerblue": true,
    "cornsilk": true,
    "crimson": true,
    "cyan": true,
    "darkblue": true,
    "darkcyan": true,
    "darkgoldenrod": true,
    "darkgray": true,
    "darkgreen": true,
    "darkgrey": true,
    "darkkhaki": true,
    "darkmagenta": true,
    "darkolivegreen": true,
    "darkorange": true,
    "darkorchid": true,
    "darkred": true,
    "darksalmon": true,
    "darkseagreen": true,
    "darkslateblue": true,
    "darkslategray": true,
    "darkslategrey": true,
    "darkturquoise": true,
    "darkviolet": true,
    "deeppink": true,
    "deepskyblue": true,
    "dimgray": true,
    "dimgrey": true,
    "dodgerblue": true,
    "firebrick": true,
    "floralwhite": true,
    "forestgreen": true,
    "fuchsia": true,
    "gainsboro": true,
    "ghostwhite": true,
    "gold": true,
    "goldenrod": true,
    "gray": true,
    "green": true,
    "greenyellow": true,
    "grey": true,
    "honeydew": true,
    "hotpink": true,
    "indianred": true,
    "indigo": true,
    "ivory": true,
    "khaki": true,
    "lavender": true,
    "lavenderblush": true,
    "lawngreen": true,
    "lemonchiffon": true,
    "lightblue": true,
    "lightcoral": true,
    "lightcyan": true,
    "lightgoldenrodyellow": true,
    "lightgray": true,
    "lightgreen": true,
    "lightgrey": true,
    "lightpink": true,
    "lightsalmon": true,
    "lightseagreen": true,
    "lightskyblue": true,
    "lightslategray": true,
    "lightslategrey": true,
    "lightsteelblue": true,
    "lightyellow": true,
    "lime": true,
    "limegreen": true,
    "linen": true,
    "magenta": true,
    "maroon": true,
    "mediumaquamarine": true,
    "mediumblue": true,
    "mediumorchid": true,
    "mediumpurple": true,
    "mediumseagreen": true,
    "mediumslateblue": true,
    "mediumspringgreen": true,
    "mediumturquoise": true,
    "mediumvioletred": true,
    "midnightblue": true,
    "mintcream": true,
    "mistyrose": true,
    "moccasin": true,
    "navajowhite": true,
    "navy": true,
    "oldlace": true,
    "olive": true,
    "olivedrab": true,
    "orange": true,
    "orangered": true,
    "orchid": true,
    "palegoldenrod": true,
    "palegreen": true,
    "paleturquoise": true,
    "palevioletred": true,
    "papayawhip": true,
    "peachpuff": true,
    "peru": true,
    "pink": true,
    "plum": true,
    "powderblue": true,
    "purple": true,
    "red": true,
    "rosybrown": true,
    "royalblue": true,
    "saddlebrown": true,
    "salmon": true,
    "sandybrown": true,
    "seagreen": true,
    "seashell": true,
    "sienna": true,
    "silver": true,
    "skyblue": true,
    "slateblue": true,
    "slategray": true,
    "slategrey": true,
    "snow": true,
    "springgreen": true,
    "steelblue": true,
    "tan": true,
    "teal": true,
    "thistle": true,
    "tomato": true,
    "turquoise": true,
    "violet": true,
    "wheat": true,
    "white": true,
    "whitesmoke": true,
    "yellow": true,
    "yellowgreen": true,
  
    "activeborder": true,
    "activecaption": true,
    "appworkspace": true,
    "background": true,
    "buttonface": true,
    "buttonhighlight": true,
    "buttonshadow": true,
    "buttontext": true,
    "captiontext": true,
    "graytext": true,
    "highlight": true,
    "highlighttext": true,
    "inactiveborder": true,
    "inactivecaption": true,
    "inactivecaptiontext": true,
    "infobackground": true,
    "infotext": true,
    "menu": true,
    "menutext": true,
    "scrollbar": true,
    "threeddarkshadow": true,
    "threedface": true,
    "threedhighlight": true,
    "threedlightshadow": true,
    "threedshadow": true,
    "window": true,
    "windowframe": true,
    "windowtext": true
  },

  kLIST_STYLE_TYPE_NAMES: {
    "decimal": true,
    "decimal-leading-zero": true,
    "lower-roman": true,
    "upper-roman": true,
    "georgian": true,
    "armenian": true,
    "lower-latin": true,
    "lower-alpha": true,
    "upper-latin": true,
    "upper-alpha": true,
    "lower-greek": true,

    "disc": true,
    "circle": true,
    "square": true,
    "none": true,
    
    /* CSS 3 */
    "box": true,
    "check": true,
    "diamond": true,
    "hyphen": true,

    "lower-armenian": true,
    "cjk-ideographic": true,
    "ethiopic-numeric": true,
    "hebrew": true,
    "japanese-formal": true,
    "japanese-informal": true,
    "simp-chinese-formal": true,
    "simp-chinese-informal": true,
    "syriac": true,
    "tamil": true,
    "trad-chinese-formal": true,
    "trad-chinese-informal": true,
    "upper-armenian": true,
    "arabic-indic": true,
    "binary": true,
    "bengali": true,
    "cambodian": true,
    "khmer": true,
    "devanagari": true,
    "gujarati": true,
    "gurmukhi": true,
    "kannada": true,
    "lower-hexadecimal": true,
    "lao": true,
    "malayalam": true,
    "mongolian": true,
    "myanmar": true,
    "octal": true,
    "oriya": true,
    "persian": true,
    "urdu": true,
    "telugu": true,
    "tibetan": true,
    "upper-hexadecimal": true,
    "afar": true,
    "ethiopic-halehame-aa-et": true,
    "ethiopic-halehame-am-et": true,
    "amharic-abegede": true,
    "ehiopic-abegede-am-et": true,
    "cjk-earthly-branch": true,
    "cjk-heavenly-stem": true,
    "ethiopic": true,
    "ethiopic-abegede": true,
    "ethiopic-abegede-gez": true,
    "hangul-consonant": true,
    "hangul": true,
    "hiragana-iroha": true,
    "hiragana": true,
    "katakana-iroha": true,
    "katakana": true,
    "lower-norwegian": true,
    "oromo": true,
    "ethiopic-halehame-om-et": true,
    "sidama": true,
    "ethiopic-halehame-sid-et": true,
    "somali": true,
    "ethiopic-halehame-so-et": true,
    "tigre": true,
    "ethiopic-halehame-tig": true,
    "tigrinya-er-abegede": true,
    "ethiopic-abegede-ti-er": true,
    "tigrinya-et": true,
    "ethiopic-halehame-ti-et": true,
    "upper-greek": true,
    "asterisks": true,
    "footnotes": true,
    "circled-decimal": true,
    "circled-lower-latin": true,
    "circled-upper-latin": true,
    "dotted-decimal": true,
    "double-circled-decimal": true,
    "filled-circled-decimal": true,
    "parenthesised-decimal": true,
    "parenthesised-lower-latin": true
  },

  reportError: function(aMsg) {
    this.mError = aMsg;
  },

  consumeError: function() {
    var e = this.mError;
    this.mError = null;
    return e;
  },

  currentToken: function() {
    return this.mToken;
  },

  getHexValue: function() {
    this.mToken = this.mScanner.nextHexValue();
    return this.mToken;
  },

  getToken: function(aSkipWS, aSkipComment) {
    if (this.mLookAhead) {
      this.mToken = this.mLookAhead;
      this.mLookAhead = null;
      return this.mToken;
    }

    this.mToken = this.mScanner.nextToken();
    while (this.mToken &&
           ((aSkipWS && this.mToken.isWhiteSpace()) ||
            (aSkipComment && this.mToken.isComment())))
      this.mToken = this.mScanner.nextToken();
	return this.mToken;
  },

  lookAhead: function(aSkipWS, aSkipComment) {
    var preservedToken = this.mToken;
    this.mScanner.preserveState();
    var token = this.getToken(aSkipWS, aSkipComment);
    this.mScanner.restoreState();
    this.mToken = preservedToken;

    return token;
  },

  ungetToken: function() {
    this.mLookAhead = this.mToken;
  },

  addUnknownAtRule: function(aSheet, aString) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var blocks = [];
    var token = this.getToken(false, false);
    while (token.isNotNull()) {
      aString += token.value;
      if (token.isSymbol(";") && !blocks.length)
        break;
      else if (token.isSymbol("{")
               || token.isSymbol("(")
               || token.isSymbol("[")
               || token.type == "function") {
        blocks.push(token.isFunction() ? "(" : token.value);
      } else if (token.isSymbol("}")
                 || token.isSymbol(")")
                 || token.isSymbol("]")) {
        if (blocks.length) {
          var ontop = blocks[blocks.length - 1];
          if ((token.isSymbol("}") && ontop == "{")
              || (token.isSymbol(")") && ontop == "(")
              || (token.isSymbol("]") && ontop == "[")) {
            blocks.pop();
            if (!blocks.length && token.isSymbol("}"))
              break;
          }
        }
      }
      token = this.getToken(false, false);
    }

    this.addUnknownRule(aSheet, aString, currentLine);
  },

  addUnknownRule: function(aSheet, aString, aCurrentLine) {
    var errorMsg = this.consumeError();
    var rule = new jscsspErrorRule(errorMsg);
    rule.currentLine = aCurrentLine;
    rule.parsedCssText = aString;
    rule.parentStyleSheet = aSheet;
    aSheet.cssRules.push(rule);
  },

  addWhitespace: function(aSheet, aString) {
    var rule = new jscsspWhitespace();
    rule.parsedCssText = aString;
    rule.parentStyleSheet = aSheet;
    aSheet.cssRules.push(rule);
  },

  addComment: function(aSheet, aString) {
    var rule = new jscsspComment();
    rule.parsedCssText = aString;
    rule.parentStyleSheet = aSheet;
    aSheet.cssRules.push(rule);
  },

  parseCharsetRule: function(aToken, aSheet) {
    var s = aToken.value;
    var token = this.getToken(false, false);
    s += token.value;
    if (token.isWhiteSpace(" ")) {
      token = this.getToken(false, false);
      s += token.value;
      if (token.isString()) {
        var encoding = token.value;
        token = this.getToken(false, false);
        s += token.value;
        if (token.isSymbol(";")) {
          var rule = new jscsspCharsetRule();
          rule.encoding = encoding;
          rule.parsedCssText = s;
          rule.parentStyleSheet = aSheet;
          aSheet.cssRules.push(rule);
          return true;
        }
        else
          this.reportError(kCHARSET_RULE_MISSING_SEMICOLON);
      }
      else
        this.reportError(kCHARSET_RULE_CHARSET_IS_STRING);
    }
    else
      this.reportError(kCHARSET_RULE_MISSING_WS);

    this.addUnknownAtRule(aSheet, s);
    return false;
  },

  parseImportRule: function(aToken, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    this.preserveState();
    var token = this.getToken(true, true);
    var media = [];
    var href = "";
    if (token.isString()) {
      href = token.value;
      s += " " + href;
    }
    else if (token.isFunction("url(")) {
      token = this.getToken(true, true);
      var urlContent = this.parseURL(token);
      if (urlContent) {
        href = "url(" + urlContent;
        s += " " + href;
      }
    }
    else
      this.reportError(kIMPORT_RULE_MISSING_URL);

    if (href) {
      token = this.getToken(true, true);
      while (token.isIdent()) {
        s += " " + token.value;
        media.push(token.value);
        token = this.getToken(true, true);
        if (!token)
          break;
        if (token.isSymbol(",")) {
          s += ",";
        } else if (token.isSymbol(";")) {
          break;
        } else
          break;
        token = this.getToken(true, true);
      }

      if (!media.length) {
        media.push("all");
      }
  
      if (token.isSymbol(";")) {
        s += ";"
        this.forgetState();
        var rule = new jscsspImportRule();
        rule.currentLine = currentLine;
        rule.parsedCssText = s;
        rule.href = href;
        rule.media = media;
        rule.parentStyleSheet = aSheet;
        aSheet.cssRules.push(rule);
        return true;
      }
    }

    this.restoreState();
    this.addUnknownAtRule(aSheet, "@import");
    return false;
  },

  parseVariablesRule: function(token, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = token.value;
    var declarations = [];
    var valid = false;
    this.preserveState();
    token = this.getToken(true, true);
    var media = [];
    var foundMedia = false;
    while (token.isNotNull()) {
      if (token.isIdent()) {
        foundMedia = true;
        s += " " + token.value;
        media.push(token.value);
        token = this.getToken(true, true);
        if (token.isSymbol(",")) {
          s += ",";
        } else {
          if (token.isSymbol("{"))
            this.ungetToken();
          else {
            // error...
            token.type = jscsspToken.NULL_TYPE;
            break;
          }
        }
      } else if (token.isSymbol("{"))
        break;
      else if (foundMedia) {
        token.type = jscsspToken.NULL_TYPE;
        // not a media list
        break;
      }
      token = this.getToken(true, true);
    }

    if (token.isSymbol("{")) {
      s += " {";
      token = this.getToken(true, true);
      while (true) {
        if (!token.isNotNull()) {
          valid = true;
          break;
        }
        if (token.isSymbol("}")) {
          s += "}";
          valid = true;
          break;
        } else {
          var d = this.parseDeclaration(token, declarations, true, false, aSheet);
          s += ((d && declarations.length) ? " " : "") + d;
        }
        token = this.getToken(true, false);
      }
    }
    if (valid) {
      this.forgetState();
      var rule = new jscsspVariablesRule();
      rule.currentLine = currentLine;
      rule.parsedCssText = s;
      rule.declarations = declarations;
      rule.media = media;
      rule.parentStyleSheet = aSheet;
      aSheet.cssRules.push(rule)
      return true;
    }
    this.restoreState();
    return false;
  },

  parseNamespaceRule: function(aToken, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    var valid = false;
    this.preserveState();
    var token = this.getToken(true, true);
    if (token.isNotNull()) {
      var prefix = "";
      var url = "";
      if (token.isIdent()) {
        prefix = token.value;
        s += " " + prefix;
        token = this.getToken(true, true);
      }
      if (token) {
        var foundURL = false;
        if (token.isString()) {
          foundURL = true;
          url = token.value;
          s += " " + url;
        } else if (token.isFunction("url(")) {
          // get a url here...
          token = this.getToken(true, true);
          var urlContent = this.parseURL(token);
          if (urlContent) {
            url += "url(" + urlContent;
            foundURL = true;
            s += " " + urlContent;
          }
        }
      }
      if (foundURL) {
        token = this.getToken(true, true);
        if (token.isSymbol(";")) {
          s += ";";
          this.forgetState();
          var rule = new jscsspNamespaceRule();
          rule.currentLine = currentLine;
          rule.parsedCssText = s;
          rule.prefix = prefix;
          rule.url = url;
          rule.parentStyleSheet = aSheet;
          aSheet.cssRules.push(rule);
          return true;
        }
      }

    }
    this.restoreState();
    this.addUnknownAtRule(aSheet, "@namespace");
    return false;
  },

  parseFontFaceRule: function(aToken, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    var valid = false;
    var descriptors = [];
    this.preserveState();
    var token = this.getToken(true, true);
    if (token.isNotNull()) {
      // expecting block start
      if (token.isSymbol("{")) {
        s += " " + token.value;
        var token = this.getToken(true, false);
        while (true) {
          if (token.isSymbol("}")) {
            s += "}";
            valid = true;
            break;
          } else {
            var d = this.parseDeclaration(token, descriptors, false, false, aSheet);
            s += ((d && descriptors.length) ? " " : "") + d;
          }
          token = this.getToken(true, false);
        }
      }
    }
    if (valid) {
      this.forgetState();
      var rule = new jscsspFontFaceRule();
      rule.currentLine = currentLine;
      rule.parsedCssText = s;
      rule.descriptors = descriptors;
      rule.parentStyleSheet = aSheet;
      aSheet.cssRules.push(rule)
      return true;
    }
    this.restoreState();
    return false;
  },

  parsePageRule: function(aToken, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    var valid = false;
    var declarations = [];
    this.preserveState();
    var token = this.getToken(true, true);
    var pageSelector = "";
    if (token.isSymbol(":") || token.isIdent()) {
      if (token.isSymbol(":")) {
        pageSelector = ":";
        token = this.getToken(false, false);
      }
      if (token.isIdent()) {
        pageSelector += token.value;
        s += " " + pageSelector;
        token = this.getToken(true, true);
      }
    }
    if (token.isNotNull()) {
      // expecting block start
      if (token.isSymbol("{")) {
        s += " " + token.value;
        var token = this.getToken(true, false);
        while (true) {
          if (token.isSymbol("}")) {
            s += "}";
            valid = true;
            break;
          } else {
            var d = this.parseDeclaration(token, declarations, true, true, aSheet);
            s += ((d && declarations.length) ? " " : "") + d;
          }
          token = this.getToken(true, false);
        }
      }
    }
    if (valid) {
      this.forgetState();
      var rule = new jscsspPageRule();
      rule.currentLine = currentLine;
      rule.parsedCssText = s;
      rule.pageSelector = pageSelector;
      rule.declarations = declarations;
      rule.parentStyleSheet = aSheet;
      aSheet.cssRules.push(rule)
      return true;
    }
    this.restoreState();
    return false;
  },

  parseDefaultPropertyValue: function(token, aDecl, aAcceptPriority, descriptor, aSheet) {
    var valueText = "";
    var blocks = [];
    var foundPriority = false;
    var values = [];
    while (token.isNotNull()) {

      if ((token.isSymbol(";")
           || token.isSymbol("}")
           || token.isSymbol("!"))
          && !blocks.length) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }
  
      if (token.isIdent(this.kINHERIT)) {
        if (values.length) {
          return "";
        }
        else {
          valueText = this.kINHERIT;
          var value = new jscsspVariable(kJscsspINHERIT_VALUE, aSheet);
          values.push(value);
          token = this.getToken(true, true);
          break;
        }
      }
      else if (token.isSymbol("{")
                 || token.isSymbol("(")
                 || token.isSymbol("[")) {
        blocks.push(token.value);
      }
      else if (token.isSymbol("}")
                 || token.isSymbol("]")) {
        if (blocks.length) {
          var ontop = blocks[blocks.length - 1];
          if ((token.isSymbol("}") && ontop == "{")
              || (token.isSymbol(")") && ontop == "(")
              || (token.isSymbol("]") && ontop == "[")) {
            blocks.pop();
          }
        }
      }
      // XXX must find a better way to store individual values
      // probably a |values: []| field holding dimensions, percentages
      // functions, idents, numbers and symbols, in that order.
      if (token.isFunction()) {
        if (token.isFunction("var(")) {
          token = this.getToken(true, true);
          if (token.isIdent()) {
            var name = token.value;
            token = this.getToken(true, true);
            if (token.isSymbol(")")) {
              var value = new jscsspVariable(kJscsspVARIABLE_VALUE, aSheet);
              valueText += "var(" + name + ")";
              value.name = name;
              values.push(value);
            }
            else
              return "";
          }
          else
            return "";
        }
        else {
          var fn = token.value;
          token = this.getToken(false, true);
          var arg = this.parseFunctionArgument(token);
          if (arg) {
            valueText += fn + arg;
            var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, aSheet);
            value.value = fn + arg;
            values.push(value);
          }
          else
            return "";
        }
      }
      else if (token.isSymbol("#")) {
        var color = this.parseColor(token);
        if (color) {
          valueText += color;
          var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, aSheet);
          value.value = color;
          values.push(value);
        }
        else
          return "";
      }
      else if (!token.isWhiteSpace() && !token.isSymbol(",")) {
        var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, aSheet);
        value.value = token.value;
        values.push(value);
        valueText += token.value;
      }
      else
        valueText += token.value;
      token = this.getToken(false, true);
    }
    if (values.length && valueText) {
      this.forgetState();
      aDecl.push(this._createJscsspDeclarationFromValuesArray(descriptor, values, valueText));
      return valueText;
    }
    return "";
  },

  parseMarginOrPaddingShorthand: function(token, aDecl, aAcceptPriority, aProperty)
  {
    var top = null;
    var bottom = null;
    var left = null;
    var right = null;

    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
        token = this.getToken(true, true);
        break;
      }

      else if (token.isDimension()
              || token.isNumber("0")
              || token.isPercentage()
              || token.isIdent("auto")) {
        values.push(token.value);
      }
      else
        return "";

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        top = values[0];
        bottom = top;
        left = top;
        right = top;
        break;
      case 2:
        top = values[0];
        bottom = top;
        left = values[1];
        right = left;
        break;
      case 3:
        top = values[0];
        left = values[1];
        right = left;
        bottom = values[2];
        break;
      case 4:
        top = values[0];
        right = values[1];
        bottom = values[2];
        left = values[3];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-top", top));
    aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-right", right));
    aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-bottom", bottom));
    aDecl.push(this._createJscsspDeclarationFromValue(aProperty + "-left", left));
   return top + " " + right + " " + bottom + " " + left;
  },

  parseBorderColorShorthand: function(token, aDecl, aAcceptPriority)
  {
    var top = null;
    var bottom = null;
    var left = null;
    var right = null;

    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
        token = this.getToken(true, true);
        break;
      }
      
      else {
        var color = this.parseColor(token);
        if (color)
          values.push(color);
        else
          return "";
      }

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        top = values[0];
        bottom = top;
        left = top;
        right = top;
        break;
      case 2:
        top = values[0];
        bottom = top;
        left = values[1];
        right = left;
        break;
      case 3:
        top = values[0];
        left = values[1];
        right = left;
        bottom = values[2];
        break;
      case 4:
        top = values[0];
        right = values[1];
        bottom = values[2];
        left = values[3];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue("border-top-color", top));
    aDecl.push(this._createJscsspDeclarationFromValue("border-right-color", right));
    aDecl.push(this._createJscsspDeclarationFromValue("border-bottom-color", bottom));
    aDecl.push(this._createJscsspDeclarationFromValue("border-left-color", left));
    return top + " " + right + " " + bottom + " " + left;
  },

  parseCueShorthand: function(token, declarations, aAcceptPriority)
  {
    var before = "";
    var after = "";

    var values = [];
    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
      }

      else if (token.isIdent("none"))
        values.push(token.value);

        else if (token.isFunction("url(")) {
        var token = this.getToken(true, true);
        var urlContent = this.parseURL(token);
        if (urlContent)
          values.push("url(" + urlContent);
        else
          return "";
      }
      else
        return "";

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        before = values[0];
        after = before;
        break;
      case 2:
        before = values[0];
        after = values[1];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue("cue-before", before));
    aDecl.push(this._createJscsspDeclarationFromValue("cue-after", after));
    return before + " " + after;
  },

  parsePauseShorthand: function(token, declarations, aAcceptPriority)
  {
    var before = "";
    var after = "";

    var values = [];
    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
      }

      else if (token.isDimensionOfUnit("ms")
               || token.isDimensionOfUnit("s")
               || token.isPercentage()
               || token.isNumber("0"))
        values.push(token.value);
      else
        return "";

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        before = values[0];
        after = before;
        break;
      case 2:
        before = values[0];
        after = values[1];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue("pause-before", before));
    aDecl.push(this._createJscsspDeclarationFromValue("pause-after", after));
    return before + " " + after;
  },

  parseBorderWidthShorthand: function(token, aDecl, aAcceptPriority)
  {
    var top = null;
    var bottom = null;
    var left = null;
    var right = null;

    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
      }
      
      else if (token.isDimension()
               || token.isNumber("0")
               || (token.isIdent() && token.value in this.kBORDER_WIDTH_NAMES)) {
        values.push(token.value);
      }
      else
        return "";

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        top = values[0];
        bottom = top;
        left = top;
        right = top;
        break;
      case 2:
        top = values[0];
        bottom = top;
        left = values[1];
        right = left;
        break;
      case 3:
        top = values[0];
        left = values[1];
        right = left;
        bottom = values[2];
        break;
      case 4:
        top = values[0];
        right = values[1];
        bottom = values[2];
        left = values[3];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue("border-top-width", top));
    aDecl.push(this._createJscsspDeclarationFromValue("border-right-width", right));
    aDecl.push(this._createJscsspDeclarationFromValue("border-bottom-width", bottom));
    aDecl.push(this._createJscsspDeclarationFromValue("border-left-width", left));
    return top + " " + right + " " + bottom + " " + left;
  },

  parseBorderStyleShorthand: function(token, aDecl, aAcceptPriority)
  {
    var top = null;
    var bottom = null;
    var left = null;
    var right = null;

    var values = [];
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!values.length && token.isIdent(this.kINHERIT)) {
        values.push(token.value);
      }
      
      else if (token.isIdent() && token.value in this.kBORDER_STYLE_NAMES) {
        values.push(token.value);
      }
      else
        return "";

      token = this.getToken(true, true);
    }

    var count = values.length;
    switch (count) {
      case 1:
        top = values[0];
        bottom = top;
        left = top;
        right = top;
        break;
      case 2:
        top = values[0];
        bottom = top;
        left = values[1];
        right = left;
        break;
      case 3:
        top = values[0];
        left = values[1];
        right = left;
        bottom = values[2];
        break;
      case 4:
        top = values[0];
        right = values[1];
        bottom = values[2];
        left = values[3];
        break;
      default:
        return "";
    }
    this.forgetState();
    aDecl.push(this._createJscsspDeclarationFromValue("border-top-style", top));
    aDecl.push(this._createJscsspDeclarationFromValue("border-right-style", right));
    aDecl.push(this._createJscsspDeclarationFromValue("border-bottom-style", bottom));
    aDecl.push(this._createJscsspDeclarationFromValue("border-left-style", left));
    return top + " " + right + " " + bottom + " " + left;
  },

  parseBorderEdgeOrOutlineShorthand: function(token, aDecl, aAcceptPriority, aProperty)
  {
    var bWidth = null;
    var bStyle = null;
    var bColor = null;

    while (true) {
      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!bWidth && !bStyle && !bColor
               && token.isIdent(this.kINHERIT)) {
        bWidth = this.kINHERIT;
        bStyle = this.kINHERIT;
        bColor = this.kINHERIT;
      }

      else if (!bWidth &&
               (token.isDimension()
                || (token.isIdent() && token.value in this.kBORDER_WIDTH_NAMES)
                || token.isNumber("0"))) {
        bWidth = token.value;
      }

      else if (!bStyle &&
               (token.isIdent() && token.value in this.kBORDER_STYLE_NAMES)) {
        bStyle = token.value;
      }

      else {
        var color = (aProperty == "outline" && token.isIdent("invert"))
                    ? "invert" : this.parseColor(token);
        if (!bColor && color)
          bColor = color;
        else
          return "";
      }
      token = this.getToken(true, true);
    }

    // create the declarations
    this.forgetState();
    bWidth = bWidth ? bWidth : "medium";
    bStyle = bStyle ? bStyle : "none";
    bColor = bColor ? bColor : "-moz-initial";

    function addPropertyToDecl(aSelf, aDecl, property, w, s, c) {
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-width", w));
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-style", s));
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-color", c));
    }

    if (aProperty == "border") {
      addPropertyToDecl(this, aDecl, "border-top", bWidth, bStyle, bColor);
      addPropertyToDecl(this, aDecl, "border-right", bWidth, bStyle, bColor);
      addPropertyToDecl(this, aDecl, "border-bottom", bWidth, bStyle, bColor);
      addPropertyToDecl(this, aDecl, "border-left", bWidth, bStyle, bColor);
    }
    else
      addPropertyToDecl(this, aDecl, aProperty, bWidth, bStyle, bColor);
    return bWidth + " " + bStyle + " " + bColor;
  },

  parseBackgroundShorthand: function(token, aDecl, aAcceptPriority)
  {
    var kHPos = {"left": true, "right": true };

    var kVPos = {"top": true, "bottom": true };
    var kPos = {"left": true, "right": true, "top": true, "bottom": true, "center": true};

    var bgColor = null;
    var bgRepeat = null;
    var bgAttachment = null;
    var bgImage = null;
    var bgPosition = null;

    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!bgColor && !bgRepeat && !bgAttachment && !bgImage && !bgPosition
               && token.isIdent(this.kINHERIT)) {
        bgColor = this.kINHERIT;
        bgRepeat = this.kINHERIT;
        bgAttachment = this.kINHERIT;
        bgImage = this.kINHERIT;
        bgPosition = this.kINHERIT;
      }

      else {
        if (!bgAttachment &&
            (token.isIdent("scroll")
             || token.isIdent("fixed"))) {
          bgAttachment = token.value;
        }

        else if (!bgPosition &&
                 ((token.isIdent() && token.value in kPos)
                  || token.isDimension()
                  || token.isNumber("0")
                  || token.isPercentage())) {
          bgPosition = token.value;
          token = this.getToken(true, true);
          if (token.isDimension() || token.isNumber("0") || token.isPercentage()) {
            bgPosition += " " + token.value;
          }
          else if (token.isIdent() && token.value in kPos) {
            if ((bgPosition in kHPos && token.value in kHPos) ||
                (bgPosition in kVPos && token.value in kVPos))
              return "";
            bgPosition += " " + token.value;
          }
          else {
            this.ungetToken();
            bgPosition += " center";
          }
        }

        else if (!bgRepeat &&
                 (token.isIdent("repeat")
                  || token.isIdent("repeat-x")
                  || token.isIdent("repeat-y")
                  || token.isIdent("no-repeat"))) {
          bgRepeat = token.value;
        }

        else if (!bgImage &&
                 (token.isFunction("url(")
                  || token.isIdent("none"))) {
          bgImage = token.value;
          if (token.isFunction("url(")) {
            token = this.getToken(true, true);
            var url = this.parseURL(token); // TODO
            if (url)
              bgImage += url;
            else
              return "";
          }
        }

        else if (!bgImage &&
                 (token.isFunction("-moz-linear-gradient(")
                  || token.isFunction("-moz-radial-gradient(")
                  || token.isFunction("-moz-repeating-linear-gradient(")
                  || token.isFunction("-moz-repeating-radial-gradient("))) {
          var gradient = CssInspector.parseGradient(this, token);
          if (gradient)
            bgImage = CssInspector.serializeGradient(gradient);
          else
            return "";
        }

        else {
          var color = this.parseColor(token);
          if (!bgColor && color)
            bgColor = color;
          else
            return "";
        }

      }

      token = this.getToken(true, true);
    }

    // create the declarations
    this.forgetState();
    bgColor = bgColor ? bgColor : "transparent";
    bgImage = bgImage ? bgImage : "none";
    bgRepeat = bgRepeat ? bgRepeat : "repeat";
    bgAttachment = bgAttachment ? bgAttachment : "scroll";
    bgPosition = bgPosition ? bgPosition : "top left";

    aDecl.push(this._createJscsspDeclarationFromValue("background-color", bgColor));
    aDecl.push(this._createJscsspDeclarationFromValue("background-image", bgImage));
    aDecl.push(this._createJscsspDeclarationFromValue("background-repeat", bgRepeat));
    aDecl.push(this._createJscsspDeclarationFromValue("background-attachment", bgAttachment));
    aDecl.push(this._createJscsspDeclarationFromValue("background-position", bgPosition));
    return bgColor + " " + bgImage + " " + bgRepeat + " " + bgAttachment + " " + bgPosition;
  },

  parseListStyleShorthand: function(token, aDecl, aAcceptPriority)
  {
    var kPosition = { "inside": true, "outside": true };

    var lType = null;
    var lPosition = null;
    var lImage = null;

    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!lType && !lPosition && ! lImage
               && token.isIdent(this.kINHERIT)) {
        lType = this.kINHERIT;
        lPosition = this.kINHERIT;
        lImage = this.kINHERIT;
      }

      else if (!lType &&
               (token.isIdent() && token.value in this.kLIST_STYLE_TYPE_NAMES)) {
        lType = token.value;
      }

      else if (!lPosition &&
               (token.isIdent() && token.value in kPosition)) {
        lPosition = token.value;
      }

      else if (!lImage && token.isFunction("url")) {
        token = this.getToken(true, true);
        var urlContent = this.parseURL(token);
        if (urlContent) {
          lImage = "url(" + urlContent;
        }
        else
          return "";
      }
      else if (!token.isIdent("none"))
        return "";

      token = this.getToken(true, true);
    }

    // create the declarations
    this.forgetState();
    lType = lType ? lType : "none";
    lImage = lImage ? lImage : "none";
    lPosition = lPosition ? lPosition : "outside";

    aDecl.push(this._createJscsspDeclarationFromValue("list-style-type", lType));
    aDecl.push(this._createJscsspDeclarationFromValue("list-style-position", lPosition));
    aDecl.push(this._createJscsspDeclarationFromValue("list-style-image", lImage));
    return lType + " " + lPosition + " " + lImage;
  },

  parseFontShorthand: function(token, aDecl, aAcceptPriority)
  {
    var kStyle = {"italic": true, "oblique": true };
    var kVariant = {"small-caps": true };
    var kWeight = { "bold": true, "bolder": true, "lighter": true,
                      "100": true, "200": true, "300": true, "400": true,
                      "500": true, "600": true, "700": true, "800": true,
                      "900": true };
    var kSize = { "xx-small": true, "x-small": true, "small": true, "medium": true,
                    "large": true, "x-large": true, "xx-large": true,
                    "larger": true, "smaller": true };
    var kValues = { "caption": true, "icon": true, "menu": true, "message-box": true, "small-caption": true, "status-bar": true };
    var kFamily = { "serif": true, "sans-serif": true, "cursive": true, "fantasy": true, "monospace": true };

    var fStyle = null;
    var fVariant = null;
    var fWeight = null;
    var fSize = null;
    var fLineHeight = null;
    var fFamily = "";
    var fSystem = null;
    var fFamilyValues = [];

    var normalCount = 0;
    while (true) {

      if (!token.isNotNull())
        break;

      if (token.isSymbol(";")
          || (aAcceptPriority && token.isSymbol("!"))
          || token.isSymbol("}")) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      }

      else if (!fStyle && !fVariant && !fWeight
               && !fSize && !fLineHeight && !fFamily
               && !fSystem
               && token.isIdent(this.kINHERIT)) {
        fStyle = this.kINHERIT;
        fVariant = this.kINHERIT;
        fWeight = this.kINHERIT;
        fSize = this.kINHERIT;
        fLineHeight = this.kINHERIT;
        fFamily = this.kINHERIT;
        fSystem = this.kINHERIT;
      }

      else {
        if (!fSystem && (token.isIdent() && token.value in kValues)) {
          fSystem = token.value;
          break;
        }

        else {
          if (!fStyle
                   && token.isIdent()
                   && (token.value in kStyle)) {
            fStyle = token.value;
          }
  
          else if (!fVariant
                   && token.isIdent()
                   && (token.value in kVariant)) {
            fVariant = token.value;
          }
  
          else if (!fWeight
                   && (token.isIdent() || token.isNumber())
                   && (token.value in kWeight)) {
            fWeight = token.value;
          }
  
          else if (!fSize
                   && ((token.isIdent() && (token.value in kSize))
                       || token.isDimension()
                       || token.isPercentage())) {
            fSize = token.value;
            var token = this.getToken(false, false);
            if (token.isSymbol("/")) {
              token = this.getToken(false, false);
              if (!fLineHeight &&
                  (token.isDimension() || token.isNumber() || token.isPercentage())) {
                fLineHeight = token.value;
              }
              else
                return "";
            }
            else
              this.ungetToken();
          }

          else if (token.isIdent("normal")) {
            normalCount++;
            if (normalCount > 3)
              return "";
          }

          else if (!fFamily && // *MUST* be last to be tested here
                   (token.isString()
                    || token.isIdent())) {
            var lastWasComma = false;
            while (true) {
              if (!token.isNotNull())
                break;
              else if (token.isSymbol(";")
                  || (aAcceptPriority && token.isSymbol("!"))
                  || token.isSymbol("}")) {
                this.ungetToken();
                break;
              }
              else if (token.isIdent() && token.value in kFamily) {
                var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
                value.value = token.value;
                fFamilyValues.push(value);
                fFamily += token.value;
                break;
              }
              else if (token.isString() || token.isIdent()) {
                var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
                value.value = token.value;
                fFamilyValues.push(value);
                fFamily += token.value;
                lastWasComma = false;
              }
              else if (!lastWasComma && token.isSymbol(",")) {
                fFamily += ", ";
                lastWasComma = true;
              }
              else
                return "";
              token = this.getToken(true, true);
            }
          }

          else {
            return "";
          }
        }

      }

      token = this.getToken(true, true);
    }

    // create the declarations
    this.forgetState();
    if (fSystem) {
      aDecl.push(this._createJscsspDeclarationFromValue("font", fSystem));
      return fSystem;
    }
    fStyle = fStyle ? fStyle : "normal";
    fVariant = fVariant ? fVariant : "normal";
    fWeight = fWeight ? fWeight : "normal";
    fSize = fSize ? fSize : "medium";
    fLineHeight = fLineHeight ? fLineHeight : "normal";
    fFamily = fFamily ? fFamily : "-moz-initial";

    aDecl.push(this._createJscsspDeclarationFromValue("font-style", fStyle));
    aDecl.push(this._createJscsspDeclarationFromValue("font-variant", fVariant));
    aDecl.push(this._createJscsspDeclarationFromValue("font-weight", fWeight));
    aDecl.push(this._createJscsspDeclarationFromValue("font-size", fSize));
    aDecl.push(this._createJscsspDeclarationFromValue("line-height", fLineHeight));
    aDecl.push(this._createJscsspDeclarationFromValuesArray("font-family", fFamilyValues, fFamily));
    return fStyle + " " + fVariant + " " + fWeight + " " + fSize + "/" + fLineHeight + " " + fFamily;
  },

  _createJscsspDeclaration: function(property, value)
  {
    var decl = new jscsspDeclaration();
    decl.property = property;
    decl.value = this.trim11(value);
    decl.parsedCssText = property + ": " + value + ";";
    return decl;
  },

  _createJscsspDeclarationFromValue: function(property, valueText)
  {
    var decl = new jscsspDeclaration();
    decl.property = property;
    var value = new jscsspVariable(kJscsspPRIMITIVE_VALUE, null);
    value.value = valueText;
    decl.values = [value];
    decl.valueText = valueText;
    decl.parsedCssText = property + ": " + valueText + ";";
    return decl;
  },

  _createJscsspDeclarationFromValuesArray: function(property, values, valueText)
  {
    var decl = new jscsspDeclaration();
    decl.property = property;
    decl.values = values;
    decl.valueText = valueText;
    decl.parsedCssText = property + ": " + valueText + ";";
    return decl;
  },

  parseURL: function(token)
  {
    var value = "";
    if (token.isString())
    {
      value += token.value;
      token = this.getToken(true, true);
    }
    else
      while (true)
      {
        if (!token.isNotNull()) {
          this.reportError(kURL_EOF);
          return "";
        }
        if (token.isWhiteSpace()) {
          nextToken = this.lookAhead(true, true);
          // if next token is not a closing parenthesis, that's an error
          if (!nextToken.isSymbol(")")) {
            this.reportError(kURL_WS_INSIDE);
            token = this.currentToken();
            break;
          }
        }
        if (token.isSymbol(")")) {
          break;
        }
        value += token.value;
        token = this.getToken(false, false);
      }

    if (token.isSymbol(")")) {
      return value + ")";
    }
    return "";
  },

  parseFunctionArgument: function(token)
  {
    var value = "";
    if (token.isString())
    {
      value += token.value;
      token = this.getToken(true, true);
    }
    else {
      var parenthesis = 1;
      while (true)
      {
        if (!token.isNotNull())
          return "";
        if (token.isFunction() || token.isSymbol("("))
          parenthesis++;
        if (token.isSymbol(")")) {
          parenthesis--;
          if (!parenthesis)
            break;
        }
        value += token.value;
        token = this.getToken(false, false);
      }
    }

    if (token.isSymbol(")"))
      return value + ")";
    return "";
  },

  parseColor: function(token)
  {
    var color = "";
    if (token.isFunction("rgb(")
        || token.isFunction("rgba(")) {
      color = token.value;
      var isRgba = token.isFunction("rgba(")
      token = this.getToken(true, true);
      if (!token.isNumber() && !token.isPercentage())
        return "";
      color += token.value;
      token = this.getToken(true, true);
      if (!token.isSymbol(","))
        return "";
      color += ", ";
  
      token = this.getToken(true, true);
      if (!token.isNumber() && !token.isPercentage())
        return "";
      color += token.value;
      token = this.getToken(true, true);
      if (!token.isSymbol(","))
        return "";
      color += ", ";
  
      token = this.getToken(true, true);
      if (!token.isNumber() && !token.isPercentage())
        return "";
      color += token.value;
  
      if (isRgba) {
        token = this.getToken(true, true);
        if (!token.isSymbol(","))
          return "";
        color += ", ";
  
        token = this.getToken(true, true);
        if (!token.isNumber())
          return "";
        color += token.value;
      }
  
      token = this.getToken(true, true);
      if (!token.isSymbol(")"))
        return "";
      color += token.value;
    }
  
    else if (token.isFunction("hsl(")
             || token.isFunction("hsla(")) {
      color = token.value;
      var isHsla = token.isFunction("hsla(")
      token = this.getToken(true, true);
      if (!token.isNumber())
        return "";
      color += token.value;
      token = this.getToken(true, true);
      if (!token.isSymbol(","))
        return "";
      color += ", ";
  
      token = this.getToken(true, true);
      if (!token.isPercentage())
        return "";
      color += token.value;
      token = this.getToken(true, true);
      if (!token.isSymbol(","))
        return "";
      color += ", ";
  
      token = this.getToken(true, true);
      if (!token.isPercentage())
        return "";
      color += token.value;
  
      if (isHsla) {
        token = this.getToken(true, true);
        if (!token.isSymbol(","))
          return "";
        color += ", ";
  
        token = this.getToken(true, true);
        if (!token.isNumber())
          return "";
        color += token.value;
      }
  
      token = this.getToken(true, true);
      if (!token.isSymbol(")"))
        return "";
      color += token.value;
    }

    else if (token.isIdent()
             && (token.value in this.kCOLOR_NAMES))
      color = token.value;

    else if (token.isSymbol("#")) {
      token = this.getHexValue();
      if (!token.isHex())
        return "";
      var length = token.value.length;
      if (length != 3 && length != 6)
        return "";
      if (token.value.match( /[a-fA-F0-9]/g ).length != length)
        return "";
      color = "#" + token.value;
    }
    return color;
  },

  parseDeclaration: function(aToken, aDecl, aAcceptPriority, aExpandShorthands, aSheet) {
    this.preserveState();
    var blocks = [];
    if (aToken.isIdent()) {
      var descriptor = aToken.value.toLowerCase();
      var token = this.getToken(true, true);
      if (token.isSymbol(":")) {
        var token = this.getToken(true, true);

        var value = "";
        var declarations = [];
        if (aExpandShorthands)
          switch (descriptor) {
            case "background":
              value = this.parseBackgroundShorthand(token, declarations, aAcceptPriority);
              break;
            case "margin":
            case "padding":
              value = this.parseMarginOrPaddingShorthand(token, declarations, aAcceptPriority, descriptor);
              break;
            case "border-color":
              value = this.parseBorderColorShorthand(token, declarations, aAcceptPriority);
              break;
            case "border-style":
              value = this.parseBorderStyleShorthand(token, declarations, aAcceptPriority);
              break;
            case "border-width":
              value = this.parseBorderWidthShorthand(token, declarations, aAcceptPriority);
              break;
            case "border-top":
            case "border-right":
            case "border-bottom":
            case "border-left":
            case "border":
            case "outline":
              value = this.parseBorderEdgeOrOutlineShorthand(token, declarations, aAcceptPriority, descriptor);
              break;
            case "cue":
              value = this.parseCueShorthand(token, declarations, aAcceptPriority);
              break;
            case "pause":
              value = this.parsePauseShorthand(token, declarations, aAcceptPriority);
              break;
            case "font":
              value = this.parseFontShorthand(token, declarations, aAcceptPriority);
              break;
            case "list-style":
              value = this.parseListStyleShorthand(token, declarations, aAcceptPriority);
              break;
            default:
              value = this.parseDefaultPropertyValue(token, declarations, aAcceptPriority, descriptor, aSheet);
              break;
          }
        else
          value = this.parseDefaultPropertyValue(token, declarations, aAcceptPriority, descriptor, aSheet);
        token = this.currentToken();
        if (value) // no error above
        {
          var priority = false;
          if (token.isSymbol("!")) {
            token = this.getToken(true, true);
            if (token.isIdent("important")) {
              priority = true;
              token = this.getToken(true, true);
              if (token.isSymbol(";") || token.isSymbol("}")) {
                if (token.isSymbol("}"))
                  this.ungetToken();
              }
              else return "";
            }
            else return "";
          }
          else if  (token.isNotNull() && !token.isSymbol(";") && !token.isSymbol("}"))
            return "";
          for (var i = 0; i < declarations.length; i++) {
            declarations[i].priority = priority;
            aDecl.push(declarations[i]);
          }
          return descriptor + ": " + value + ";";
        }
      }
    }
    else if (aToken.isComment()) {
      if (this.mPreserveComments) {
        this.forgetState();
        var comment = new jscsspComment();
        comment.parsedCssText = aToken.value;
        aDecl.push(comment);
      }
      return aToken.value;
    }

    // we have an error here, let's skip it
    this.restoreState();
    var s = aToken.value;
    blocks = [];
    var token = this.getToken(false, false);
    while (token.isNotNull()) {
      s += token.value;
      if ((token.isSymbol(";") || token.isSymbol("}")) && !blocks.length) {
        if (token.isSymbol("}"))
          this.ungetToken();
        break;
      } else if (token.isSymbol("{")
                 || token.isSymbol("(")
                 || token.isSymbol("[")
                 || token.isFunction()) {
        blocks.push(token.isFunction() ? "(" : token.value);
      } else if (token.isSymbol("}")
                 || token.isSymbol(")")
                 || token.isSymbol("]")) {
        if (blocks.length) {
          var ontop = blocks[blocks.length - 1];
          if ((token.isSymbol("}") && ontop == "{")
              || (token.isSymbol(")") && ontop == "(")
              || (token.isSymbol("]") && ontop == "[")) {
            blocks.pop();
          }
        }
      }
      token = this.getToken(false, false);
    }
    return "";
  },

  parseKeyframesRule: function(aToken, aSheet) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    var valid = false;
    var keyframesRule = new jscsspKeyframesRule();
    keyframesRule.currentLine = currentLine;
    this.preserveState();
    var token = this.getToken(true, true);
    var foundName = false;
    while (token.isNotNull()) {
      if (token.isIdent()) {
        // should be the keyframes' name
        foundName = true;
        s += " " + token.value;
        keyframesRule.name = token.value;
        token = this.getToken(true, true);
        if (token.isSymbol("{"))
          this.ungetToken();
        else {
          // error...
          token.type = jscsspToken.NULL_TYPE;
          break;
        }
      }
      else if (token.isSymbol("{")) {
        if (!foundName) {
          token.type = jscsspToken.NULL_TYPE;
          // not a valid keyframes at-rule
        }
        break;
      }
      else {
        token.type = jscsspToken.NULL_TYPE;
        // not a valid keyframes at-rule
        break;
      }
      token = this.getToken(true, true);
    }

    if (token.isSymbol("{") && keyframesRule.name) {
      // ok let's parse keyframe rules now...
      s += " { ";
      token = this.getToken(true, false);
      while (token.isNotNull()) {
        if (token.isComment() && this.mPreserveComments) {
          s += " " + token.value;
          var comment = new jscsspComment();
          comment.parsedCssText = token.value;
          keyframesRule.cssRules.push(comment);
        } else if (token.isSymbol("}")) {
          valid = true;
          break;
        } else {
          var r = this.parseKeyframeRule(token, keyframesRule, true);
          if (r)
            s += r;
        }
        token = this.getToken(true, false);
      }
    }
    if (valid) {
      this.forgetState();
      keyframesRule.currentLine = currentLine;
      keyframesRule.parsedCssText = s;
      aSheet.cssRules.push(keyframesRule);
      return true;
    }
    this.restoreState();
    return false;
  },

  parseKeyframeRule: function(aToken, aOwner) {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    this.preserveState();
    var token = aToken;

    // find the keyframe keys
    var key = "";
    while (token.isNotNull()) {
      if (token.isIdent() || token.isPercentage()) {
        if (token.isIdent()
            && !token.isIdent("from")
            && !token.isIdent("to")) {
          key = "";
          break;
        }
        key += token.value;
        token = this.getToken(true, true);
        if (token.isSymbol("{")) {
          this.ungetToken();
          break;
        }
        else 
          if (token.isSymbol(",")) {
            key += ", ";
          }
          else {
            key = "";
            break;
          }
      }
      else {
        key = "";
        break;
      }
      token = this.getToken(true, true);
    }

    var valid = false;
    var declarations = [];
    if (key) {
      var s = key;
      token = this.getToken(true, true);
      if (token.isSymbol("{")) {
        s += " { ";
        token = this.getToken(true, false);
        while (true) {
          if (!token.isNotNull()) {
            valid = true;
            break;
          }
          if (token.isSymbol("}")) {
            s += "}";
            valid = true;
            break;
          } else {
            var d = this.parseDeclaration(token, declarations, true, true, aOwner);
            s += ((d && declarations.length) ? " " : "") + d;
          }
          token = this.getToken(true, false);
        }
      }
    }
    else {
      // key is invalid so the whole rule is invalid with it
    }

    if (valid) {
      var rule = new jscsspKeyframeRule();
      rule.currentLine = currentLine;
      rule.parsedCssText = s;
      rule.declarations = declarations;
      rule.keyText = key;
      rule.parentRule = aOwner;
      aOwner.cssRules.push(rule);
      return s;
    }
    this.restoreState();
    s = this.currentToken().value;
    this.addUnknownAtRule(aOwner, s);
    return "";
  },

  parseMediaRule: function(aToken, aSheet) {
	this.mScanner.mMediaQueryMode = true;
	var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    var s = aToken.value;
    var valid = false;
    var mediaRule = new jscsspMediaRule();
    mediaRule.currentLine = currentLine;
    this.preserveState();
    var token = this.getToken(true, true);
    var foundMedia = false;
    while (token.isNotNull()) {
      if (token.isIdent()) {
        foundMedia = true;
        s += " " + token.value;
  		mediaRule.media.push(token.value);
        token = this.getToken(true, true);
        if (token.isSymbol(",")) {
          s += ",";
        } else {
          if (token.isSymbol("{"))
            this.ungetToken();
          else {
            // error...
            token.type = jscsspToken.NULL_TYPE;
            break;
          }
        }
      }
      else if (token.isSymbol("{"))
        break;
      else if (foundMedia) {
        token.type = jscsspToken.NULL_TYPE;
        // not a media list
        break;
      }
      token = this.getToken(true, true);
    }
    if (token.isSymbol("{") && mediaRule.media.length) {
      // ok let's parse style rules now...
      s += " { ";
      token = this.getToken(true, false);
      while (token.isNotNull()) {
        if (token.isComment() && this.mPreserveComments) {
          s += " " + token.value;
          var comment = new jscsspComment();
          comment.parsedCssText = token.value;
          mediaRule.cssRules.push(comment);
        } else if (token.isSymbol("}")) {
          valid = true;
          break;
        } else {
          var r = this.parseStyleRule(token, mediaRule, true);
          if (r)
            s += r;
        }
        token = this.getToken(true, false);
      }
    }
	if (valid) {
      this.forgetState();
      mediaRule.parsedCssText = s;
      aSheet.cssRules.push(mediaRule);
      return true;
    }
    this.restoreState();
    return false;
  },


  trim11: function(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
      if (/\S/.test( str.charAt(i) )) { // XXX charat
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  },

  parseStyleRule: function(aToken, aOwner, aIsInsideMediaRule)
  {
    var currentLine = CountLF(this.mScanner.getAlreadyScanned());
    this.preserveState();
    // first let's see if we have a selector here...
    var selector = this.parseSelector(aToken, false);
    var valid = false;
    var declarations = [];
    if (selector) {
      selector = this.trim11(selector.selector);
      var s = selector;
      var token = this.getToken(true, true);
      if (token.isSymbol("{")) {
        s += " { ";
        var token = this.getToken(true, false);
        while (true) {
          if (!token.isNotNull()) {
            valid = true;
            break;
          }
          if (token.isSymbol("}")) {
            s += "}";
            valid = true;
            break;
          } else {
            var d = this.parseDeclaration(token, declarations, true, true, aOwner);
            s += ((d && declarations.length) ? " " : "") + d;
          }
          token = this.getToken(true, false);
        }
      }
    }
    else {
      // selector is invalid so the whole rule is invalid with it
    }

    if (valid) {
      var rule = new jscsspStyleRule();
      rule.currentLine = currentLine;
      rule.parsedCssText = s;
      rule.declarations = declarations;
      rule.mSelectorText = selector;
      if (aIsInsideMediaRule)
        rule.parentRule = aOwner;
      else
        rule.parentStyleSheet = aOwner;
      aOwner.cssRules.push(rule);
      return s;
    }
    this.restoreState();
    s = this.currentToken().value;
    this.addUnknownAtRule(aOwner, s);
    return "";
  },

  parseSelector: function(aToken, aParseSelectorOnly) {
    var s = "";
    var specificity = {a: 0, b: 0, c: 0, d: 0}; // CSS 2.1 section 6.4.3
    var isFirstInChain = true;
    var token = aToken;
    var valid = false;
    var combinatorFound = false;
    while (true) {
      if (!token.isNotNull()) {
        if (aParseSelectorOnly)
          return {selector: s, specificity: specificity };
        return "";
      }

      if (!aParseSelectorOnly && token.isSymbol("{")) {
        // end of selector
        valid = !combinatorFound;
	if (valid) this.ungetToken();
        break;
      }

      if (token.isSymbol(",")) { // group of selectors
        s += token.value;
        isFirstInChain = true;
        combinatorFound = false;
        token = this.getToken(false, true);
        continue;
      }
      // now combinators and grouping...
      else if (!combinatorFound
	       && (token.isWhiteSpace()
		    || token.isSymbol(">")
                    || token.isSymbol("+")
                    || token.isSymbol("~"))) {
	if (token.isWhiteSpace()) {
          s += " ";
	  var nextToken = this.lookAhead(true, true);
	  if (!nextToken.isNotNull()) {
            if (aParseSelectorOnly)
              return {selector: s, specificity: specificity };
	    return "";
	  }
	  if (nextToken.isSymbol(">")
	      || nextToken.isSymbol("+")
	      || nextToken.isSymbol("~")) {
            token = this.getToken(true, true);
	    s += token.value + " ";
	    combinatorFound = true;
	  }
	}
        else {
          s += token.value;
	  combinatorFound = true;
	}
	isFirstInChain = true;
        token = this.getToken(true, true);
        continue;
      }
      else {
        var simpleSelector = this.parseSimpleSelector(token, isFirstInChain, true);
        if (!simpleSelector)
          break; // error
        s += simpleSelector.selector;
        specificity.b += simpleSelector.specificity.b;
        specificity.c += simpleSelector.specificity.c;
        specificity.d += simpleSelector.specificity.d;
	isFirstInChain = false;
	combinatorFound = false;
      }

      token = this.getToken(false, true);
    }

    if (valid) {
      return {selector: s, specificity: specificity };
    }
    return "";
  },

  isPseudoElement: function(aIdent)
  {
    switch (aIdent) {
      case "first-letter":
      case "first-line":
      case "before":
      case "after":
      case "marker":
        return true;
        break;
      default: return false;
        break;
    }
  },

  parseSimpleSelector: function(token, isFirstInChain, canNegate)
  {
    var s = "";
    var specificity = {a: 0, b: 0, c: 0, d: 0}; // CSS 2.1 section 6.4.3
    
    if (isFirstInChain
        && (token.isSymbol("*") || token.isSymbol("|") || token.isIdent())) {
      // type or universal selector
      if (token.isSymbol("*") || token.isIdent()) {
        // we don't know yet if it's a prefix or a universal
        // selector
        s += token.value;
        var isIdent = token.isIdent();
        token = this.getToken(false, true);
        if (token.isSymbol("|")) {
          // it's a prefix
          s += token.value;
          token = this.getToken(false, true);
          if (token.isIdent() || token.isSymbol("*")) {
            // ok we now have a type element or universal
            // selector
            s += token.value;
            if (token.isIdent())
              specificity.d++;
          } else
            // oops that's an error...
            return null;
        } else {
          this.ungetToken();
          if (isIdent)
            specificity.d++;
        }
      } else if (token.isSymbol("|")) {
        s += token.value;
        token = this.getToken(false, true);
        if (token.isIdent() || token.isSymbol("*")) {
          s += token.value;
          if (token.isIdent())
            specificity.d++;
        } else
          // oops that's an error
          return null;
      }
    }
  
    else if (token.isSymbol(".") || token.isSymbol("#")) {
      var isClass = token.isSymbol(".");
      s += token.value;
      token = this.getToken(false, true);
      if (token.isIdent()) {
        s += token.value;
        if (isClass)
          specificity.c++;
        else
          specificity.b++;
      }
      else
        return null;
    }

    else if (token.isSymbol(":")) {
      s += token.value;
      token = this.getToken(false, true);
      if (token.isSymbol(":")) {
        s += token.value;
        token = this.getToken(false, true);
      }
      if (token.isIdent()) {
        s += token.value;
        if (this.isPseudoElement(token.value))
          specificity.d++;
        else
          specificity.c++;
      }
      else if (token.isFunction()) {
        s += token.value;
        if (token.isFunction(":not(")) {
          if (!canNegate)
            return null;
          token = this.getToken(true, true);
          var simpleSelector = this.parseSimpleSelector(token, isFirstInChain, false);
          if (!simpleSelector)
            return null;
          else {
            s += simpleSelector.selector;
            token = this.getToken(true, true);
            if (token.isSymbol(")"))
              s += ")";
            else
              return null;
          }
          specificity.c++;
        }
        else {
          while (true) {
            token = this.getToken(false, true);
            if (token.isSymbol(")")) {
              s += ")";
              break;
            } else
              s += token.value;
          }
          specificity.c++;
        }
      } else
        return null;
  
    } else if (token.isSymbol("[")) {
      s += "[";
      token = this.getToken(true, true);
      if (token.isIdent() || token.isSymbol("*")) {
        s += token.value;
        var nextToken = this.getToken(true, true);
        if (token.isSymbol("|")) {
          s += "|";
          token = this.getToken(true, true);
          if (token.isIdent())
            s += token.value;
          else
            return null;
        } else
          this.ungetToken();
      } else if (token.isSymbol("|")) {
        s += "|";
        token = this.getToken(true, true);
        if (token.isIdent())
          s += token.value;
        else
          return null;
      }
      else
        return null;
  
      // nothing, =, *=, $=, ^=, |=
      token = this.getToken(true, true);
      if (token.isIncludes()
          || token.isDashmatch()
          || token.isBeginsmatch()
          || token.isEndsmatch()
          || token.isContainsmatch()
          || token.isSymbol("=")) {
        s += token.value;
        token = this.getToken(true, true);
        if (token.isString() || token.isIdent()) {
          s += token.value;
          token = this.getToken(true, true);
        }
        else
          return null;
    
        if (token.isSymbol("]")) {
          s += token.value;
          specificity.c++;
        }
        else
          return null;
      }
      else if (token.isSymbol("]")) {
        s += token.value;
        specificity.c++;
      }
      else
        return null;
        
    }
    else if (token.isWhiteSpace()) {
      var t = this.lookAhead(true, true);
      if (t.isSymbol('{'))
        return ""
    }
    if (s)
      return {selector: s, specificity: specificity };
    return null;
  },

  preserveState: function() {
    this.mPreservedTokens.push(this.currentToken());
    this.mScanner.preserveState();
  },

  restoreState: function() {
    if (this.mPreservedTokens.length) {
      this.mScanner.restoreState();
      this.mToken = this.mPreservedTokens.pop();
    }
  },

  forgetState: function() {
    if (this.mPreservedTokens.length) {
      this.mScanner.forgetState();
      this.mPreservedTokens.pop();
    }
  },

  parse: function(aString, aTryToPreserveWhitespaces, aTryToPreserveComments) {
    if (!aString)
      return null; // early way out if we can

    this.mPreserveWS       = aTryToPreserveWhitespaces;
    this.mPreserveComments = aTryToPreserveComments;
    this.mPreservedTokens = [];
    this.mScanner.init(aString);
    var sheet = new jscsspStylesheet();

    // @charset can only appear at first char of the stylesheet
    var token = this.getToken(false, false);
    if (!token.isNotNull())
      return;
    if (token.isAtRule("@charset")) {
      this.parseCharsetRule(token, sheet);
      token = this.getToken(false, false);
    }

    var foundStyleRules = false;
    var foundImportRules = false;
    var foundNameSpaceRules = false;
    while (true) {
      if (!token.isNotNull())
        break;
      if (token.isWhiteSpace())
      {
        if (aTryToPreserveWhitespaces)
          this.addWhitespace(sheet, token.value);
      }

      else if (token.isComment())
      {
        if (this.mPreserveComments)
          this.addComment(sheet, token.value);
      }

      else if (token.isAtRule()) {
        if (token.isAtRule("@variables")) {
          if (!foundImportRules && !foundStyleRules)
            this.parseVariablesRule(token, sheet);
          else {
            this.reportError(kVARIABLES_RULE_POSITION);
            this.addUnknownAtRule(sheet, token.value);
          }
        }
        else if (token.isAtRule("@import")) {
          // @import rules MUST occur before all style and namespace
          // rules
          if (!foundStyleRules && !foundNameSpaceRules)
            foundImportRules = this.parseImportRule(token, sheet);
          else {
            this.reportError(kIMPORT_RULE_POSITION);
            this.addUnknownAtRule(sheet, token.value);
          }
        }
        else if (token.isAtRule("@namespace")) {
          // @namespace rules MUST occur before all style rule and
          // after all @import rules
          if (!foundStyleRules)
            foundNameSpaceRules = this.parseNamespaceRule(token, sheet);
          else {
            this.reportError(kNAMESPACE_RULE_POSITION);
            this.addUnknownAtRule(sheet, token.value);
          }
        }
        else if (token.isAtRule("@font-face")) {
          if (this.parseFontFaceRule(token, sheet))
            foundStyleRules = true;
          else
            this.addUnknownAtRule(sheet, token.value);
        }
        else if (token.isAtRule("@page")) {
          if (this.parsePageRule(token, sheet))
            foundStyleRules = true;
          else
            this.addUnknownAtRule(sheet, token.value);
        }
        else if (token.isAtRule("@media")) {
          if (this.parseMediaRule(token, sheet))
            foundStyleRules = true;
          else
            this.addUnknownAtRule(sheet, token.value);
        }
        else if (token.isAtRule("@keyframes")) {
          if (!this.parseKeyframesRule(token, sheet))
            this.addUnknownAtRule(sheet, token.value);
        }
        else if (token.isAtRule("@charset")) {
          this.reportError(kCHARSET_RULE_CHARSET_SOF);
          this.addUnknownAtRule(sheet, token.value);
        }
        else {
          this.reportError(kUNKNOWN_AT_RULE);
          this.addUnknownAtRule(sheet, token.value);
        }
      }

      else // plain style rules
      {
        var ruleText = this.parseStyleRule(token, sheet, false);
        if (ruleText)
          foundStyleRules = true;
      }
      token = this.getToken(false);
    }

    return sheet;
  }

};


function jscsspToken(aType, aValue, aUnit)
{
  this.type = aType;
  this.value = aValue;
  this.unit = aUnit;
}

jscsspToken.NULL_TYPE = 0;

jscsspToken.WHITESPACE_TYPE = 1;
jscsspToken.STRING_TYPE = 2;
jscsspToken.COMMENT_TYPE = 3;
jscsspToken.NUMBER_TYPE = 4;
jscsspToken.IDENT_TYPE = 5;
jscsspToken.FUNCTION_TYPE = 6;
jscsspToken.ATRULE_TYPE = 7;
jscsspToken.INCLUDES_TYPE = 8;
jscsspToken.DASHMATCH_TYPE = 9;
jscsspToken.BEGINSMATCH_TYPE = 10;
jscsspToken.ENDSMATCH_TYPE = 11;
jscsspToken.CONTAINSMATCH_TYPE = 12;
jscsspToken.SYMBOL_TYPE = 13;
jscsspToken.DIMENSION_TYPE = 14;
jscsspToken.PERCENTAGE_TYPE = 15;
jscsspToken.HEX_TYPE = 16;

jscsspToken.prototype = {

  isNotNull: function ()
  {
    return this.type;
  },

  _isOfType: function (aType, aValue)
  {
    return (this.type == aType && (!aValue || this.value.toLowerCase() == aValue));
  },

  isWhiteSpace: function(w)
  {
    return this._isOfType(jscsspToken.WHITESPACE_TYPE, w);
  },

  isString: function()
  {
    return this._isOfType(jscsspToken.STRING_TYPE);
  },

  isComment: function()
  {
    return this._isOfType(jscsspToken.COMMENT_TYPE);
  },

  isNumber: function(n)
  {
    return this._isOfType(jscsspToken.NUMBER_TYPE, n);
  },

  isSymbol: function(c)
  {
    return this._isOfType(jscsspToken.SYMBOL_TYPE, c);
  },

  isIdent: function(i)
  {
    return this._isOfType(jscsspToken.IDENT_TYPE, i);
  },

  isFunction: function(f)
  {
    return this._isOfType(jscsspToken.FUNCTION_TYPE, f);
  },

  isAtRule: function(a)
  {
    return this._isOfType(jscsspToken.ATRULE_TYPE, a);
  },

  isIncludes: function()
  {
    return this._isOfType(jscsspToken.INCLUDES_TYPE);
  },

  isDashmatch: function()
  {
    return this._isOfType(jscsspToken.DASHMATCH_TYPE);
  },

  isBeginsmatch: function()
  {
    return this._isOfType(jscsspToken.BEGINSMATCH_TYPE);
  },

  isEndsmatch: function()
  {
    return this._isOfType(jscsspToken.ENDSMATCH_TYPE);
  },

  isContainsmatch: function()
  {
    return this._isOfType(jscsspToken.CONTAINSMATCH_TYPE);
  },

  isSymbol: function(c)
  {
    return this._isOfType(jscsspToken.SYMBOL_TYPE, c);
  },

  isDimension: function()
  {
    return this._isOfType(jscsspToken.DIMENSION_TYPE);
  },

  isPercentage: function()
  {
    return this._isOfType(jscsspToken.PERCENTAGE_TYPE);
  },

  isHex: function()
  {
    return this._isOfType(jscsspToken.HEX_TYPE);
  },

  isDimensionOfUnit: function(aUnit)
  {
    return (this.isDimension() && this.unit == aUnit);
  },

  isLength: function()
  {
    return (this.isPercentage() ||
            this.isDimensionOfUnit("cm") ||
            this.isDimensionOfUnit("mm") ||
            this.isDimensionOfUnit("in") ||
            this.isDimensionOfUnit("pc") ||
            this.isDimensionOfUnit("px") ||
            this.isDimensionOfUnit("em") ||
            this.isDimensionOfUnit("ex") ||
            this.isDimensionOfUnit("pt"));
  },

  isAngle: function()
  {
    return (this.isDimensionOfUnit("deg") ||
            this.isDimensionOfUnit("rad") ||
            this.isDimensionOfUnit("grad"));
  }
}

var kJscsspUNKNOWN_RULE   = 0;
var kJscsspSTYLE_RULE     = 1
var kJscsspCHARSET_RULE   = 2;
var kJscsspIMPORT_RULE    = 3;
var kJscsspMEDIA_RULE     = 4;
var kJscsspFONT_FACE_RULE = 5;
var kJscsspPAGE_RULE      = 6;

var kJscsspKEYFRAMES_RULE = 7;
var kJscsspKEYFRAME_RULE  = 8;

var kJscsspNAMESPACE_RULE = 100;
var kJscsspCOMMENT        = 101;
var kJscsspWHITE_SPACE    = 102;

var kJscsspVARIABLES_RULE = 200;

var kJscsspSTYLE_DECLARATION = 1000;

var gTABS = "";

function jscsspStylesheet()
{
  this.cssRules = [];
  this.variables = {};
}

jscsspStylesheet.prototype = {
  insertRule: function(aRule, aIndex) {
    try {
     this.cssRules.splice(aIndex, 1, aRule);
    }
    catch(e) {
    }
  },

  deleteRule: function(aIndex) {
    try {
      this.cssRules.splice(aIndex);
    }
    catch(e) {
    }
  },

  cssText: function() {
    var rv = "";
    for (var i = 0; i < this.cssRules.length; i++)
      rv += this.cssRules[i].cssText() + "\n";
    return rv;
  },

  resolveVariables: function(aMedium) {

    function ItemFoundInArray(aArray, aItem) {
      for (var i = 0; i < aArray.length; i++)
        if (aItem == aArray[i])
          return true;
      return false;
    }
    
    for (var i = 0; i < this.cssRules.length; i++)
    {
      var rule = this.cssRules[i];
      if (rule.type == kJscsspSTYLE_RULE || rule.type == kJscsspIMPORT_RULE)
        break;
      else if (rule.type == kJscsspVARIABLES_RULE &&
               (!rule.media.length || ItemFoundInArray(rule.media, aMedium))) {
        
        for (var j = 0; j < rule.declarations.length; j++) {
          var valueText = "";
          for (var k = 0; k < rule.declarations[j].values.length; k++)
            valueText += (k ? " " : "") + rule.declarations[j].values[k].value;
          this.variables[rule.declarations[j].property] = valueText;
        }
      }
    }
  }
};

/* kJscsspCHARSET_RULE */

function jscsspCharsetRule()
{
  this.type = kJscsspCHARSET_RULE;
  this.encoding = null;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspCharsetRule.prototype = {

  cssText: function() {
    return "@charset " + this.encoding + ";";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(false, false);
    if (token.isAtRule("@charset")) {
      if (parser.parseCharsetRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.encoding = newRule.encoding;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspUNKNOWN_RULE */

function jscsspErrorRule(aErrorMsg)
{
  this.error = aErrorMsg ? aErrorMsg : "INVALID"; 
  this.type = kJscsspUNKNOWN_RULE;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspErrorRule.prototype = {
  cssText: function() {
    return this.parsedCssText;
  }
};

/* kJscsspCOMMENT */

function jscsspComment()
{
  this.type = kJscsspCOMMENT;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspComment.prototype = {
  cssText: function() {
    return this.parsedCssText;
  },

  setCssText: function(val) {
    var parser = new CSSParser(val);
    var token = parser.getToken(true, false);
    if (token.isComment())
      this.parsedCssText = token.value;
    else
      throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspWHITE_SPACE */

function jscsspWhitespace()
{
  this.type = kJscsspWHITE_SPACE;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspWhitespace.prototype = {
  cssText: function() {
    return this.parsedCssText;
  }
};

/* kJscsspIMPORT_RULE */

function jscsspImportRule()
{
  this.type = kJscsspIMPORT_RULE;
  this.parsedCssText = null;
  this.href = null;
  this.media = []; 
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspImportRule.prototype = {
  cssText: function() {
    var mediaString = this.media.join(", ");
    return "@import " + this.href
                      + ((mediaString && mediaString != "all") ? mediaString + " " : "")
                      + ";";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@import")) {
      if (parser.parseImportRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.href = newRule.href;
        this.media = newRule.media;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspNAMESPACE_RULE */

function jscsspNamespaceRule()
{
  this.type = kJscsspNAMESPACE_RULE;
  this.parsedCssText = null;
  this.prefix = null;
  this.url = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspNamespaceRule.prototype = {
  cssText: function() {
    return "@namespace " + (this.prefix ? this.prefix + " ": "")
                        + this.url
                        + ";";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@namespace")) {
      if (parser.parseNamespaceRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.url = newRule.url;
        this.prefix = newRule.prefix;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspSTYLE_DECLARATION */

function jscsspDeclaration()
{
  this.type = kJscsspSTYLE_DECLARATION;
  this.property = null;
  this.values = [];
  this.valueText = null;
  this.priority = null;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspDeclaration.prototype = {
  kCOMMA_SEPARATED: {
    "cursor": true,
    "font-family": true,
    "voice-family": true,
    "background-image": true
  },

  kUNMODIFIED_COMMA_SEPARATED_PROPERTIES: {
    "text-shadow": true,
    "box-shadow": true,
    "-moz-transition": true,
    "-moz-transition-property": true,
    "-moz-transition-duration": true,
    "-moz-transition-timing-function": true,
    "-moz-transition-delay": true
  },

  cssText: function() {
    var prefixes = CssInspector.prefixesForProperty(this.property);

    if (this.property in this.kUNMODIFIED_COMMA_SEPARATED_PROPERTIES) {
      if (prefixes) {
        var rv = "";
        for (var propertyIndex = 0; propertyIndex < prefixes.length; propertyIndex++) {
          var property = prefixes[propertyIndex];
          rv += (propertyIndex ? gTABS : "") + property + ": ";
          rv += this.valueText + (this.priority ? " !important" : "") + ";";
          rv += ((prefixes.length > 1 && propertyIndex != prefixes.length -1) ? "\n" : "");
        }
        return rv;
      }
      return this.property + ": " + this.valueText +
             (this.priority ? " !important" : "") + ";"
    }

    if (prefixes) {
      var rv = "";
      for (var propertyIndex = 0; propertyIndex < prefixes.length; propertyIndex++) {
        var property = prefixes[propertyIndex];
        rv += (propertyIndex ? gTABS : "") + property + ": ";
        var separator = (property in this.kCOMMA_SEPARATED) ? ", " : " ";
        for (var i = 0; i < this.values.length; i++)
          if (this.values[i].cssText() != null)
            rv += (i ? separator : "") + this.values[i].cssText();
          else
            return null;
        rv += (this.priority ? " !important" : "") + ";" +
              ((prefixes.length > 1 && propertyIndex != prefixes.length -1) ? "\n" : "");
      }
      return rv;
    }

    var rv = this.property + ": ";
    var separator = (this.property in this.kCOMMA_SEPARATED) ? ", " : " ";
    var extras = {"webkit": false, "presto": false, "trident": false, "generic": false }
    for (var i = 0; i < this.values.length; i++) {
      var v = this.values[i].cssText();
      if (v != null) {
        var paren = v.indexOf("(");
        var kwd = v;
        if (paren != -1)
          kwd = v.substr(0, paren);
        if (kwd in kCSS_VENDOR_VALUES) {
          for (var j in kCSS_VENDOR_VALUES[kwd]) {
            extras[j] = extras[j] || (kCSS_VENDOR_VALUES[kwd][j] != "");
          }
        }
        rv += (i ? separator : "") + v;
      }
      else
        return null;
    }
    rv += (this.priority ? " !important" : "") + ";";

    for (var j in extras) {
      if (extras[j]) {
        var str = "\n" + gTABS +  this.property + ": ";
        for (var i = 0; i < this.values.length; i++) {
          var v = this.values[i].cssText();
          if (v != null) {
            var paren = v.indexOf("(");
            var kwd = v;
            if (paren != -1)
              kwd = v.substr(0, paren);
            if (kwd in kCSS_VENDOR_VALUES) {
              functor = kCSS_VENDOR_VALUES[kwd][j];
              if (functor) {
                v = (typeof functor == "string") ? functor : functor(v, j);
                if (!v) {
                  str = null;
                  break;
                }
              }
            }
            str += (i ? separator : "") + v;
          }
          else
            return null;
        }
        if (str)
          rv += str + ";"
        else
          rv += "\n" + gTABS + "/* Impossible to translate property " + this.property + " for " + j + " */";
      }
    }
    return rv;
  },

  setCssText: function(val) {
    var declarations = [];
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (parser.parseDeclaration(token, declarations, true, true, null)
        && declarations.length
        && declarations[0].type == kJscsspSTYLE_DECLARATION) {
      var newDecl = declarations.cssRules[0];
      this.property = newDecl.property;
      this.value = newDecl.value;
      this.priority = newDecl.priority;
      this.parsedCssText = newRule.parsedCssText;
      return;
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspFONT_FACE_RULE */

function jscsspFontFaceRule()
{
  this.type = kJscsspFONT_FACE_RULE;
  this.parsedCssText = null;
  this.descriptors = [];
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspFontFaceRule.prototype = {
  cssText: function() {
    var rv = gTABS + "@font-face {\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.descriptors.length; i++)
      rv += gTABS + this.descriptors[i].cssText() + "\n";
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@font-face")) {
      if (parser.parseFontFaceRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.descriptors = newRule.descriptors;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspKEYFRAMES_RULE */
function jscsspKeyframesRule()
{
  this.type = kJscsspKEYFRAMES_RULE;
  this.parsedCssText = null;
  this.cssRules = [];
  this.name = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspKeyframesRule.prototype = {
  cssText: function() {
    var rv = gTABS
               + "@keyframes "
               + this.name + " {\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.cssRules.length; i++)
      rv += gTABS + this.cssRules[i].cssText() + "\n";
    gTABS = preservedGTABS;
    rv += gTABS + "}\n";
    return rv;
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@keyframes")) {
      if (parser.parseKeyframesRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.cssRules = newRule.cssRules;
        this.name = newRule.name;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspKEYFRAME_RULE */
function jscsspKeyframeRule()
{
  this.type = kJscsspKEYFRAME_RULE;
  this.parsedCssText = null;
  this.declarations = []
  this.keyText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspKeyframeRule.prototype = {
  cssText: function() {
    var rv = this.keyText + " {\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.declarations.length; i++) {
      var declText = this.declarations[i].cssText();
      if (declText)
        rv += gTABS + this.declarations[i].cssText() + "\n";
    }
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (!token.isNotNull()) {
      if (parser.parseKeyframeRule(token, sheet, false)) {
        var newRule = sheet.cssRules[0];
        this.keyText = newRule.keyText;
        this.declarations = newRule.declarations;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspMEDIA_RULE */

function jscsspMediaRule()
{
  this.type = kJscsspMEDIA_RULE;
  this.parsedCssText = null;
  this.cssRules = [];
  this.media = [];
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspMediaRule.prototype = {
  cssText: function() {
    var rv = gTABS + "@media " + this.media.join(", ") + " {\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.cssRules.length; i++)
      rv += gTABS + this.cssRules[i].cssText() + "\n";
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@media")) {
      if (parser.parseMediaRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.cssRules = newRule.cssRules;
        this.media = newRule.media;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspSTYLE_RULE */

function jscsspStyleRule()
{
  this.type = kJscsspSTYLE_RULE;
  this.parsedCssText = null;
  this.declarations = []
  this.mSelectorText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspStyleRule.prototype = {
  cssText: function() {
    var rv = this.mSelectorText + " {\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.declarations.length; i++) {
      var declText = this.declarations[i].cssText();
      if (declText)
        rv += gTABS + this.declarations[i].cssText() + "\n";
    }
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (!token.isNotNull()) {
      if (parser.parseStyleRule(token, sheet, false)) {
        var newRule = sheet.cssRules[0];
        this.mSelectorText = newRule.mSelectorText;
        this.declarations = newRule.declarations;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  },

  selectorText: function() {
    return this.mSelectorText;
  },

  setSelectorText: function(val) {
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (!token.isNotNull()) {
      var s = parser.parseSelector(token, true);
      if (s) {
        this.mSelectorText = s.selector;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspPAGE_RULE */

function jscsspPageRule()
{
  this.type = kJscsspPAGE_RULE;
  this.parsedCssText = null;
  this.pageSelector = null;
  this.declarations = [];
  this.parentStyleSheet = null;
  this.parentRule = null;
}

jscsspPageRule.prototype = {
  cssText: function() {
    var rv = gTABS + "@page "
                   + (this.pageSelector ? this.pageSelector + " ": "")
                   + "{\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.declarations.length; i++)
      rv += gTABS + this.declarations[i].cssText() + "\n";
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@page")) {
      if (parser.parsePageRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.pageSelector = newRule.pageSelector;
        this.declarations = newRule.declarations;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

/* kJscsspVARIABLES_RULE */

function jscsspVariablesRule()
{
  this.type = kJscsspVARIABLES_RULE;
  this.parsedCssText = null;
  this.declarations = [];
  this.parentStyleSheet = null;
  this.parentRule = null;
  this.media = null;
}

jscsspVariablesRule.prototype = {
  cssText: function() {
    var rv = gTABS + "@variables " +
                     (this.media.length ? this.media.join(", ") + " " : "") +
                     "{\n";
    var preservedGTABS = gTABS;
    gTABS += "  ";
    for (var i = 0; i < this.declarations.length; i++)
      rv += gTABS + this.declarations[i].cssText() + "\n";
    gTABS = preservedGTABS;
    return rv + gTABS + "}";
  },

  setCssText: function(val) {
    var sheet = {cssRules: []};
    var parser = new CSSParser(val);
    var token = parser.getToken(true, true);
    if (token.isAtRule("@variables")) {
      if (parser.parseVariablesRule(token, sheet)) {
        var newRule = sheet.cssRules[0];
        this.declarations = newRule.declarations;
        this.parsedCssText = newRule.parsedCssText;
        return;
      }
    }
    throw DOMException.SYNTAX_ERR;
  }
};

var kJscsspINHERIT_VALUE = 0;
var kJscsspPRIMITIVE_VALUE = 1;
var kJscsspVARIABLE_VALUE = 4;

function jscsspVariable(aType, aSheet)
{
  this.value = "";
  this.type = aType;
  this.name  = null;
  this.parentRule = null;
  this.parentStyleSheet = aSheet;
}

jscsspVariable.prototype = {
  cssText: function() {
    if (this.type == kJscsspVARIABLE_VALUE)
      return this.resolveVariable(this.name, this.parentRule, this.parentStyleSheet);
    else
      return this.value;
  },

  setCssText: function(val) {
    if (this.type == kJscsspVARIABLE_VALUE)
      throw DOMException.SYNTAX_ERR;
    else
      this.value = val;
  },

  resolveVariable: function(aName, aRule, aSheet)
  {
    if (aName.toLowerCase() in aSheet.variables)
      return aSheet.variables[aName.toLowerCase()];
    return null;
  }
};

function ParseURL(buffer) {
  var result = { };
  result.protocol = "";
  result.user = "";
  result.password = "";
  result.host = "";
  result.port = "";
  result.path = "";
  result.query = "";

  var section = "PROTOCOL";
  var start = 0;
  var wasSlash = false;

  while(start < buffer.length) {
    if(section == "PROTOCOL") {
      if(buffer.charAt(start) == ':') {
        section = "AFTER_PROTOCOL";
        start++;
      } else if(buffer.charAt(start) == '/' && result.protocol.length() == 0) { 
        section = PATH;
      } else {
        result.protocol += buffer.charAt(start++);
      }
    } else if(section == "AFTER_PROTOCOL") {
      if(buffer.charAt(start) == '/') {
    if(!wasSlash) {
          wasSlash = true;
    } else {
          wasSlash = false;
          section = "USER";
    }
        start ++;
      } else {
        throw new ParseException("Protocol shell be separated with 2 slashes");
      }       
    } else if(section == "USER") {
      if(buffer.charAt(start) == '/') {
        result.host = result.user;
        result.user = "";
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        result.host = result.user;
        result.user = "";
        section = "QUERY";
        start++;
      } else if(buffer.charAt(start) == ':') {
        section = "PASSWORD";
        start++;
      } else if(buffer.charAt(start) == '@') {
        section = "HOST";
        start++;
      } else {
        result.user += buffer.charAt(start++);
      }
    } else if(section == "PASSWORD") {
      if(buffer.charAt(start) == '/') {
        result.host = result.user;
        result.port = result.password;
        result.user = "";
        result.password = "";
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        result.host = result.user;
        result.port = result.password;
        result.user = "";
        result.password = "";
        section = "QUERY";
        start ++;
      } else if(buffer.charAt(start) == '@') {
        section = "HOST";
        start++;
      } else {
        result.password += buffer.charAt(start++);
      }
    } else if(section == "HOST") {
      if(buffer.charAt(start) == '/') {
        section = "PATH";
      } else if(buffer.charAt(start) == ':') {
        section = "PORT";
        start++;
      } else if(buffer.charAt(start) == '?') {
        section = "QUERY";
        start++;
      } else {
        result.host += buffer.charAt(start++);
      }
    } else if(section == "PORT") {
      if(buffer.charAt(start) == '/') {
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        section = "QUERY";
        start++;
      } else {
        result.port += buffer.charAt(start++);
      }
    } else if(section == "PATH") {
      if(buffer.charAt(start) == '?') {
    section = "QUERY";
    start ++;
      } else {
    result.path += buffer.charAt(start++);
      }
    } else if(section == "QUERY") {
      result.query += buffer.charAt(start++);
    }
  }

  if(section == "PROTOCOL") {
    result.host = result.protocol;
    result.protocol = "http";
  } else if(section == "AFTER_PROTOCOL") {
    throw new ParseException("Invalid url");
  } else if(section == "USER") {
    result.host = result.user;
    result.user = "";
  } else if(section == "PASSWORD") {
    result.host = result.user;
    result.port = result.password;
    result.user = "";
    result.password = "";
  }

  return result;
}

function ParseException(description) {
    this.description = description;
}

function CountLF(s)
{
  var nCR = s.match( /\n/g );
  return nCR ? nCR.length + 1 : 1;
}


function FilterLinearGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  if (aEngine != "webkit20110101")
    return "";

  var g = CssInspector.parseBackgroundImages(aValue)[0];

  var cancelled = false;
  var str = "-webkit-gradient(linear, ";
  var position = ("position" in g.value) ? g.value.position.toLowerCase() : "";
  var angle    = ("angle" in g.value) ? g.value.angle.toLowerCase() : "";
  // normalize angle
  if (angle) {
    var match = angle.match(/^([0-9\-\.\\+]+)([a-z]*)/);
    var angle = parseFloat(match[1]);
    var unit  = match[2];
    switch (unit) {
      case "grad": angle = angle * 90 / 100; break;
      case "rad":  angle = angle * 180 / Math.PI; break;
      default: break;
    }
    while (angle < 0)
      angle += 360;
    while (angle >= 360)
      angle -= 360;
  }
  // get startpoint w/o keywords
  var startpoint = [];
  var endpoint = [];
  if (position != "") {
    if (position == "center")
      position = "center center";
    startpoint = position.split(" ");
    if (angle == "" && angle != 0) {
      // no angle, then we just turn the point 180 degrees around center
      switch (startpoint[0]) {
        case "left":   endpoint.push("right"); break;
        case "center": endpoint.push("center"); break;
        case "right":  endpoint.push("left"); break;
        default: {
            var match = startpoint[0].match(/^([0-9\-\.\\+]+)([a-z]*)/);
            var v     = parseFloat(match[0]);
            var unit  = match[1];
            if (unit == "%") {
              endpoint.push((100-v) + "%");
            }
            else
              cancelled = true;
          }
          break;
      }
      if (!cancelled)
        switch (startpoint[1]) {
          case "top":    endpoint.push("bottom"); break;
          case "center": endpoint.push("center"); break;
          case "bottom": endpoint.push("top"); break;
          default: {
              var match = startpoint[1].match(/^([0-9\-\.\\+]+)([a-z]*)/);
              var v     = parseFloat(match[0]);
              var unit  = match[1];
              if (unit == "%") {
                endpoint.push((100-v) + "%");
              }
              else
                cancelled = true;
            }
            break;
        }
    }
    else {
      switch (angle) {
        case 0:    endpoint.push("right"); endpoint.push(startpoint[1]); break;
        case 90:   endpoint.push(startpoint[0]); endpoint.push("top"); break;
        case 180:  endpoint.push("left"); endpoint.push(startpoint[1]); break;
        case 270:  endpoint.push(startpoint[0]); endpoint.push("bottom"); break;
        default:     cancelled = true; break;
      }
    }
  }
  else {
    // no position defined, we accept only vertical and horizontal
    if (angle == "")
      angle = 270;
    switch (angle) {
      case 0:    startpoint= ["left", "center"];   endpoint = ["right", "center"]; break;
      case 90:   startpoint= ["center", "bottom"]; endpoint = ["center", "top"]; break;
      case 180:  startpoint= ["right", "center"];  endpoint = ["left", "center"]; break;
      case 270:  startpoint= ["center", "top"];    endpoint = ["center", "bottom"]; break;
      default:     cancelled = true; break;
    }
  }

  if (cancelled)
    return "";

  str += startpoint.join(" ") + ", " + endpoint.join(" ");
  if (!g.value.stops[0].position)
    g.value.stops[0].position = "0%";
  if (!g.value.stops[g.value.stops.length-1].position)
    g.value.stops[g.value.stops.length-1].position = "100%";
  var current = 0;
  for (var i = 0; i < g.value.stops.length && !cancelled; i++) {
    var s = g.value.stops[i];
    if (s.position) {
      if (s.position.indexOf("%") == -1) {
        cancelled = true;
        break;
      }
    }
    else {
      var j = i + 1;
      while (j < g.value.stops.length && !g.value.stops[j].position)
        j++;
      var inc = parseFloat(g.value.stops[j].position) - current;
      for (var k = i; k < j; k++) {
        g.value.stops[k].position = (current + inc * (k - i + 1) / (j - i + 1)) + "%";
      }
    }
    current = parseFloat(s.position);
    str += ", color-stop(" + (parseFloat(current) / 100) + ", " + s.color + ")";
  }

  if (cancelled)
    return "";
  return str + ")";
}

function FilterRadialGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  else if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  else if (aEngine != "webkit20110101")
    return "";

  var g = CssInspector.parseBackgroundImages(aValue)[0];

  var shape = ("shape" in g.value) ? g.value.shape : "";
  var size  = ("size"  in g.value) ? g.value.size : "";
  if (shape != "circle"
      || (size != "farthest-corner" && size != "cover"))
    return "";

  if (g.value.stops.length < 2
      || !("position" in g.value.stops[0])
      || !g.value.stops[g.value.stops.length - 1].position
      || !("position" in g.value.stops[0])
      || !g.value.stops[g.value.stops.length - 1].position)
    return "";

  for (var i = 0; i < g.value.stops.length; i++) {
    var s = g.value.stops[i];
    if (("position" in s) && s.position && s.position.indexOf("px") == -1)
      return "";
  }

  var str = "-webkit-gradient(radial, ";
  var position  = ("position"  in g.value) ? g.value.position : "center center";
  str += position + ", " +  parseFloat(g.value.stops[0].position) + ", ";
  str += position + ", " +  parseFloat(g.value.stops[g.value.stops.length - 1].position);

  // at this point we're sure to deal with pixels
  var current = parseFloat(g.value.stops[0].position);
  for (var i = 0; i < g.value.stops.length; i++) {
    var s = g.value.stops[i];
    if (!("position" in s) || !s.position) {
      var j = i + 1;
      while (j < g.value.stops.length && !g.value.stops[j].position)
        j++;
      var inc = parseFloat(g.value.stops[j].position) - current;
      for (var k = i; k < j; k++) {
        g.value.stops[k].position = (current + inc * (k - i + 1) / (j - i + 1)) + "px";
      }
    }
    current = parseFloat(s.position);
    var c = (current - parseFloat(g.value.stops[0].position)) /
            (parseFloat(g.value.stops[g.value.stops.length - 1].position) - parseFloat(g.value.stops[0].position));
    str += ", color-stop(" + c + ", " + s.color + ")";
  }
  str += ")"
  return str;
}

function FilterRepeatingGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  else if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  return "";
}


$( function() {
	setTimeout(function(){
		$('.anim').addClass('in');
	}, 1000);

	new WOW().init();

	$(".nano").nanoScroller({
		alwaysVisible: true,
		preventPageScrolling: true,
		iOSNativeScrolling: true
	});

	$('.parallax-container').jKit('parallax', { 'strength': '0.5', 'axis': 'x' });

	var gallery = $( '.gallery-slider' ).lightSlider({
		item: 1,
		controls: true,
		pager: false,
		prevHtml: '<i class="icon-left"></i>',
		nextHtml: '<i class="icon-right"></i>',
		adaptiveHeight: true,
		slideMargin: 0
	});
	$('.js-change-slide').on('click', 'li', function(e){
		$(this).closest('.js-change-slide').find('li').removeClass('active');
		$(this).addClass('active');
		gallery.goToSlide($(this).index()+1);
	});

	$('.selectpicker').selectpicker();


	$.validator.addMethod( "phoneUA", function( phone_number, element ) {
		return this.optional( element ) || /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test( phone_number );
		// return this.optional( element ) || /^\+ ?38 ?\([0-9]{3}\) ?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/.test( phone_number );
	}, "Перевір формат: + 38 (099) 123 34 45" );

	validate($('.js-enroll-to-watching-form'));
	validate($('.js-enroll-to-watching-form-footer'));
	validate($('.js-leave-application-form'));

	var $height_main = $("#section-intro").height(),
		$menu = $(".header");

	if ($(this).scrollTop() <= $height_main) {
		$menu.removeClass("default").addClass("fixed");
	}
	$(window).scroll(function(){
		if ( $(this).scrollTop() > $height_main - 1 && $menu.hasClass("default") ){
			$menu.removeClass("default").addClass("fixed");
		} else if($(this).scrollTop() <= $height_main - 1 && $menu.hasClass("fixed")) {
			$menu.removeClass("fixed").addClass("default");
		}
	});
	$(window).scroll(function(){
		if ( $(this).scrollTop() > 100 && $menu.hasClass("def") ){
			$menu.removeClass("def").addClass("fixed2");
		} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed2")) {
			$menu.removeClass("fixed2").addClass("def");
		}
	});
	$(".js-close-modal, .md-overlay").on('click', function() {
		$(".md-modal").removeClass('md-show');
	});

	var tableContent = $('#table-filter'),
		tableHeader = $('.table-header');
	// table filter
	$('.js-filter-table').on('click', function(e) {
		e.preventDefault();
		var floor = parseInt($("#floor").val()),
			priceFrom = parseInt($('.priceFrom').val()),
			priceTo = parseInt($('.priceTo').val()),
			squareFrom = parseInt($('.squareFrom').val()),
			squareTo = parseInt($('.squareTo').val()),
			noData = true,
			tableRow = tableContent.find('tbody').find('tr:not(.no-data)');

		$.each(tableRow, function(i, el){
			var tr = $(el),
				floorTD = tr.find('td[data-floor]'),
				squareTD = tr.find('td[data-square]'),
				priceTD = tr.find('td[data-price]'),
				floorVal = floorTD.attr('data-floor'),
				squareVal = squareTD.attr('data-square'),
				priceVal = priceTD.attr('data-price');

			if (
				floor !== 0 && floor == floorVal || floor == 0 ||
				!isNaN(squareFrom) && !isNaN(squareTo) && squareVal > squareFrom && squareVal < squareTo ||
				!isNaN(priceFrom) && !isNaN(priceTo) && priceVal > priceFrom && priceVal < priceTo
			) {
				tr.removeClass('hidden');
				noData = false;
			} else {
				tr.addClass('hidden');
			}
		});

		$(".nano").nanoScroller();
		if (noData) {
			tableContent.find('tbody > tr').addClass('hidden');
			tableHeader.find('tr.no-data').removeClass('hidden');
		} else {
			tableHeader.find('tr.no-data').addClass('hidden');
		}
	});

	$('.js-filter-reset').on('click', function(e) {
		e.preventDefault();
		tableContent.find('tr:not(.no-data)').removeClass('hidden');
		tableHeader.find('tr.no-data').addClass('hidden');
		$(".nano").nanoScroller();
	});

	$(document).on('keydown', '.js-numbers', function(e) {

		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
});
function validate(form) {
	$(form).validate({
		rules: {
			name: "required",
			phone: {
				required: true,
				phoneUA: true
			},
			email: {
				required: true,
				email: true
			}
		},
		submitHandler: function(form) {
			$.ajax({
				url: $(form).attr('action'),
				method: 'POST',
				data: $(form).serialize(),
				success: function() {
					$(form)[0].reset();
					$("#enrollToWatching").removeClass('md-show');
					$("#enrollToWatchingResponse").addClass('md-show');
				},
				error: function() {
					// Remove when ajax will work
					$(form)[0].reset();
					$("#enrollToWatching").removeClass('md-show');
					$("#enrollToWatchingResponse").addClass('md-show');
				}
			});
		}
	});
}

$('.js-sortable').on('click', function(e){
  e.preventDefault();
  $(this).toggleClass('rotate');
  sortTable(2);
});

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table-filter");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

$(function(){
	setTimeout(function(){
		initMyMap();
	}, 1000);
});
function initMap() {
	var uluru = {lat: 55.703845, lng: 37.767974},
		markerImage = './img/map-marker.png',
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: uluru,
			scrollwheel: false
		}),
		marker = new google.maps.Marker({
			position: uluru,
			icon: markerImage,
			map: map,
			title: 'A Customized InfoWindow Marker'
		});

	var  infoBubble = new InfoBubble({
		maxWidth: 300
	});

	var div = document.createElement('DIV');
	div.innerHTML = 'Hello';

	infoBubble.addTab('Tab 1', div);
	infoBubble.addTab('Tab 2', "<B>This is tab 2</B>");

	google.maps.event.addListener(marker, 'click', function() {
		if (!infoBubble.isOpen()) {
			infoBubble.open(map, marker);
		}
	});
}

function initMyMap() {
	//add map, the type of map
	var mapOptions = {
		scrollwheel: false,
		zoom: 15,
		draggable: true,
		animation: google.maps.Animation.DROP,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(55.73561599, 37.79974937), // area location
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);

	marker = new google.maps.Marker({
		position: new google.maps.LatLng(55.73561599, 37.79974937),
		map: map,
		icon: {
			url: './img/map-marker.png',
			scaledSize: new google.maps.Size(209, 39)
		}
	});

	//add locations
	var locations = [
		['London office', 55.7292871,37.8292723,'./img/type-1@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Sausalito', 55.72880378, 37.80867293,'./img/type-2@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Sacramento', 55.73199357, 37.78996184,'./img/type-3@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Soledad', 55.73967497, 37.80026436,'./img/type-4@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Shingletown', 55.73841867, 37.81262398,'./img/type-5@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Shingletown', 55.73986825, 37.78326988,'./img/type-6@2x.png', 'text', '<p>vdfvdfvd</p>']
	];
	//declare marker call it 'i'
	var marker, i;
	//declare infowindow
	var infowindow = new google.maps.InfoWindow();

	var infoBubbles = [];


	//add marker to each locations
	for (i = 0; i < locations.length; i++) {
		var image = {
			url: locations[i][3],
			scaledSize: new google.maps.Size(42, 42),
			// origin: new google.maps.Point(0, 0),
			// anchor: new google.maps.Point(75, 40),
		};

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: image
		});

		infoBubbles.push(new InfoBubble({maxWidth: 600}));


		infoBubbles[i].addTab('Местоположение', locations[i][4]);
		infoBubbles[i].addTab('Как добраться', locations[i][5]);

		// click function to marker, pops up infowindow
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {

				if (!infoBubbles[i].isOpen()) {
					infoBubbles[i].open(map, marker);
				}
			};
		})(marker, i));
	}
}

/*function initialize() {
	//add map, the type of map
	var mapOptions = {
		zoom: 5,
		draggable: true,
		animation: google.maps.Animation.DROP,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(51.4964302,-0.1331412), // area location
		styles:[{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);

	//add locations
	var locations = [
		['London office', 51.4964302,-0.1331412,'http://labs.google.com/ridefinder/images/mm_20_red.png'],
		['Sausalito', 37.8590937, -122.4852507,'http://labs.google.com/ridefinder/images/mm_20_red.png'],
		['Sacramento', 38.5815719, -121.4943996,'http://labs.google.com/ridefinder/images/mm_20_green.png'],
		['Soledad', 36.424687, -121.3263187,'http://labs.google.com/ridefinder/images/mm_20_blue.png'],
		['Shingletown', 40.4923784, -121.8891586,'http://labs.google.com/ridefinder/images/mm_20_yellow.png']
	];
	//declare marker call it 'i'
	var marker, i;
	//declare infowindow
	var infowindow = new google.maps.InfoWindow();
	//add marker to each locations
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: locations[i][3]
		});
		//click function to marker, pops up infowindow
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}
google.maps.event.addDomListener(window, 'load', initialize);
*/
function map_initialize(){
	var myLatlng = new google.maps.LatLng(37.286172, -121.80929);

	var markerImage = './img/map-marker.png';


	var mapOptions = {
		center: new google.maps.LatLng(37.286172, -121.80929),
		zoom: 8,
		icon: markerImage,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"),
		mapOptions);


	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: markerImage,
		title: 'A Customized InfoWindow Marker'
	});

	var  infoBubble = new InfoBubble({
		maxWidth: 300
	});

	var div = document.createElement('DIV');
	div.innerHTML = 'Hello';

	infoBubble.addTab('Tab 1', div);
	infoBubble.addTab('Tab 2', "<B>This is tab 2</B>");

	google.maps.event.addListener(marker, 'click', function() {
		if (!infoBubble.isOpen()) {
			infoBubble.open(map, marker);
		}
	});
}

