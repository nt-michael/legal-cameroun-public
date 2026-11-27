// Decorative particle background of the home hero, drawn with the browser's 2D canvas.
// It reproduces the former Three.js scene (same points, colour, camera and rotation)
// without downloading a 3D engine: a point cloud in a 10-unit cube, seen by a perspective
// camera placed 3 units away, slowly rotating and following the mouse a little.

const FIELD_OF_VIEW = (75 * Math.PI) / 180;
const CAMERA_DISTANCE = 3;
const NEAR_PLANE = 0.1;
const POINT_SIZE = 0.02;
const POINT_COLOUR = 'rgba(38, 129, 155, 0.8)'; // #26819b at 80 % opacity

// Draws the slowly rotating particles behind the hero and returns a function that stops them
export function drawParticles(canvas: HTMLCanvasElement, section: HTMLElement | null): () => void {
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  // Fewer particles on phones keeps scrolling smooth on modest devices
  const particlesCount = window.innerWidth < 768 ? 700 : 2000;
  const points = new Float32Array(particlesCount * 3);
  for (let i = 0; i < points.length; i++) {
    points[i] = (Math.random() - 0.5) * 10;
  }

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio, 2);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
  };
  resize();

  let rotationX = 0;
  let rotationY = 0;

  const render = () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const focal = 1 / Math.tan(FIELD_OF_VIEW / 2);
    const aspect = width / height;
    // Points are sized like Three.js' PointsMaterial: size × (half the drawing height) / depth
    const sizeScale = POINT_SIZE * canvasHeight * 0.5;
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Additive blending, as before: overlapping points get brighter
    context.globalCompositeOperation = 'lighter';
    context.fillStyle = POINT_COLOUR;

    for (let i = 0; i < points.length; i += 3) {
      const x = points[i];
      const y = points[i + 1];
      const z = points[i + 2];
      // Rotation around Y, then around X (Three.js "XYZ" order)
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const depth = CAMERA_DISTANCE - z2;
      if (depth <= NEAR_PLANE) continue;

      const screenX = ((x1 * focal) / (depth * aspect) + 1) * 0.5 * canvasWidth;
      const screenY = (1 - (y2 * focal) / depth) * 0.5 * canvasHeight;
      const size = sizeScale / depth;
      context.fillRect(screenX - size / 2, screenY - size / 2, size, size);
    }
  };

  // Mouse movement effect
  let mouseX = 0;
  let mouseY = 0;
  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', handleMouseMove);

  const handleResize = () => {
    resize();
    render();
  };
  window.addEventListener('resize', handleResize);

  // Visibility observer - pause animation when not visible
  let isVisible = true;
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { threshold: 0 }
  );
  if (section) {
    observer.observe(section);
  }

  // Animation loop - only draws when visible
  let animationId = 0;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    rotationX += 0.0003 + mouseY * 0.0003;
    rotationY += 0.0005 + mouseX * 0.0003;
    render();
  };

  // With reduced motion requested, draw the particles once and keep them still
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    render();
  } else {
    animate();
  }

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    observer.disconnect();
  };
}
