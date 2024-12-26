export function normalize(angle) {
  angle = angle % (2 * Math.PI);

  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  return angle;
}

export function convertToRadians(angle) {
  return angle * (Math.PI / 180);
}

export function correctFishEye(distance, angle, playerAngle) {
  return distance * Math.cos(angle - playerAngle);
}
