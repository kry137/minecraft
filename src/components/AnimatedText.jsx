
export default function AnimatedText({ text, delay = 0, delayStep = 100 }) {

  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-jump-in"

          style={{ 
            animationDelay: `${delay + delayStep * (index + 1)}ms` 
          }}
        >
          {char == ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};
