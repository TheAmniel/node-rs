use napi_derive::napi;

const M_SECOND: f64 = 60.0;
const M_MINUTE: f64 = M_SECOND;
const M_HOUR: f64 = 24.0;
const M_DAY: f64 = 30.42;
const M_WEEK: f64 = 4.0;
const M_MONTH: f64 = 12.0;
const M_YEAR: f64 = 0.0;

const SECOND: f64 = 1.0;
const MINUTE: f64 = 60.0 * SECOND;
const HOUR: f64 = 60.0 * MINUTE;
const DAY: f64 = 24.0 * HOUR;
const WEEK: f64 = 7.0 * DAY;
const MONTH: f64 = 30.42 * DAY;
const YEAR: f64 = 365.25 * DAY;

// TODO
// const YEARLEAP: f64 = YEAR + (18.0 * HOUR);

// #[inline]
// const fn is_leap_year(year: i32) -> bool {
//   year % 4 == 0 && year % 100 != 0 && year % 400 != 0
// }

/// UNITS is a constant array of tuples containing the divisor, modulus, singular, plural, and abbreviation for each unit
const UNITS: [(f64, f64, &str, &str, &str); 7] = [
  (YEAR, M_YEAR, "year", "years", "y"),
  (MONTH, M_MONTH, "month", "months", "m"),
  (WEEK, M_WEEK, "week", "weeks", "w"),
  (DAY, M_DAY, "day", "days", "d"),
  (HOUR, M_HOUR, "hour", "hours", "h"),
  (MINUTE, M_MINUTE, "minute", "minutes", "min"),
  (SECOND, M_SECOND, "second", "seconds", "sec"),
];

/// Assuming milliseconds shouldn't exceed seconds represented by f64::MAX
const MAX_MS: f64 = f64::MAX / 1000.0;

/// humanizeDuration function takes `milliseconds`, maximum units and short format as input.
///
/// @param {number} ms - input milliseconds
/// @param {number} [maxUnits=7] - maximum units to display (min: 1, max: 7, default: 7)
/// @param {boolean} [short=false] - use short format (default: false)
/// @returns {string} a human-readable duration string
#[napi]
pub fn humanize_duration(ms: f64, max_units: Option<i32>, short: Option<bool>) -> String {
  let is_short = short.unwrap_or(false);
  let max = max_units.unwrap_or(7).clamp(1, 7) as usize;

  if ms <= 0.0 || ms > MAX_MS {
    return "0".to_string();
  }

  let mut units = Vec::with_capacity(max);
  generate_parsers(ms, max, |(value, singular, plural, abbrev)| {
    let int = format!("{value:.0}");

    units.push(if is_short {
      format!("{int}{abbrev}")
    } else if value > 1.0 {
      format!("{int} {plural}")
    } else {
      format!("{int} {singular}")
    });
  });

  if units.is_empty() || units[0].is_empty() {
    return "0".to_string();
  }

  units
    .iter()
    .enumerate()
    .map(|(i, res)| {
      if is_short || max == 1 {
        res.to_string()
      } else {
        match i {
          idx if units.len() >= 2 && idx == units.len() - 2 => format!("{res} and"),
          idx if units.len() > 1 && idx != units.len() - 1 => format!("{res},"),
          _ => res.to_string(),
        }
      }
    })
    .collect::<Vec<String>>()
    .join(" ")
}

#[inline]
fn generate_parsers<F: FnMut((f64, &str, &str, &str))>(ms: f64, max_units: usize, add: F) {
  UNITS
    .into_iter()
    .filter_map(|(d, m, s, p, a)| {
      let value = if m == 0.0 { round(ms / d) } else { round(ms / d) % m };

      if value > 0.0 {
        Some((value, s, p, a))
      } else {
        None
      }
    })
    .take(max_units)
    .for_each(add);
}

#[inline]
fn round(ms: f64) -> f64 {
  ms.signum() * ms.abs().floor()
}
