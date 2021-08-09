/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'yıl':
    case 'yıl':
    case 'yıl':
    case 'yl':
    case 'y':
      return n * y;
    case 'hafta':
    case 'hafta':
    case 'h':
      return n * w;
    case 'gün':
    case 'gün':
    case 'g':
      return n * d;
    case 'saat':
    case 'saat':
    case 'saat':
    case 'st':
    case 's':
      return n * h;
    case 'dakika':
    case 'dakika':
    case 'dakika':
    case 'dk':
    case 'd':
      return n * m;
    case 'saniye':
    case 'saniye':
    case 'sniye':
    case 'sn':
    case 's':
      return n * s;
    case 'milisaniye':
    case 'milisaniye':
    case 'mlisaniye':
    case 'milisaniye':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= y) {
    return Math.round(ms / y) + 'y';
  }
  if (msAbs >= w) {
    return Math.round(ms / w) + 'h';
  }
  if (msAbs >= d) {
    return Math.round(ms / d) + 'g';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'sa';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'dk';
  }
  //if (msAbs >= s) {
  //  return Math.round(ms / s) + 'sn';
  //}
  //return ms + 'ms';
  return "Az ";
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= y) {
    return plural(ms, msAbs, y, 'yıl');
  }
  if (msAbs >= w) {
    return plural(ms, msAbs, w, 'hafta');
  }
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'gün');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'saat');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'dakika');
  }
  //if (msAbs >= s) {
  //  return plural(ms, msAbs, s, 'saniye');
  //}
  return "Az ";
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? '' : '');
}
