import { motion, useScroll, useTransform } from 'framer-motion';

const techIcons = [
  // Outer ring
  [
    { label: 'React', text: '⚛️' },
    { label: 'GitHub', text: '🐙' },
    { label: 'AWS', text: '☁️' },
    { label: 'Node.js', text: '🟢' },
  ],
  // Middle ring
  [
    { label: 'JS', text: 'JS' },
    { label: 'TS', text: 'TS' },
    { label: 'Python', text: '🐍' },
  ],
  // Inner ring
  [
    { label: 'HTML5', text: '5️⃣' },
    { label: 'CSS3', text: '3️⃣'},
  ]
];

export default function ScrollTechBackground() {
  const { scrollYProgress } = useScroll();
  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 360]); // 360 degrees when scrolling down
  const rotateMiddle = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, 270]);

  const rings = [
    { radius: 350, items: techIcons[0], rotation: rotateOuter, invert: useTransform(scrollYProgress, [0, 1], [0, -360]) },
    { radius: 250, items: techIcons[1], rotation: rotateMiddle, invert: useTransform(scrollYProgress, [0, 1], [0, 360]) },
    { radius: 150, items: techIcons[2], rotation: rotateInner, invert: useTransform(scrollYProgress, [0, 1], [0, -270]) }
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20 sm:opacity-40 lg:opacity-60">
      {/* Dark gradient blur at the top like the reference */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-accent-primary/30 blur-[120px] rounded-[100%]" />
      
      {/* Centered orbits perfectly centered and responsive in scale */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] scale-50 sm:scale-75 md:scale-90 lg:scale-100">
        {rings.map((ring, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full border border-gray-400/20 dark:border-gray-500/20"
            style={{ 
              width: ring.radius * 2, 
              height: ring.radius * 2, 
              left: -ring.radius, 
              top: -ring.radius,
              rotate: ring.rotation
            }}
          >
            {ring.items.map((item, idx) => {
              const angle = (idx / ring.items.length) * Math.PI * 2;
              const x = Math.cos(angle) * ring.radius;
              const y = Math.sin(angle) * ring.radius;
              return (
                <motion.div
                  key={item.label}
                  className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 bg-white/70 dark:bg-black/60 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white shadow-xl"
                  style={{
                    x, y,
                    rotate: ring.invert // keeps it upright while revolving
                  }}
                >
                  {item.text}
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
