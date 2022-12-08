import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../utils/utils";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

export const FixedMenu = ({ scrolled }: any) => {
  return (
    <div className="fixed bottom-2 right-2 z-30 sm:bottom-10 sm:right-10">
      <Link to={"init"} spy={true} smooth={true} duration={500}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: scrolled ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className={cls(
            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500 bg-white text-xl shadow-md shadow-gray-700 duration-200 hover:bg-gray-200 sm:h-16 sm:w-16 sm:text-3xl"
          )}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </motion.div>
      </Link>
    </div>
  );
};
