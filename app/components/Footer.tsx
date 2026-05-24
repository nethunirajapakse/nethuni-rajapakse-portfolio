import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.copyright}>
          <p>
            &copy; <span>Copyright</span>{" "}
            <strong>Nethuni Rajapakse</strong> <span>All Rights Reserved</span>
          </p>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://github.com/nethunirajapakse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/nethuni-rajapakse/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://medium.com/@nethunirajapakse/activity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
          >
            <i className="bi bi-medium"></i>
          </a>
        </div>

        <div className={styles.credits}>
          Built with Next.js &middot; {year}
        </div>
      </div>
    </footer>
  );
}
