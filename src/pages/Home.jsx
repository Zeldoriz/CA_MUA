/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Gallery from "../components/Gallery/Gallery";
import styles from "./Home.module.css";

const Home = () => {
  // Media Queries
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => setMatches(e.matches));
    return () => {
      window.matchMedia("(min-width: 768px)").removeEventListener("change", (e) => setMatches(e.matches));
    };
  }, []);
  // ----------------

  const [dir, setDir] = useState(() => import.meta.glob(`../assets/gallery/casual/*.{jpg,jpeg,png}`));
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = [];
      for (const img in dir) {
        const data = await dir[img]();
        images.push(data.default);
      }
      setGalleryImages(images);
    };
    loadImages();
  }, [dir]);

  const handleGallerySwap = (activeGallery) => {
    let newDir;
    switch (activeGallery) {
      case "glam":
        newDir = import.meta.glob(`../assets/gallery/glam/*.{jpg,jpeg,png}`);
        break;
      case "graduation":
        newDir = import.meta.glob(`../assets/gallery/graduation/*.{jpg,jpeg,png}`);
        break;
      case "party":
        newDir = import.meta.glob(`../assets/gallery/party/*.{jpg,jpeg,png}`);
        break;
      case "casual":
      default:
        newDir = import.meta.glob(`../assets/gallery/casual/*.{jpg,jpeg,png}`);
    }
    setDir(newDir);
  };

  const [isMNMActive, setIsMNMActive] = useState(`${styles.MNMhidden}`);
  const [mobileNavOpacity, setMobileNavOpacity] = useState(`${styles.mobileNavTrans}`);
  const handleBurgerClick = () => {
    setIsMNMActive(isMNMActive === `${styles.MNMhidden}` ? `${styles.MNMactive}` : `${styles.MNMhidden}`);

    setMobileNavOpacity(
      mobileNavOpacity === `${styles.mobileNavTrans}` ? `${styles.mobileNavOpaque}` : `${styles.mobileNavTrans}`
    );
  };

  // HTML Functions
  const returnNavHeader = () => {
    return (
      <div className={styles.mainLogo}>
        <img src="src\assets\mainLogo.png" alt="" />
      </div>
    );
  };

  return (
    <>
      <div className={styles.homeContainer}>
        {matches ? (
          // Desktop
          <div className={styles.navContainer}>
            <div className={styles.navInnerContainer}>
              {returnNavHeader()}
              <div className={styles.navSubHeader}>Jakarta | Indonesia</div>
              <div className={styles.scrollable}>
                <div className={styles.navList}>
                  <ul>
                    <li onClick={() => handleGallerySwap("casual")}>Casual</li>
                    <li onClick={() => handleGallerySwap("glam")}>Glam</li>
                    <li onClick={() => handleGallerySwap("graduation")}>Graduation</li>
                    <li onClick={() => handleGallerySwap("party")}>Party</li>
                    <li>Behind the Brushes</li>
                  </ul>
                </div>
                <div className={styles.navContactLinks}>
                  <a href="https://www.instagram.com/chikaargata.mua?igsh=MXF6YmdidGpvdHQxcA==" target="blank">
                    <img className="IG" src="src\assets\IGLogo.svg" alt="" />
                  </a>
                  <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F6282288489132&e=AT346qOFWuuehmiSMTlg7RzhZMUHblURfjNG-H5r5AGs7O9JZZY8fp5UJ2MGg2MAU1w25APGYBCBaQrM2GcrYPBmbZeFIaOz">
                    <img src="src\assets\WhatsappLogo.svg" alt="" />
                  </a>
                </div>
                <div className={styles.navFooter}>Copyright @ All rights reserved.</div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile
          <>
            <div className={`${styles.mobileNavContainer} ${mobileNavOpacity}`}>
              {returnNavHeader()}
              <img
                className={styles.mobileNavBurger}
                onClick={handleBurgerClick}
                src="src\assets\navBurger.svg"
                alt=""
              />
            </div>

            <div className={`${styles.mobileNavMenu} ${isMNMActive}`}>
              <div className={styles.navList}>
                <ul>
                  <li
                    onClick={() => {
                      handleGallerySwap("casual");
                      handleBurgerClick();
                    }}
                  >
                    Casual
                  </li>
                  <div className={styles.mobileNavMenuLines}></div>
                  <li
                    onClick={() => {
                      handleGallerySwap("glam");
                      handleBurgerClick();
                    }}
                  >
                    Glam
                  </li>
                  <div className={styles.mobileNavMenuLines}></div>
                  <li
                    onClick={() => {
                      handleGallerySwap("graduation");
                      handleBurgerClick();
                    }}
                  >
                    Graduation
                  </li>
                  <div className={styles.mobileNavMenuLines}></div>
                  <li
                    onClick={() => {
                      handleGallerySwap("party");
                      handleBurgerClick();
                    }}
                  >
                    Party
                  </li>
                  <div className={styles.mobileNavMenuLines}></div>
                  <li>Behind the Brushes</li>
                </ul>
              </div>
              <div className={styles.mobileNavFooter}>
                <div className={styles.navContactLinks}>
                  <a href="https://www.instagram.com/chikaargata.mua?igsh=MXF6YmdidGpvdHQxcA==" target="blank">
                    <img className="IG" src="src\assets\IGLogo.svg" alt="" />
                  </a>
                  <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F6282288489132&e=AT346qOFWuuehmiSMTlg7RzhZMUHblURfjNG-H5r5AGs7O9JZZY8fp5UJ2MGg2MAU1w25APGYBCBaQrM2GcrYPBmbZeFIaOz">
                    <img src="src\assets\WhatsappLogo.svg" alt="" />
                  </a>
                </div>
                <div className={styles.navFooter}>Copyright @ All rights reserved.</div>
              </div>
            </div>
          </>
        )}
        <div className={styles.galleryContainer}>
          <div className={styles.gallery}>
            <Gallery images={galleryImages} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
