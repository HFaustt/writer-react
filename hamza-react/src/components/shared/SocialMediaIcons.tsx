import styles from "./SocialMediaIcons.module.css";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
function SocialMediaIcons() {
  return (
    <div>
      <div className={styles.icons}>
        <FacebookIcon
          fontSize="medium"
          cursor="pointer"
          className={styles.icon}
        />
        <InstagramIcon
          fontSize="medium"
          cursor="pointer"
          className={styles.icon}
        />
        <XIcon fontSize="small" cursor="pointer" className={styles.icon} />
      </div>
    </div>
  );
}

export default SocialMediaIcons;
