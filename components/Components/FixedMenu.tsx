import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cls } from "../../utils/utils";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { color } from "../../styles/color";

export const FixedMenu = ({ scrolled }: any) => {
  return (
    <div className="fixed bottom-6 right-24 z-30 hidden sm:flex">
      <Link to={"init"} spy={true} smooth={true} duration={500}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: scrolled ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className={cls(
            "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-3xl shadow-md duration-200 hover:bg-gray-200"
          )}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </motion.div>
      </Link>
    </div>
  );
};
