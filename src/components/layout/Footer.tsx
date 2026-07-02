import { footerStyles } from '../../styles/sharedStyles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyles.container}>
      <div className={footerStyles.content}>
        <div className={footerStyles.text}>
          <div>
            © {currentYear} 茨城高専 メディア・デザイン・ラボ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;