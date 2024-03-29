// @flow

function convert(match, nosign) {
    if (nosign) {
        match.sign = '';
    } else {
        match.sign = match.negative ? '-' : match.sign;
    }
    const l = match.min - match.argument.length + 1 - match.sign.length;
    const pad = new Array(l < 0 ? 0 : l).join(match.pad);
    if (!match.left) {
        if (match.pad == '0' || nosign) {
            return match.sign + pad + match.argument;
        }

        return pad + match.sign + match.argument;
    }

    if (match.pad == '0' || nosign) {
        return match.sign + match.argument + pad.replace(/0/g, ' ');
    }

    return match.sign + match.argument + pad;
}

export default function sprintf() {
    if (typeof arguments === 'undefined') {
        return null;
    }
    if (arguments.length < 1) {
        return null;
    }
    if (typeof arguments[0] !== 'string') {
        return null;
    }
    if (typeof RegExp === 'undefined') {
        return null;
    }

    const string = arguments[0];
    const exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    const matches = [];
    const strings = [];
    let convCount = 0;
    let stringPosStart = 0;
    let stringPosEnd = 0;
    let matchPosEnd = 0;
    let newString = '';
    let match = null;

    while (match = exp.exec(string)) {
        if (match[9]) {
            convCount += 1;
        }

        stringPosStart = matchPosEnd;
        stringPosEnd = exp.lastIndex - match[0].length;
        strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

        matchPosEnd = exp.lastIndex;
        matches[matches.length] = {
            match: match[0],
            left: !!match[3],
            sign: match[4] || '',
            pad: match[5] || ' ',
            min: match[6] || 0,
            precision: match[8],
            code: match[9] || '%',
            negative: parseInt(arguments[convCount]) < 0,
            argument: String(arguments[convCount]),
        };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (matches.length === 0) {
        return string;
    }
    if ((arguments.length - 1) < convCount) {
        return null;
    }

    match = null;

    let i;
    for (i = 0; i < matches.length; i++) {
        let substitution;
        if (matches[i].code == '%') {
            substitution = '%';
        } else if (matches[i].code == 'b') {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(2));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == 'c') {
            matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument, 10)))));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == 'd') {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)));
            substitution = convert(matches[i]);
        } else if (matches[i].code == 'f') {
            matches[i].argument = String(Math.abs(parseFloat(matches[i].argument, 10))
                .toFixed(matches[i].precision ? matches[i].precision : 6));
            substitution = convert(matches[i]);
        } else if (matches[i].code == 'o') {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(8));
            substitution = convert(matches[i]);
        } else if (matches[i].code == 's') {
            matches[i].argument = matches[i].argument.substring(0,
                matches[i].precision ? matches[i].precision : matches[i].argument.length);
            substitution = convert(matches[i], true);
        } else if (matches[i].code == 'x') {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]);
        } else if (matches[i].code == 'X') {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]).toUpperCase();
        } else {
            substitution = matches[i].match;
        }

        newString += strings[i];
        newString += substitution;
    }

    newString += strings[i];
    return newString;
}
