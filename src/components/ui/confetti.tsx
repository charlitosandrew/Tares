import { useCallback, useEffect, useRef } from 'react';

interface ConfettiParticle {
  color: string;
  x: number;
  y: number;
  diameter: number;
  tilt: number;
  tiltAngleIncrement: number;
  tiltAngle: number;
}

const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<ConfettiParticle[]>([]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  const createParticles = useCallback(() => {
    particles.current = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        diameter: Math.random() * 10 + 5,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle, index) => {
      particle.tiltAngle += particle.tiltAngleIncrement;
      particle.y += (Math.cos(particle.tiltAngle) + 1 + particle.diameter / 2) * 2;
      particle.x += Math.sin(particle.tiltAngle) * 5;
      particle.tilt = Math.sin(particle.tiltAngle) * 15;

      if (particle.y > canvas.height) {
        if (index % 5 > 0) {
          particles.current[index] = {
            ...particle,
            x: Math.random() * canvas.width,
            y: -10,
            tiltAngle: Math.random() * Math.PI,
          };
        }
      }

      ctx.beginPath();
      ctx.lineWidth = particle.diameter;
      ctx.strokeStyle = particle.color;
      ctx.moveTo(particle.x + particle.tilt + particle.diameter / 2, particle.y);
      ctx.lineTo(particle.x + particle.tilt, particle.y + particle.diameter);
      ctx.stroke();
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, createParticles, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
}