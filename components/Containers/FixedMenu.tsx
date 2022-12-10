import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../utils/utils";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { color } from "../../styles/color";

export const FixedMenu = ({ scrolled }: any) => {
  return (
    <div className="fixed bottom-5 right-16 z-30 sm:bottom-6 sm:right-24">
      <Link to={"init"} spy={true} smooth={true} duration={500}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: scrolled ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          style={{ backgroundColor: color.whiteColor }}
          className={cls(
            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl shadow-md duration-200 hover:bg-gray-200 sm:h-14 sm:w-14 sm:text-3xl"
          )}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </motion.div>
      </Link>
    </div>
  );
};
