import React from 'react';
import { author } from '@data/author';

const name: string = author.name;
const job: string = author.job;

interface Props {
    style?: React.CSSProperties;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; // Choose <h> default = <h1> 
}

const AuthorHeader: React.FC<Props> = ({ style, headingLevel = 1 }) => {
    const Tag: React.ElementType = `h${headingLevel}`;

    return (
        <Tag
            id="author"
            className="page-title author"
            style={style}
            aria-label="Page Header"
            itemProp="Author"
            itemScope
            itemType="https://schema.org/Person"
            title="Page Header"
            onClick={() => { window.location.href = '/#'; }}
        >
            <strong
                className="author-name"
                itemProp="name" 
                itemType="https://schema.org/name"
                title={name}
                aria-label={`Author name: ${name}`}
            >
                {name}
            </strong> 
            <span
                className="author-job sr-only"
                itemProp="jobTitle"
                itemType="https://schema.org/jobTitle"
                title={job}
                aria-label={`Author job: ${job}`}
            >
                {job}
            </span>
        </Tag>
    );
};

export default AuthorHeader;