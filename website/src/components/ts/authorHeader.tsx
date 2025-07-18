import React from 'react';
import { author } from '@data/constants/author';
import Pages from '@data/constants/pages';
import { navigate } from 'astro:transitions/client'; // For Astro view transition

const name: string = author.name;
const job: string = author.job;

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    style?: React.CSSProperties;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; // Choose <h> default = <h1>
    hideJob?: boolean; // Default: true
}

const AuthorHeader: React.FC<Props> = ({ style, headingLevel = 1, hideJob = true, ...rest }) => {
    const Tag: React.ElementType = `h${headingLevel}`;

    return (
        <Tag
            className="page-title author"
            style={style}
            aria-labelledby="Page Header"
            aria-hidden="false"
            itemProp="Author"
            itemScope
            itemType="https://schema.org/Person"
            title="Page Header"
            onClick={() => { navigate(Pages.home); }}
            {...rest}
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
            <br />
            <span
                className={`author-job ${hideJob ? 'sr-only' : ''}`}
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