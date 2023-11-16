import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero">
      <div className="container hero-display">
        <div className="hero-card">
          <h2>Explore the Marvel Universe</h2>
          <p>
            Welcome to the exhilarating universe of Marvel, where extraordinary
            characters and gripping narratives come to life! Immerse yourself in
            the dynamic world of iconic superheroes, unparalleled adventures,
            and epic battles that transcend time and space. From the mighty
            Avengers assembling to the web-swinging exploits of Spider-Man,
            Marvel Comics has captivated audiences for decades with its rich
            storytelling, diverse characters, and groundbreaking creativity.{" "}
          </p>
          <Link to="/comics">
            <button>WANDER THROUGH THE COMICS</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
