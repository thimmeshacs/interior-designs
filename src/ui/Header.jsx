// src\ui\Header.jsx
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import DesktopNav from "../features/navigation/DesktopNav";
import MobileNav from "../features/navigation/MobileNav";
import LocationSelector from "../services/LocationSelector";

const animations = {
  header: {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  },
  logo: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },
};

function Header({ onCitySelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const locationControls = useAnimation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsHeroVisible(false);
      return;
    }

    const heroSection = document.querySelector("#hero-section");
    if (!heroSection) {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame;

    const handleScroll = () => {
      animationFrame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const preloadAnimation = async () => {
      await locationControls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    };
    preloadAnimation();
  }, [locationControls]);

  const shouldBeWhite = isHomePage && isHeroVisible;

  const handleContactClick = () => {
    navigate("/contact");
    setIsMenuOpen(false);
  };

  const handleCitySelect = useCallback(
    (cityData) => {
      if (onCitySelect) {
        onCitySelect(cityData);
      }
    },
    [onCitySelect]
  );

  return (
    <>
      <motion.header
        variants={animations.header}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-base ${
          shouldBeWhite
            ? "bg-transparent"
            : "bg-grey-50/90 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Branding Section */}
            <div className="flex items-center space-x-md">
              <motion.div
                variants={animations.logo}
                whileHover="hover"
                className="relative"
              >
                <Link
                  to="/"
                  className={`text-2xl font-bold ${
                    shouldBeWhite ? "text-grey-0" : "text-grey-800"
                  } transition-base`}
                >
                  <svg
                    width="236"
                    height="44"
                    viewBox="0 0 236 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M218.119 25.7998C219.939 25.7998 221.456 26.188 222.669 26.9645C223.906 27.741 224.525 28.9057 224.525 30.4586C224.525 32.8608 223.154 34.3409 220.412 34.899C219.029 35.1659 217.307 35.2994 215.244 35.2994H213.533V36.3549C213.533 38.3203 213.934 39.9217 214.735 41.1592C215.559 42.3725 216.748 42.9791 218.301 42.9791C219.879 42.9791 221.104 42.518 221.977 41.596C222.875 40.6739 223.506 39.485 223.87 38.0291L224.525 38.1019C224.137 39.8732 223.348 41.3048 222.159 42.3967C220.995 43.4644 219.515 43.9982 217.719 43.9982C215.196 43.9982 213.279 43.1732 211.968 41.5232C210.658 39.849 210.003 37.6409 210.003 34.899C210.003 32.1571 210.707 29.9612 212.114 28.3112C213.521 26.6369 215.523 25.7998 218.119 25.7998ZM213.533 34.6442H214.807C216.773 34.6442 218.144 34.4501 218.92 34.0619C219.721 33.6736 220.267 33.2005 220.558 32.6424C220.849 32.06 220.995 31.2472 220.995 30.2038C220.995 29.1604 220.728 28.2748 220.194 27.5468C219.684 26.7946 218.896 26.4185 217.828 26.4185C216.761 26.4185 215.887 26.8068 215.208 27.5832C214.553 28.3354 214.104 29.2211 213.861 30.2402C213.643 31.2593 213.533 32.3876 213.533 33.6251V34.6442Z"
                      fill="#f97316"
                    />
                    <path
                      d="M197.633 37.556C197.973 38.9876 198.458 40.1523 199.089 41.05C199.72 41.9236 200.435 42.3603 201.236 42.3603C202.061 42.3603 202.874 41.8265 203.675 40.7589C204.5 39.667 205.167 38.2839 205.677 36.6096C206.21 34.9111 206.477 33.249 206.477 31.6233C206.477 28.1777 205.519 26.4549 203.602 26.4549C203.359 26.4549 203.238 26.552 203.238 26.7461C203.238 26.9402 203.347 27.0616 203.566 27.1101C204.245 27.2557 204.573 27.656 204.548 28.3112C204.548 28.9421 204.366 29.4152 204.002 29.7307C203.663 30.0461 203.202 30.2038 202.619 30.2038C202.061 30.2038 201.588 30.0097 201.2 29.6215C200.836 29.2332 200.654 28.7237 200.654 28.0928C200.654 27.4619 200.909 26.9281 201.418 26.4913C201.928 26.0303 202.546 25.7998 203.274 25.7998C205.846 25.7998 207.132 27.6924 207.132 31.4777C207.132 33.4674 206.805 35.4328 206.15 37.374C205.519 39.2909 204.645 40.8802 203.529 42.142C202.437 43.3794 201.273 43.9982 200.035 43.9982C197.973 43.9982 196.335 42.6394 195.122 39.9217C193.933 37.2041 193.338 33.6008 193.338 29.1119V27.0737H190.754V26.5277H191.518C193.435 26.5277 195.146 26.37 196.65 26.0546V28.2748C196.65 31.6961 196.978 34.7898 197.633 37.556Z"
                      fill="#f97316"
                    />
                    <path
                      d="M187.554 42.7266H189.956V43.2725H181.912V42.7266H184.315V27.076H181.73V26.53H182.495C184.387 26.53 186.074 26.3723 187.554 26.0569V42.7266ZM184.278 22.5628C183.89 22.1503 183.696 21.6407 183.696 21.0341C183.696 20.4275 183.89 19.918 184.278 19.5055C184.691 19.093 185.2 18.8867 185.807 18.8867C186.414 18.8867 186.923 19.093 187.336 19.5055C187.748 19.918 187.954 20.4275 187.954 21.0341C187.954 21.6407 187.748 22.1503 187.336 22.5628C186.923 22.951 186.414 23.1451 185.807 23.1451C185.2 23.1451 184.691 22.951 184.278 22.5628Z"
                      fill="#f97316"
                    />
                    <path
                      d="M177.618 42.7255H180.021V43.2715H171.977V42.7255H174.379V18.7037H171.795V18.1577H172.559C174.452 18.1577 176.138 18 177.618 17.6846V42.7255Z"
                      fill="#f97316"
                    />
                    <path
                      d="M160.898 25.7998C163.785 25.7998 165.69 26.4549 166.612 27.7652C167.558 29.0512 168.031 31.3078 168.031 34.535V40.9773C168.031 41.9721 168.25 42.4695 168.687 42.4695C169.584 42.4695 170.179 41.0743 170.47 38.2839L171.125 38.3567C170.761 42.1177 169.536 43.9982 167.449 43.9982C166.843 43.9982 166.369 43.7798 166.03 43.343C165.714 42.9063 165.508 42.4331 165.411 41.9236C165.338 41.3897 165.302 40.7346 165.302 39.9581H165.083C164.768 41.2442 164.125 42.239 163.154 42.9427C162.184 43.6463 160.934 43.9982 159.405 43.9982C157.901 43.9982 156.579 43.5978 155.438 42.7971C154.298 41.9721 153.728 40.7953 153.728 39.2666C153.728 38.1262 154.055 37.1799 154.71 36.4277C156.069 34.8747 159.151 34.0983 163.955 34.0983C164.222 34.0983 164.501 34.0983 164.792 34.0983V32.3148C164.792 30.3979 164.465 28.9542 163.809 27.9836C163.154 27.013 162.014 26.5277 160.388 26.5277C158.787 26.5277 157.61 26.8553 156.858 27.5105C156.105 28.1656 155.729 28.845 155.729 29.5487C155.729 29.7671 155.826 29.8762 156.021 29.8762C156.239 29.8762 156.36 29.7671 156.385 29.5487C156.53 28.9178 157.015 28.6024 157.84 28.6024C158.374 28.6024 158.799 28.7965 159.114 29.1847C159.43 29.5487 159.587 30.0097 159.587 30.5678C159.587 31.1016 159.381 31.5626 158.969 31.9509C158.58 32.3148 158.059 32.4968 157.404 32.4968C156.773 32.4968 156.215 32.2542 155.729 31.7689C155.268 31.2593 155.038 30.6406 155.038 29.9126C155.038 28.5538 155.608 27.5347 156.748 26.8553C157.889 26.1516 159.272 25.7998 160.898 25.7998ZM164.792 37.192V34.7534C164.55 34.7534 164.161 34.7534 163.627 34.7534C163.118 34.7534 162.499 34.7898 161.771 34.8626C161.068 34.9354 160.34 35.1174 159.587 35.4085C158.034 35.9666 157.258 37.2041 157.258 39.121C157.258 40.2857 157.537 41.2199 158.095 41.9236C158.653 42.6272 159.551 42.9791 160.789 42.9791C162.026 42.9791 162.997 42.421 163.7 41.3048C164.428 40.1887 164.792 38.8177 164.792 37.192Z"
                      fill="#f97316"
                    />
                    <path
                      d="M145.056 25.7998C146.876 25.7998 148.392 26.188 149.606 26.9645C150.843 27.741 151.462 28.9057 151.462 30.4586C151.462 32.8608 150.091 34.3409 147.349 34.899C145.966 35.1659 144.243 35.2994 142.181 35.2994H140.47V36.3549C140.47 38.3203 140.87 39.9217 141.671 41.1592C142.496 42.3725 143.685 42.9791 145.238 42.9791C146.815 42.9791 148.04 42.518 148.914 41.596C149.812 40.6739 150.443 39.485 150.807 38.0291L151.462 38.1019C151.074 39.8732 150.285 41.3048 149.096 42.3967C147.931 43.4644 146.451 43.9982 144.656 43.9982C142.132 43.9982 140.215 43.1732 138.905 41.5232C137.595 39.849 136.939 37.6409 136.939 34.899C136.939 32.1571 137.643 29.9612 139.05 28.3112C140.458 26.6369 142.46 25.7998 145.056 25.7998ZM140.47 34.6442H141.744C143.709 34.6442 145.08 34.4501 145.857 34.0619C146.657 33.6736 147.203 33.2005 147.495 32.6424C147.786 32.06 147.931 31.2472 147.931 30.2038C147.931 29.1604 147.664 28.2748 147.131 27.5468C146.621 26.7946 145.832 26.4185 144.765 26.4185C143.697 26.4185 142.824 26.8068 142.144 27.5832C141.489 28.3354 141.04 29.2211 140.798 30.2402C140.579 31.2593 140.47 32.3876 140.47 33.6251V34.6442Z"
                      fill="#f97316"
                    />
                    <path
                      d="M113.57 42.7243V43.2702H105.527V42.7243H107.929V27.0737H105.345V26.5277H106.109C108.026 26.5277 109.737 26.37 111.241 26.0546V29.6943H111.459C111.872 28.5296 112.551 27.5954 113.498 26.8917C114.444 26.1638 115.524 25.7998 116.737 25.7998C119.624 25.7998 121.335 27.098 121.869 29.6943H122.087C122.5 28.5296 123.179 27.5954 124.125 26.8917C125.072 26.1638 126.152 25.7998 127.365 25.7998C129.452 25.7998 130.847 26.4064 131.55 27.6196C132.254 28.8329 132.606 30.7134 132.606 33.2611V42.7243H135.008V43.2702H126.964V42.7243H129.367V32.424C129.367 29.6579 128.966 27.9351 128.165 27.2557C127.777 26.9645 127.28 26.8189 126.673 26.8189C123.422 26.8189 121.796 29.9248 121.796 36.1365V42.7243H124.198V43.2702H116.337V42.7243H118.739V32.424C118.739 29.6579 118.338 27.9351 117.538 27.2557C117.149 26.9645 116.652 26.8189 116.045 26.8189C112.794 26.8189 111.168 29.9248 111.168 36.1365V42.7243H113.57Z"
                      fill="#f97316"
                    />
                    <path
                      d="M100.761 41.4504C99.3536 43.1489 97.3882 43.9982 94.8647 43.9982C92.3412 43.9982 90.3758 43.1489 88.9684 41.4504C87.5611 39.7519 86.8574 37.5681 86.8574 34.899C86.8574 32.2299 87.5611 30.0461 88.9684 28.3476C90.3758 26.6491 92.3412 25.7998 94.8647 25.7998C97.3882 25.7998 99.3536 26.6491 100.761 28.3476C102.168 30.0461 102.872 32.2299 102.872 34.899C102.872 37.5681 102.168 39.7519 100.761 41.4504ZM99.2687 37.3376C99.3172 36.6339 99.3415 35.821 99.3415 34.899C99.3415 33.9769 99.3172 33.1641 99.2687 32.4604C99.2202 31.7567 99.0989 31.0045 98.9047 30.2038C98.7349 29.4031 98.4923 28.7479 98.1768 28.2384C97.8856 27.7046 97.4489 27.2678 96.8665 26.9281C96.3084 26.5884 95.6412 26.4185 94.8647 26.4185C94.0882 26.4185 93.4088 26.5884 92.8265 26.9281C92.2684 27.2678 91.8316 27.7046 91.5162 28.2384C91.225 28.7479 90.9824 29.4031 90.7883 30.2038C90.6184 31.0045 90.5092 31.7567 90.4607 32.4604C90.4122 33.1641 90.3879 33.9769 90.3879 34.899C90.3879 35.821 90.4122 36.6339 90.4607 37.3376C90.5092 38.0412 90.6184 38.7934 90.7883 39.5942C90.9824 40.3949 91.225 41.0622 91.5162 41.596C91.8316 42.1056 92.2684 42.5302 92.8265 42.8699C93.4088 43.2096 94.0882 43.3794 94.8647 43.3794C95.6412 43.3794 96.3084 43.2096 96.8665 42.8699C97.4489 42.5302 97.8856 42.1056 98.1768 41.596C98.4923 41.0622 98.7349 40.3949 98.9047 39.5942C99.0989 38.7934 99.2202 38.0412 99.2687 37.3376Z"
                      fill="#f97316"
                    />
                    <path
                      d="M72.612 31.0784L70.9013 31.1512C66.1455 31.3938 62.9669 32.0854 61.3654 33.2258C59.861 34.3177 59.1088 35.9434 59.1088 38.103C59.1088 39.5346 59.3757 40.675 59.9095 41.5243C60.4433 42.3493 61.1955 42.7618 62.1661 42.7618C63.0639 42.7618 63.5128 42.0702 63.5128 40.6871V20.1958H60.8558V19.6134H70.319V20.1958H67.2981V39.4496C67.2981 40.9541 66.922 42.0945 66.1698 42.8709C65.4418 43.6231 64.4106 43.9992 63.076 43.9992C61.7658 43.9992 60.6496 43.514 59.7275 42.5434C58.8298 41.5485 58.3809 40.1412 58.3809 38.3214C58.3809 36.1375 58.9875 34.4876 60.2007 33.3714C61.4625 32.2552 62.9669 31.5273 64.7139 31.1876C66.7764 30.7751 69.4697 30.5203 72.794 30.4233C75.4145 30.3505 77.0524 30.2413 77.7075 30.0957C78.3869 29.9258 79.0421 29.756 79.673 29.5861C80.3038 29.4163 80.7649 29.2222 81.056 29.0038C81.3472 28.7854 81.6869 28.5064 82.0752 28.1667C82.4876 27.8269 82.791 27.4509 82.9851 27.0384C83.4218 26.0192 83.6402 24.9637 83.6402 23.8718C83.6402 22.7799 83.5189 21.9428 83.2762 21.3605C83.0336 20.7781 82.706 20.4869 82.2935 20.4869C81.4928 20.4869 81.0924 21.1299 81.0924 22.416V42.689H84.1134V43.2713H74.6502V42.689H77.3072V23.0711C77.3072 21.6638 77.6226 20.6204 78.2535 19.941C78.9086 19.2616 79.77 18.9219 80.8377 18.9219C81.9053 18.9219 82.7546 19.3465 83.3854 20.1958C84.0406 21.0208 84.3681 22.1612 84.3681 23.6171C84.3681 25.0487 84.1255 26.2255 83.6402 27.1475C83.1792 28.0696 82.6454 28.7733 82.0388 29.2586C81.4564 29.7196 80.5465 30.0957 79.309 30.3869C78.0715 30.6538 77.0524 30.8236 76.2517 30.8964C75.4509 30.9449 74.2377 31.0056 72.612 31.0784Z"
                      fill="#f97316"
                    />
                    <path
                      d="M234.501 24.4436L234.493 20.5345L232.554 23.7921H232.201L230.262 20.5575V24.4436H229.526V19.0781H230.155L232.393 22.8493L234.601 19.0781H235.229L235.237 24.4436H234.501Z"
                      fill="#f97316"
                    />
                    <path
                      d="M226.169 19.745H224.329V19.0781H228.767V19.745H226.928V24.4436H226.169V19.745Z"
                      fill="#f97316"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.2864 0.321005L0.521389 19.8403C0.0629309 20.2334 -0.115507 20.8981 0.0759747 21.4973C0.267456 22.0957 0.787682 22.4977 1.37242 22.4977H6.31663V40.7717C6.31663 42.413 7.54788 43.7491 9.06188 43.7491H39.213C40.727 43.7491 41.9583 42.413 41.9583 40.7717V22.4977H46.9025C47.4866 22.4977 48.0075 22.0957 48.1989 21.4973C48.3904 20.8981 48.212 20.2334 47.7535 19.8403L24.9885 0.321005C24.4902 -0.107002 23.7854 -0.107002 23.2864 0.321005ZM23.2911 22.5745C23.2959 22.5817 23.3007 22.5892 23.3057 22.5968C25.0057 21.2152 27.0266 20.0317 29.0388 19.0415C29.4671 17.1495 29.4579 14.6197 28.4453 11.315C28.4453 11.315 22.4755 15.9921 20.772 19.9261C21.2941 20.1067 21.7581 20.4541 22.1593 20.9515C22.39 21.2405 22.5967 21.5417 22.7987 21.8359C22.8118 21.8549 22.8248 21.8739 22.8378 21.8928C22.8616 21.9277 22.8854 21.9628 22.9094 21.9982C22.9795 22.1014 23.0511 22.2069 23.1276 22.3152C23.1414 22.3367 23.1552 22.3591 23.1691 22.3815C23.1865 22.4097 23.204 22.4379 23.2215 22.4648C23.2437 22.5018 23.2659 22.5359 23.2911 22.5745ZM14.7933 22.8738C13.5301 23.2318 9.82141 24.3846 8.57292 24.7996C8.51164 24.8228 8.4499 24.8492 8.39019 24.8747C8.35844 24.8883 8.32726 24.9016 8.29703 24.914C8.29703 25.2232 8.49497 25.1762 8.72559 25.1215C8.75646 25.1141 8.78791 25.1067 8.81955 25.0999C9.61538 24.944 11.1601 24.62 12.6161 24.3146C13.7635 24.0739 14.8558 23.8448 15.4828 23.7186C16.0417 23.6042 16.5571 23.6898 16.9922 24.0478C17.0678 24.1089 17.1641 24.195 17.2709 24.2906C17.5645 24.5533 17.938 24.8875 18.1829 24.9714C19.3754 25.3699 19.3704 25.7026 19.3605 26.3676C19.3596 26.431 19.3586 26.4975 19.3586 26.5674C19.3586 30.884 21.1878 33.1742 24.1637 34.6561C24.3593 34.7564 26.8053 35.9518 26.8413 35.866C26.8413 35.866 24.9257 38.1209 23.5102 38.1779C23.5102 38.1779 24.4029 42.0222 29.2658 42.9955C29.2658 42.9955 32.2489 34.2193 29.2658 29.0441C29.2658 29.0441 39.8148 26.4386 39.197 15.7623C39.197 15.7623 29.0046 18.314 23.234 23.2318C23.1469 23.1315 23.0598 23.0241 22.9727 22.8953C22.9257 22.8314 22.8834 22.7626 22.8418 22.6949C22.8133 22.6484 22.785 22.6024 22.7557 22.5588C22.6571 22.4188 22.5608 22.2767 22.4643 22.1346C22.255 21.8259 22.0453 21.5167 21.8117 21.2275C21.1217 20.3686 20.2441 20.0395 19.133 20.2898C18.3713 20.4615 17.7546 20.8484 17.2317 21.3993C16.5493 22.1082 15.758 22.6021 14.7933 22.8738ZM19.1623 22.1367C19.1844 22.4303 18.9517 22.6806 18.6544 22.702C18.3499 22.7165 18.0954 22.4944 18.0808 22.1937C18.0594 21.9005 18.2917 21.6499 18.5894 21.6284C18.8871 21.614 19.148 21.8361 19.1623 22.1367Z"
                      fill="#f97316"
                    />
                  </svg>
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-1 bg-brand-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: shouldBeWhite ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={locationControls}
                className="relative z-10"
              >
                <LocationSelector
                  onCitySelect={handleCitySelect}
                  className="mt-1"
                />
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav
              onContactClick={handleContactClick}
              isScrolled={isScrolled}
              shouldBeWhite={shouldBeWhite}
            />

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${
                shouldBeWhite ? "text-grey-0" : "text-grey-800"
              } focus:outline-none transition-base`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Scroll progress indicator */}
          <motion.div
            className="h-0.5 bg-brand-500"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: !shouldBeWhite ? 1 : 0,
              transformOrigin: "left",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.header>

      {/* Mobile Navigation - Positioned OUTSIDE the header for proper layering */}
      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onContactClick={handleContactClick}
        isScrolled={isScrolled}
        shouldBeWhite={shouldBeWhite}
      />
    </>
  );
}

export default Header;
