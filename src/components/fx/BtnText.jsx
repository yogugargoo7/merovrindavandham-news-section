export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Inner markup for .btn — rolling label plus optional arrow chip.
const BtnText = ({ children, icon = true }) => (
  <>
    <span className="btn__label"><span>{children}</span></span>
    {icon && (
      <span className="btn__icon" aria-hidden="true">
        {icon === true ? <ArrowIcon /> : icon}
      </span>
    )}
  </>
);

export default BtnText;
