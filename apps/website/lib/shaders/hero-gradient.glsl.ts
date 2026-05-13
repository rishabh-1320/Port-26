export const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color_lime;
uniform vec3 u_color_blue;
uniform vec3 u_color_warm;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = uv * aspect;

  float t = u_time * 0.08;

  float n1 = snoise(p * 1.2 + vec2(t, t * 0.7));
  float n2 = snoise(p * 2.4 - vec2(t * 0.5, t));
  float n = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

  float mask = smoothstep(0.0, 1.0, 1.0 - uv.y);

  vec3 base = vec3(1.0);
  vec3 c1 = mix(base, u_color_lime, smoothstep(0.4, 0.7, n) * mask * 0.55);
  vec3 c2 = mix(c1, u_color_blue, smoothstep(0.55, 0.85, n1) * mask * 0.35);
  vec3 c3 = mix(c2, u_color_warm, smoothstep(0.6, 0.9, n2) * mask * 0.25);

  gl_FragColor = vec4(c3, 1.0);
}
`;
