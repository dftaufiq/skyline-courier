// Staged screenshot scenes: ?shot=<name>&seed=N paints one frozen moment
// instead of running the loop, twice, then sets window.__shotReady. The
// scenes are real states of the game's own code — a ring mid-flight, a
// landing approach, a storm delivery — never a mock-up.
import { createFlight } from './flight.js';

export function stageShot(name, flight, terrain) {
  const st = flight.state;
  if (name === 'cover') {
    // Golden-hour cruise: one ring glowing ahead, Verde Field's runway
    // beyond it, volcano and lighthouse on the horizon.
    st.x = 5120;
    st.y = 240;
    st.z = 6700;
    st.heading = 0;
    st.pitch = -0.04;
    st.roll = 0.08;
    st.speed = 118;
    st.throttle = 0.62;
    st.message = 'RING 1/8 — follow the gold';
    st.messageT = 99;
    return { screen: 'play' };
  }
  if (name === 'rings') {
    // Mid-turn through the ring tour: banking hard toward the second ring,
    // the first already flown, Koro Volcano ahead on the left.
    st.rings[0].passed = true;
    st.ringsPassed = 1;
    st.score = 150;
    st.nextRing = st.rings[1];
    st.x = 4700;
    st.y = 350;
    st.z = 5100;
    st.heading = 5.25; // turning left toward ring 2 at (4200, 4800)
    st.pitch = -0.04;
    st.roll = -0.55;
    st.speed = 132;
    st.throttle = 0.85;
    st.message = 'RING 1/8 — +150';
    st.messageT = 99;
    return { screen: 'play' };
  }
  if (name === 'landing') {
    // Final approach to Verde Field in the Island Hop sortie: low, slow,
    // flaps out, the runway and its edge lights ahead, the beacon column
    // over the strip. The apron is flat, so the approach is clear.
    const hopFlight = createFlight(terrain, 'hop', 7);
    const s = hopFlight.state;
    s.x = 4650;
    s.y = 55;
    s.z = 5900;
    s.heading = Math.PI / 2;
    s.pitch = -0.06;
    s.roll = 0.01;
    s.speed = 78;
    s.throttle = 0.3;
    s.message = 'VERDE FIELD — flaps out, easy does it';
    s.messageT = 99;
    return { screen: 'play', flight: hopFlight };
  }
  if (name === 'storm') {
    // Storm courier: rain, low fuel, the next ring ahead and Turtle Bay
    // beyond it. The passed ring sits behind the plane, out of the way.
    const stormFlight = createFlight(terrain, 'storm', 7);
    const s = stormFlight.state;
    s.x = 4300;
    s.y = 280;
    s.z = 6600;
    s.heading = 3.93; // toward ring 2 at (3900, 7000): bearing 225 deg
    s.pitch = 0;
    s.roll = -0.12;
    s.speed = 104;
    s.throttle = 0.72;
    s.fuel = 18;
    s.rings[0].passed = true;
    s.ringsPassed = 1;
    s.score = 150;
    s.nextRing = s.rings[1];
    s.message = 'LOW FUEL — Turtle Bay, 2 rings to go';
    s.messageT = 99;
    return { screen: 'play', flight: stormFlight };
  }
  return { screen: 'title' };
}
