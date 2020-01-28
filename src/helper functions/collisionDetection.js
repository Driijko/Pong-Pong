function doRangesOverlap(range1, range2) {
  if(range1[0] >= range2[0] && range1[0] <= range2[1]) {
    return true;
  } else if (range1[1] >= range2[0] && range1[1] <= range2[1]) {
    return true;
  } else return false;
}

function doRectsOverlap(rect1, rect2) {
  return ( doRangesOverlap(rect1[0], rect2[0]) && doRangesOverlap(rect1[1], rect2[1]));
}

// SUPER READABLE VERSION OF 'WILL OVERLAP FUNCTION'
// function willRectsOverlap(speed, rect1, rect2) {
//   const hsp = speed[0];
//   const vsp = speed[1];
//   const rect1Hpos = rect1[0];
//   const rect1Vpos = rect1[1];
//   const newRect1Hpos = [rect1Hpos[0] + hsp, rect1Hpos[1] + hsp];
//   const newRect1Vpos = [rect1Vpos[0] + vsp, rect1Vpos[1] + vsp];
//   const newRect1Position = [newRect1Hpos, newRect1Vpos];
//   return doRectsOverlap(newRect1Position, rect2);
// }

// Less readable but probably more efficient 'will overlap function'.
function willRectsOverlap(speed, rect1, rect2) {
  return (
    doRectsOverlap(
      [
        [rect1[0][0] + speed[0], rect1[0][1] + speed[0]],
        [rect1[1][0] + speed[1], rect1[1][1] + speed[1]]
      ],
      rect2
    )
  )
}

function willRectsOverlapHsp(hsp, rect1, rect2) {
  return (
    doRectsOverlap(
      [
        [rect1[0][0] + hsp, rect1[0][1] + hsp],
        rect1[1]
      ],
      rect2
    )
  )
}

function willRectsOverlapVsp(vsp, rect1, rect2) {
  return (
    doRectsOverlap(
      [
        rect1[0],
        [rect1[1][0] + vsp, rect1[1][1] + vsp]
      ],
      rect2
    )
  )
}

function moveToTouchingHpos(hsp, rect1Hpos, rect2Hpos) {
  if (Math.sign(hsp) === 1) {
    return rect2Hpos[0] - rect1Hpos[1] - 1;
  }
  else {
    return -(rect1Hpos[0] - rect2Hpos[1]) + 1;
  }
}

function moveToTouchingVpos(vsp, rect1Vpos, rect2Vpos) {
  if (Math.sign(vsp) === 1) {
    return rect2Vpos[0] - rect1Vpos[1] - 1;
  }
  else {
    return -(rect1Vpos[0] - rect2Vpos[1]) + 1;
  }
}

export {doRangesOverlap, doRectsOverlap, willRectsOverlap,
        willRectsOverlapHsp, willRectsOverlapVsp, moveToTouchingHpos,
        moveToTouchingVpos};