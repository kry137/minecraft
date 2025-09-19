
export default function AnimatedText({ text, delayStep = 100 }) {

  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-jump-in"

          style={{ 
            animationDelay: `${delayStep * (index + 1)}ms` 
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
