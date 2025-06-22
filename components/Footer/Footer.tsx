import css from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={css.footer}>
            <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
            <div className={css.wrap}>
                <p>Developer: Anna</p>
                <p>
                    Contact us: {' '}
                    <a href="mailto:selena.anya@gmail.com">selena.anya@gmail.com</a> 
                </p>
            </div>
        </footer>
    );
}