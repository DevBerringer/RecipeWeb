function InstructionStep({ step, idx }) {
  return (
    <li
      className="relative px-4 py-3 font-['Caveat'] text-xl leading-relaxed text-stone-800 shadow-md"
      style={{
        background: '#FFFDF9',
        border: `2px solid rgba(139, 69, 19, 0.4)`,
        borderRadius: `${Math.floor(Math.random() * 5) + 15}px ${
          Math.floor(Math.random() * 5) + 5
        }px ${Math.floor(Math.random() * 5) + 15}px ${
          Math.floor(Math.random() * 5) + 5
        }px`,
        boxShadow: `6px 6px 0px rgba(139, 69, 19, 0.1), -6px -6px 0px rgba(139, 69, 19, 0.05)`,
      }}
    >
      {step}
    </li>
  );
}

export default InstructionStep;
