import css from './SearchBox.module.css';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
    return (
        <div className={css.container}>
            <label htmlFor="search" className={css.label}>
                Search notes:
            </label>
            <input
                type="text"
                id="search"
                className={css.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by title or content..."
            />
        </div>
    );
}