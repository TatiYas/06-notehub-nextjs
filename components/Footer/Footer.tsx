import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: T.Yasynovska.</p>
          <p>
            Contact us:
            <a href="mailto:iasynovska_Lawyer@ukr.net"> iasynovska_Lawyer@ukr.net</a>
          </p>
        </div>
      </div>
    </footer>
  );
}