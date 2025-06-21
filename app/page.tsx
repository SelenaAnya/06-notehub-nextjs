import Link from 'next/link';
import css from './page.module.css';

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.hero}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.subtitle}>
            Your personal note-taking companion
          </p>
        </div>

        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you're at home or on the go.
        </p>

        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>

        <div className={css.features}>
          <div className={css.feature}>
            <h3 className={css.featureTitle}>Easy Organization</h3>
            <p className={css.featureDescription}>
              Keep all your notes organized in one place with intuitive categorization
            </p>
          </div>

          <div className={css.feature}>
            <h3 className={css.featureTitle}>Powerful Search</h3>
            <p className={css.featureDescription}>
              Find any note instantly with our advanced search functionality
            </p>
          </div>

          <div className={css.feature}>
            <h3 className={css.featureTitle}>Clean Interface</h3>
            <p className={css.featureDescription}>
              Focus on your thoughts with our distraction-free writing environment
            </p>
          </div>
        </div>

        <div className={css.cta}>
          <Link href="/notes" className={css.ctaButton}>
            Start Taking Notes
          </Link>
        </div>
      </div>
    </main>
  );
}