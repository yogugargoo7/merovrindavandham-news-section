import './PageLoader.css';

const PageLoader = ({ hidden }) => {
  return (
    <div className={`page-loader${hidden ? ' page-loader--hidden' : ''}`} aria-hidden="true">
      <div className="page-loader__glow"></div>
      <div className="page-loader__content">
        <div className="page-loader__eyebrow">Mero Vrindavan Dham</div>
        <div className="page-loader__title">Luxury township experience</div>
        <p className="page-loader__subline">Premium plots near Vrindavan and Yamuna Expressway</p>
        <div className="page-loader__bar">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
