/**
 *   --- a ---                      --- b ---
 *   [{"startTime":1,"endTime":3},{"startTime":2,"endTime":4}]
 *   [{"startTime":1,"endTime":3},{"startTime":4,"endTime":8}]
 */
function overlaps(a, b) {

  var touching = a.startTime == b.endTime
    || a.endTime == b.startTime
    || a.startTime == b.startTime
    || a.endTime == b.endTime;
  
  var bOverlapsA = a.endTime > b.startTime
    && a.startTime < b.startTime
    && b.endTime > a.endTime;

  var aContainsB = a.startTime < b.startTime
    && b.endTime < a.endTime;
  
  return touching
    || bOverlapsA
    || aContainsB;
}

/**
 * Merge meetings ranges
 */
function mergeRanges(meetings) {

  var i = 0;
  var j = 1;

  while (i < meetings.length) {
    
    if (j == meetings.length) {
      i = i + 1;
      j = i + 1;
      continue;
    }

    var a = meetings[i];
    var b = meetings[j];

    if (!overlaps(a, b)) {
      j++;
      continue;
    }

    var before = meetings.slice(0, i);
    var between = meetings.slice(i + 1, j);
    var after = meetings.slice(j + 1);

    var condensed = {
      startTime: Math.min(a.startTime, b.startTime),
      endTime: Math.max(a.endTime, b.endTime)
    };

    meetings = [
      ...before,
      condensed,
      ...between,
      ...after
    ];

    i = 0;
    j = i + 1;
  }

  meetings.sort((a, b) => a.startTime - b.startTime);

  return meetings;
}



// Tests

let desc = 'meetings overlap';
let actual = mergeRanges([{ startTime: 1, endTime: 3 }, { startTime: 2, endTime: 4 }]);
let expected = [{ startTime: 1, endTime: 4 }];
assertArrayEquals(actual, expected, desc);

desc = 'subsumed by';
actual = mergeRanges([{ startTime: 1, endTime: 5 }, { startTime: 2, endTime: 3 }]);
expected = [{ startTime: 1, endTime: 5 }];
assertArrayEquals(actual, expected, desc);

desc = 'single block';
actual = mergeRanges([
  { startTime: 1, endTime: 10 },
  { startTime: 2, endTime: 6 },
  { startTime: 3, endTime: 5 },
  { startTime: 7, endTime: 9 },
]);
expected = [{ startTime: 1, endTime: 10 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings touch';
actual = mergeRanges([{ startTime: 5, endTime: 6 }, { startTime: 6, endTime: 8 }]);
expected = [{ startTime: 5, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meeting contains other meeting';
actual = mergeRanges([{ startTime: 1, endTime: 8 }, { startTime: 2, endTime: 5 }]);
expected = [{ startTime: 1, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings stay separate';
actual = mergeRanges([{ startTime: 1, endTime: 3 }, { startTime: 4, endTime: 8 }]);
expected = [{ startTime: 1, endTime: 3 }, { startTime: 4, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'multiple merged meetings';
actual = mergeRanges([
  { startTime: 1, endTime: 4 },
  { startTime: 2, endTime: 5 },
  { startTime: 5, endTime: 8 },
]);
expected = [{ startTime: 1, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings not sorted';
actual = mergeRanges([
  { startTime: 5, endTime: 8 },
  { startTime: 1, endTime: 4 },
  { startTime: 6, endTime: 8 },
]);
expected = [{ startTime: 1, endTime: 4 }, { startTime: 5, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'oneLongMeetingContainsSmallerMeetings';
actual = mergeRanges([
  { startTime: 1, endTime: 10 },
  { startTime: 2, endTime: 5 },
  { startTime: 6, endTime: 8 },
  { startTime: 9, endTime: 10 },
  { startTime: 10, endTime: 12 }
]);
expected = [
  { startTime: 1, endTime: 12 }
];
assertArrayEquals(actual, expected, desc);

desc = 'sample input';
actual = mergeRanges([
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 5 },
  { startTime: 4, endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9, endTime: 10 },
]);
expected = [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
];
assertArrayEquals(actual, expected, desc);

function assertArrayEquals(a, b, desc) {
  // Sort the keys in each meeting to avoid
  // failing based on differences in key order.
  orderedA = a.map( function(meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  orderedB = b.map( function(meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  const arrayA = JSON.stringify(orderedA);
  const arrayB = JSON.stringify(orderedB);
  if (arrayA !== arrayB) {
    console.log(`${desc} ... FAIL: ${JSON.stringify(a)} != ${JSON.stringify(b)}`)
  } else {
    console.log(`${desc} ... PASS`);
  }
}
