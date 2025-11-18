import { footerStyles } from '../styles/sharedStyles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyles.container}>
      <div className={footerStyles.content}>
        <div className={footerStyles.text}>
          <div>
            © {currentYear} 応用情報技術者試験クイズ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;