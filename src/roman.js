/** @module */
/**
 *  @file
 *
 *  <p>Converting decimal numbers to roman numerals and vice versa.</p>
 *
 *  <p>Roman numerals, the numeric system in ancient Rome, uses combinations of letters
 *  from the Latin alphabet to signify values. </p>
 *
 * <p>The numbers 1 to 10, 50, 100, 500 e 1000
 * can be expressed in Roman numerals as follows: </p>
 *    - I, II, III, IV, V, VI, VII, VIII, IX, X, L, C, D, and M. <br>
 *
 *  <p>In the Middle Ages, a horizontal line was used above a particular numeral,
 *     or parentheses placed around it, to represent one thousand times that numeral. </p>
 *    - <span style="text-decoration:overline">I</span> or (I) for one thousand. <br>
 *    - <span style="text-decoration:overline">V</span> or (V) for five thousand. <br>
 *
 *  <pre>
 *  Documentation:
 *  - Ubuntu:
 *     - sudo apt install jsdoc-toolkit
 *  - MacOS:
 *     - sudo port install npm8 (or npm9)
 *     - sudo npm install -g jsdoc
 *  - jsdoc -d doc-roman roman.js
 *
 *  Usage:
 *  - npm init
 *  - npm install readline-sync
 *  - node roman.mjs [number|string]
 *  </pre>
 *
 *  @author Paulo Roma
 *  @since 04/05/2021
 *  @see https://en.wikipedia.org/wiki/Roman_numerals
 *  @see <a href="/cwdc/3-javascript/roman/roman.js">source</a>
 *  @see <a href="../doc-roman-node">roman in node</a>
 *  @see <img src="../roman/roman.png" width="340">
 */
/**
 *   Converts an integer number to its roman numeral representation.
 *   @param {Number} num given number.
 *   @return {String} a string with num represented as a roman numeral.
 */
export function int2roman(num) {
    var roman = ""; // Empty string
    if (num >= 4000000 || num < 1) {
        roman = "N/A";
    } else {
        // prettier-ignore
        var symbols = [ "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        var decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var ptr = 0;
        // The part of the number above 4000
        // should be between parentheses.
        if (num >= 4000) {
            let excess = Math.floor(num / 1000);
            // What is less than 4000 should be
            // outside the parentheses.
            if (excess % 10 < 4) {
                excess = (excess / 10) * 10;
            }
            roman = "(" + int2roman(excess) + ")";
            num -= excess * 1000;
        }
        // Check to see if "num" still has any value left in it.
        while (num > 0) {
            // See how many of the currently selected value can
            // fit in the remaining input.
            let temp = Math.floor(num / decimals[ptr]);
            // Append a number of Roman characters depending
            // on the value of "temp".
            for (let i = 0; i < temp; ++i) {
                roman += symbols[ptr];
            }
            // Subtract the value of the characters that were
            // appended to output from the input.
            num -= temp * decimals[ptr];
            // Move the pointer to the next cell of the arrays.
            ptr += 1;
        }
    }
    return roman;
}
/**
 *   Converts an integer number to roman.
 *   <p>
 *   The decimal numeral system (also called base ten or occasionally denary)
 *   has ten as its base. It is the numerical base most widely used by modern civilizations.
 *   <p>
 *   Decimal notation often refers to a base-10 positional notation,
 *   such as the Hindu-Arabic numeral system; however, it can also
 *   be used more generally to refer to non-positional systems, such as Roman.
 *
 *   @param {Number} num integer to be converted to roman.
 *   @return {String} string representing the given integer as a roman numeral.
 *   @see https://www.javascripttutorial.net/es6/javascript-const/
 *   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
 */
export function int2romanFast(num) {
    // prettier-ignore
    var symbols = [
        ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // units
        ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // tens
        ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // hundreds
        ["", "M", "MM", "MMM", "(IV)", "(V)", "(VI)", "(VII)", "(VIII)", "(IX)"],       // thousands
        ["", "(X)", "(XX)", "(XXX)", "(XL)", "(L)", "(LX)", "(LXX)", "(LXXX)", "(XC)"], // ten thousands
        ["" ,"(C)", "(CC)", "(CCC)", "(CD)", "(D)", "(DC)", "(DCC)", "(DCCC)", "(CM)"], // hundred thousands
        ["", "(M)", "(MM)", "(MMM)", "", "", "", "", "", ""]          // millions
    ];
    var roman = "";
    if (num >= 4000000 || num < 1) roman = roman.concat("N/A");
    else {
        // Convert num to String.
        var cnum = num.toString();
        // Find out how many digits are in
        // the input number (magnitude).
        var strlen = cnum.length - 1;
        // The loop is executed at most 7 times, and
        // it uses no division or multiplication.
        // Loop forward  (0,1,...,len-1).
        for (let c of cnum) {
            // dig between [0,9]: parseInt(c) == c.charCodeAt(0) - '0'.charCodeAt(0)
            let dig = parseInt(c);
            // Loop backward (len-1,len-2,len-3,...,0).
            roman = roman.concat(symbols[strlen][dig]);
            strlen -= 1;
        }
    }
    return roman.replace(/\)\(/g, "");
}
/**
 *   Converts a roman numeral to decimal.
 *
 *   @param {String} roman roman numeral to be converted to decimal.
 *   @return {Number} integer equivalent to the given roman numeral.
 *   @throws {Error} an error if the given roman numeral is invalid.
 */
export function roman2int(roman) {
    // An associative array for mapping roman literals to numbers.
    var d = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
    var total = 0,
        pptr = 0,
        cptr = 0,
        m = false;
    var validc = "MDCLXVImdclxvi()";
    /*
    var len = roman.length;
    for ( let i = 0; i < len; i++ ) {
       let c = roman[len-i-1];  // traverse the string backward
    */
    [...roman].reverse().forEach((c) => {
        // another way of doing it
        if (validc.includes(c)) {
            if (c === ")") m = true;
            else if (c === "(") m = false;
            else {
                cptr = d[c.toUpperCase()];
                if (m) cptr *= 1000;
                if (cptr < pptr) total -= cptr;
                // IV = 5 - 1, IX = 10 - 1, XL = 50 - 10
                else total += cptr;
                pptr = cptr;
            }
        } else throw new Error(`Invalid character "${c}"`);
    });
    return total;
}
/**
 *   Validates a roman numeral.
 *
 *   @param {String} romano roman numeral to be validated.
 *   @return {String} error code string.
 */
export function validateRoman(romano) {
    romano = romano.toUpperCase();
    var s = [romano, ""];
    // An associative array for mapping roman literals to numbers.
    var d = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
    var position = romano.indexOf("("); // find first occurrence
    if (position >= 0) {
        var position2 = romano.indexOf(")");
        s[0] = romano.substring(position + 1, position2);
        s[1] = romano.substring(position2 + 1, romano.length);
    }
    for (let j = 0; j < 2; ++j) {
        var r = s[j];
        var lr = r.length;
        if (lr === 0) continue;
        if ("MDCLXVI".indexOf(r[lr - 1]) < 0) return String.fromCharCode(r[lr - 1]);
        for (let i = 0; i < lr - 1; ++i) {
            var c = r[i];
            var c1 = r[i + 1];
            if ("MDCLXVI".indexOf(c) < 0) return String.fromCharCode(c);
            if (i + 2 < lr) {
                var c2 = r[i + 2];
                if (i + 3 < lr) {
                    var c3 = r[i + 3];
                    if (c === c1 && c === c2 && c === c3)
                        return "0: " + r.substring(i, i + 4);
                }
                if (d[c2] !== undefined && d[c] < d[c2])
                    return "1: " + r.substring(i, i + 3);
                if ("VLD".indexOf(c) >= 0 && c === c2)
                    return "2: " + r.substring(i, i + 3);
                if (c === "I" && c2 === "I" && c1 !== "I")
                    return "3: " + r.substring(i, i + 3);
                if (c === "X" && c2 === "X" && "LC".indexOf(c1) >= 0)
                    return "4: " + r.substring(i, i + 3);
            }
            if (d[c1] !== undefined && d[c] < d[c1]) {
                if ("IXC".indexOf(c) < 0) return "5: " + r.substring(i, i + 2);
                if (c === "I" && "VX".indexOf(c1) < 0)
                    return "6: " + r.substring(i, i + 2);
                if (c === "X" && "LC".indexOf(c1) < 0)
                    return "7: " + r.substring(i, i + 2);
                if (c === "C" && "DM".indexOf(c1) < 0)
                    return "8: " + r.substring(i, i + 2);
            }
            if ("VLD".indexOf(c) >= 0 && c === c1)
                return "9: " + r.substring(i, i + 2);
        }
    }
    return "";
}
/**
 * Validates a roman numeral using regular expressions.
 *
 * @param {String} romano roman numeral to be validated.
 * @return {Boolean} true if there is a match between the regular expression and the string romano.
 *                   Otherwise, false.
 * @see https://regexr.com/3a406
 * @see https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch06s09.html
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
 */
export function reRoman(romano) {
    let regex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    let regex2 =
        /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i;
    console.assert(regex.test(romano) === regex2.test(romano));
    return regex.test(romano);
}
